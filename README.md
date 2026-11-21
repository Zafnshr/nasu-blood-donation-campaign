# NASU Blood Donation Campaign

An interactive, QR-code-first bilingual (**Arabic RTL default** / **English LTR**) web experience built for the **NASU Blood Donation Campaign** — turning campus blood-drive outreach into an engaging, science-backed digital journey for donors and students.

> **Status:** **Live — v2 complete**  
> Full Arabic (default, `IBM Plex Sans Arabic`) & English bilingual support, Light (default) & Dark themes, responsive mobile/tablet/laptop layouts, and interactive animations across all five routes.

---

## Features

- **Bilingual RTL/LTR & Theme System** — Instant Arabic (default) / English switcher and Light (default) / Dark mode toggle in the sticky header with pre-paint persistence in `localStorage`.
- **Home & Stamp Progress (`/`)** — Interactive ripple hero drop, continuous campaign highlights marquee, responsive stats, mouse-spotlight Bento journey tiles, and a 4-stamp progress tracker (`Myth Buster`, `Blood Scholar`, `Type Expert`, `Donor Ready`) with a top unlock toast.
- **Fact or Myth Game (`/play`)** — Stacked 10-card swipe-or-tap challenge with live answer streak badge, explanations, confetti celebration, best-score tracking, and the `Myth Buster` stamp.
- **Learn Hub (`/learn`)** — Interactive blood science across five sections:
  - **Centrifuge Tube (`Blood 101`)** — Spin whole blood to separate and inspect plasma (55%), white cells & platelets (<1%), and red blood cells (~44%), unlocking `Blood Scholar`.
  - **Made & Restored** — 4-step bone marrow regeneration flow and an interactive 0–84 day recovery slider.
  - **Components & Collection Journey** — Storage, shelf life, and clinical uses for red cells, plasma, and platelets, plus the 5-step post-donation lab pipeline.
  - **Blood Type Explorer** — Animated antigen cell diagram and red-cell give/receive compatibility grids across all 8 ABO/Rh types.
  - **Match the Donor Mini-Game** — 5 quick clinical matching rounds with localized compatibility explanations, unlocking `Type Expert`.
- **Donate Guide (`/donate`)** — Pulsing `"one donation → up to 3 lives"` SVG split animation, 6 patient-need cards, a sliding 7-question 30-second eligibility checker (unlocking `Donor Ready`), 4-step donation-day walkthrough, and tickable before/aftercare checklists with confetti.
- **Interactive Donor Card (`/card`)** — Personalize a card with your name, blood type (or unknown), `"I donated today"` badge, and three selectable finishes (**Crimson Foil**, **Midnight Ruby**, **Pearl Pulse**). Features 3D pointer tilt and glare, front/back flip revealing red-cell compatibility, earned stamps, and a QR code, plus high-DPI PNG **Download** and **Share**.

---

## Project Structure

```text
nasu-blood-donation-campaign/
├── public/                 # Static assets & campaign media
├── src/
│   ├── app/                # App Router routes (/, /play, /learn, /donate, /card) + metadata/icon
│   ├── components/
│   │   ├── card/           # Donor card builder, 3D tilt/flip finishes & PNG export
│   │   ├── donate/         # Impact split, eligibility check, steps, checklists & view wrapper
│   │   ├── home/           # Hero drop, marquee, stat strip, Bento journey tiles & stamp bar
│   │   ├── layout/         # Sticky header (scroll progress + toggles), floating mobile dock & footer
│   │   ├── learn/          # Centrifuge, marrow flow, recovery slider, types, match game & view wrapper
│   │   ├── play/           # Stacked swipe/tap Fact or Myth deck
│   │   └── ui/             # Shared buttons, cards, chips, confetti, reveal, toast & tabs
│   ├── data/               # Bilingual (AR/EN) copy, myths, blood basics, blood types & donate data
│   ├── lib/                # Blood compatibility logic, progress store & preferences store
│   └── types/              # TypeScript interfaces & domain types
├── .gitignore              # Git ignore rules
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies & npm scripts
├── package-lock.json       # Locked dependency tree
├── postcss.config.mjs      # PostCSS & Tailwind CSS v4 setup
├── tsconfig.json           # Strict TypeScript configuration
└── README.md
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling & Fonts:** Tailwind CSS v4, `IBM Plex Sans Arabic`, `Plus Jakarta Sans`
- **Motion, Icons & Export:** Framer Motion, Lucide React, `html-to-image`, `qrcode.react`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the local development server (http://localhost:3000)
npm run dev
```

### Verification Scripts

```bash
npm run typecheck   # Run TypeScript type checking
npm run lint        # Run ESLint
npm run build       # Create optimized production build
```

---

## Deployment

Deploy directly with Vercel from GitHub:

- **One-Click Vercel Import:** https://vercel.com/new/import?s=https://github.com/Zafnshr/nasu-blood-donation-campaign
- **Repository:** https://github.com/Zafnshr/nasu-blood-donation-campaign

---

## Medical Disclaimer

Educational content for awareness only. Eligibility and all medical decisions are made by qualified blood bank staff.
