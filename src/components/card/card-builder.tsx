"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { toPng } from "html-to-image";
import {
  Download,
  Pencil,
  RefreshCw,
  Share2,
} from "lucide-react";
import { STAMPS_META } from "@/data/campaign";
import { BLOOD_TYPES, formatBloodType } from "@/lib/blood";
import { updateProgress } from "@/lib/progress-store";
import { useOrigin, useProgress } from "@/lib/use-progress";
import type { DonorBloodSelection, DonorCardData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StampBadge } from "@/components/ui/stamp-badge";
import { CardFrontFace, DonorCard } from "@/components/card/donor-card";

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateDonorId(): string {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  }
  return `NASU-${code}`;
}

export function CardBuilder() {
  const progress = useProgress();
  const origin = useOrigin();
  const exportRef = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [bloodInput, setBloodInput] = useState<DonorBloodSelection>("O+");
  const [donatedInput, setDonatedInput] = useState(false);
  const [nameError, setNameError] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  const savedCard = progress.card;
  const showForm = !savedCard || editing;

  function openEdit() {
    if (savedCard) {
      setNameInput(savedCard.name);
      setBloodInput(savedCard.bloodType);
      setDonatedInput(savedCard.donatedToday);
    }
    setNameError("");
    setFeedback("");
    setEditing(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameError("Please enter your first name to create your card.");
      return;
    }

    const nextCard: DonorCardData = {
      name: trimmed.slice(0, 20),
      bloodType: bloodInput,
      donatedToday: donatedInput,
      id: savedCard?.id ?? generateDonorId(),
      createdAt: savedCard?.createdAt ?? new Date().toISOString(),
    };

    updateProgress((prev) => ({
      ...prev,
      card: nextCard,
    }));

    setNameError("");
    setFeedback("");
    setFlipped(false);
    setEditing(false);
  }

  async function renderCardPng(): Promise<string> {
    if (!exportRef.current) {
      throw new Error("Card export element not mounted");
    }
    const opts = {
      pixelRatio: 3,
      cacheBust: true,
    };
    await toPng(exportRef.current, opts);
    return toPng(exportRef.current, opts);
  }

  function triggerDownload(dataUrl: string, cardName: string) {
    const slug = cardName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const link = document.createElement("a");
    link.download = `nasu-donor-card-${slug || "hero"}.png`;
    link.href = dataUrl;
    link.click();
  }

  async function handleDownload() {
    if (!savedCard || busy) return;
    setBusy(true);
    setFeedback("");
    try {
      const dataUrl = await renderCardPng();
      triggerDownload(dataUrl, savedCard.name);
      setFeedback("Card PNG downloaded.");
    } catch {
      setFeedback("Could not generate image. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    if (!savedCard || busy) return;
    setBusy(true);
    setFeedback("");
    try {
      const dataUrl = await renderCardPng();
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "nasu-donor-card.png", {
        type: "image/png",
      });

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "My NASU Donor Card",
          text: "I just made my donor card at the NASU Blood Donation Campaign 🩸",
        });
        setFeedback("Shared!");
      } else {
        triggerDownload(dataUrl, savedCard.name);
        setFeedback("Sharing isn't supported here — downloaded instead.");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User cancelled share sheet; ignore cleanly
      } else {
        setFeedback("Could not share right now. Try Download instead.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {showForm ? (
        <Card className="mx-auto max-w-xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {savedCard ? "Edit your donor card" : "Make your donor card"}
          </h1>
          <p className="mt-1.5 text-sm text-stone-600">
            Personalize your interactive NASU Blood Drive card and save it to
            your phone.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
            <div>
              <label
                htmlFor="donor-first-name"
                className="block text-sm font-bold text-ink"
              >
                First name <span className="text-blood-600">*</span>
              </label>
              <input
                id="donor-first-name"
                type="text"
                required
                maxLength={20}
                autoComplete="given-name"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder="e.g. Salma"
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "donor-name-err" : undefined}
                className="mt-2 h-12 w-full rounded-2xl border border-blood-200 bg-cream/40 px-4 text-base font-medium text-ink placeholder:text-stone-400 focus:border-blood-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blood-500/30"
              />
              {nameError && (
                <p
                  id="donor-name-err"
                  role="alert"
                  className="mt-1.5 text-xs font-semibold text-blood-700"
                >
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-ink">Blood type</p>
              <div
                role="radiogroup"
                aria-label="Select blood type"
                className="mt-2 grid grid-cols-4 gap-2"
              >
                {BLOOD_TYPES.map((type) => {
                  const active = bloodInput === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setBloodInput(type)}
                      className={`min-h-11 rounded-2xl border text-sm font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                        active
                          ? "border-blood-600 bg-blood-600 text-white shadow-xs"
                          : "border-blood-100 bg-blood-50/50 text-ink hover:border-blood-300"
                      }`}
                    >
                      {formatBloodType(type)}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                role="radio"
                aria-checked={bloodInput === "unknown"}
                onClick={() => setBloodInput("unknown")}
                className={`mt-2 min-h-11 w-full rounded-2xl border px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                  bloodInput === "unknown"
                    ? "border-blood-600 bg-blood-600 text-white shadow-xs"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-blood-200"
                }`}
              >
                I don&apos;t know yet
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-blood-100 bg-cream/60 px-4 py-3">
              <span id="donated-today-label" className="text-sm font-bold text-ink">
                I donated today 🩸
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={donatedInput}
                aria-labelledby="donated-today-label"
                onClick={() => setDonatedInput((prev) => !prev)}
                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 ${
                  donatedInput ? "bg-blood-600" : "bg-stone-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-6 w-6 rounded-full bg-white shadow-xs transition-transform ${
                    donatedInput ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="flex-1">
                {savedCard ? "Save changes" : "Create my card"}
              </Button>
              {savedCard && (
                <Button
                  variant="ghost"
                  onClick={() => setEditing(false)}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Your NASU Donor Card
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Move across the card for 3D shimmer, or tap to flip it over.
            </p>
          </div>

          <DonorCard
            card={savedCard}
            stamps={progress.stamps}
            origin={origin}
            flipped={flipped}
            onToggleFlip={() => setFlipped((prev) => !prev)}
          />

          {/* Offscreen flat copy for clean html-to-image PNG export */}
          <div
            aria-hidden="true"
            style={{ position: "fixed", left: "-10000px", top: 0 }}
          >
            <CardFrontFace card={savedCard} exportRef={exportRef} fixedExport />
          </div>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 sm:grid-cols-4">
            <Button onClick={handleDownload} disabled={busy} size="sm">
              <Download aria-hidden="true" className="h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              disabled={busy}
              variant="secondary"
              size="sm"
            >
              <Share2 aria-hidden="true" className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={() => setFlipped((prev) => !prev)}
              variant="secondary"
              size="sm"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Flip
            </Button>
            <Button onClick={openEdit} variant="ghost" size="sm">
              <Pencil aria-hidden="true" className="h-4 w-4" />
              Edit
            </Button>
          </div>

          {feedback && (
            <p
              aria-live="polite"
              className="text-center text-xs font-semibold text-blood-700"
            >
              {feedback}
            </p>
          )}

          <Card className="mx-auto max-w-xl">
            <h2 className="text-base font-bold text-ink sm:text-lg">
              Collect all stamps
            </h2>
            <p className="mt-1 text-xs text-stone-600 sm:text-sm">
              Your earned stamps appear automatically on the back of your card.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {STAMPS_META.map((stamp) => {
                const earned = progress.stamps[stamp.key];
                return (
                  <Link
                    key={stamp.key}
                    href={stamp.href}
                    className="flex min-h-12 items-center justify-between gap-2 rounded-2xl border border-blood-100 bg-cream/60 px-3.5 py-2.5 transition-colors hover:border-blood-300 hover:bg-blood-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500"
                  >
                    <div className="min-w-0">
                      <StampBadge
                        label={stamp.label}
                        earned={earned}
                        compact
                      />
                      <p className="mt-1 truncate text-[11px] text-stone-600">
                        {stamp.hint}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
