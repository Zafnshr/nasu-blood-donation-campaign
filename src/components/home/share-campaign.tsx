"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Maximize2,
  MessageCircle,
  ScanLine,
  Share2,
  X,
} from "lucide-react";
import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import {
  downloadBlobFile,
  isIosDevice,
  renderElementToPng,
} from "@/lib/export-image";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import { useOrigin } from "@/lib/use-progress";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";

const FRAME_GUILLOCHE = [
  "M -20 310 C 70 250, 175 345, 340 245",
  "M -20 326 C 75 266, 180 361, 340 261",
  "M -20 342 C 80 282, 185 377, 340 277",
] as const;

function QrFrameCard({
  isExport = false,
  reducedMotion = false,
  exportRef,
  className = "",
}: {
  isExport?: boolean;
  reducedMotion?: boolean;
  exportRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].share;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  return (
    <div
      ref={exportRef}
      style={{
        background:
          "radial-gradient(110% 95% at 88% 8%, rgba(251, 113, 133, 0.4) 0%, rgba(251, 113, 133, 0) 55%), linear-gradient(145deg, #6b0a22 0%, #b51536 52%, #d9264b 100%)",
        boxShadow:
          "0 20px 44px -12px rgba(159, 18, 57, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.34)",
        border: "1px solid rgba(255, 255, 255, 0.22)",
      }}
      className={`relative overflow-hidden rounded-[28px] p-5 text-white ${
        isExport ? "w-[320px]" : "w-full"
      } ${className}`}
    >
      {/* Delicate guilloché arcs */}
      <svg
        viewBox="0 0 320 400"
        fill="none"
        aria-hidden="true"
        opacity="0.14"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {FRAME_GUILLOCHE.map((d, idx) => (
          <path
            key={idx}
            d={d}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Corner embossed NASU watermark */}
      <BrandLogo
        variant="watermark"
        className="pointer-events-none absolute -bottom-10 -end-8 h-44 w-44 text-white opacity-[0.08]"
      />

      <div className="relative flex flex-col items-center gap-4">
        {/* Top brand header */}
        <div className="flex w-full items-center gap-2.5">
          <BrandLogo variant="light" className="h-9 w-9 shrink-0 drop-shadow-xs" />
          <span
            aria-hidden="true"
            className="h-6 w-[1.5px] shrink-0 bg-white/35"
          />
          <div className="min-w-0 text-start">
            <p className="truncate text-xs font-extrabold leading-tight tracking-wide">
              {info.brand}
            </p>
            <p className="truncate text-[10px] font-semibold leading-tight opacity-85">
              {info.university}
            </p>
          </div>
        </div>

        {/* Center scan-safe pure-white QR window */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-3.5 shadow-lg">
          {/* Four corner viewfinder brackets */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 h-3.5 w-3.5 rounded-tl-md border-t-2 border-l-2 border-blood-600/75"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 h-3.5 w-3.5 rounded-tr-md border-t-2 border-r-2 border-blood-600/75"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 rounded-bl-md border-b-2 border-l-2 border-blood-600/75"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 bottom-2 h-3.5 w-3.5 rounded-br-md border-r-2 border-b-2 border-blood-600/75"
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/qr-code.png"
            alt={copy.scanHint}
            className="block h-44 w-44 object-contain sm:h-48 sm:w-48"
          />

          {!isExport && !reducedMotion && (
            <div
              aria-hidden="true"
              className="animate-qr-beam pointer-events-none absolute inset-x-3 top-2 h-1 rounded-full bg-gradient-to-r from-transparent via-blood-500/55 to-transparent blur-[1px]"
            />
          )}
        </div>

        {/* Bottom pill caption */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 text-[11px] font-bold tracking-wide">
          <ScanLine aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span>{copy.scanHint}</span>
        </div>
      </div>
    </div>
  );
}

export function ShareCampaignSection() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].share;
  const cardCopy = UI_COPY[locale].card;
  const origin = useOrigin();
  const reduced = useReducedMotion();

  const exportRef = useRef<HTMLDivElement | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [iosPreviewUrl, setIosPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState<"saved" | "shared" | "err" | null>(null);

  const feedbackText =
    feedbackKey === "saved"
      ? copy.savedToast
      : feedbackKey === "shared"
        ? copy.sharedToast
        : feedbackKey === "err"
          ? copy.shareErr
          : "";

  useEffect(() => {
    if (!spotlightOpen && !iosPreviewUrl) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSpotlightOpen(false);
        setIosPreviewUrl(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [spotlightOpen, iosPreviewUrl]);

  const shareUrl = origin;
  const whatsappText = shareUrl
    ? `${copy.shareMessage}\n${shareUrl}`
    : copy.shareMessage;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  function openSpotlight() {
    setSpotlightOpen(true);
    trackEvent("qr_fullscreen_open");
  }

  async function handleCopy() {
    if (!shareUrl) return;
    setFeedbackKey(null);
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackEvent("share_copy_link");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFeedbackKey("err");
    }
  }

  async function handleNativeShare() {
    if (!shareUrl) return;
    setFeedbackKey(null);
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({
          title: copy.shareTitle,
          text: copy.shareMessage,
          url: shareUrl,
        });
        trackEvent("share_native");
        setFeedbackKey("shared");
      } else {
        await handleCopy();
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User dismissed share sheet
      } else {
        await handleCopy();
      }
    }
  }

  async function handleSaveQr() {
    if (!exportRef.current || saving) return;
    setSaving(true);
    setFeedbackKey(null);
    try {
      const { dataUrl, blob } = await renderElementToPng(exportRef.current);
      if (isIosDevice()) {
        const file = new File([blob], "nasu-campaign-qr.png", {
          type: "image/png",
        });
        let shared = false;
        try {
          if (
            typeof navigator.canShare === "function" &&
            navigator.canShare({ files: [file] })
          ) {
            await navigator.share({
              files: [file],
              title: copy.shareTitle,
            });
            shared = true;
          }
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") {
            setSaving(false);
            return;
          }
        }
        if (!shared) {
          setIosPreviewUrl(dataUrl);
        }
      } else {
        downloadBlobFile(blob, "nasu-campaign-qr.png");
      }
      trackEvent("qr_card_download");
      setFeedbackKey("saved");
    } catch {
      setFeedbackKey("err");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <section
        id="share"
        aria-labelledby="share-campaign-heading"
        className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-stone-200/85 bg-white px-6 py-7 shadow-[0_8px_30px_rgba(28,25,23,0.05)] transition-colors sm:px-9 sm:py-9 dark:border-[#2e2629] dark:bg-[#1c181a] dark:shadow-[0_14px_40px_rgba(0,0,0,0.42)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-20 h-60 w-60 rounded-full bg-blood-100/50 blur-3xl dark:bg-blood-700/12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -start-16 h-52 w-52 rounded-full bg-amber-100/40 blur-3xl dark:bg-amber-600/8"
        />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {/* Content & Actions Column */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blood-200/80 bg-blood-50/90 px-3 py-1 text-xs font-bold text-blood-700 dark:border-blood-500/30 dark:bg-blood-950/70 dark:text-rose-200">
              <Share2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1
              id="share-campaign-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl dark:text-[#f5f2f0]"
            >
              {copy.title}
            </h1>
            <p className="mt-2.5 max-w-[46ch] text-base leading-relaxed text-stone-700 dark:text-stone-300">
              {copy.subtitle}
            </p>

            {shareUrl && (
              <div
                dir="ltr"
                className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-stone-200/90 bg-[#f6f3ef] px-3.5 py-2 text-xs font-mono font-semibold text-stone-700 dark:border-[#2e2629] dark:bg-[#141112] dark:text-stone-300"
              >
                <span className="truncate">{shareUrl}</span>
              </div>
            )}

            <div className="mt-5 space-y-2.5">
              <Button onClick={handleNativeShare} className="w-full sm:w-auto">
                <Share2 aria-hidden="true" className="h-4 w-4" />
                {copy.shareNative}
              </Button>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("share_whatsapp")}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl border border-stone-200 bg-white px-3.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-blood-300 hover:bg-blood-50/70 active:scale-[0.98] sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#141112] dark:text-[#f5f2f0] dark:hover:bg-blood-950/60"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                  <span>{copy.whatsapp}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl border px-3.5 text-xs font-bold shadow-2xs transition-colors active:scale-[0.98] sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                    copied
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-200"
                      : "border-stone-200 bg-white text-ink hover:border-blood-300 hover:bg-blood-50/70 dark:border-[#2e2629] dark:bg-[#141112] dark:text-[#f5f2f0] dark:hover:bg-blood-950/60"
                  }`}
                >
                  {copied ? (
                    <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
                  ) : (
                    <Copy aria-hidden="true" className="h-4 w-4 shrink-0" />
                  )}
                  <span>{copied ? copy.copied : copy.copyLink}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveQr}
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl border border-stone-200 bg-white px-3.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-blood-300 hover:bg-blood-50/70 active:scale-[0.98] disabled:opacity-60 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#141112] dark:text-[#f5f2f0] dark:hover:bg-blood-950/60"
                >
                  <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>{saving ? copy.savingQr : copy.saveQr}</span>
                </button>
              </div>
            </div>

            {feedbackText && (
              <p
                aria-live="polite"
                className="mt-3 text-xs font-semibold text-blood-700 sm:text-sm dark:text-rose-300"
              >
                {feedbackText}
              </p>
            )}
          </div>

          {/* QR Frame Showcase Column */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative mx-auto w-full max-w-[300px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 -z-10 rounded-[34px] bg-gradient-to-br from-blood-500/30 via-rose-500/15 to-amber-400/15 blur-2xl"
              />
              <button
                type="button"
                onClick={openSpotlight}
                aria-label={copy.fullscreenBtn}
                className="block w-full cursor-pointer rounded-[28px] text-start transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#1c181a]"
              >
                <QrFrameCard reducedMotion={Boolean(reduced)} />
              </button>
            </div>

            <button
              type="button"
              onClick={openSpotlight}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-stone-200/90 bg-[#f6f3ef] px-4 text-xs font-bold text-ink transition-colors hover:border-blood-300 hover:bg-blood-50/80 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#141112] dark:text-stone-200 dark:hover:bg-blood-950/60"
            >
              <Maximize2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              <span>{copy.fullscreenBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clean 3-step spread strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        {copy.steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-2xl border border-stone-200/85 bg-white p-4 shadow-2xs dark:border-[#2e2629] dark:bg-[#1c181a]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blood-50 text-xs font-extrabold text-blood-700 dark:bg-blood-950/70 dark:text-rose-200">
              {idx + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink dark:text-[#f5f2f0]">
                {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-stone-300">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Offscreen static QR frame for crisp PNG download (kept in viewport for iOS WebKit) */}
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
        <QrFrameCard isExport exportRef={exportRef} />
      </div>

      {iosPreviewUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cardCopy.iosSaveTitle}
          onClick={() => setIosPreviewUrl(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-[360px] flex-col items-center gap-3 rounded-3xl border border-white/15 bg-[#1c181a] p-4 text-white shadow-2xl"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-sm font-extrabold">{cardCopy.iosSaveTitle}</p>
              <button
                type="button"
                onClick={() => setIosPreviewUrl(null)}
                aria-label={cardCopy.iosSaveClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iosPreviewUrl}
              alt={copy.scanHint}
              className="w-full rounded-2xl shadow-lg"
            />
            <p className="text-center text-xs font-semibold text-rose-100">
              {cardCopy.iosSaveHint}
            </p>
          </div>
        </div>
      )}

      {/* Full-Screen Scan Spotlight Modal */}
      <AnimatePresence>
        {spotlightOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={copy.fullscreenBtn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSpotlightOpen(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-[340px] flex-col items-center gap-4"
            >
              <button
                type="button"
                onClick={() => setSpotlightOpen(false)}
                aria-label={copy.closeModal}
                className="self-end inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>

              <QrFrameCard reducedMotion={Boolean(reduced)} />

              <p className="text-center text-sm font-semibold text-white/90">
                {copy.fullscreenHint}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
