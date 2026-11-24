"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Download,
  Layers,
  LayoutGrid,
  Pencil,
  RefreshCw,
  Share2,
  X,
} from "lucide-react";
import { getStampsMeta } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { BLOOD_TYPES, formatBloodType } from "@/lib/blood";
import {
  downloadBlobFile,
  isIosDevice,
  renderElementToPng,
} from "@/lib/export-image";
import { updateProgress } from "@/lib/progress-store";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import { useOrigin, useProgress } from "@/lib/use-progress";
import type { CardTheme, DonorBloodSelection, DonorCardData } from "@/types";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Confetti } from "@/components/ui/confetti";
import { StampBadge } from "@/components/ui/stamp-badge";
import {
  CARD_AURA_CLASSES,
  CardBackFace,
  CardFrontFace,
  DonorCard,
} from "@/components/card/donor-card";

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateDonorId(): string {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  }
  return `NASU-${code}`;
}

const FINISH_OPTIONS: {
  id: CardTheme;
  swatchClass: string;
}[] = [
  { id: "crimson", swatchClass: "bg-gradient-to-br from-blood-600 to-blood-800" },
  { id: "midnight", swatchClass: "bg-gradient-to-br from-[#18080e] to-blood-950" },
  { id: "pearl", swatchClass: "bg-gradient-to-br from-[#fff7f5] to-blood-100 border border-blood-200" },
];

