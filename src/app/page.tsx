import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// Full software portfolio (real client work + embed windows + reference
// demos) lives at /software. The landing keeps only a compact preview.

type Demo = {
  n: string;
  href: string;
  name: string;
  outcome: string;
  meta: string;
  external?: boolean;
  live?: boolean; // renders a small "LIVE CLIENT" chip instead of the default label
};

// Kept as a compact preview in the Custom Software tile; full software
// portfolio (real client work + reference demos) lives at /software.
const softwareDemos: Demo[] = [
  {
    n: "01",
    href: "https://devora.pos.goxx.app/login",
    name: "Devora POS",
    outcome: "Restaurant point-of-sale — orders, kitchen tickets, sales log. Live for a real client.",
    meta: "Restaurant · Karachi",
    external: true,
    live: true,
  },
  {
    n: "02",
    href: "https://demo.fuel.goxx.app/",
    name: "Adil Fuel Supply",
    outcome: "Daily ledger for a fuel supply operation — replaces three notebooks a week.",
    meta: "Fuel supply · Karachi",
    external: true,
    live: true,
  },
  {
    n: "03",
    href: "https://demo.gym.goxx.app/",
    name: "Demo Gym",
    outcome: "Front-desk + member portal for a neighbourhood gym — staff, payments, attendance.",
    meta: "Gym · Karachi",
    external: true,
    live: true,
  },
  {
    n: "04",
    href: "/pos",
    name: "Point of Sale",
    outcome: "Ring up orders, take payment, print receipts — full capability sample.",
    meta: "Restaurant · Counter service",
  },
  {
    n: "05",
    href: "/money-tracker",
    name: "Money Tracker",
    outcome: "Categorised income + expenses, monthly dashboard, budget alerts.",
    meta: "Solo owner · Freelancer",
  },
  {
    n: "06",
    href: "/erp",
    name: "ERP / Business Manager",
    outcome: "Inventory, sales, staff and customers on one screen.",
    meta: "Wholesale · Small manufacturing",
  },
];

const automationDemos: Demo[] = [
  {
    n: "01",
    href: "/order-bot",
    name: "WhatsApp Order Bot",
    outcome: "Takes orders while you sleep.",
    meta: "Food · Delivery · D2C",
  },
  {
    n: "02",
    href: "/booking",
    name: "Booking System",
    outcome: "Customers book themselves in. Zero double-bookings.",
    meta: "Salon · Clinic · Trades",
  },
  {
    n: "03",
    href: "https://github.com/Darkened-Z/auto-blog-posting",
    name: "Auto Blog Posting",
    outcome:
      "Batch-posts content to WordPress with media management and SEO verification. Runs unattended.",
    meta: "Python · PowerShell · WordPress",
    external: true,
  },
  {
    n: "04",
    href: "https://github.com/Darkened-Z/wc26-automation",
    name: "WC26 Automation",
    outcome:
      "Scheduled workflow automation built for the 2026 World Cup content cycle.",
    meta: "Automation · Scheduling · 2026",
    external: true,
  },
];

const websiteDemos: Demo[] = [
  {
    n: "01",
    href: "https://nexus-clinic.com/",
    name: "Nexus Clinic",
    outcome:
      "Award-winning aesthetic clinic — doctor-led skin, hair and weight-loss treatments in KL.",
    meta: "Daiki Media · Aesthetic · KL",
    external: true,
  },
  {
    n: "02",
    href: "https://launchlaundry.com.my/",
    name: "Launch Laundry",
    outcome:
      "Commercial laundry equipment and end-to-end laundromat setup across Malaysia.",
    meta: "Daiki Media · Commercial · MY",
    external: true,
  },
  {
    n: "03",
    href: "https://www.holidayidea.com.my/",
    name: "Holiday Idea",
    outcome:
      "Affordable customised holiday packages worldwide — browse and book in one place.",
    meta: "Daiki Media · Travel · MY",
    external: true,
  },
  {
    n: "04",
    href: "https://cybrix.uk/",
    name: "Cybrix",
    outcome:
      "Social and content studio for startups — brand presence from pre-seed to Series B.",
    meta: "Personal · Agency · UK",
    external: true,
  },
  {
    n: "05",
    href: "https://www.adadesign.com.au/",
    name: "AD Design",
    outcome:
      "Architectural design across NSW — residential, medical and industrial buildings.",
    meta: "Personal · Architecture · AU",
    external: true,
  },
  {
    n: "06",
    href: "https://www.furnishings.com.my/",
    name: "Furnishing Solutions",
    outcome:
      "Premium vinyl flooring for Malaysian homes — supplied and professionally installed.",
    meta: "Personal · Interiors · MY",
    external: true,
  },
];

