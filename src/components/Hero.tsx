import type { CSSProperties } from "react";
import { FACEBOOK_PAGE_URL } from "../lib/config";
import { ArrowDownIcon, FacebookIcon } from "./Icons";
import CodeWindow from "./CodeWindow";
import Reveal from "./Reveal";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* quiet teal wash, top-right — flat, no glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-12%] h-[560px] w-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(46,110,98,0.09) 0%, transparent 65%)",
        }}
      />
      {/* oversized brace watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-6 hidden select-none font-mono text-[200px] leading-none text-ink/[0.04] lg:block"
      >
        {"{ }"}
      </span>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* copy */}
          <div className="lg:col-span-6">
            <p className="fade-in font-mono text-[13px] text-teal" style={d(0.05)}>
              <span className="text-ink-faint">{"~/"}</span>facebook/code-to-the-bone
            </p>

            <h1
              id="hero-heading"
              className="mt-5 font-display text-[2.55rem] font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              <span className="mask-line" style={d(0.12)}>
                <span>Learn it.</span>
              </span>
              <span className="mask-line" style={d(0.24)}>
                <span>Build it.</span>
              </span>
              <span className="mask-line" style={d(0.36)}>
                <span className="text-teal">Code to the Bone.</span>
              </span>
            </h1>

            <p
              className="fade-in mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
              style={d(0.5)}
            >
              Code to the Bone is a Facebook page for people who learn best with their hands on
              the keyboard — short practical tips, small projects with real finish lines, and the
              occasional joke about naming things. No fluff. Just the essentials, stripped down.
            </p>

            <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={d(0.62)}>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-5 py-3 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
                Follow on Facebook
              </a>
              <a
                href="#content"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-teal hover:text-teal-deep"
              >
                Explore the Content
                <ArrowDownIcon className="h-4 w-4 text-teal" />
              </a>
            </div>

            <p className="fade-in mt-5 font-mono text-xs text-ink-faint" style={d(0.74)}>
              free to follow · posts land in your feed · zero spam
            </p>
          </div>

          {/* code window */}
          <div className="lg:col-span-6">
            <Reveal delay={220} className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-teal/30 bg-teal-mist/60"
              />
              <div className="relative">
                <CodeWindow />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const TICKER_ITEMS = [
  "practical tips",
  "weekend projects",
  "dev humor",
  "git & shell",
  "css that finally centers",
  "learn by building",
  "read → build → repeat",
  "code to the bone",
];

function TickerRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap py-3 font-mono text-[13px] text-ink-soft">
            {item}
          </span>
          <span className="mx-7 font-mono text-[13px] text-teal/70">{"{ }"}</span>
        </span>
      ))}
    </div>
  );
}

/** Slow-drifting strip of topics under the hero. Decorative — pauses on hover. */
export function MarqueeStrip() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-card/70" aria-hidden="true">
      <div className="marquee-track flex w-max">
        <TickerRun />
        <TickerRun hidden />
      </div>
    </div>
  );
}
