"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { IconCheck, IconShare2 } from "@tabler/icons-react";
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
  pollsInCategory,
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

type ShareContext = "result" | "empty" | "round" | "pool";

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
  const resultRef = useRef<HTMLDivElement>(null);
  const trackedRound = useRef(false);
  const trackedPool = useRef(false);
  const trackedGeo = useRef(false);
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
  const categoryProgress = useMemo(
    () =>
      PULSE_CATEGORIES.map((category) => {
        const inCategory = pollsInCategory(category.id);
        const unlockedCount = inCategory.filter((poll) => Boolean(voted[poll.id])).length;
        return {
          id: category.id,
          label: category.wheel,
          unlocked: unlockedCount,
          total: inCategory.length,
        };
      }),
    [voted],
  );
  const active = PULSE_POLLS.find((poll) => poll.id === activeId) ?? null;
  const roundDone = session.length > 0 && sessionOpen.length === 0;
  const poolDone = unanswered.length === 0;
  const unlockedCount = Object.keys(voted).filter((id) => Boolean(tallies[id])).length;
  const answeredThisRound = session.filter((poll) => voted[poll.id]).length;

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
            // Server alone decides country; without a payload, stay closed.
            setEligible(false);
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
        // Network blip: show the gate; POST still enforces Nigeria-only.
        setEligible(true);
      })
      .finally(() => setVotedReady(true));
  }, [mounted]);

  useEffect(() => {
    if (eligible !== false || trackedGeo.current) return;
    trackedGeo.current = true;
    trackEvent({ name: "pulse_geo_blocked" });
  }, [eligible]);

  const beginRound = useCallback((currentVoted: Record<string, string>) => {
    setSession(pickPulseSession(currentVoted));
    setActiveId(null);
    setRotation(0);
    setSpinning(false);
    trackedRound.current = false;
  }, []);

  useEffect(() => {
    if (!votedReady || eligible === false) return;
    beginRound(votedRef.current);
  }, [votedReady, eligible, beginRound]);

  useEffect(() => {
    if (!roundDone || poolDone || trackedRound.current || session.length === 0) return;
    trackedRound.current = true;
    trackEvent({ name: "pulse_round_complete", answered: session.length });
  }, [poolDone, roundDone, session.length]);

  useEffect(() => {
    if (!poolDone || !profile || trackedPool.current) return;
    trackedPool.current = true;
    trackEvent({ name: "pulse_pool_complete" });
  }, [poolDone, profile]);

  const landOn = useCallback((poll: PulsePoll) => {
    setActiveId(poll.id);
    setSpinning(false);
    trackEvent({ name: "pulse_spin", pollId: poll.id });
  }, []);

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
        setError(data.message ?? PULSE_META.saveError);
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
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: animate ? "smooth" : "auto", block: "nearest" });
      }, 50);
    } catch {
      setError(PULSE_META.saveError);
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
            {PULSE_META.outsideLinks.map((link) => (
              <LinkButton key={link.href} href={link.href} variant="link">
                {link.label}
              </LinkButton>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const unlocked =
    profile
      ? PULSE_POLLS.filter((poll) => Boolean(voted[poll.id] && tallies[poll.id]))
      : [];
  const listed = roundDone || poolDone ? unlocked : unlocked.filter((poll) => poll.id !== activeId);
  const activeAnswered = Boolean(active && voted[active.id] && tallies[active.id]);

  return (
    <div className="flex flex-col gap-10">
      {profile ? (
        <ProgressBoard
          answeredThisRound={answeredThisRound}
          roundSize={session.length || PULSE_SESSION_SIZE}
          unlockedCount={unlockedCount}
          poolSize={PULSE_POLLS.length}
          remainingRound={sessionOpen.length}
          remainingPool={unanswered.length}
          categories={categoryProgress}
        />
      ) : null}

      {!profile ? (
        <ProfileGate
          onSave={(next) => {
            writePulseProfile(next);
            setProfile(next);
            trackEvent({ name: "pulse_profile_unlock" });
          }}
        />
      ) : !votedReady ? (
        <div className="min-h-[24rem] rounded-xl border border-border bg-card" aria-hidden />
      ) : poolDone ? (
        <Card className="border-accent/40 p-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
            {PULSE_META.poolCompleteEyebrow}
          </p>
          <p className="mt-2 font-serif text-xl font-bold">{PULSE_META.poolCompleteTitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.poolCompleteLead}</p>
          <div className="mt-5">
            <SharePulseButton context="pool" />
          </div>
        </Card>
      ) : roundDone ? (
        <Card className="border-accent/40 p-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
            {PULSE_META.roundCompleteEyebrow}
          </p>
          <p className="mt-2 font-serif text-xl font-bold">
            {PULSE_META.roundCompleteTitle(session.length)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {PULSE_META.roundCompleteLead}{" "}
            <span className="font-medium text-foreground">
              {PULSE_META.stillLockedPool(unanswered.length)}
            </span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" onClick={handleNewRound}>
              {PULSE_META.drawAnother(Math.min(PULSE_SESSION_SIZE, unanswered.length))}
            </Button>
            <SharePulseButton context="round" variant="secondary" />
          </div>
        </Card>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-4">
            <PollWheel
              slices={wheelSlices}
              rotation={rotation}
              spinning={spinning}
              animate={animate}
              onSpin={handleSpin}
              disabled={sessionOpen.length === 0}
            />
            {sessionOpen.length > 0 ? (
              <p className="text-center text-xs text-muted-foreground">
                {PULSE_META.stillLockedRound(sessionOpen.length)}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-6">
            {activeAnswered && active && tallies[active.id] ? (
              <div ref={resultRef}>
                <ResultCard
                  poll={active}
                  tally={tallies[active.id]}
                  mine={voted[active.id]}
                  onSpinNext={sessionOpen.length > 0 ? handleSpin : undefined}
                  spinning={spinning}
                  remainingRound={sessionOpen.length}
                />
              </div>
            ) : active ? (
              <PollCard poll={active} saving={saving} onAnswer={handleAnswer} />
            ) : (
              <Card className="p-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
                  {PULSE_META.idleEyebrow}
                </p>
                <p className="mt-2 font-serif text-xl font-bold">{PULSE_META.idleTitle}</p>
                <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.idleLead}</p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  {PULSE_META.idleWaiting(sessionOpen.length, session.length)}
                </p>
                <Button type="button" className="mt-5" onClick={handleSpin} disabled={spinning}>
                  {PULSE_META.spinWheel}
                </Button>
              </Card>
            )}
            {openCategories.length > 0 ? (
              <CategoryPicker
                categories={openCategories}
                spinning={spinning}
                onChoose={handleChooseCategory}
              />
            ) : null}
          </div>
        </div>
      )}

      {error ? <p className="text-sm text-foreground">{error}</p> : null}

      {listed.length > 0 ? (
        <UnlockedResults
          listed={listed}
          tallies={tallies}
          voted={voted}
          unlockedCount={unlockedCount}
          poolSize={PULSE_POLLS.length}
          defaultOpen={roundDone || poolDone}
        />
      ) : profile && unlockedCount === 0 ? (
        <Card className="border-dashed p-5">
          <p className="text-sm text-muted-foreground">{PULSE_META.noChartsYet}</p>
        </Card>
      ) : null}
    </div>
  );
}

function ProgressBoard({
  answeredThisRound,
  roundSize,
  unlockedCount,
  poolSize,
  remainingRound,
  remainingPool,
  categories,
}: {
  answeredThisRound: number;
  roundSize: number;
  unlockedCount: number;
  poolSize: number;
  remainingRound: number;
  remainingPool: number;
  categories: { id: string; label: string; unlocked: number; total: number }[];
}) {
  const [open, setOpen] = useState(false);
  const roundPct = roundSize ? Math.round((answeredThisRound / roundSize) * 100) : 0;
  const poolPct = poolSize ? Math.round((unlockedCount / poolSize) * 100) : 0;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
            {PULSE_META.progressTitle}
          </p>
          <p className="mt-1 text-sm text-foreground">
            <span className="font-semibold text-accent">
              {PULSE_META.progressRound(answeredThisRound, roundSize)}
            </span>
            {remainingRound > 0 ? (
              <>
                {" "}
                · <span className="font-medium">{PULSE_META.progressLocked(remainingRound)}</span>
              </>
            ) : null}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {PULSE_META.progressPool(unlockedCount, poolSize)}
          </span>
          {remainingPool > 0 ? PULSE_META.progressWaiting(remainingPool) : ""}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-3 px-0"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? PULSE_META.progressHideDetails : PULSE_META.progressShowDetails}
      </Button>

      {open ? (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ProgressMeter label={PULSE_META.meterRound} value={roundPct} />
            <ProgressMeter label={PULSE_META.meterPool} value={poolPct} />
          </div>

          <div className="flex flex-wrap gap-1.5" aria-label={PULSE_META.categoryStatusAria}>
            {categories.map((category) => {
              const done = category.unlocked === category.total;
              const started = category.unlocked > 0;
              return (
                <span
                  key={category.id}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-widest",
                    done
                      ? "border-accent bg-accent/15 text-accent"
                      : started
                        ? "border-accent/50 text-foreground"
                        : "border-border text-muted-foreground",
                  )}
                >
                  {category.label} {category.unlocked}/{category.total}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function CategoryPicker({
  categories,
  spinning,
  onChoose,
}: {
  categories: { id: PulseCategoryId; wheel: string }[];
  spinning: boolean;
  onChoose: (id: PulseCategoryId) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-0"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? PULSE_META.claimCategoryHide : PULSE_META.claimCategoryToggle}
      </Button>
      {open ? (
        <div className="mt-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
            {PULSE_META.claimCategory}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                type="button"
                variant="secondary"
                size="sm"
                disabled={spinning}
                onClick={() => {
                  setOpen(false);
                  onChoose(category.id);
                }}
              >
                {category.wheel}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function UnlockedResults({
  listed,
  tallies,
  voted,
  unlockedCount,
  poolSize,
  defaultOpen,
}: {
  listed: PulsePoll[];
  tallies: Record<string, PulsePollTally>;
  voted: Record<string, string>;
  unlockedCount: number;
  poolSize: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  return (
    <section className="flex flex-col gap-4" aria-label={PULSE_META.unlockedResultsAria}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">{PULSE_META.resultsTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {PULSE_META.resultsLead(unlockedCount, poolSize)}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? PULSE_META.resultsHide : PULSE_META.resultsShow(listed.length)}
        </Button>
      </div>
      {open
        ? listed.map((poll) => {
            const tally = tallies[poll.id];
            const mine = voted[poll.id];
            if (!tally || !mine) return null;
            return <ResultCard key={poll.id} poll={poll} tally={tally} mine={mine} />;
          })
        : null}
    </section>
  );
}

function ProgressMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

function SharePulseButton({
  context,
  variant = "secondary",
}: {
  context: ShareContext;
  variant?: "primary" | "secondary";
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/pulse` : "/pulse";
    trackEvent({ name: "pulse_share", context });
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: PULSE_META.name, text: PULSE_META.shareText, url });
        return;
      }
      await navigator.clipboard.writeText(`${PULSE_META.shareText}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        // User canceled share or clipboard blocked.
      }
    }
  };

  return (
    <Button type="button" variant={variant} onClick={share}>
      {copied ? (
        <>
          <IconCheck className="size-4" stroke={1.5} aria-hidden />
          {PULSE_META.shareCopied}
        </>
      ) : (
        <>
          <IconShare2 className="size-4" stroke={1.5} aria-hidden />
          {PULSE_META.shareLabel}
        </>
      )}
    </Button>
  );
}

type ProfileStep = "intro" | "adult" | "age" | "gender" | "zone";

const PROFILE_STEPS: ProfileStep[] = ["intro", "adult", "age", "gender", "zone"];

function ProfileGate({ onSave }: { onSave: (profile: PulseProfile) => void }) {
  const [step, setStep] = useState<ProfileStep>("intro");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [zone, setZone] = useState("");
  const [adult, setAdult] = useState(false);
  const stepIndex = PROFILE_STEPS.indexOf(step) + 1;
  const ready = adult && isPulseProfile({ age, gender, zone });

  const goBack = () => {
    const index = PROFILE_STEPS.indexOf(step);
    if (index > 0) setStep(PROFILE_STEPS[index - 1]!);
  };

  const goNext = () => {
    const index = PROFILE_STEPS.indexOf(step);
    if (index < PROFILE_STEPS.length - 1) setStep(PROFILE_STEPS[index + 1]!);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
          {PULSE_META.profileEyebrow}
        </p>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {PULSE_META.profileStep(stepIndex, PROFILE_STEPS.length)}
        </p>
      </div>

      {step === "intro" ? (
        <>
          <h2 className="mt-2 font-serif text-2xl font-bold">{PULSE_META.profileTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.profileLead}</p>
          <ul className="mt-4 space-y-2">
            {PULSE_META.profileBenefits.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Button type="button" className="mt-6" onClick={goNext}>
            {PULSE_META.profileStart}
          </Button>
        </>
      ) : null}

      {step === "adult" ? (
        <>
          <h2 className="mt-2 font-serif text-2xl font-bold">{PULSE_META.adultTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.adultLead}</p>
          <label className="mt-5 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={adult}
              onChange={(event) => setAdult(event.target.checked)}
              className="mt-1 size-4 accent-[var(--accent)]"
            />
            <span>{PULSE_META.adultConfirm(PULSE_MIN_AGE)}</span>
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={goBack}>
              {PULSE_META.profileBack}
            </Button>
            <Button type="button" disabled={!adult} onClick={goNext}>
              {PULSE_META.profileContinue}
            </Button>
          </div>
        </>
      ) : null}

      {step === "age" ? (
        <>
          <h2 className="mt-2 font-serif text-2xl font-bold">{PULSE_META.ageLegend}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.ageLead}</p>
          <ChoiceField
            legend={PULSE_META.ageLegend}
            choices={PULSE_AGES}
            value={age}
            hideLegend
            onChange={(id) => {
              setAge(id);
              setStep("gender");
            }}
          />
          <div className="mt-6">
            <Button type="button" variant="secondary" onClick={goBack}>
              {PULSE_META.profileBack}
            </Button>
          </div>
        </>
      ) : null}

      {step === "gender" ? (
        <>
          <h2 className="mt-2 font-serif text-2xl font-bold">{PULSE_META.genderLegend}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.genderLead}</p>
          <ChoiceField
            legend={PULSE_META.genderLegend}
            choices={PULSE_GENDERS}
            value={gender}
            hideLegend
            onChange={(id) => {
              setGender(id);
              setStep("zone");
            }}
          />
          <div className="mt-6">
            <Button type="button" variant="secondary" onClick={goBack}>
              {PULSE_META.profileBack}
            </Button>
          </div>
        </>
      ) : null}

      {step === "zone" ? (
        <>
          <h2 className="mt-2 font-serif text-2xl font-bold">{PULSE_META.zoneLegend}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{PULSE_META.zoneLead}</p>
          <ChoiceField
            legend={PULSE_META.zoneLegend}
            choices={PULSE_ZONES}
            value={zone}
            hideLegend
            onChange={setZone}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={goBack}>
              {PULSE_META.profileBack}
            </Button>
            <Button
              type="button"
              disabled={!ready}
              onClick={() => {
                const next = { age, gender, zone };
                if (adult && isPulseProfile(next)) onSave(next);
              }}
            >
              {PULSE_META.unlockWheel}
            </Button>
          </div>
          {!ready ? (
            <p className="mt-3 text-xs text-muted-foreground">{PULSE_META.profileZoneIncomplete}</p>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}

function ChoiceField({
  legend,
  choices,
  value,
  onChange,
  hideLegend = false,
}: {
  legend: string;
  choices: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  hideLegend?: boolean;
}) {
  return (
    <fieldset className="mt-5">
      <legend
        className={cn(
          "text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground",
          hideLegend && "sr-only",
        )}
      >
        {legend}
      </legend>
      <div className={cn("flex flex-wrap gap-2", !hideLegend && "mt-2")}>
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
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    setShowChoices(false);
  }, [poll.id]);

  return (
    <Card className="p-6" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {getPulseWheelLabel(poll)}
        </p>
        <p className="rounded-md bg-accent/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
          {PULSE_META.chartLocked}
        </p>
      </div>
      <h2 className="mt-2 font-serif text-2xl font-bold">{poll.question}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{poll.hint}</p>
      {!showChoices ? (
        <Button type="button" className="mt-5" onClick={() => setShowChoices(true)}>
          {PULSE_META.revealChoices}
        </Button>
      ) : (
        <>
          <p className="mt-3 text-sm font-medium text-foreground">{PULSE_META.answerCtaHint}</p>
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
        </>
      )}
    </Card>
  );
}

function ZoneBreakdown({
  poll,
  rows,
}: {
  poll: PulsePoll;
  rows: PulsePollTally["byZone"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-border pt-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-0"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? PULSE_META.byZone : PULSE_META.byZoneShow}
      </Button>
      {open ? (
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {rows.map((row) => {
            const top = [...row.options].sort((a, b) => b.count - a.count)[0];
            const label =
              poll.options.find((option) => option.id === top?.id)?.label ?? PULSE_META.noLead;
            return (
              <li key={row.key} className="flex justify-between gap-3">
                <span>
                  {row.label} <span className="text-muted-foreground">n={row.n}</span>
                </span>
                <span className="text-right text-muted-foreground">{label}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function ResultCard({
  poll,
  tally,
  mine,
  onSpinNext,
  spinning,
  remainingRound,
}: {
  poll: PulsePoll;
  tally: PulsePollTally;
  mine: string;
  onSpinNext?: () => void;
  spinning?: boolean;
  remainingRound?: number;
}) {
  const n = tally.n;
  const max = Math.max(1, ...tally.options.map((row) => row.count));
  const note = n <= 1 ? PULSE_META.emptyChart : n < 5 ? PULSE_META.smallChart : null;
  const ranked = [...tally.options].sort((a, b) => b.count - a.count);
  const leader = ranked[0];
  const leaderLabel = poll.options.find((option) => option.id === leader?.id)?.label;
  const leaderPct = n && leader ? Math.round((leader.count / n) * 100) : 0;
  const mineIsLeader = leader?.id === mine;

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {getPulseWheelLabel(poll)}
        </p>
        <p className="rounded-md bg-accent/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
          {PULSE_META.chartUnlocked}
        </p>
      </div>
      <h3 className="mt-2 font-serif text-xl font-bold">{poll.question}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{PULSE_META.liveFrom(n)}</span>
      </p>
      {n >= 2 && leaderLabel ? (
        <p className="mt-3 rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-foreground">
          {PULSE_META.leadingAnswer}{" "}
          <span className="font-semibold">{leaderLabel}</span> · {leaderPct}%
          {mineIsLeader ? PULSE_META.includesYourPick : ""}
        </p>
      ) : null}
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
                      {PULSE_META.youLabel}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {count} · {pct}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {note ? <p className="mt-4 text-sm text-muted-foreground">{note}</p> : null}
      {tally.byZone.length > 0 ? <ZoneBreakdown poll={poll} rows={tally.byZone} /> : null}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-4">
        {onSpinNext ? (
          <Button type="button" onClick={onSpinNext} disabled={spinning}>
            {spinning ? PULSE_META.spinning : PULSE_META.spinNextLabel}
            {typeof remainingRound === "number" && remainingRound > 0
              ? PULSE_META.remainingLeft(remainingRound)
              : ""}
          </Button>
        ) : null}
        <SharePulseButton context={n <= 1 ? "empty" : "result"} variant="secondary" />
      </div>
    </Card>
  );
}
