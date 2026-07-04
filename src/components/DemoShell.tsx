import Link from "next/link";

export default function DemoShell({
  title,
  tagline,
  children,
}: {
  title: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--ink)] text-[color:var(--cream)]">
      <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--ink)]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm text-[color:var(--cream)]"
          >
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center border border-[color:var(--cream)]/60 text-[10px] transition-colors group-hover:border-[color:var(--gold)] group-hover:text-[color:var(--gold)]"
            >
              ←
            </span>
            <span className="font-crest text-[13px]">Zeeshan Khan</span>
            <span className="font-mono-label hidden sm:inline">
              /portfolio
            </span>
          </Link>

          <div className="text-right">
            <div className="font-mono-label text-[color:var(--gold)]">
              Live demo
            </div>
            <div className="text-sm font-semibold text-[color:var(--cream)]">
              {title}
            </div>
            <div className="hidden text-xs text-[color:var(--cream-4)] sm:block">
              {tagline}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono-label">
              Interactive canvas — click, tap, type. This is the real app.
            </div>
            <div className="font-mono-label hidden sm:block">
              zeeshan / {title.toLowerCase()}
            </div>
          </div>
          <div className="rounded-[8px] border border-[color:var(--line-strong)] bg-slate-950 text-slate-100">
            <div className="flex items-center justify-between rounded-t-[8px] border-b border-white/10 bg-slate-900/60 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--gold)]" />
              </div>
              <div className="font-mono-label text-slate-500">
                localhost / {title.toLowerCase().replace(/\s+/g, "-")}
              </div>
              <div className="w-16" />
            </div>
            <div className="min-h-[70vh] p-4 sm:p-6">{children}</div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 py-6 text-xs sm:flex-row">
          <span className="font-mono-label">
            Live demo · Built by Zeeshan Khan
          </span>
          <Link
            href="/"
            className="font-mono-label text-[color:var(--cream)] transition-colors hover:text-[color:var(--gold)]"
          >
            ← Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
