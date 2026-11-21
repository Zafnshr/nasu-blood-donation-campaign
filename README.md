# NASU Blood Donation Campaign

An interactive, QR-code-first web experience built for the **NASU Blood Donation Campaign** — turning campus blood-drive outreach into an engaging, science-backed digital journey for donors and students.

> **Status:** Environment & Repository Ready — Feature Planning In Progress  
> The core Next.js foundation and organized folder architecture are set up and verified; interactive campaign modules are currently in planning.

---

## About the Campaign

Designed to be launched right from campaign QR codes on campus, this web app combines clear medical education with interactive storytelling so visitors can learn how blood works, bust common donation myths, and leave with a personalized keepsake.

### Planned Experience Modules

- **Fact vs. Myth Interactive Game** — Bust common misconceptions around donating blood with quick, swipe-or-tap interactive rounds.
- **Blood Basics & Components** — Clear visual breakdowns of blood composition, how the body regenerates and compensates after donation, and how collected blood is separated into RBCs, plasma, and platelets for distinct clinical uses.
- **Blood Typing & Compatibility Explorer** — Understand ABO and Rh blood groups and how donor–recipient compatibility works.
- **Why Donation Matters** — Real-world clinical impact showing who relies on donated blood and why every unit counts.
- **Donation Journey & Aftercare** — Step-by-step walkthrough of what happens during donation and practical post-donation recovery tips.
- **Interactive Blood Donor Card** — Enter your name and blood type to generate a custom interactive donor card.

---

## Project Structure

```text
nasu-blood-donation-campaign/
├── public/                 # Static assets & campaign media
├── src/
│   ├── app/                # Next.js App Router pages, layout & global styles
│   ├── components/         # Reusable UI & interactive experience components
│   ├── data/               # Campaign content, quizzes & blood datasets
│   ├── lib/                # Utility helpers & shared logic
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
- **Motion & Icons:** Framer Motion, Lucide React

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
