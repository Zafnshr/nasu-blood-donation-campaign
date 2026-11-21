"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { MYTHS } from "@/data/myths";
import { shuffle } from "@/lib/blood";
import { updateProgress } from "@/lib/progress-store";
import { useProgress } from "@/lib/use-progress";
import type { MythItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Confetti } from "@/components/ui/confetti";
import { ProgressBar } from "@/components/ui/progress-bar";

type Phase = "intro" | "playing" | "finished";

function getScoreHeadline(score: number): string {
  if (score === 10) return "Myth Destroyer! 🏆";
  if (score >= 7) return "Sharp mind! 🧠";
  if (score >= 4) return "Getting there! 💪";
  return "Now you know! 📚";
}

export function MythGame() {
  const progress = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<MythItem[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"fact" | "myth" | null>(
    null
  );

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-180, 0, 180], [-9, 0, 9]);
  const factBadgeOpacity = useTransform(dragX, [20, 110], [0, 1]);
  const mythBadgeOpacity = useTransform(dragX, [-110, -20], [1, 0]);

  const current = deck[index];

  function startRound() {
    const picked = shuffle(MYTHS).slice(0, 10);
    dragX.set(0);
    setDeck(picked);
    setIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setPhase("playing");
  }

  function handleAnswer(choice: "fact" | "myth") {
    if (!current || selectedAnswer !== null) return;
    const isCorrect = choice === current.answer;
    setSelectedAnswer(choice);
    if (isCorrect) {
      setScore((prev) => prev + 1);
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

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blood-50 text-blood-600">
          <Sparkles aria-hidden="true" className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Fact or Myth?
        </h1>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-stone-600 sm:text-base">
          10 statements. Swipe right for Fact, left for Myth, or just tap.
        </p>

        {progress.bestScore !== null && (
          <div className="mt-4 flex justify-center">
            <Chip variant="crimson">Best score: {progress.bestScore} / 10</Chip>
          </div>
        )}

        <div className="mt-7 flex justify-center">
          <Button onClick={startRound} className="w-full sm:w-auto">
            Let&apos;s go
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
          <div className="mx-auto relative flex h-32 w-32 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#ffe4e6"
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
              <span className="text-3xl font-extrabold text-ink">{score}</span>
              <span className="text-xs font-semibold text-stone-500">
                out of 10
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {getScoreHeadline(score)}
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            You earned the <strong className="text-blood-700">Myth Buster</strong>{" "}
            stamp!
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={startRound} variant="secondary">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Play again
            </Button>
            <Button href="/card">Make my donor card</Button>
            <Button href="/learn" variant="ghost">
              Learn more
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
      <div className="rounded-2xl border border-blood-100/80 bg-white px-4 py-3 shadow-2xs">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-stone-600">
          <span>
            {index + 1} / {deck.length}
          </span>
          <span className="text-blood-700">Score: {score}</span>
        </div>
        <ProgressBar
          value={index + (isAnswered ? 1 : 0)}
          max={deck.length}
          label="Quiz progress"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          style={isAnswered ? undefined : { x: dragX, rotate }}
          drag={isAnswered ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.45}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`relative select-none rounded-3xl border bg-white p-6 shadow-[0_12px_34px_rgba(76,5,25,0.08)] sm:p-8 ${
            isAnswered
              ? isCorrect
                ? "border-emerald-300 bg-emerald-50/30"
                : "border-blood-300 bg-blood-50/30"
              : "cursor-grab border-blood-100 active:cursor-grabbing"
          }`}
        >
          {!isAnswered && (
            <>
              <motion.span
                style={{ opacity: mythBadgeOpacity }}
                aria-hidden="true"
                className="pointer-events-none absolute top-4 left-4 rounded-full border border-blood-300 bg-blood-50 px-3 py-1 text-xs font-extrabold tracking-wide text-blood-700 uppercase"
              >
                Myth
              </motion.span>
              <motion.span
                style={{ opacity: factBadgeOpacity }}
                aria-hidden="true"
                className="pointer-events-none absolute top-4 right-4 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-extrabold tracking-wide text-emerald-700 uppercase"
              >
                Fact
              </motion.span>
            </>
          )}

          <p className="text-xs font-bold tracking-wide text-stone-400 uppercase">
            Statement {index + 1}
          </p>

          <h2 className="mt-3 text-xl font-bold leading-snug text-ink sm:text-2xl">
            {current.statement}
          </h2>

          {!isAnswered && (
            <p className="mt-6 text-xs font-medium text-stone-400">
              Swipe left for Myth · Swipe right for Fact · Or tap below
            </p>
          )}

          <div aria-live="polite" className="mt-5">
            {isAnswered && (
              <div
                className={`rounded-2xl border p-4 ${
                  isCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                    : "border-blood-200 bg-blood-50 text-blood-950"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      isCorrect
                        ? "bg-emerald-600 text-white"
                        : "bg-blood-600 text-white"
                    }`}
                  >
                    {isCorrect ? "Correct!" : "Not quite"}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wide">
                    It&apos;s a {current.answer.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  {current.explanation}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {!isAnswered ? (
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => handleAnswer("myth")}
            className="h-14 text-base"
          >
            <XCircle aria-hidden="true" className="h-5 w-5" />
            Myth
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAnswer("fact")}
            className="h-14 text-base"
          >
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
            Fact
          </Button>
        </div>
      ) : (
        <Button onClick={handleNext} className="h-14 w-full text-base">
          {index + 1 >= deck.length ? "See my score" : "Next"}
        </Button>
      )}
    </div>
  );
}
