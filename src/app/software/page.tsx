import type { Metadata } from "next";
import Link from "next/link";
import ProductShowcase, {
  type Product,
} from "@/components/ProductShowcase";

export const metadata: Metadata = {
  title: "Software work",
  description:
    "Custom software shipped for real clients — Devora POS, Adil Fuel Supply, Demo Gym — plus reference implementations you can try in the browser.",
};

/* ------------------------------------------------------------------ */
/* Real client products with embed windows                             */
/* ------------------------------------------------------------------ */

const clientProducts: Product[] = [
  {
    slug: "devora-pos",
    name: "Devora POS",
    tagline:
      "Restaurant point-of-sale — take orders, fire tickets to the kitchen, settle bills, watch sales.",
    description:
      "Built for a small restaurant running counter-service on paper. Dine-in, takeaway and delivery in one screen. Sales log builds itself in the background.",
    url: "https://devora.pos.goxx.app/login",
    screenshot: "/work/devora-pos.png",
    credentials: { user: "admin@demo", pass: "admin123" },
    stack: ["Next.js", "Node", "PostgreSQL"],
    clientLabel: "Restaurant · Faisalabad",
  },
  {
    slug: "adil-fuel-supply",
    name: "Adil Fuel Supply",
    tagline:
      "Daily ledger system for a fuel supply operation — replaces three notebooks a week.",
    description:
      "Owner logs every drum, delivery and receivable. Balances close automatically at end of day. Built to match the exact shape of the paperwork it replaced.",
    url: "https://demo.fuel.goxx.app/",
    screenshot: "/work/demo-fuel.png",
    stack: ["Next.js", "PostgreSQL"],
    clientLabel: "Fuel supply · Faisalabad",
  },
];

const externalClientLinks = [
  {
    name: "Demo Gym",
    outcome:
      "Front-desk + member portal for a neighbourhood gym. Staff run reception, payments, attendance and reports; members sign in with a code only.",
    meta: "Gym · Faisalabad · Bilingual EN / اردو",
    url: "https://demo.gym.goxx.app/",
    stack: ["Next.js", "PostgreSQL", "i18n"],
  },
];

