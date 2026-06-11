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
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white text-sm group-hover:bg-indigo-400 transition-colors">
              D
            </span>
            <span className="font-semibold tracking-tight">Devora</span>
          </Link>
          <div className="text-right">
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-slate-400">{tagline}</div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Live demo · Built by Zeeshan Khan ·{" "}
        <Link href="/" className="text-indigo-400 hover:text-indigo-300">
          devora — see all demos
        </Link>
      </footer>
    </div>
  );
}
