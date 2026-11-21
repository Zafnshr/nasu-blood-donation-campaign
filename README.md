# NASU Blood Donation Campaign

An interactive, QR-code-first web experience built for the **NASU Blood Donation Campaign** — turning campus blood-drive outreach into an engaging, science-backed digital journey for donors and students.

> **Status:** **Live — v1 complete**  
> All five routes, interactive educational modules, personalized donor card builder, and local stamp progress system are built and verified.

---

## Features

- **Home & Stamp Progress (`/`)** — Mobile-first campaign hub with pulsing blood-drop artwork, quick donation stats, guided journey tiles, and a 4-stamp progress tracker (`Myth Buster`, `Blood Scholar`, `Type Expert`, `Donor Ready`) saved in `localStorage`.
- **Fact or Myth Game (`/play`)** — 10-card swipe-or-tap challenge busting common blood donation myths with instant explanations, score ring, confetti celebration, best-score tracking, and the `Myth Buster` stamp.
- **Learn Hub (`/learn`)** — Interactive blood science across five sections:
  - **Centrifuge Tube (`Blood 101`)** — Spin whole blood to separate and inspect plasma (55%), white cells & platelets (<1%), and red blood cells (~44%), unlocking `Blood Scholar`.
  - **Made & Restored** — 4-step bone marrow regeneration flow and an interactive 0–84 day recovery slider.
  - **Components & Collection Journey** — Storage, shelf life, and clinical uses for red cells, plasma, and platelets, plus the 5-step post-donation lab pipeline.
  - **Blood Type Explorer** — Antigen cell diagram and red-cell give/receive compatibility grids across all 8 ABO/Rh types.
  - **Match the Donor Mini-Game** — 5 quick clinical matching rounds with compatibility explanations, unlocking `Type Expert`.
- **Donate Guide (`/donate`)** — Interactive `"one donation → up to 3 lives"` component split animation, 6 patient-need cards, a 7-question 30-second eligibility checker (unlocking `Donor Ready`), 4-step donation-day walkthrough, and tickable before/aftercare checklists.
- **Interactive Donor Card (`/card`)** — Personalize a card with your name, blood type (or `"I don't know yet"`), and `"I donated today"` badge. Features 3D pointer tilt and glare, front/back flip revealing red-cell compatibility, earned stamps, and a QR code, plus high-DPI PNG **Download** and **Share**.

---

## Project Structure

```text
nasu-blood-donation-campaign/
├── public/                 # Static assets & campaign media
├── src/
│   ├── app/                # App Router routes (/, /play, /learn, /donate, /card) + metadata/icon
│   ├── components/
│   │   ├── card/           # Donor card builder, 3D tilt/flip card & PNG export
│   │   ├── donate/         # Impact split, eligibility check, steps & checklists
│   │   ├── home/           # Hero drop SVG, stat strip, journey tiles & stamp bar
│   │   ├── layout/         # Sticky header, mobile bottom nav & footer
│   │   ├── learn/          # Centrifuge, marrow flow, recovery slider, types & match game
│   │   ├── play/           # Swipe/tap Fact or Myth game
│   │   └── ui/             # Shared buttons, cards, chips, confetti, reveal & tabs
│   ├── data/               # Campaign copy, myths, blood basics, blood types & donate data
│   ├── lib/                # Blood compatibility logic & useSyncExternalStore progress store
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
- **Styling:** Tailwind CSS v4
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
