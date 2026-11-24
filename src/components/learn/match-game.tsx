"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { UI_COPY } from "@/data/translations";
import {
  BLOOD_TYPES,
  canGiveRedCells,
  describeRedCellCompatibility,
  formatBloodType,
  redCellDonors,
  shuffle,
} from "@/lib/blood";
import { awardStamp } from "@/lib/progress-store";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import type { BloodType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Confetti } from "@/components/ui/confetti";
import { ProgressBar } from "@/components/ui/progress-bar";

interface MatchRound {
  patient: BloodType;
  correctDonor: BloodType;
  options: BloodType[];
}

function generateRounds(): MatchRound[] {
  const eligiblePatients = BLOOD_TYPES.filter((t) => t !== "AB+");
  const pickedPatients = shuffle(eligiblePatients).slice(0, 5);

  return pickedPatients.map((patient) => {
    const compatible = shuffle(redCellDonors(patient));
    const incompatible = shuffle(
      BLOOD_TYPES.filter((donor) => !canGiveRedCells(donor, patient))
    );
    const correctDonor = compatible[0];
    const distractors = incompatible.slice(0, 3);
    const options = shuffle([correctDonor, ...distractors]);
    return {
      patient,
      correctDonor,
      options,
    };
  });
}

type Phase = "intro" | "playing" | "finished";

export function MatchGame() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.matchGame;

  const [phase, setPhase] = useState<Phase>("intro");
  const [rounds, setRounds] = useState<MatchRound[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<BloodType | null>(null);

  const current = rounds[index];

  function startGame() {
    trackEvent("match_game_start", { is_replay: phase === "finished" });
    setRounds(generateRounds());
    setIndex(0);
    setScore(0);
    setPicked(null);
    setPhase("playing");
  }

  function chooseDonor(option: BloodType) {
    if (!current || picked !== null) return;
    setPicked(option);
    if (option === current.correctDonor) {
      setScore((prev) => prev + 1);
    }
  }

  function nextRound() {
    if (index + 1 >= rounds.length) {
      awardStamp("typeExpert");
      trackEvent("match_game_complete", { score, total: rounds.length });
      setPhase("finished");
      return;
    }
    setIndex((prev) => prev + 1);
    setPicked(null);
  }

  if (phase === "intro") {
    return (
      <Card className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blood-50 text-blood-600 dark:bg-blood-950/70 dark:text-rose-300">
          <Sparkles aria-hidden="true" className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-xl font-bold text-ink sm:text-2xl dark:text-stone-100">
          {copy.title}
        </h3>
        <p className="mx-auto mt-2 max-w-[46ch] text-sm text-stone-600 dark:text-stone-300">
          {copy.introSub}
        </p>
        <div className="mt-5 flex justify-center">
          <Button onClick={startGame}>{copy.startBtn}</Button>
        </div>
      </Card>
    );
  }

  if (phase === "finished") {
    return (
      <>
        <Confetti active={score >= 4} />
        <Card className="text-center">
          <p className="text-xs font-bold tracking-wide text-blood-600 uppercase dark:text-rose-400">
            {copy.completeEyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl dark:text-stone-100">
            {copy.completeScore(score)}
          </h3>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            {copy.unlockedNote}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={startGame} variant="secondary">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {copy.playAgain}
            </Button>
            <Button href="/card">{copy.makeCard}</Button>
          </div>
        </Card>
      </>
    );
  }

  if (!current) return null;

  const isAnswered = picked !== null;
  const isCorrect = picked === current.correctDonor;

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
        <span>{copy.roundLabel(index + 1, rounds.length)}</span>
        <span className="text-blood-700 dark:text-rose-300">
          {copy.scoreLabel(score)}
        </span>
      </div>
      <ProgressBar
        value={index + (isAnswered ? 1 : 0)}
        max={rounds.length}
        label="Match the donor progress"
      />

      <div className="mt-5 rounded-2xl bg-[#f6f3ef] p-4 text-center dark:bg-[#161214]">
        <p className="text-xs font-bold tracking-wide text-stone-600 uppercase sm:text-sm dark:text-stone-300">
          {copy.patientNeeds}
        </p>
        <p
          dir="ltr"
          className="mt-1 inline-block text-3xl font-extrabold text-blood-700 dark:text-rose-300"
        >
          {formatBloodType(current.patient)}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold text-stone-700 sm:text-base dark:text-stone-200">
        {copy.chooseDonor}
      </p>

      <div dir="ltr" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {current.options.map((option) => {
          const isThisCorrect = option === current.correctDonor;
          const isThisPicked = option === picked;

          let styleClass =
            "border-blood-200 bg-white text-ink hover:border-blood-400 hover:bg-blood-50 dark:border-blood-500/25 dark:bg-[#140d10] dark:text-stone-100 dark:hover:bg-blood-950/60";
          if (isAnswered) {
            if (isThisCorrect) {
              styleClass =
                "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-100";
            } else if (isThisPicked) {
              styleClass =
                "border-blood-500 bg-blood-50 text-blood-900 dark:bg-blood-950/60 dark:text-rose-100";
            } else {
              styleClass =
                "border-stone-200 bg-stone-50 text-stone-400 opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-500";
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={isAnswered}
              onClick={() => chooseDonor(option)}
              className={`flex min-h-14 items-center justify-center gap-1.5 rounded-2xl border text-lg font-extrabold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${styleClass}`}
            >
              <span>{formatBloodType(option)}</span>
              {isAnswered && isThisCorrect && (
                <CheckCircle2
                  aria-hidden="true"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                />
              )}
              {isAnswered && isThisPicked && !isThisCorrect && (
                <XCircle
                  aria-hidden="true"
                  className="h-4 w-4 text-blood-600 dark:text-rose-400"
                />
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {isAnswered && picked && (
          <div
            className={`rounded-2xl border p-4 text-sm leading-relaxed ${isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-blood-200 bg-blood-50 text-blood-950 dark:border-blood-500/30 dark:bg-blood-950/40 dark:text-rose-100"
              }`}
          >
            <p className="font-bold">
              {isCorrect ? copy.safeMatch : copy.unsafeMatch}
            </p>
            <p className="mt-1">
              {describeRedCellCompatibility(picked, current.patient, locale)}
            </p>
          </div>
        )}
      </div>

      {isAnswered && (
        <div className="mt-4">
          <Button onClick={nextRound} className="w-full">
            {index + 1 >= rounds.length ? copy.finish : copy.next}
          </Button>
        </div>
      )}
    </Card>
  );
}
