import { isValidClientId } from "@/lib/projects";
import {
  isPulseAge,
  isPulseGender,
  isPulseOptionId,
  isPulsePollId,
  isPulseZone,
} from "@/content/polls";

export const POLL_CLIENT_KEY = "naija2050-poll-client";
export const POLL_PROFILE_KEY = "naija2050-poll-profile";

export interface PulseProfile {
  age: string;
  gender: string;
  zone: string;
}

export interface PulseOptionTally {
  id: string;
  count: number;
}

export interface PulseSplitRow {
  key: string;
  label: string;
  n: number;
  options: PulseOptionTally[];
}

export interface PulsePollTally {
  n: number;
  options: PulseOptionTally[];
  byZone: PulseSplitRow[];
}

export function isPulseProfile(value: unknown): value is PulseProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as PulseProfile;
  return isPulseAge(profile.age) && isPulseGender(profile.gender) && isPulseZone(profile.zone);
}

export function readPulseClientId(): string {
  const existing = localStorage.getItem(POLL_CLIENT_KEY);
  if (existing && isValidClientId(existing)) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(POLL_CLIENT_KEY, id);
  return id;
}

export function readPulseProfile(): PulseProfile | null {
  try {
    const raw = localStorage.getItem(POLL_PROFILE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isPulseProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writePulseProfile(profile: PulseProfile): void {
  localStorage.setItem(POLL_PROFILE_KEY, JSON.stringify(profile));
}

export function isValidPulseBallot(
  clientId: string,
  pollId: string,
  optionId: string,
  profile: PulseProfile,
): boolean {
  return (
    isValidClientId(clientId) &&
    isPulsePollId(pollId) &&
    isPulseOptionId(pollId, optionId) &&
    isPulseProfile(profile)
  );
}