export function CardBuilder() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].card;
  const stampsMeta = getStampsMeta(locale);

  const progress = useProgress();
  const origin = useOrigin();
  const frontExportRef = useRef<HTMLDivElement | null>(null);
  const backExportRef = useRef<HTMLDivElement | null>(null);
  const combinedExportRef = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [bloodInput, setBloodInput] = useState<DonorBloodSelection>("O+");
  const [themeInput, setThemeInput] = useState<CardTheme>("crimson");
  const [donatedInput, setDonatedInput] = useState(false);
  const [nameError, setNameError] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [justCreated, setJustCreated] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [iosPreviewUrls, setIosPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!downloadMenuOpen && iosPreviewUrls.length === 0) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDownloadMenuOpen(false);
        setIosPreviewUrls([]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [downloadMenuOpen, iosPreviewUrls.length]);

  const savedCard = progress.card;
  const showForm = !savedCard || editing;

  function openEdit() {
    if (savedCard) {
      setNameInput(savedCard.name);
      setBloodInput(savedCard.bloodType);
      setThemeInput(savedCard.theme ?? "crimson");
      setDonatedInput(savedCard.donatedToday);
    }
    setNameError("");
    setFeedback("");
    setJustCreated(false);
    setEditing(true);
  }

  function handleThemeSwitch(nextTheme: CardTheme) {
    if (!savedCard) return;
    trackEvent("card_theme_switch", { theme: nextTheme });
    updateProgress((prev) => ({
      ...prev,
      card: prev.card ? { ...prev.card, theme: nextTheme } : null,
    }));
  }

  function handleToggleFlip() {
    trackEvent("card_flip", { to_face: !flipped ? "back" : "front" });
    setFlipped((prev) => !prev);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameError(copy.nameError);
      return;
    }

    const nextCard: DonorCardData = {
      name: trimmed.slice(0, 20),
      bloodType: bloodInput,
      donatedToday: donatedInput,
      theme: themeInput,
      id: savedCard?.id ?? generateDonorId(),
      createdAt: savedCard?.createdAt ?? new Date().toISOString(),
    };

    updateProgress((prev) => ({
      ...prev,
      card: nextCard,
    }));
    trackEvent("card_create", {
      blood_type: bloodInput,
      theme: themeInput,
      donated_today: donatedInput,
      is_edit: Boolean(savedCard),
    });

    setNameError("");
    setFeedback("");
    setFlipped(false);
    setJustCreated(!savedCard);
    setEditing(false);
  }

  function buildFilename(cardName: string, suffix = "front"): string {
    const slug = cardName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `nasu-donor-card-${slug || "hero"}-${suffix}.png`;
  }

  async function deliverImages(
    items: Array<{ dataUrl: string; blob: Blob; filename: string }>
  ) {
    if (isIosDevice()) {
      const files = items.map(
        (item) => new File([item.blob], item.filename, { type: "image/png" })
      );
      let shared = false;
      try {
        if (
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files })
        ) {
          await navigator.share({
            files,
            title: copy.shareCardTitle,
          });
          shared = true;
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return false;
        }
      }
      if (!shared) {
        setIosPreviewUrls(items.map((item) => item.dataUrl));
      }
      return true;
    }

    for (let i = 0; i < items.length; i += 1) {
      downloadBlobFile(items[i].blob, items[i].filename);
      if (i < items.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 220));
      }
    }
    return true;
  }

  async function handleDownloadOption(
    mode: "front" | "back" | "combined" | "separate"
  ) {
    if (!savedCard || busy) return;
    setDownloadMenuOpen(false);
    setBusy(true);
    setFeedback("");
    try {
      const items: Array<{ dataUrl: string; blob: Blob; filename: string }> =
        [];

      if (mode === "front" || mode === "separate") {
        if (!frontExportRef.current) throw new Error("Front node missing");
        const rendered = await renderElementToPng(frontExportRef.current);
        items.push({
          ...rendered,
          filename: buildFilename(savedCard.name, "front"),
        });
      }

      if (mode === "back" || mode === "separate") {
        if (!backExportRef.current) throw new Error("Back node missing");
        const rendered = await renderElementToPng(backExportRef.current);
        items.push({
          ...rendered,
          filename: buildFilename(savedCard.name, "back"),
        });
      }

      if (mode === "combined") {
        if (!combinedExportRef.current)
          throw new Error("Combined node missing");
        const rendered = await renderElementToPng(combinedExportRef.current);
        items.push({
          ...rendered,
          filename: buildFilename(savedCard.name, "both"),
        });
      }

      const delivered = await deliverImages(items);
      if (!delivered) return;

      trackEvent("card_download_png", {
        theme: savedCard.theme ?? "crimson",
        blood_type: savedCard.bloodType,
        mode,
      });
      setFeedback(copy.downloadedToast);
    } catch {
      setFeedback(copy.downloadErr);
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    if (!savedCard || !frontExportRef.current || busy) return;
    setBusy(true);
    setFeedback("");
    try {
      const { dataUrl, blob } = await renderElementToPng(frontExportRef.current);
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
          title: copy.shareCardTitle,
          text: copy.shareCardText,
        });
        trackEvent("card_share", {
          method: "native",
          theme: savedCard.theme ?? "crimson",
        });
        setFeedback(copy.sharedToast);
      } else if (isIosDevice()) {
        setIosPreviewUrls([dataUrl]);
        trackEvent("card_share", {
          method: "fallback_download",
          theme: savedCard.theme ?? "crimson",
        });
        setFeedback(copy.downloadedToast);
      } else {
        downloadBlobFile(blob, buildFilename(savedCard.name, "front"));
        trackEvent("card_share", {
          method: "fallback_download",
          theme: savedCard.theme ?? "crimson",
        });
        setFeedback(copy.shareFallbackToast);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // Ignore cancelled share
      } else {
        setFeedback(copy.shareErr);
      }
    } finally {
      setBusy(false);
    }
  }

  const activeTheme: CardTheme = savedCard?.theme ?? "crimson";

  const previewCard: DonorCardData = {
    name: nameInput.trim() || (locale === "ar" ? "اسمك هنا" : "Your Name"),
    bloodType: bloodInput,
    donatedToday: donatedInput,
    theme: themeInput,
    id: savedCard?.id ?? "NASU-2026",
    createdAt: savedCard?.createdAt ?? "2026-11-21T12:00:00.000Z",
  };

  return (
    <div className="space-y-6">
      <Confetti active={justCreated && !showForm} />

      {showForm ? (
        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lg:sticky lg:top-24">
            <div className="relative mx-auto aspect-[420/265] w-full max-w-[420px]">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-3 -z-10 rounded-[32px] bg-gradient-to-br opacity-75 blur-2xl transition-all duration-500 ${CARD_AURA_CLASSES[themeInput]}`}
              />
              <CardFrontFace card={previewCard} />
            </div>
          </div>

          <Card className="mx-auto w-full max-w-xl lg:max-w-none">
            <div className="flex items-center gap-3.5">
              <BrandLogo className="h-12 w-12 shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-[#f5f2f0]">
                  {savedCard ? copy.editTitle : copy.createTitle}
                </h1>
                <p className="mt-1 text-sm text-stone-700 sm:text-base dark:text-stone-300">
                  {copy.formSub}
                </p>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
            <div>
              <label
                htmlFor="donor-first-name"
                className="block text-sm font-bold text-ink sm:text-base dark:text-[#f5f2f0]"
              >
                {copy.firstName}{" "}
                <span className="text-blood-600 dark:text-rose-400">*</span>
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
                placeholder={copy.namePlaceholder}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "donor-name-err" : undefined}
                className="mt-2 h-12 w-full rounded-2xl border border-stone-300 bg-[#faf8f6] px-4 text-base font-medium text-ink placeholder:text-stone-400 focus:border-blood-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blood-500/30 dark:border-[#3a2f33] dark:bg-[#141112] dark:text-[#f5f2f0] dark:placeholder:text-stone-500 dark:focus:bg-[#141112]"
              />
              {nameError && (
                <p
                  id="donor-name-err"
                  role="alert"
                  className="mt-1.5 text-xs font-semibold text-blood-700 sm:text-sm dark:text-rose-300"
                >
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-ink sm:text-base dark:text-[#f5f2f0]">
                {copy.bloodTypeLabel}
              </p>
              <div
                role="radiogroup"
                dir="ltr"
                aria-label={copy.bloodTypeLabel}
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
                      className={`min-h-11 rounded-2xl border text-sm font-extrabold transition-colors sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                        active
                          ? "border-blood-600 bg-blood-600 text-white shadow-xs"
                          : "border-stone-200 bg-[#f6f3ef] text-ink hover:border-blood-300 dark:border-[#2e2629] dark:bg-[#141112] dark:text-[#f5f2f0]"
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
                className={`mt-2 min-h-11 w-full rounded-2xl border px-4 text-sm font-bold transition-colors sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                  bloodInput === "unknown"
                    ? "border-blood-600 bg-blood-600 text-white shadow-xs"
                    : "border-stone-200 bg-[#f6f3ef] text-stone-700 hover:border-blood-200 dark:border-[#2e2629] dark:bg-[#141112] dark:text-stone-200"
                }`}
              >
                {copy.unknownBtn}
              </button>
            </div>

            <div>
              <p className="text-sm font-bold text-ink sm:text-base dark:text-[#f5f2f0]">
                {copy.finishLabel}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {FINISH_OPTIONS.map((opt) => {
                  const active = themeInput === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setThemeInput(opt.id)}
                      className={`flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-3 text-xs font-bold transition-colors sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                        active
                          ? "border-blood-600 bg-blood-50 text-blood-800 ring-1 ring-blood-500/40 dark:border-rose-400 dark:bg-blood-950/70 dark:text-rose-100"
                          : "border-stone-200 bg-white text-stone-700 hover:border-blood-200 dark:border-[#2e2629] dark:bg-[#141112] dark:text-stone-300"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 rounded-full ${opt.swatchClass}`}
                      />
                      <span className="truncate">{copy.finishes[opt.id]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-[#f6f3ef] px-4 py-3 dark:border-[#2e2629] dark:bg-[#141112]">
              <span
                id="donated-today-label"
                className="text-sm font-bold text-ink sm:text-base dark:text-[#f5f2f0]"
              >
                {copy.donatedTodayLabel}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={donatedInput}
                aria-labelledby="donated-today-label"
                onClick={() => setDonatedInput((prev) => !prev)}
                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1a1114] ${
                  donatedInput
                    ? "bg-blood-600"
                    : "bg-stone-300 dark:bg-stone-700"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-6 w-6 rounded-full bg-white shadow-xs transition-transform ${
                    donatedInput
                      ? "translate-x-6 rtl:-translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="flex-1">
                {savedCard ? copy.submitSave : copy.submitCreate}
              </Button>
              {savedCard && (
                <Button
                  variant="ghost"
                  onClick={() => setEditing(false)}
                  className="sm:w-auto"
                >
                  {copy.cancel}
                </Button>
              )}
            </div>
            </form>
          </Card>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="text-center lg:text-start">
              <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-[#f5f2f0]">
                {copy.viewTitle}
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
                {copy.viewSub}
              </p>
            </div>

            <DonorCard
              card={savedCard}
              stamps={progress.stamps}
              origin={origin}
              flipped={flipped}
              onToggleFlip={handleToggleFlip}
            />

            {/* Offscreen flat copies for clean html-to-image PNG export (0x0 viewport wrapper avoids iOS WebKit culling) */}
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <CardFrontFace
                card={savedCard}
                exportRef={frontExportRef}
                fixedExport
              />
              <CardBackFace
                card={savedCard}
                stamps={progress.stamps}
                origin={origin}
                exportRef={backExportRef}
                fixedExport
              />
              <div
                ref={combinedExportRef}
                className={`flex w-[468px] flex-col gap-5 rounded-[32px] p-6 ${
                  activeTheme === "midnight" ? "bg-[#121011]" : "bg-[#faf8f6]"
                }`}
              >
                <CardFrontFace card={savedCard} fixedExport />
                <CardBackFace
                  card={savedCard}
                  stamps={progress.stamps}
                  origin={origin}
                  fixedExport
                />
              </div>
            </div>

            {/* Quick finish switcher */}
            <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2">
              {FINISH_OPTIONS.map((opt) => {
                const active = activeTheme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleThemeSwitch(opt.id)}
                    className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                      active
                        ? "border-blood-600 bg-blood-50 text-blood-800 dark:border-rose-400 dark:bg-blood-950/70 dark:text-rose-100"
                        : "border-stone-200 bg-white text-stone-600 hover:border-blood-200 dark:border-stone-700 dark:bg-[#1a1114] dark:text-stone-300"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full ${opt.swatchClass}`}
                    />
                    <span>{copy.finishes[opt.id]}</span>
                  </button>
                );
              })}
            </div>

            <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Button
                onClick={() => setDownloadMenuOpen(true)}
                disabled={busy}
                size="sm"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {copy.download}
              </Button>
              <Button
                onClick={handleShare}
                disabled={busy}
                variant="secondary"
                size="sm"
              >
                <Share2 aria-hidden="true" className="h-4 w-4" />
                {copy.share}
              </Button>
              <Button
                onClick={handleToggleFlip}
                variant="secondary"
                size="sm"
              >
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                {copy.flip}
              </Button>
              <Button onClick={openEdit} variant="ghost" size="sm">
                <Pencil aria-hidden="true" className="h-4 w-4" />
                {copy.edit}
              </Button>
            </div>

            {feedback && (
              <p
                aria-live="polite"
                className="text-center text-xs font-semibold text-blood-700 dark:text-rose-300"
              >
                {feedback}
              </p>
            )}
          </div>

          <Card className="mx-auto w-full max-w-xl lg:max-w-none">
            <h2 className="text-lg font-bold text-ink sm:text-xl dark:text-[#f5f2f0]">
              {copy.collectTitle}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {copy.collectSub}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {stampsMeta.map((stamp) => {
                const earned = progress.stamps[stamp.key];
                return (
                  <Link
                    key={stamp.key}
                    href={stamp.href}
                    className="flex min-h-12 items-center justify-between gap-2 rounded-2xl border border-stone-200/85 bg-[#f6f3ef] px-3.5 py-2.5 transition-colors hover:border-blood-300 hover:bg-blood-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#141112] dark:hover:border-blood-400/50"
                  >
                    <div className="min-w-0">
                      <StampBadge
                        label={stamp.label}
                        earned={earned}
                        compact
                      />
                      <p className="mt-1.5 truncate text-xs text-stone-700 sm:text-sm dark:text-stone-300">
                        {stamp.hint}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {downloadMenuOpen && savedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.downloadModalTitle}
          onClick={() => setDownloadMenuOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl dark:border-[#302428] dark:bg-[#1a1316]"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-extrabold text-ink dark:text-[#f5f2f0]">
                {copy.downloadModalTitle}
              </p>
              <button
                type="button"
                onClick={() => setDownloadMenuOpen(false)}
                aria-label={copy.iosSaveClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/10"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2">
              {(
                [
                  {
                    mode: "front",
                    label: copy.downloadFront,
                    Icon: Download,
                  },
                  {
                    mode: "back",
                    label: copy.downloadBack,
                    Icon: RefreshCw,
                  },
                  {
                    mode: "combined",
                    label: copy.downloadCombined,
                    Icon: Layers,
                  },
                  {
                    mode: "separate",
                    label: copy.downloadSeparate,
                    Icon: LayoutGrid,
                  },
                ] as const
              ).map(({ mode, label, Icon }) => (
                <button
                  key={mode}
                  type="button"
                  disabled={busy}
                  onClick={() => handleDownloadOption(mode)}
                  className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-stone-200 bg-[#f6f3ef] px-4 py-2.5 text-start text-sm font-bold text-ink transition-colors hover:border-blood-400 hover:bg-blood-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 disabled:opacity-50 dark:border-[#2e2629] dark:bg-[#120e10] dark:text-[#f5f2f0] dark:hover:border-blood-500/60"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blood-600/10 text-blood-700 dark:bg-rose-400/15 dark:text-rose-200">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {iosPreviewUrls.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.iosSaveTitle}
          onClick={() => setIosPreviewUrls([])}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-[400px] flex-col items-center gap-3 overflow-y-auto rounded-3xl border border-white/15 bg-[#1c181a] p-4 text-white shadow-2xl"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-sm font-extrabold">{copy.iosSaveTitle}</p>
              <button
                type="button"
                onClick={() => setIosPreviewUrls([])}
                aria-label={copy.iosSaveClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            {iosPreviewUrls.map((url, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={url}
                alt={copy.shareCardTitle}
                className="w-full rounded-2xl shadow-lg"
              />
            ))}
            <p className="text-center text-xs font-semibold text-rose-100">
              {copy.iosSaveHint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
