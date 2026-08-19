"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PollWheel } from "@/components/pulse/PollWheel";
import { useDataSaver } from "@/components/providers/DataSaverProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  PULSE_AGES,
  PULSE_CATEGORIES,
  PULSE_GENDERS,
  PULSE_META,
  PULSE_MIN_AGE,
  PULSE_POLLS,
  PULSE_SESSION_SIZE,
  PULSE_ZONES,
  getPulseWheelLabel,
  pickPulseSession,
  unansweredPulsePolls,
  type PulseCategoryId,
  type PulsePoll,
} from "@/content/polls";
import { useMounted } from "@/hooks/useMounted";
import { trackEvent } from "@/lib/analytics";
import {
  isPulseProfile,
  readPulseClientId,
  readPulseProfile,
  unlockedPulseTallies,
  writePulseProfile,
  type PulsePollTally,
  type PulseProfile,
} from "@/lib/polls";
import { cn } from "@/lib/utils";

const SPIN_MS = 4600;

export function StreetPulse() {
  const mounted = useMounted();
  const { enabled: dataSaver } = useDataSaver();
  const reducedMotion = useReducedMotion();
  const animate = !dataSaver && reducedMotion !== true;

  const [clientId, setClientId] = useState("");
  const [profile, setProfile] = useState<PulseProfile | null>(null);
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [tallies, setTallies] = useState<Record<string, PulsePollTally>>({});
  const [session, setSession] = useState<PulsePoll[]>([]);
  const [votedReady, setVotedReady] = useState(false);
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinFrame = useRef<number | null>(null);
  const votedRef = useRef(voted);
  votedRef.current = voted;

  const unanswered = useMemo(() => unansweredPulsePolls(voted), [voted]);
  const sessionOpen = useMemo(
    () => session.filter((poll) => !voted[poll.id]),
    [session, voted],
  );
  const openCategories = useMemo(() => {
    const ids = new Set(sessionOpen.map((poll) => poll.category));
    return PULSE_CATEGORIES.filter((category) => ids.has(category.id));
  }, [sessionOpen]);
  const wheelSlices = useMemo(
    () => session.map((poll) => ({ id: poll.id, label: getPulseWheelLabel(poll) })),
    [session],
  );
  const active = PULSE_POLLS.find((poll) => poll.id === activeId) ?? null;
  const roundDone = session.length > 0 && sessionOpen.length === 0;
  const poolDone = unanswered.length === 0;

  useEffect(() => {
    if (!mounted) return;
    const id = readPulseClientId();
    setClientId(id);
    setProfile(readPulseProfile());

    fetch(`/api/polls?clientId=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then(
        (data: {
          ok?: boolean;
          eligible?: boolean;
          voted?: Record<string, string>;
          tallies?: Record<string, PulsePollTally>;
        }) => {
          if (!data.ok) {
            setEligible(true);
            return;
          }
          setEligible(data.eligible !== false);
          if (data.eligible === false) return;
          const nextVoted = data.voted ?? {};
          setVoted(nextVoted);
          setTallies(unlockedPulseTallies(nextVoted, data.tallies ?? {}));
        },
      )
      .catch(() => {
        setEligible(true);
        // Local profile still works if the tally is down.
      })
      .finally(() => setVotedReady(true));
  }, [mounted]);

  const beginRound = useCallback((currentVoted: Record<string, string>) => {
    setSession(pickPulseSession(currentVoted));
    setActiveId(null);
    setRotation(0);
    setSpinning(false);
  }, []);

  useEffect(() => {
    if (!votedReady || eligible === false) return;
    beginRound(votedRef.current);
  }, [votedReady, eligible, beginRound]);

  const landOn = useCallback(
    (poll: PulsePoll) => {
      setActiveId(poll.id);
      setSpinning(false);
      trackEvent({ name: "pulse_spin", pollId: poll.id });
    },
    [],
  );

  const spinTo = useCallback(
    (poll: PulsePoll) => {
      const count = Math.max(session.length, 1);
      const slice = 360 / count;
      const index = Math.max(0, session.findIndex((item) => item.id === poll.id));
      const extra = 5 + Math.floor(Math.random() * 4);
      const landing = extra * 360 - (index * slice + slice / 2);
      const base = Math.ceil(rotation / 360) * 360;
      const nextRotation = base + landing;

      setError("");

      if (!animate) {
        setRotation(nextRotation);
        landOn(poll);
        return;
      }

      setSpinning(true);
      if (spinTimer.current) clearTimeout(spinTimer.current);
      if (spinFrame.current) cancelAnimationFrame(spinFrame.current);

      // Paint the current angle with transition on, then change rotation next frame.
      spinFrame.current = requestAnimationFrame(() => {
        spinFrame.current = requestAnimationFrame(() => {
          setRotation(nextRotation);
        });
      });
      spinTimer.current = setTimeout(() => landOn(poll), SPIN_MS);
    },
    [animate, landOn, rotation, session],
  );

  useEffect(() => {
    return () => {
      if (spinTimer.current) clearTimeout(spinTimer.current);
      if (spinFrame.current) cancelAnimationFrame(spinFrame.current);
    };
  }, []);

  const handleSpin = () => {
    if (spinning || sessionOpen.length === 0) return;
    const poll = sessionOpen[Math.floor(Math.random() * sessionOpen.length)];
    spinTo(poll);
  };

  const handleChooseCategory = (categoryId: PulseCategoryId) => {
    if (spinning) return;
    const open = sessionOpen.filter((poll) => poll.category === categoryId);
    const poll = open[Math.floor(Math.random() * open.length)];
    if (poll) spinTo(poll);
  };

  const handleNewRound = () => {
    beginRound(voted);
  };

  const handleAnswer = async (optionId: string) => {
    if (!active || !profile || saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          pollId: active.id,
          optionId,
          age: profile.age,
          gender: profile.gender,
          zone: profile.zone,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        optionId?: string;
        tally?: PulsePollTally;
        message?: string;
      };
      if (!response.ok || !data.ok || !data.optionId || !data.tally) {
        setError(data.message ?? "Could not save that answer. Try again.");
        return;
      }
      setVoted((current) => ({ ...current, [active.id]: data.optionId! }));
      setTallies((current) =>
        unlockedPulseTallies(
          { ...votedRef.current, [active.id]: data.optionId! },
          { ...current, [active.id]: data.tally! },
        ),
      );
      trackEvent({ name: "pulse_answer", pollId: active.id });
    } catch {
      setError("Could not save that answer. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || eligible === null) {
    return <div className="min-h-[24rem] rounded-xl border border-border bg-card" aria-hidden />;
  }

  if (eligible === false) {
    return (
      <div className="flex flex-col gap-10">
        <Card className="p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold">{PULSE_META.outsideTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{PULSE_META.outsideLead}</p>
          <p className="mt-3 text-sm text-muted-foreground">{PULSE_META.outsideHint}</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            <LinkButton href="/sectors" variant="link">
              Sector visions
            </LinkButton>
            <LinkButton href="/timeline" variant="link">
              Timeline
            </LinkButton>
            <LinkButton href="/projects" variant="link">
              Cool Projects
            </LinkButton>
          </div>
        </Card>
        <PulseFinePrint />
      </div>
    );
  }

  const unlocked =
    profile
      ? PULSE_POLLS.filter((poll) => Boolean(voted[poll.id] && tallies[poll.id]))
      : [];
  const listed = roundDone || poolDone ? unlocked : unlocked.filter((poll) => poll.id !== activeId);
  const answeredThisRound = session.filter((poll) => voted[poll.id]).length;

  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm text-muted-foreground">
        {session.length} questions this round ({answeredThisRound} answered). Refresh the page
        for a new draw from the remaining pool
        {unanswered.length ? ` (${unanswered.length} left)` : ""}.
      </p>

      {!profile ? (
        <ProfileGate
          onSave={(next) => {
            writePulseProfile(next);
            setProfile(next);
          }}
        />
      ) : !votedReady ? (
        <div className="min-h-[24rem] rounded-xl border border-border bg-card" aria-hidden />
      ) : poolDone ? (
            <Card className="p-6">
              <p className="font-serif text-xl font-bold">You unlocked the full pool</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The charts below are the live tally from this browser and everyone else who
                drew that question.
              </p>
            </Card>
          ) : roundDone ? (
            <Card className="p-6">
              <p className="font-serif text-xl font-bold">
                Round complete ({session.length} questions)
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Refresh the page for a new round of {PULSE_SESSION_SIZE} from the questions you
                have not answered yet. {unanswered.length} remain in the pool.
              </p>
              <Button type="button" className="mt-5" onClick={handleNewRound}>
                Draw another {Math.min(PULSE_SESSION_SIZE, unanswered.length)}
              </Button>
            </Card>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
              <PollWheel
                slices={wheelSlices}
                rotation={rotation}
                spinning={spinning}
                animate={animate}
                onSpin={handleSpin}
                disabled={sessionOpen.length === 0}
              />
              <div className="flex flex-col gap-6">
                {active && voted[active.id] && tallies[active.id] ? (
                  <ResultCard
                    poll={active}
                    tally={tallies[active.id]}
                    mine={voted[active.id]}
                  />
                ) : active ? (
                  <PollCard
                    poll={active}
                    saving={saving}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <Card className="p-6">
                    <p className="font-serif text-xl font-bold">Draw a question</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This round has {session.length} questions. Spin to land on one you have
                      not answered yet.
                    </p>
                  </Card>
                )}
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    Or choose a category
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {openCategories.map((category) => (
                      <Button
                        key={category.id}
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={spinning}
                        onClick={() => handleChooseCategory(category.id)}
                      >
                        {category.wheel}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

      {error ? <p className="text-sm text-foreground">{error}</p> : null}

      {listed.length > 0 ? (
        <section className="flex flex-col gap-6" aria-label="Unlocked results">
          <h2 className="text-xl font-bold">What others answered</h2>
          {listed.map((poll) => {
            const tally = tallies[poll.id];
            const mine = voted[poll.id];
            if (!tally || !mine) return null;
            return (
              <ResultCard
                key={poll.id}
                poll={poll}
                tally={tally}
                mine={mine}
              />
            );
          })}
        </section>
      ) : null}

      <PulseFinePrint />
    </div>
  );
}

function PulseFinePrint() {
  return (
    <Card className="border-dashed p-6">
      <p className="text-sm text-muted-foreground">{PULSE_META.researchNote}</p>
      <p className="mt-3">
        <LinkButton href="/privacy" variant="link">
          Privacy Policy
        </LinkButton>
      </p>
    </Card>
  );
}

function ProfileGate({ onSave }: { onSave: (profile: PulseProfile) => void }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [zone, setZone] = useState("");
  const [adult, setAdult] = useState(false);
  const ready = adult && isPulseProfile({ age, gender, zone });

  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-bold">Before the wheel</h2>
      <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.profileLead}</p>
      <label className="mt-5 flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={adult}
          onChange={(event) => setAdult(event.target.checked)}
          className="mt-1 size-4 accent-[var(--accent)]"
        />
        <span>I am {PULSE_MIN_AGE} or older</span>
      </label>
      <ChoiceField legend="Age band" choices={PULSE_AGES} value={age} onChange={setAge} />
      <ChoiceField legend="Gender" choices={PULSE_GENDERS} value={gender} onChange={setGender} />
      <ChoiceField legend="Where you live" choices={PULSE_ZONES} value={zone} onChange={setZone} />
      <Button
        type="button"
        className="mt-6"
        disabled={!ready}
        onClick={() => {
          const next = { age, gender, zone };
          if (adult && isPulseProfile(next)) onSave(next);
        }}
      >
        Unlock the wheel
      </Button>
    </Card>
  );
}

function ChoiceField({
  legend,
  choices,
  value,
  onChange,
}: {
  legend: string;
  choices: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onChange(choice.id)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition",
              value === choice.id
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-foreground",
            )}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PollCard({
  poll,
  saving,
  onAnswer,
}: {
  poll: PulsePoll;
  saving: boolean;
  onAnswer: (optionId: string) => void;
}) {
  return (
    <Card className="p-6" aria-live="polite">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {getPulseWheelLabel(poll)}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-bold">{poll.question}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{poll.hint}</p>
      <div className="mt-5 grid gap-2">
        {poll.options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={saving}
            onClick={() => onAnswer(option.id)}
            className="rounded-lg border border-border px-4 py-3 text-left text-sm transition hover:border-accent hover:bg-surface-elevated disabled:opacity-50"
          >
            {option.label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function ResultCard({
  poll,
  tally,
  mine,
}: {
  poll: PulsePoll;
  tally: PulsePollTally;
  mine: string;
}) {
  const n = tally.n;
  const max = Math.max(1, ...tally.options.map((row) => row.count));
  const note = n <= 1 ? PULSE_META.emptyChart : n < 5 ? PULSE_META.smallChart : null;

  return (
    <Card className="p-6">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {getPulseWheelLabel(poll)}
      </p>
      <h3 className="mt-2 font-serif text-xl font-bold">{poll.question}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {n} {n === 1 ? "answer" : "answers"} so far. Live count from this site.
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {poll.options.map((option) => {
          const count = tally.options.find((row) => row.id === option.id)?.count ?? 0;
          const pct = n ? Math.round((count / n) * 100) : 0;
          const width = (count / max) * 100;
          const isMine = option.id === mine;
          return (
            <li key={option.id}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span>
                  {option.label}
                  {isMine ? (
                    <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                      You
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {count} · {pct}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {note ? <p className="mt-4 text-sm text-muted-foreground">{note}</p> : null}
      {tally.byZone.length > 0 ? (
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
            By zone (5 or more answers)
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {tally.byZone.map((row) => {
              const top = [...row.options].sort((a, b) => b.count - a.count)[0];
              const label = poll.options.find((option) => option.id === top?.id)?.label ?? "No lead";
              return (
                <li key={row.key} className="flex justify-between gap-3">
                  <span>
                    {row.label}{" "}
                    <span className="text-muted-foreground">n={row.n}</span>
                  </span>
                  <span className="text-right text-muted-foreground">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
