import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { PULSE_POLLS, PULSE_ZONES, getPulsePoll } from "@/content/polls";
import { isValidPulseBallot, type PulsePollTally, type PulseProfile, type PulseSplitRow } from "@/lib/polls";
import { isValidClientId } from "@/lib/projects";
import { hashWithSecret } from "@/lib/security";

interface Ballot {
  optionId: string;
  age: string;
  gender: string;
  zone: string;
  recordedAt?: string;
}

interface Store {
  ballots: Record<string, Record<string, Ballot>>;
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

const EMPTY: Store = { ballots: {} };
const MIN_SPLIT_N = 5;
const MAX_BALLOTS_PER_POLL = 8_000;

function storeFile(): string {
  if (process.env.VERCEL) {
    return path.join(tmpdir(), "naija2050-polls.json");
  }
  return path.join(process.cwd(), "data", "polls-runtime.json");
}

function respondentHash(clientId: string): string {
  return hashWithSecret(clientId, process.env.POLLS_EXPORT_SECRET ?? "");
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(storeFile(), "utf8");
    const parsed = JSON.parse(raw) as Store;
    return { ballots: parsed.ballots && typeof parsed.ballots === "object" ? parsed.ballots : {} };
  } catch {
    return { ballots: { ...EMPTY.ballots } };
  }
}

async function writeStore(store: Store): Promise<void> {
  const file = storeFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store), "utf8");
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
  const store = await readStore();
  const voted: Record<string, string> = {};
  const tallies: Record<string, PulsePollTally> = {};

  for (const poll of PULSE_POLLS) {
    const ballots = store.ballots[poll.id] ?? {};
    const mine = ballots[clientId];
    if (!mine) continue;
    voted[poll.id] = mine.optionId;
    tallies[poll.id] = tallyPoll(poll.id, ballots);
  }

  return { voted, tallies };
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

  const store = await readStore();
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
  await writeStore(store);
  return {
    optionId,
    tally: tallyPoll(pollId, current),
    first: true,
    row: toRow(pollId, clientId, ballot, poll),
  };
}

export async function listPulseBallotRows(): Promise<PulseBallotRow[]> {
  const store = await readStore();
  const rows: PulseBallotRow[] = [];
  for (const poll of PULSE_POLLS) {
    const ballots = store.ballots[poll.id] ?? {};
    for (const [clientId, ballot] of Object.entries(ballots)) {
      rows.push(toRow(poll.id, clientId, ballot, poll));
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
