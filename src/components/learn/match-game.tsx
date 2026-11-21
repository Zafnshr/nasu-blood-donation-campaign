"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import {
  BLOOD_TYPES,
  canGiveRedCells,
  describeRedCellCompatibility,
  formatBloodType,
  redCellDonors,
  shuffle,
} from "@/lib/blood";
import { awardStamp } from "@/lib/progress-store";
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
  const [phase, setPhase] = useState<Phase>("intro");
  const [rounds, setRounds] = useState<MatchRound[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<BloodType | null>(null);

  const current = rounds[index];

  function startGame() {
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
      setPhase("finished");
      return;
    }
    setIndex((prev) => prev + 1);
    setPicked(null);
  }

  if (phase === "intro") {
    return (
      <Card className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blood-50 text-blood-600">
          <Sparkles aria-hidden="true" className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-xl font-bold text-ink sm:text-2xl">
          Match the Donor
        </h3>
        <p className="mx-auto mt-2 max-w-[46ch] text-sm text-stone-600">
          5 quick hospital rounds. Pick the one safe red-cell donor for each
          patient.
        </p>
        <div className="mt-5 flex justify-center">
          <Button onClick={startGame}>Start matching</Button>
        </div>
      </Card>
    );
  }

  if (phase === "finished") {
    return (
      <>
        <Confetti active={score >= 4} />
        <Card className="text-center">
          <p className="text-xs font-bold tracking-wide text-blood-600 uppercase">
            Match Game Complete
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
            {score} / 5 safe matches
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            You unlocked the{" "}
            <strong className="text-blood-700">Type Expert</strong> stamp!
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={startGame} variant="secondary">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Play again
            </Button>
            <Button href="/card">Make my donor card</Button>
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
      <div className="mb-3 flex items-center justify-between text-xs font-bold text-stone-600">
        <span>
          Round {index + 1} / {rounds.length}
        </span>
        <span className="text-blood-700">Score: {score}</span>
      </div>
      <ProgressBar
        value={index + (isAnswered ? 1 : 0)}
        max={rounds.length}
        label="Match the donor progress"
      />

      <div className="mt-5 rounded-2xl bg-blood-50/70 p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
          Patient needs red cells
        </p>
        <p className="mt-1 text-3xl font-extrabold text-blood-700">
          {formatBloodType(current.patient)}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold text-stone-700">
        Choose the safe donor:
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {current.options.map((option) => {
          const isThisCorrect = option === current.correctDonor;
          const isThisPicked = option === picked;

          let styleClass =
            "border-blood-200 bg-white text-ink hover:border-blood-400 hover:bg-blood-50";
          if (isAnswered) {
            if (isThisCorrect) {
              styleClass =
                "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30";
            } else if (isThisPicked) {
              styleClass = "border-blood-500 bg-blood-50 text-blood-900";
            } else {
              styleClass =
                "border-stone-200 bg-stone-50 text-stone-400 opacity-60";
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
                  className="h-4 w-4 text-emerald-600"
                />
              )}
              {isAnswered && isThisPicked && !isThisCorrect && (
                <XCircle
                  aria-hidden="true"
                  className="h-4 w-4 text-blood-600"
                />
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {isAnswered && picked && (
          <div
            className={`rounded-2xl border p-4 text-sm leading-relaxed ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-blood-200 bg-blood-50 text-blood-950"
            }`}
          >
            <p className="font-bold">
              {isCorrect ? "Safe match!" : "Not a safe match"}
            </p>
            <p className="mt-1">
              {describeRedCellCompatibility(picked, current.patient)}
            </p>
          </div>
        )}
      </div>

      {isAnswered && (
        <div className="mt-4">
          <Button onClick={nextRound} className="w-full">
            {index + 1 >= rounds.length ? "Finish" : "Next"}
          </Button>
        </div>
      )}
    </Card>
  );
}
