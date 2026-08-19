import { Redis } from "@upstash/redis";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PULSE_POLLS, PULSE_ZONES, getPulsePoll } from "@/content/polls";
import { isValidPulseBallot, unlockedPulseTallies, type PulsePollTally, type PulseProfile, type PulseSplitRow } from "@/lib/polls";
import { isValidClientId } from "@/lib/projects";
import { hashWithSecret } from "@/lib/security";

interface Ballot {
  optionId: string;
  age: string;
  gender: string;
  zone: string;
  recordedAt?: string;
}

export interface PulseBallotRow {
  recordedAt: string;
  pollId: string;
  category: string;
  question: string;
  optionId: string;
  optionLabel: string;
  age: string;
  gender: string;
  zone: string;
  respondentHash: string;
}

const MIN_SPLIT_N = 5;
const MAX_BALLOTS_PER_POLL = 8_000;

function useRedis(): boolean {
  const hasCredentials = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
  if (!hasCredentials) return false;

  // Keep Redis for production traffic only. Dev and preview use local file storage.
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }
  return process.env.NODE_ENV === "production";
}

function getRedis(): Redis {
  return Redis.fromEnv();
}

function pollKey(pollId: string): string {
  return `poll:${pollId}`;
}

// --- Local file store (dev fallback) ---

interface LocalStore {
  ballots: Record<string, Record<string, Ballot>>;
}

const LOCAL_EMPTY: LocalStore = { ballots: {} };

function localStoreFile(): string {
  return path.join(process.cwd(), "data", "polls-runtime.json");
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localStoreFile(), "utf8");
    const parsed = JSON.parse(raw) as LocalStore;
    return { ballots: parsed.ballots && typeof parsed.ballots === "object" ? parsed.ballots : {} };
  } catch {
    return { ballots: { ...LOCAL_EMPTY.ballots } };
  }
}

async function writeLocalStore(store: LocalStore): Promise<void> {
  const file = localStoreFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store), "utf8");
}

function respondentHash(clientId: string): string {
  return hashWithSecret(clientId, process.env.POLLS_EXPORT_SECRET ?? "");
}

async function readPollBallots(pollId: string): Promise<Record<string, Ballot>> {
  const raw = await getRedis().hgetall<Record<string, Ballot>>(pollKey(pollId));
  return raw ?? {};
}

function tallyPoll(pollId: string, ballots: Record<string, Ballot>): PulsePollTally {
  const poll = getPulsePoll(pollId);
  const options = (poll?.options ?? []).map((option) => ({ id: option.id, count: 0 }));
  const byId = new Map(options.map((option) => [option.id, option]));
  const zoneBuckets = new Map<string, Record<string, number>>();

  for (const ballot of Object.values(ballots)) {
    const option = byId.get(ballot.optionId);
    if (option) option.count += 1;
    if (ballot.zone === "skip") continue;
    const bucket = zoneBuckets.get(ballot.zone) ?? {};
    bucket[ballot.optionId] = (bucket[ballot.optionId] ?? 0) + 1;
    zoneBuckets.set(ballot.zone, bucket);
  }

  const byZone: PulseSplitRow[] = [];
  for (const zone of PULSE_ZONES) {
    const bucket = zoneBuckets.get(zone.id);
    if (!bucket) continue;
    const n = Object.values(bucket).reduce((sum, count) => sum + count, 0);
    if (n < MIN_SPLIT_N) continue;
    byZone.push({
      key: zone.id,
      label: zone.label,
      n,
      options: (poll?.options ?? []).map((option) => ({
        id: option.id,
        count: bucket[option.id] ?? 0,
      })),
    });
  }

  return { n: Object.keys(ballots).length, options, byZone };
}

export async function getClientPulseState(clientId: string): Promise<{
  voted: Record<string, string>;
  tallies: Record<string, PulsePollTally>;
}> {
  if (!isValidClientId(clientId)) {
    return { voted: {}, tallies: {} };
  }

  const voted: Record<string, string> = {};
  const tallies: Record<string, PulsePollTally> = {};

  if (useRedis()) {
    const redis = getRedis();
    const pipeline = redis.pipeline();
    for (const poll of PULSE_POLLS) {
      pipeline.hgetall(pollKey(poll.id));
    }
    const results = await pipeline.exec<(Record<string, Ballot> | null)[]>();

    for (let i = 0; i < PULSE_POLLS.length; i++) {
      const poll = PULSE_POLLS[i];
      const ballots = results[i] ?? {};
      const mine = ballots[clientId];
      if (!mine) continue;
      voted[poll.id] = mine.optionId;
      tallies[poll.id] = tallyPoll(poll.id, ballots);
    }
  } else {
    const store = await readLocalStore();
    for (const poll of PULSE_POLLS) {
      const ballots = store.ballots[poll.id] ?? {};
      const mine = ballots[clientId];
      if (!mine) continue;
      voted[poll.id] = mine.optionId;
      tallies[poll.id] = tallyPoll(poll.id, ballots);
    }
  }

  return { voted, tallies: unlockedPulseTallies(voted, tallies) };
}

