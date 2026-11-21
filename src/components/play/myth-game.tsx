"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { getMyths } from "@/data/myths";
import { UI_COPY } from "@/data/translations";
import { shuffle } from "@/lib/blood";
import { updateProgress } from "@/lib/progress-store";
import { usePreferences } from "@/lib/use-preferences";
import { useProgress } from "@/lib/use-progress";
import type { MythItem } from "@/types";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Confetti } from "@/components/ui/confetti";
import { ProgressBar } from "@/components/ui/progress-bar";

type Phase = "intro" | "playing" | "finished";

export function MythGame() {
  const progress = useProgress();
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].play;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];
  const localizedDeckSource = getMyths(locale);
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("intro");
  const [deckIds, setDeckIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"fact" | "myth" | null>(
    null
  );

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-180, 0, 180], [-9, 0, 9]);
  const factBadgeOpacity = useTransform(dragX, [20, 100], [0, 1]);
  const mythBadgeOpacity = useTransform(dragX, [-100, -20], [1, 0]);
  const rightGlowOpacity = useTransform(dragX, [20, 130], [0, 0.35]);
  const leftGlowOpacity = useTransform(dragX, [-130, -20], [0.35, 0]);
  const rightShadow = useMotionTemplate`0 0 0 2px rgba(16, 185, 129, ${rightGlowOpacity})`;
  const leftShadow = useMotionTemplate`0 0 0 2px rgba(225, 29, 72, ${leftGlowOpacity})`;

  const deck: MythItem[] = deckIds
    .map((id) => localizedDeckSource.find((m) => m.id === id))
    .filter((item): item is MythItem => Boolean(item));

  const current = deck[index];
  const nextOne = deck[index + 1];
  const nextTwo = deck[index + 2];

  function startRound() {
    const pickedIds = shuffle(localizedDeckSource)
      .slice(0, 10)
      .map((item) => item.id);
    dragX.set(0);
    setDeckIds(pickedIds);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setPhase("playing");
  }

  function handleAnswer(choice: "fact" | "myth") {
    if (!current || selectedAnswer !== null) return;
    const isCorrect = choice === current.answer;
    setSelectedAnswer(choice);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    dragX.set(0);
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (selectedAnswer !== null) return;
    if (info.offset.x > 100) {
      handleAnswer("fact");
    } else if (info.offset.x < -100) {
      handleAnswer("myth");
    }
  }

  function handleNext() {
    dragX.set(0);
    if (index + 1 >= deck.length) {
      const finalScore = score;
      updateProgress((prev) => ({
        ...prev,
        stamps: {
          ...prev.stamps,
          mythBuster: true,
        },
        bestScore:
          prev.bestScore === null
            ? finalScore
            : Math.max(prev.bestScore, finalScore),
      }));
      setPhase("finished");
      return;
    }
    setIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  }

  function getScoreHeadline(s: number): string {
    if (s === 10) return copy.headlines.perfect;
    if (s >= 7) return copy.headlines.sharp;
    if (s >= 4) return copy.headlines.gettingThere;
    return copy.headlines.nowYouKnow;
  }

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blood-50/90 ring-1 ring-blood-200/70 dark:bg-blood-950/60 dark:ring-blood-500/25">
          <BrandLogo className="h-14 w-14" />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl dark:text-[#f5f2f0]">
          {copy.title}
        </h1>
        <p className="mx-auto mt-3 max-w-[44ch] text-base leading-relaxed text-stone-700 sm:text-lg dark:text-stone-300">
          {copy.introSub}
        </p>

        {progress.bestScore !== null && (
          <div className="mt-4 flex justify-center">
            <Chip variant="crimson">{copy.bestScore(progress.bestScore)}</Chip>
          </div>
        )}

        <div className="mt-7 flex justify-center">
          <Button onClick={startRound} className="w-full sm:w-auto">
            {copy.letsGo}
          </Button>
        </div>
      </Card>
    );
  }

  if (phase === "finished") {
    const circumference = 2 * Math.PI * 52;
    const strokeDashoffset = circumference * (1 - score / 10);

    return (
      <>
        <Confetti active={score >= 7} />
        <Card className="mx-auto max-w-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-[#f6f3ef] px-3 py-1 text-xs font-bold text-ink dark:border-[#2e2629] dark:bg-[#141112] dark:text-[#f5f2f0]">
            <BrandLogo className="h-6 w-6 shrink-0" />
            <span>{info.brand}</span>
          </div>
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                className="stroke-blood-100 dark:stroke-blood-950"
                strokeWidth="10"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e11d48"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-ink dark:text-stone-100">
                {score}
              </span>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {copy.outOfTen}
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-[#f5f2f0]">
            {getScoreHeadline(score)}
          </h1>
          <p className="mt-2 text-base text-stone-700 dark:text-stone-300">
            {copy.unlockedNote}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={startRound} variant="secondary">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {copy.playAgain}
            </Button>
            <Button href="/card">{copy.makeCard}</Button>
            <Button href="/learn" variant="ghost">
              {copy.learnMore}
            </Button>
          </div>
        </Card>
      </>
    );
  }

  if (!current) return null;

  const isCorrect = selectedAnswer === current.answer;
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="rounded-2xl border border-stone-200/85 bg-white px-4 py-3.5 shadow-2xs dark:border-[#2e2629] dark:bg-[#1c181a]">
        <div className="mb-2 flex items-center justify-between gap-2 text-sm font-bold text-stone-700 dark:text-stone-300">
          <span>
            {index + 1} / {deck.length}
          </span>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {streak >= 2 && (
                <motion.span
                  key={streak}
                  initial={reduced ? undefined : { scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-900 dark:bg-amber-950/80 dark:text-amber-200"
                >
                  {copy.streakLabel(streak)}
                </motion.span>
              )}
            </AnimatePresence>
            <span className="text-blood-700 dark:text-rose-300">
              {copy.scoreLabel(score)}
            </span>
          </div>
        </div>
        <ProgressBar
          value={index + (isAnswered ? 1 : 0)}
          max={deck.length}
          label="Quiz progress"
        />
      </div>

      {/* Stacked card deck container */}
      <div className="relative pb-5">
        {nextTwo && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-4 bottom-1 rounded-3xl border border-stone-200/80 bg-white/75 opacity-65 shadow-xs transition-transform dark:border-[#2e2629] dark:bg-[#1c181a]/60"
            style={{ transform: "scale(0.92) translateY(8px)" }}
          />
        )}
        {nextOne && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-2 top-2 bottom-3 rounded-3xl border border-stone-200/90 bg-white/92 opacity-85 shadow-sm transition-transform dark:border-[#2e2629] dark:bg-[#1c181a]/85"
            style={{ transform: "scale(0.96) translateY(4px)" }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            style={
              isAnswered
                ? undefined
                : {
                  x: dragX,
                  rotate,
                  boxShadow: undefined,
                }
            }
            drag={isAnswered ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.45}
            onDragEnd={handleDragEnd}
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }
            }
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className={`relative select-none overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_12px_34px_rgba(28,25,23,0.08)] sm:p-8 dark:bg-[#1c181a] dark:shadow-[0_14px_38px_rgba(0,0,0,0.45)] ${
              isAnswered
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-50/40 dark:border-emerald-500/60 dark:bg-emerald-950/20"
                  : "border-blood-400 bg-blood-50/40 dark:border-blood-500/60 dark:bg-blood-950/25"
                : "cursor-grab border-stone-200/90 active:cursor-grabbing dark:border-[#2e2629]"
            }`}
          >
            <BrandLogo
              variant="watermark"
              className="pointer-events-none absolute -bottom-8 -end-6 h-36 w-36 text-blood-700 opacity-[0.035] dark:text-rose-200 dark:opacity-[0.05]"
            />
            {!isAnswered && (
              <>
                <motion.div
                  aria-hidden="true"
                  style={{ boxShadow: leftShadow }}
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                />
                <motion.div
                  aria-hidden="true"
                  style={{ boxShadow: rightShadow }}
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                />
                <motion.span
                  style={{ opacity: mythBadgeOpacity }}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-4 left-4 rounded-full border border-blood-300 bg-blood-50 px-3 py-1 text-xs font-extrabold tracking-wide text-blood-700 uppercase dark:border-blood-500/40 dark:bg-blood-950 dark:text-rose-200"
                >
                  {copy.mythBtn}
                </motion.span>
                <motion.span
                  style={{ opacity: factBadgeOpacity }}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-4 right-4 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-extrabold tracking-wide text-emerald-700 uppercase dark:border-emerald-500/40 dark:bg-emerald-950 dark:text-emerald-200"
                >
                  {copy.factBtn}
                </motion.span>
              </>
            )}

            <p className="text-xs font-bold tracking-wide text-stone-500 uppercase sm:text-sm dark:text-stone-400">
              {copy.statementNum(index + 1)}
            </p>

            <h2 className="mt-3 text-xl font-bold leading-relaxed text-ink sm:text-2xl dark:text-[#f5f2f0]">
              {current.statement}
            </h2>

            {!isAnswered && (
              <p className="mt-6 text-xs font-medium text-stone-500 sm:text-sm dark:text-stone-400">
                {copy.swipeHint}
              </p>
            )}

            <div aria-live="polite" className="mt-5">
              {isAnswered && (
                <div
                  className={`rounded-2xl border p-4 ${isCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100"
                    : "border-blood-200 bg-blood-50 text-blood-950 dark:border-blood-500/30 dark:bg-blood-950/40 dark:text-rose-100"
                    }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold sm:text-sm ${isCorrect
                        ? "bg-emerald-600 text-white"
                        : "bg-blood-600 text-white"
                        }`}
                    >
                      {isCorrect ? copy.correct : copy.notQuite}
                    </span>
                    <span className="text-xs font-extrabold tracking-wide uppercase sm:text-sm">
                      {current.answer === "fact"
                        ? copy.itsFact
                        : copy.itsMyth}
                    </span>
                  </div>
                  <p className="mt-2.5 text-base leading-relaxed">
                    {current.explanation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!isAnswered ? (
        <div dir="ltr" className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => handleAnswer("myth")}
            className="h-14 text-base"
          >
            <XCircle aria-hidden="true" className="h-5 w-5" />
            {copy.mythBtn}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAnswer("fact")}
            className="h-14 text-base"
          >
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
            {copy.factBtn}
          </Button>
        </div>
      ) : (
        <Button onClick={handleNext} className="h-14 w-full text-base">
          {index + 1 >= deck.length ? copy.seeScore : copy.next}
        </Button>
      )}
    </div>
  );
}
