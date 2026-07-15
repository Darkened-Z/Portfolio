"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Some third-party sites refuse embedding via X-Frame-Options / CSP
// frame-ancestors. The iframe stays blank with no error event, so we
// surface a fallback CTA if `onLoad` never fires within this window.
const IFRAME_LOAD_TIMEOUT_MS = 6000;

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  screenshot: string;
  credentials?: { user: string; pass: string };
  stack?: string[];
  clientLabel?: string;
};

export default function ProductShowcase({ product }: { product: Product }) {
  const [live, setLive] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [frameBlocked, setFrameBlocked] = useState(false);
  const [copied, setCopied] = useState<"user" | "pass" | null>(null);

  useEffect(() => {
    if (!live) {
      setFrameLoaded(false);
      setFrameBlocked(false);
      return;
    }
    const t = window.setTimeout(() => {
      if (!frameLoaded) setFrameBlocked(true);
    }, IFRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [live, frameLoaded]);

  const copy = async (kind: "user" | "pass", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <article id={product.slug} className="flex flex-col overflow-hidden border border-[color:var(--line-strong)] bg-[color:var(--ink-2)]">
      {/* Preview surface */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--line)] bg-[color:var(--ink-3)]">
        {live ? (
          <>
            <iframe
              src={product.url}
              title={product.name}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              sandbox="allow-forms allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setFrameLoaded(true)}
            />
            {frameBlocked && !frameLoaded && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[color:var(--ink)]/85 p-6 text-center">
                <div className="max-w-xs">
                  <div className="font-mono-label mb-3 text-[color:var(--gold)]">
                    Embed refused
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-[color:var(--cream-3)]">
                    This site blocks being embedded in another window.
                    Open it in a new tab to try it.
                  </p>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-[color:var(--gold)] bg-[color:var(--ink)]/90 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]"
                  >
                    Open in new tab ↗
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Image
              src={product.screenshot}
              alt={`${product.name} — screenshot`}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-top"
              priority={false}
            />
            <button
              type="button"
              onClick={() => setLive(true)}
              className="absolute inset-0 flex items-center justify-center bg-[color:var(--ink)]/60 opacity-0 transition-opacity duration-500 hover:opacity-100"
              aria-label={`Load live embed of ${product.name}`}
            >
              <span className="inline-flex items-center gap-3 border border-[color:var(--gold)] bg-[color:var(--ink)]/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]">
                Try in this window ↺
              </span>
            </button>
          </>
        )}
        {live && (
          <button
            type="button"
            onClick={() => setLive(false)}
            className="absolute right-3 top-3 z-10 border border-[color:var(--cream)]/40 bg-[color:var(--ink)]/80 px-3 py-1.5 font-mono-label text-[color:var(--cream)] backdrop-blur-sm transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            × Close
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl uppercase leading-tight text-[color:var(--cream)] sm:text-3xl">
            {product.name}
          </h3>
          {product.clientLabel && (
            <span className="font-mono-label shrink-0 text-right">
              {product.clientLabel}
            </span>
          )}
        </div>

        <p className="text-[color:var(--cream)]/85 leading-relaxed">
          {product.tagline}
        </p>

        <p className="text-sm text-[color:var(--cream-3)] leading-relaxed">
          {product.description}
        </p>

        {product.stack && product.stack.length > 0 && (
          <ul className="flex flex-wrap gap-x-2 gap-y-1 pt-1">
            {product.stack.map((s) => (
              <li
                key={s}
                className="font-mono-label border border-[color:var(--line-strong)] px-2 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {product.credentials && (
          <div className="mt-1 border-t border-[color:var(--line)] pt-4">
            <div className="font-mono-label mb-2 text-[color:var(--gold)]">
              Demo credentials · click to copy
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => copy("user", product.credentials!.user)}
                className="group flex-1 border border-[color:var(--line-strong)] bg-[color:var(--ink)] px-3 py-2 text-left transition-colors hover:border-[color:var(--gold)]"
              >
                <div className="font-mono-label">User</div>
                <div className="font-mono text-sm text-[color:var(--cream)]">
                  {copied === "user" ? "Copied ✓" : product.credentials.user}
                </div>
              </button>
              <button
                type="button"
                onClick={() => copy("pass", product.credentials!.pass)}
                className="group flex-1 border border-[color:var(--line-strong)] bg-[color:var(--ink)] px-3 py-2 text-left transition-colors hover:border-[color:var(--gold)]"
              >
                <div className="font-mono-label">Pass</div>
                <div className="font-mono text-sm text-[color:var(--cream)]">
                  {copied === "pass" ? "Copied ✓" : product.credentials.pass}
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="mt-2 flex flex-col gap-3 border-t border-[color:var(--line)] pt-5 sm:flex-row">
          {!live && (
            <button
              type="button"
              onClick={() => setLive(true)}
              className="inline-flex items-center justify-between gap-6 bg-[color:var(--cream)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition-colors hover:bg-[color:var(--gold)]"
            >
              <span>Try live · in this window</span>
              <span aria-hidden>↺</span>
            </button>
          )}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-6 border border-[color:var(--cream)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--cream)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <span>Open in new tab</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