export async function recordPulseAnswer(
  clientId: string,
  pollId: string,
  optionId: string,
  profile: PulseProfile,
): Promise<{ optionId: string; tally: PulsePollTally; first: boolean; row: PulseBallotRow }> {
  if (!isValidPulseBallot(clientId, pollId, optionId, profile)) {
    throw new Error("Invalid ballot");
  }

  if (useRedis()) {
    return recordViaRedis(clientId, pollId, optionId, profile);
  }
  return recordViaLocal(clientId, pollId, optionId, profile);
}

async function recordViaRedis(
  clientId: string,
  pollId: string,
  optionId: string,
  profile: PulseProfile,
): Promise<{ optionId: string; tally: PulsePollTally; first: boolean; row: PulseBallotRow }> {
  const redis = getRedis();
  const key = pollKey(pollId);

  const existing = await redis.hget<Ballot>(key, clientId);
  if (existing) {
    const ballots = await readPollBallots(pollId);
    const poll = getPulsePoll(pollId);
    return {
      optionId: existing.optionId,
      tally: tallyPoll(pollId, ballots),
      first: false,
      row: toRow(pollId, clientId, existing, poll),
    };
  }

  const len = await redis.hlen(key);
  if (len >= MAX_BALLOTS_PER_POLL) {
    throw new Error("Poll cap");
  }

  const ballot: Ballot = {
    optionId,
    age: profile.age,
    gender: profile.gender,
    zone: profile.zone,
    recordedAt: new Date().toISOString(),
  };

  await redis.hset(key, { [clientId]: ballot });

  const ballots = await readPollBallots(pollId);
  const poll = getPulsePoll(pollId);
  return {
    optionId,
    tally: tallyPoll(pollId, ballots),
    first: true,
    row: toRow(pollId, clientId, ballot, poll),
  };
}

async function recordViaLocal(
  clientId: string,
  pollId: string,
  optionId: string,
  profile: PulseProfile,
): Promise<{ optionId: string; tally: PulsePollTally; first: boolean; row: PulseBallotRow }> {
  const store = await readLocalStore();
  const current = { ...(store.ballots[pollId] ?? {}) };
  const poll = getPulsePoll(pollId);
  const existing = current[clientId];
  if (existing) {
    return {
      optionId: existing.optionId,
      tally: tallyPoll(pollId, current),
      first: false,
      row: toRow(pollId, clientId, existing, poll),
    };
  }

  if (Object.keys(current).length >= MAX_BALLOTS_PER_POLL) {
    throw new Error("Poll cap");
  }

  const ballot: Ballot = {
    optionId,
    age: profile.age,
    gender: profile.gender,
    zone: profile.zone,
    recordedAt: new Date().toISOString(),
  };
  current[clientId] = ballot;
  store.ballots[pollId] = current;
  await writeLocalStore(store);
  return {
    optionId,
    tally: tallyPoll(pollId, current),
    first: true,
    row: toRow(pollId, clientId, ballot, poll),
  };
}

export async function listPulseBallotRows(): Promise<PulseBallotRow[]> {
  const rows: PulseBallotRow[] = [];

  if (useRedis()) {
    for (const poll of PULSE_POLLS) {
      const ballots = await readPollBallots(poll.id);
      for (const [clientId, ballot] of Object.entries(ballots)) {
        rows.push(toRow(poll.id, clientId, ballot, poll));
      }
    }
  } else {
    const store = await readLocalStore();
    for (const poll of PULSE_POLLS) {
      const ballots = store.ballots[poll.id] ?? {};
      for (const [clientId, ballot] of Object.entries(ballots)) {
        rows.push(toRow(poll.id, clientId, ballot, poll));
      }
    }
  }

  rows.sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));
  return rows;
}

function toRow(
  pollId: string,
  clientId: string,
  ballot: Ballot,
  poll: ReturnType<typeof getPulsePoll>,
): PulseBallotRow {
  const optionLabel = poll?.options.find((option) => option.id === ballot.optionId)?.label ?? ballot.optionId;
  return {
    recordedAt: ballot.recordedAt ?? "",
    pollId,
    category: poll?.category ?? "",
    question: poll?.question ?? "",
    optionId: ballot.optionId,
    optionLabel,
    age: ballot.age,
    gender: ballot.gender,
    zone: ballot.zone,
    respondentHash: respondentHash(clientId),
  };
}
