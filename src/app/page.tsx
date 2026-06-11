import Link from "next/link";

const demos = [
  {
    href: "/pos",
    title: "Point of Sale",
    emoji: "🧾",
    desc: "Touch-friendly checkout with live cart, receipts and a sales log. Built for shops and restaurants.",
    tags: ["Retail", "Restaurants"],
    accent: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
  },
  {
    href: "/money-tracker",
    title: "Money Tracker",
    emoji: "💰",
    desc: "Income and expenses with categories, monthly dashboard and instant reports. Know where the cash goes.",
    tags: ["Finance", "Reports"],
    accent: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  },
  {
    href: "/order-bot",
    title: "Order Bot",
    emoji: "🤖",
    desc: "A chat assistant that takes customer orders 24/7 — menu, cart and confirmation, no human needed.",
    tags: ["Automation", "Chat"],
    accent: "from-green-500/20 to-green-500/5 border-green-500/30",
  },
  {
    href: "/booking",
    title: "Booking System",
    emoji: "📅",
    desc: "Self-serve appointments with real time slots and zero double-bookings. Salons, clinics, services.",
    tags: ["Scheduling", "Services"],
    accent: "from-sky-500/20 to-sky-500/5 border-sky-500/30",
  },
  {
    href: "/erp",
    title: "Business Manager",
    emoji: "📦",
    desc: "Inventory, sales and staff in one dashboard — with low-stock alerts before you run out.",
    tags: ["Inventory", "Operations"],
    accent: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white">
            D
          </span>
          <span className="font-semibold text-lg tracking-tight">Devora</span>
        </div>
        <a
          href="https://www.linkedin.com/in/zeeshan-khan"
          className="text-sm px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors font-medium"
        >
          Work with me
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <p className="text-indigo-400 font-medium mb-4 text-sm uppercase tracking-widest">
          Software that makes business run
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
          Websites, apps & automations —{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            try them live
          </span>
        </h1>
        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
          I&apos;m Zeeshan — a full-stack developer who builds AI-powered web apps
          and automates workflows. Everything below is a real, working demo.
          Click in and play with it.
        </p>
      </section>

      {/* Demo grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className={`group rounded-2xl border bg-gradient-to-b p-6 transition-transform hover:-translate-y-1 ${d.accent}`}
            >
              <div className="text-3xl mb-4">{d.emoji}</div>
              <h2 className="font-semibold text-xl mb-2 group-hover:text-white">
                {d.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{d.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-sm font-medium text-indigo-300 group-hover:text-indigo-200">
                Open live demo →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        Devora · Built by Zeeshan Khan · Full-Stack Developer — Web Apps &
        Workflow Automation
      </footer>
    </div>
  );
}