const competencies = [
  {
    label: "Custom Software",
    body: "Registers, dashboards, ERPs, internal tools. Built for the exact shape of one business — not a template stretched to fit.",
    icon: "software",
    demos: softwareDemos,
  },
  {
    label: "Workflow Automation",
    body: "WhatsApp bots, WordPress pipelines, scheduled workflows. The invisible plumbing that saves hours per week — written once, runs forever.",
    icon: "automation",
    demos: automationDemos,
  },
  {
    label: "Functional Websites",
    body: "Six live sites — three built during an internship at Daiki Media, three for personal clients. Fast, hand-written, no page-builder tax.",
    icon: "website",
    demos: websiteDemos,
  },
];

/* ------------------------------------------------------------------ */
/* Sketch-style SVG icons for the Core Competence section              */
/* ------------------------------------------------------------------ */

function SketchIcon({ kind }: { kind: string }) {
  const stroke = "var(--paper-ink)";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "software") {
    // Register / laptop-style software UI mock
    return (
      <svg viewBox="0 0 220 160" className="h-28 w-full" aria-hidden>
        <rect x="30" y="26" width="160" height="100" rx="6" {...common} />
        <rect x="42" y="38" width="136" height="60" rx="3" {...common} />
        <path d="M46 116h128" {...common} />
        <circle cx="52" cy="122" r="2.5" {...common} />
        <circle cx="60" cy="122" r="2.5" {...common} />
        <path d="M68 122h100" {...common} />
        <text
          x="110"
          y="72"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="18"
          fill={stroke}
        >
          $350
        </text>
        <path d="M52 52l6 4M162 52l6 4" {...common} opacity="0.6" />
        <path d="M50 138q40 12 120 0" {...common} opacity="0.4" />
      </svg>
    );
  }

  if (kind === "automation") {
    // Bot / chatbox / automation icon
    return (
      <svg viewBox="0 0 220 160" className="h-28 w-full" aria-hidden>
        <rect x="40" y="18" width="140" height="124" rx="16" {...common} />
        <path d="M78 18v-6M142 18v-6" {...common} />
        <circle cx="88" cy="60" r="4" fill={stroke} />
        <circle cx="132" cy="60" r="4" fill={stroke} />
        <path d="M80 84h60" {...common} />
        <rect x="52" y="102" width="80" height="18" rx="9" fill="var(--gold)" stroke={stroke} opacity="0.85" />
        <rect x="88" y="126" width="80" height="14" rx="7" fill={stroke} opacity="0.15" stroke={stroke} />
        <path d="M60 40q-8-4-14 4" {...common} />
        <path d="M160 40q8-4 14 4" {...common} />
      </svg>
    );
  }

  // website — browser frame with headline + CTA + cursor
  return (
    <svg viewBox="0 0 220 160" className="h-28 w-full" aria-hidden>
      {/* Browser frame */}
      <rect x="26" y="22" width="168" height="112" rx="4" {...common} />
      {/* Chrome bar */}
      <path d="M26 42h168" {...common} />
      <circle cx="36" cy="32" r="2" fill={stroke} />
      <circle cx="44" cy="32" r="2" fill={stroke} />
      <circle cx="52" cy="32" r="2" fill="var(--gold)" stroke={stroke} />
      <rect x="64" y="27" width="118" height="10" rx="5" {...common} opacity="0.5" />
      {/* Content: hero headline mock */}
      <rect x="40" y="54" width="90" height="10" rx="2" fill={stroke} stroke={stroke} />
      <rect x="40" y="70" width="66" height="4" rx="1" fill={stroke} opacity="0.4" stroke={stroke} />
      <rect x="40" y="80" width="80" height="4" rx="1" fill={stroke} opacity="0.4" stroke={stroke} />
      {/* CTA button */}
      <rect x="40" y="94" width="46" height="14" rx="2" fill="var(--gold)" stroke={stroke} />
      {/* Right-side visual block */}
      <rect x="140" y="54" width="42" height="60" rx="4" {...common} opacity="0.6" />
      <path d="M148 78l7 6 6-7 8 10" {...common} opacity="0.7" />
      <circle cx="154" cy="66" r="3" {...common} opacity="0.7" />
      {/* Cursor */}
      <path d="M112 116 L112 130 L117 126 L122 132 L125 129 L120 123 L127 122 Z" fill={stroke} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[color:var(--ink)]">
      {/* ---------------------------------------------------------- */}
      {/* Header — right-aligned tracked-caps nav                     */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--ink)]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-8">
          <a href="#top" className="flex items-center gap-3">
            <span aria-hidden className="text-[color:var(--gold)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 26V6h10a10 10 0 0 1 10 10 10 10 0 0 1-10 10z" />
                <path d="M6 16h6M6 20h4M6 12h4" />
              </svg>
            </span>
            <span className="font-crest text-[13px] text-[color:var(--cream)]">
              Zeeshan Khan
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#work"
              className="font-crest text-[11px] text-[color:var(--cream-3)] transition-colors hover:text-[color:var(--gold)]"
            >
              Work
            </a>
            <Link
              href="/software"
              className="font-crest text-[11px] text-[color:var(--cream-3)] transition-colors hover:text-[color:var(--gold)]"
            >
              Software
            </Link>
            <a
              href="#insights"
              className="font-crest text-[11px] text-[color:var(--cream-3)] transition-colors hover:text-[color:var(--gold)]"
            >
              Insights
            </a>
            <a
              href="#contact"
              className="font-crest text-[11px] text-[color:var(--cream-3)] transition-colors hover:text-[color:var(--gold)]"
            >
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden sm:inline-flex link-underline text-sm font-medium text-[color:var(--cream)]"
          >
            Send a brief
          </a>
        </div>
      </header>

      <main id="top">
        {/* -------------------------------------------------------- */}
        {/* Hero — dark, two-column editorial layout                 */}
        {/* -------------------------------------------------------- */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-5 pb-16 pt-10 sm:px-8 md:pt-16 lg:gap-x-8">

            {/* Left — text column */}
            <div className="col-span-12 lg:col-span-7">
              {/* Ornate crest wordmark — row with passport portrait on mobile */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-3">
                  <svg
                    aria-hidden
                    viewBox="0 0 120 80"
                    className="h-16 w-24 text-[color:var(--cream)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M60 8 L52 22 L36 20 L46 32 L28 36 L48 42 L36 56 L60 46 L84 56 L72 42 L92 36 L74 32 L84 20 L68 22 Z" />
                    <path d="M60 46 L60 70" />
                    <path d="M52 64 L60 70 L68 64" />
                    <circle cx="55" cy="20" r="1.2" fill="currentColor" />
                    <circle cx="65" cy="20" r="1.2" fill="currentColor" />
                  </svg>
                  <div className="font-crest text-2xl text-[color:var(--cream)]">
                    Zeeshan Khan
                  </div>
                  <span className="crest-rule font-mono-label text-[color:var(--cream-4)]">
                    Studio of One · Since 2025
                  </span>
                </div>

                {/* Mobile-only passport photo — sits in front of text, next to wordmark */}
                <div className="relative h-[120px] w-[90px] flex-shrink-0 overflow-hidden border border-[color:var(--line)]/30 lg:hidden">
                  <Image
                    src="/zeeshan.jpg"
                    alt="Zeeshan Khan"
                    fill
                    sizes="90px"
                    className="object-cover"
                    style={{ objectPosition: "center 75%" }}
                    priority
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 55%, var(--ink) 100%)" }}
                  />
                </div>
              </div>

              <h1 className="font-display mt-8 text-[clamp(2.25rem,7vw,6.5rem)] uppercase leading-[0.98] text-[color:var(--cream)]">
                Scale
                <br />
                Your Business.
                <br />
                <span className="text-[color:var(--gold)]">Today.</span>
              </h1>

              <p className="font-crest mt-5 max-w-[46ch] text-[clamp(0.7rem,2vw,1.25rem)] leading-[1.5] text-[color:var(--cream-3)] tracking-[0.16em] sm:tracking-[0.32em]">
                Software. Automation. Websites.
              </p>

              <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.75] text-[color:var(--cream-3)]">
                Small businesses deserve more than notebooks. I build the
                working software that lets a shop, salon or delivery kitchen{" "}
                <strong className="font-semibold text-[color:var(--cream)]">
                  run itself
                </strong>{" "}
                — <strong className="font-semibold text-[color:var(--cream)]">POS systems</strong>,{" "}
                <strong className="font-semibold text-[color:var(--cream)]">bookings</strong>,{" "}
                <strong className="font-semibold text-[color:var(--cream)]">order bots</strong>,{" "}
                <strong className="font-semibold text-[color:var(--cream)]">ERPs</strong>,{" "}
                <strong className="font-semibold text-[color:var(--cream)]">automations</strong>{" "}
                and the{" "}
                <strong className="font-semibold text-[color:var(--cream)]">websites</strong>{" "}
                that tie them together. Every build in the portfolio is a real
                working product — open one and try it.
              </p>

              {/* Milestone strip */}
              <div className="mt-8 border-y border-[color:var(--line)]">
                <dl className="grid grid-cols-2 divide-x divide-[color:var(--line)] sm:grid-cols-3 lg:grid-cols-5">
                  {[
                    {
                      value: "1+ YR",
                      label: "Engineering at Cybrix",
                      accent: false,
                    },
                    {
                      value: "03",
                      label: "Practice areas · Software · Automation · Websites",
                      accent: false,
                    },
                    {
                      value: "7 DAYS",
                      label: "From brief to first cut",
                      accent: false,
                    },
                    {
                      value: "24 HRS",
                      label: "Reply time on a brief",
                      accent: false,
                    },
                    {
                      value: "BSCS",
                      label: "FAST NUCES · Computer Science",
                      accent: true,
                    },
                  ].map((m) => (
                    <div
                      key={m.value}
                      className="flex flex-col gap-2 border-t border-[color:var(--line)] px-4 py-4 first:border-t-0 sm:border-t-0"
                    >
                      <dt
                        className={`font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none ${
                          m.accent
                            ? "text-[color:var(--gold)]"
                            : "text-[color:var(--cream)]"
                        }`}
                      >
                        {m.value}
                      </dt>
                      <dd className="font-mono-label leading-[1.35] text-[color:var(--cream-4)]">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 bg-[color:var(--cream)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition-colors hover:bg-[color:var(--gold)]"
                >
                  See the work
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="#contact"
                  className="link-underline text-sm font-medium tracking-wide text-[color:var(--cream-3)]"
                >
                  Or send a brief →
                </a>
              </div>
            </div>

            {/* Right — portrait column (desktop only) */}
            <aside className="col-span-12 max-lg:hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-start">
              <div className="relative h-[680px] w-full overflow-hidden">
                <Image
                  src="/zeeshan.jpg"
                  alt="Zeeshan Khan"
                  fill
                  sizes="38vw"
                  className="object-cover"
                  style={{ objectPosition: "center 75%" }}
                  priority
                />
                {/* Gradient blends: left + bottom + top into --ink */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, var(--ink) 0%, transparent 24%), " +
                      "linear-gradient(to top, var(--ink) 0%, transparent 42%), " +
                      "linear-gradient(to bottom, var(--ink) 0%, transparent 14%)",
                  }}
                />
                {/* Slight dark tint to desaturate the blue sky */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[color:var(--ink)]/15"
                />
                {/* Available badge */}
                <div className="absolute bottom-6 right-6">
                  <span className="font-mono-label inline-flex items-center gap-2 text-[color:var(--cream-4)]">
                    <span className="dot-live" /> Available · 2026
                  </span>
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Byline band                                               */}
        {/* -------------------------------------------------------- */}
        <section className="border-y border-[color:var(--line)] bg-[color:var(--ink-2)]">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-8 py-6 md:flex-row md:items-center">
            <div className="font-mono-label">
              Automation Engineer + Backend Developer @ Cybrix · Since 2025
            </div>
            <div className="font-mono-label">
              Freelance — software · automations · websites
            </div>
            <div className="font-mono-label inline-flex items-center gap-2">
              <span className="dot-live" /> Cooking a stealth startup
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Core Competence — light-break, § 01, with nested demos    */}
        {/* + featured client software (dark inset within paper)      */}
        {/* -------------------------------------------------------- */}
        <section
          id="work"
          className="scroll-mt-20 bg-[color:var(--paper)] text-[color:var(--paper-ink)]"
        >
          <div className="mx-auto max-w-[1400px] px-8 py-28">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <span className="crest-rule" style={{ color: "var(--paper-ink)" }}>
                <span className="font-crest text-[11px] text-[color:var(--paper-ink)]/70">
                  § 01 — Practice
                </span>
              </span>
            </div>
            <h2 className="font-display mx-auto text-center text-[clamp(2rem,5vw,4rem)] text-[color:var(--paper-ink)]">
              CORE COMPETENCE
            </h2>
            <p className="mx-auto mt-8 max-w-[54ch] text-center text-base leading-[1.75] text-[color:var(--paper-ink)]/70">
              Three disciplines under one roof — one builder, end-to-end.
              Reference demos are hand-built and open right in the browser;
              real client work is featured further down the section.
            </p>

            <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
              {competencies.map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <div
                    className="w-full rounded-[8px] border p-6"
                    style={{ borderColor: "rgba(30, 28, 23, 0.16)" }}
                  >
                    <SketchIcon kind={c.icon} />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-[color:var(--paper-ink)] md:text-3xl">
                    {c.label}
                  </h3>
                  <p className="max-w-[36ch] text-sm leading-relaxed text-[color:var(--paper-ink)]/70">
                    {c.body}
                  </p>

                  {/* Nested demo list — merged from the old Work section */}
                  {c.demos.length > 0 ? (
                    <ul
                      className="w-full space-y-3 border-t pt-5 text-left"
                      style={{ borderColor: "rgba(30, 28, 23, 0.16)" }}
                    >
                      {c.demos.map((demo) => {
                        const rowClass =
                          "group flex items-baseline justify-between gap-3 py-1.5";
                        const inner = (
                          <>
                            <span className="flex items-baseline gap-3">
                              <span className="font-crest text-[11px] text-[color:var(--paper-ink)]/45">
                                {demo.n}
                              </span>
                              <span>
                                <span className="flex flex-wrap items-baseline gap-2">
                                  <span className="block font-display text-base uppercase leading-tight text-[color:var(--paper-ink)] transition-colors group-hover:text-[color:var(--gold-2)]">
                                    {demo.name}
                                  </span>
                                  {demo.live && (
                                    <span className="inline-flex items-center gap-1 border border-[color:var(--paper-ink)]/25 bg-[color:var(--paper-ink)]/5 px-1.5 py-[1px] font-mono-label text-[9px] text-[color:var(--paper-ink)]/70">
                                      <span
                                        className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--gold-2)]"
                                        aria-hidden
                                      />
                                      Live client
                                    </span>
                                  )}
                                </span>
                                <span className="mt-1 block text-xs leading-snug text-[color:var(--paper-ink)]/60">
                                  {demo.outcome}
                                </span>
                              </span>
                            </span>
                            <span
                              aria-hidden
                              className="shrink-0 text-xs font-medium uppercase tracking-widest text-[color:var(--paper-ink)]/60 transition-transform duration-500 group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </>
                        );
                        return (
                          <li key={demo.href}>
                            {demo.external ? (
                              <a
                                href={demo.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={rowClass}
                              >
                                {inner}
                              </a>
                            ) : (
                              <Link href={demo.href} className={rowClass}>
                                {inner}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div
                      className="flex w-full flex-col items-start gap-3 border-t pt-5 text-left"
                      style={{ borderColor: "rgba(30, 28, 23, 0.16)" }}
                    >
                      <span className="font-mono-label">
                        Selective · one build per quarter
                      </span>
                      <Link
                        href="#contact"
                        className="group flex w-full items-baseline justify-between gap-3"
                      >
                        <span className="font-display text-base uppercase leading-tight text-[color:var(--paper-ink)] transition-colors group-hover:text-[color:var(--gold-2)]">
                          Yours next — brief me
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 text-xs font-medium uppercase tracking-widest text-[color:var(--paper-ink)]/60 transition-transform duration-500 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA to the dedicated /software route where real client work lives */}
            <div className="mt-20 flex flex-col items-center gap-4 border-t border-[color:var(--paper-ink)]/15 pt-14 text-center">
              <span className="font-mono-label text-[color:var(--paper-ink)]/60">
                Real client work + live embeds + reference demos
              </span>
              <Link
                href="/software"
                className="group inline-flex items-center gap-4 bg-[color:var(--paper-ink)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--paper)] transition-colors hover:bg-[color:var(--gold-2)] hover:text-[color:var(--paper-ink)]"
              >
                See the full software portfolio
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Insights — rounded dark card with yellow highlighter      */}
        {/* -------------------------------------------------------- */}
        <section id="insights" className="scroll-mt-20 border-b border-[color:var(--line)]">
          <div className="mx-auto max-w-[1400px] px-8 py-28">
            <div className="mb-14 flex flex-col items-start gap-4">
              <div className="font-mono-label">§ 02 — Insights</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase text-[color:var(--cream)]">
                Thoughts on solo software,
                <br />
                for small business.
              </h2>
            </div>

            <article className="grid grid-cols-1 gap-10 rounded-[var(--r-card)] border border-[color:var(--line)] bg-[color:var(--ink-3)] p-8 md:grid-cols-[220px_1fr] md:gap-14 md:p-12">
              <div className="flex flex-col items-center justify-center gap-6">
                {/* Sketch brain-like icon */}
                <svg
                  viewBox="0 0 220 220"
                  className="h-40 w-40 text-[color:var(--cream)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M110 30 c-30 0-50 22-46 46 c-16 8-18 34-2 44 c4 22 30 34 48 22" opacity="0.75" />
                  <path d="M110 30 c30 0 50 22 46 46 c16 8 18 34 2 44 c-4 22-30 34-48 22" opacity="0.75" />
                  <path d="M110 30 v130" opacity="0.4" />
                  <circle cx="88" cy="72" r="4" fill="currentColor" />
                  <circle cx="132" cy="72" r="4" fill="currentColor" />
                  <circle cx="76" cy="110" r="3" />
                  <circle cx="144" cy="110" r="3" />
                  <circle cx="110" cy="132" r="3" fill="var(--gold)" />
                  <path d="M60 150 Q110 190 160 150" opacity="0.55" />
                  <path d="M70 168 Q110 200 150 168" opacity="0.35" />
                </svg>
                <span className="font-mono-label text-center">
                  On building
                </span>
              </div>

              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] uppercase text-[color:var(--cream)]">
                  The interface between design and code
                </h3>
                <div className="mt-6 space-y-6 text-[16px] leading-[1.85] text-[color:var(--cream-3)]">
                  <p>
                    The tools do not matter as much as people say. In digital
                    product work, the real interface lies between{" "}
                    <span className="mark-gold">design and code</span> — and
                    between the shop owner and the thing on the screen.
                  </p>
                  <p>
                    A well-structured schema, a clean layout, and a hand that
                    knows what to leave out will beat any new framework. What
                    small businesses need is not a bigger dashboard. It is{" "}
                    <span className="mark-gold">
                      the one thing that keeps breaking to stop breaking
                    </span>
                    .
                  </p>
                  <p>
                    Strong products come long before the tooling arrives — from
                    clear thinking, precise decisions, and a deep understanding
                    of the person on the other side of the counter.{" "}
                    <span className="mark-gold">
                      Direction remains a human responsibility.
                    </span>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Contact                                                   */}
        {/* -------------------------------------------------------- */}
        <section
          id="contact"
          className="scroll-mt-20 bg-[color:var(--ink)]"
        >
          <div className="mx-auto max-w-[1400px] px-8 py-32">
            <div className="mx-auto max-w-[880px] text-center">
              <div className="mb-6 font-mono-label">§ 03 — Contact</div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[1.02] text-[color:var(--cream)]">
                Got a process
                <br />
                that should{" "}
                <span className="text-[color:var(--gold)]">run itself?</span>
              </h2>
              <p className="mx-auto mt-10 max-w-[54ch] text-[17px] leading-[1.75] text-[color:var(--cream-3)]">
                Send one message describing the problem. I&rsquo;ll reply
                within a working day with whether software fixes it, and how
                fast.
              </p>
            </div>

            <div className="mx-auto mt-20 grid max-w-[1000px] grid-cols-1 gap-14 border-t border-[color:var(--line)] pt-14 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-mono-label">Email</span>
                <a
                  href="mailto:7eeshan.khan@gmail.com"
                  className="font-display break-all text-xl uppercase leading-tight text-[color:var(--cream)] transition-colors hover:text-[color:var(--gold)] md:text-3xl lg:text-4xl"
                >
                  7eeshan.khan@gmail.com
                </a>
                <span className="text-sm text-[color:var(--cream-4)]">
                  Two paragraphs on the process that keeps breaking. That is the whole brief.
                </span>
              </div>

              <div className="flex flex-col gap-3 md:items-end md:text-right">
                <span className="font-mono-label">Elsewhere</span>
                <a
                  href="https://www.linkedin.com/in/zeeshan-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-3xl uppercase leading-tight text-[color:var(--cream)] transition-colors hover:text-[color:var(--gold)] md:text-4xl"
                >
                  LinkedIn ↗
                </a>
                <span className="text-sm text-[color:var(--cream-4)]">
                  For the slower conversations.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- */}
      {/* Footer                                                      */}
      {/* ---------------------------------------------------------- */}
      <footer className="bg-[color:var(--ink)] text-[color:var(--cream-4)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-[color:var(--line)] px-8 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono-label">
            © 2026 — Zeeshan Khan — Freelance software engineer
          </div>
          <div className="font-mono-label flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="dot-live" /> Booking July 2026
            </span>
            <a href="#work" className="transition-colors hover:text-[color:var(--gold)]">Work</a>
            <Link href="/software" className="transition-colors hover:text-[color:var(--gold)]">Software</Link>
            <a href="#insights" className="transition-colors hover:text-[color:var(--gold)]">Insights</a>
            <a href="#contact" className="transition-colors hover:text-[color:var(--gold)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
