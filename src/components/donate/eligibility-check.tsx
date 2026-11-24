"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import {
  ELIGIBILITY_DISCLAIMER_BY_LOCALE,
  ELIGIBILITY_PASS_TEXT_BY_LOCALE,
  ELIGIBILITY_QUESTIONS_BY_LOCALE,
  ELIGIBILITY_WAIT_TEXT_BY_LOCALE,
} from "@/data/donate";
import { UI_COPY } from "@/data/translations";
import { awardStamp } from "@/lib/progress-store";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import type { EligibilityAnswer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function EligibilityCheck() {
  const { locale, isAr } = usePreferences();
  const copy = UI_COPY[locale].donate.eligibility;
  const questions = ELIGIBILITY_QUESTIONS_BY_LOCALE[locale];
  const passText = ELIGIBILITY_PASS_TEXT_BY_LOCALE[locale];
  const waitText = ELIGIBILITY_WAIT_TEXT_BY_LOCALE[locale];
  const disclaimer = ELIGIBILITY_DISCLAIMER_BY_LOCALE[locale];
  const reduced = useReducedMotion();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, EligibilityAnswer>>({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const current = questions[step];

  function handleAnswer(answer: EligibilityAnswer) {
    if (!current) return;
    if (step === 0) {
      trackEvent("eligibility_start");
    }
    const nextAnswers = { ...answers, [current.id]: answer };
    setAnswers(nextAnswers);

    if (step + 1 >= total) {
      const flaggedCount = questions.filter((q) => {
        const ans = nextAnswers[q.id];
        if (!ans) return false;
        if (q.allowNa && ans === "na") return false;
        return ans !== q.passIf;
      }).length;
      awardStamp("donorReady");
      trackEvent("eligibility_complete", {
        all_passed: flaggedCount === 0,
        flagged_count: flaggedCount,
      });
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

  const flagged = questions.filter((q) => {
    const ans = answers[q.id];
    if (!ans) return false;
    if (q.allowNa && ans === "na") return false;
    return ans !== q.passIf;
  });

  const allPassed = flagged.length === 0;
  const enterX = isAr ? -20 : 20;
  const exitX = isAr ? 20 : -20;

  return (
    <Card>
      {!finished && current ? (
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>{copy.questionOf(step + 1, total)}</span>
              <span>{copy.quickTag}</span>
            </div>
            <ProgressBar
              value={step}
              max={total}
              label="Eligibility check progress"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? undefined : { opacity: 0, x: enterX }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: exitX }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold leading-snug text-ink sm:text-2xl dark:text-stone-100">
                {current.question}
              </h3>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="secondary"
                  onClick={() => handleAnswer("yes")}
                  className="flex-1"
                >
                  {copy.yes}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleAnswer("no")}
                  className="flex-1"
                >
                  {copy.no}
                </Button>
                {current.allowNa && (
                  <Button
                    variant="ghost"
                    onClick={() => handleAnswer("na")}
                    className="flex-1 border border-stone-200 dark:border-stone-700"
                  >
                    {copy.na}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div aria-live="polite" className="space-y-5">
          <div
            className={`rounded-2xl border p-5 ${
              allPassed
                ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100"
                : "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100"
            }`}
          >
            <div className="flex items-start gap-3">
              {allPassed ? (
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400"
                />
              ) : (
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400"
                />
              )}
              <div>
                <p className="text-base font-bold sm:text-lg">
                  {allPassed ? passText : waitText}
                </p>
                <p className="mt-1 text-xs font-semibold opacity-80">
                  {copy.unlockedNote}
                </p>
              </div>
            </div>
          </div>

          {!allPassed && (
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                {copy.askBoothLabel}
              </p>
              <ul className="space-y-2">
                {flagged.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-700 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300"
                  >
                    <strong className="font-semibold text-ink dark:text-stone-100">
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
              {copy.startOver}
            </Button>
            <Button href="/card">{copy.makeCard}</Button>
          </div>
        </div>
      )}

      <p className="mt-5 border-t border-stone-200/80 pt-4 text-xs leading-relaxed text-stone-600 sm:text-sm dark:border-[#2e2629] dark:text-stone-400">
        {disclaimer}
      </p>
    </Card>
  );
}