const referenceImplementations = [
  {
    n: "01",
    href: "/pos",
    name: "Point of Sale",
    outcome:
      "Ring up orders, take payment, print receipts, watch the sales log build itself. The same category as Devora POS — built as a capability sample.",
    meta: "Restaurant · Counter service · Takeaway",
  },
  {
    n: "02",
    href: "/money-tracker",
    name: "Money Tracker",
    outcome:
      "Categorised income + expenses, monthly dashboard, budget alerts. Meant for a solo owner or a small studio.",
    meta: "Solo owner · Freelancer · Studio",
  },
  {
    n: "03",
    href: "/erp",
    name: "ERP / Business Manager",
    outcome:
      "Inventory, sales, staff and customers on one screen. Low-stock alerts, sales-stock sync, replaces three notebooks with one dashboard.",
    meta: "Wholesale · Small manufacturing",
  },
];

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-[color:var(--ink)] text-[color:var(--cream)]">
      {/* ---------------------------------------------------------- */}
      {/* Header                                                      */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--ink)]">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 sm:px-8">
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
            <span className="font-mono-label hidden text-[color:var(--cream-4)] sm:inline">
              /portfolio
            </span>
          </Link>

          <div className="text-right">
            <div className="font-mono-label text-[color:var(--gold)]">
              Practice
            </div>
            <div className="text-sm font-semibold text-[color:var(--cream)]">
              Custom Software
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* -------------------------------------------------------- */}
        {/* Intro                                                     */}
        {/* -------------------------------------------------------- */}
        <section className="border-b border-[color:var(--line)]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-20 sm:px-8 md:py-28">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono-label text-[color:var(--gold)]">
                § Software · Practice area
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h1 className="font-display text-[clamp(2.25rem,6vw,5rem)] uppercase leading-[1.02] text-[color:var(--cream)]">
                Custom software.
                <br />
                Shipped for clients.
              </h1>
              <p className="mt-8 max-w-[58ch] text-lg leading-[1.75] text-[color:var(--cream-3)]">
                Registers, dashboards, ERPs, internal tools — hand-written for
                the exact shape of one business. Three products currently
                running in production for real clients, plus a couple of
                reference implementations you can try live in the browser.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Live client products                                      */}
        {/* -------------------------------------------------------- */}
        <section className="border-b border-[color:var(--line)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
            <div className="grid grid-cols-12 gap-6 pb-12">
              <div className="col-span-12 md:col-span-4">
                <div className="font-mono-label text-[color:var(--gold)]">
                  Live for real clients
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.05] text-[color:var(--cream)]">
                  Try each one embedded here,
                  <br />
                  or open the standalone tab.
                </h2>
                <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-[color:var(--cream-3)]">
                  Credentials are on each card — click to copy. The screenshot
                  turns into a live iframe when you hit &ldquo;Try
                  live&rdquo;.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {clientProducts.map((p) => (
                <ProductShowcase key={p.slug} product={p} />
              ))}
            </div>

            {/* External client links (no embed — server-side quirks) */}
            {externalClientLinks.length > 0 && (
              <div className="mt-14 border-t border-[color:var(--line)] pt-12">
                <div className="font-mono-label mb-6 text-[color:var(--gold)]">
                  Also live · standalone tab only
                </div>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {externalClientLinks.map((l) => (
                    <li
                      key={l.url}
                      className="border border-[color:var(--line-strong)] bg-[color:var(--ink-2)] p-6"
                    >
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-3"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-2xl uppercase leading-tight text-[color:var(--cream)] transition-colors group-hover:text-[color:var(--gold)]">
                            {l.name}
                          </h3>
                          <span
                            aria-hidden
                            className="font-mono-label shrink-0 text-[color:var(--cream-4)] transition-colors group-hover:text-[color:var(--gold)]"
                          >
                            Open ↗
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-[color:var(--cream-3)]">
                          {l.outcome}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2 border-t border-[color:var(--line)] pt-4">
                          <span className="font-mono-label">{l.meta}</span>
                          {l.stack.map((s) => (
                            <span
                              key={s}
                              className="font-mono-label border border-[color:var(--line)] px-2 py-0.5"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Reference implementations — internal demos                */}
        {/* -------------------------------------------------------- */}
        <section className="bg-[color:var(--paper)] text-[color:var(--paper-ink)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
            <div className="grid grid-cols-12 gap-6 pb-12">
              <div className="col-span-12 md:col-span-4">
                <div className="font-mono-label text-[color:var(--paper-ink)]/70">
                  Reference implementations
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.05] text-[color:var(--paper-ink)]">
                  Sandbox demos.
                  <br />
                  Hand-built. Yours to try.
                </h2>
                <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-[color:var(--paper-ink)]/70">
                  Not client work — capability samples so you can see the
                  shape of what I build. Full sample data, all state saved to
                  your browser only.
                </p>
              </div>
            </div>

            <ol className="border-t border-[color:var(--paper-ink)]/20">
              {referenceImplementations.map((d) => (
                <li
                  key={d.href}
                  className="border-b border-[color:var(--paper-ink)]/15"
                >
                  <Link
                    href={d.href}
                    className="group grid grid-cols-12 items-baseline gap-4 py-8"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-crest text-[color:var(--paper-ink)]/50">
                        {d.n}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-8">
                      <h3 className="font-display text-2xl uppercase leading-tight text-[color:var(--paper-ink)] transition-colors group-hover:text-[color:var(--gold-2)] md:text-3xl">
                        {d.name}
                      </h3>
                      <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[color:var(--paper-ink)]/70">
                        {d.outcome}
                      </p>
                    </div>
                    <div className="col-span-8 md:col-span-2">
                      <span className="font-mono-label text-[color:var(--paper-ink)]/60">
                        {d.meta}
                      </span>
                    </div>
                    <div className="col-span-4 md:col-span-1 md:text-right">
                      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[color:var(--paper-ink)]/70 transition-colors group-hover:text-[color:var(--gold-2)]">
                        Open
                        <span
                          aria-hidden
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* CTA back                                                  */}
        {/* -------------------------------------------------------- */}
        <section className="border-t border-[color:var(--line)] bg-[color:var(--ink)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="font-mono-label text-[color:var(--gold)]">
                Have something similar in mind?
              </div>
              <h2 className="font-display mt-6 text-[clamp(2rem,5vw,4rem)] uppercase leading-[1.05] text-[color:var(--cream)]">
                Send one message.
              </h2>
              <p className="mx-auto mt-6 max-w-[48ch] text-base leading-relaxed text-[color:var(--cream-3)]">
                Two paragraphs on the process that keeps breaking. That is the
                whole brief. Reply within a working day.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 bg-[color:var(--cream)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition-colors hover:bg-[color:var(--gold)]"
                >
                  Send a brief
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/"
                  className="link-underline text-sm font-medium tracking-wide text-[color:var(--cream-3)]"
                >
                  ← Back to portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
