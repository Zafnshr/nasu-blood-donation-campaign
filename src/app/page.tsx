import { CheckCircle2, FolderKanban, Rocket, Terminal } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Environment Ready
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
          NASU Blood Donation Campaign
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          Workspace scaffolding, Next.js + TypeScript + Tailwind CSS runtime,
          GitHub repository setup, and the consolidated agent skills hub are
          ready for planning and implementation.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <Terminal className="h-4 w-4 text-neutral-400" />
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
              Stack
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-100">
              Next.js 16 + Tailwind v4
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <FolderKanban className="h-4 w-4 text-neutral-400" />
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
              Skills Hub
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-100">
              Consolidated in skills/
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <Rocket className="h-4 w-4 text-neutral-400" />
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
              Status
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-100">
              Awaiting Feature Plan
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
