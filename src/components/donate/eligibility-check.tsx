"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import {
  ELIGIBILITY_DISCLAIMER,
  ELIGIBILITY_PASS_TEXT,
  ELIGIBILITY_QUESTIONS,
  ELIGIBILITY_WAIT_TEXT,
} from "@/data/donate";
import { awardStamp } from "@/lib/progress-store";
import type { EligibilityAnswer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function EligibilityCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, EligibilityAnswer>>({});
  const [finished, setFinished] = useState(false);

  const total = ELIGIBILITY_QUESTIONS.length;
  const current = ELIGIBILITY_QUESTIONS[step];

  function handleAnswer(answer: EligibilityAnswer) {
    if (!current) return;
    const nextAnswers = { ...answers, [current.id]: answer };
    setAnswers(nextAnswers);

    if (step + 1 >= total) {
      awardStamp("donorReady");
      setFinished(true);
      return;
    }
    setStep((prev) => prev + 1);
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setFinished(false);
  }

  const flagged = ELIGIBILITY_QUESTIONS.filter((q) => {
    const ans = answers[q.id];
    if (!ans) return false;
    if (q.allowNa && ans === "na") return false;
    return ans !== q.passIf;
  });

  const allPassed = flagged.length === 0;

  return (
    <Card>
      {!finished && current ? (
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-stone-500">
              <span>
                Question {step + 1} of {total}
              </span>
              <span>30-second check</span>
            </div>
            <ProgressBar
              value={step}
              max={total}
              label="Eligibility check progress"
            />
          </div>

          <h3 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
            {current.question}
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="secondary"
              onClick={() => handleAnswer("yes")}
              className="flex-1"
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleAnswer("no")}
              className="flex-1"
            >
              No
            </Button>
            {current.allowNa && (
              <Button
                variant="ghost"
                onClick={() => handleAnswer("na")}
                className="flex-1 border border-stone-200"
              >
                Not applicable
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div aria-live="polite" className="space-y-5">
          <div
            className={`rounded-2xl border p-5 ${
              allPassed
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-amber-200 bg-amber-50 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-3">
              {allPassed ? (
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600"
                />
              ) : (
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 shrink-0 text-amber-600"
                />
              )}
              <div>
                <p className="text-base font-bold sm:text-lg">
                  {allPassed ? ELIGIBILITY_PASS_TEXT : ELIGIBILITY_WAIT_TEXT}
                </p>
                <p className="mt-1 text-xs font-semibold opacity-80">
                  Donor Ready stamp unlocked!
                </p>
              </div>
            </div>
          </div>

          {!allPassed && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
                Items to ask the booth team about:
              </p>
              <ul className="space-y-2">
                {flagged.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-700"
                  >
                    <strong className="font-semibold text-ink">
                      {item.question}
                    </strong>{" "}
                    — {item.flagReason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleReset} variant="secondary">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Start over
            </Button>
            <Button href="/card">Make my donor card</Button>
          </div>
        </div>
      )}

      <p className="mt-5 border-t border-blood-100 pt-4 text-xs leading-relaxed text-stone-500">
        {ELIGIBILITY_DISCLAIMER}
      </p>
    </Card>
  );
}
