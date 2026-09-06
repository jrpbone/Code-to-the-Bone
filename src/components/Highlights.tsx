import type { ReactNode } from "react";
import { CheckIcon } from "./Icons";
import Reveal from "./Reveal";

function SampleTag() {
  return (
    <span className="inline-flex items-center rounded-full border border-teal/40 bg-teal-mist/70 px-2.5 py-0.5 font-mono text-[11px] text-teal-deep">
      sample
    </span>
  );
}

function ArtifactCard({ rotate, children }: { rotate: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-lg border border-line bg-card p-5 shadow-[0_14px_30px_-24px_rgba(38,35,29,0.5)] transition-transform duration-300 hover:rotate-0 ${rotate}`}
    >
      {children}
    </div>
  );
}

const TIP_ARTIFACT = (
  <ArtifactCard rotate="-rotate-[0.6deg]">
    <div className="flex items-center justify-between gap-3">
      <SampleTag />
      <span className="font-mono text-[11px] text-ink-faint">practical tip</span>
    </div>
    <p className="mt-4 font-mono text-sm leading-relaxed text-ink">
      <span className="text-teal">$</span> rename it until it reads like prose
    </p>
    <p className="mt-4 border-t border-line-soft pt-3 text-sm leading-relaxed text-ink-soft">
      Small habits that save hours — shared one at a time, tested on real code first.
    </p>
  </ArtifactCard>
);

const PROJECT_ITEMS = [
  { label: "A script that renames your screenshots", done: true },
  { label: "A 30-line budget tracker", done: false },
  { label: "This very landing page", done: true },
];

const PROJECT_ARTIFACT = (
  <ArtifactCard rotate="rotate-[0.6deg]">
    <div className="flex items-center justify-between gap-3">
      <SampleTag />
      <span className="font-mono text-[11px] text-ink-faint">weekend-scale builds</span>
    </div>
    <ul className="mt-4 space-y-2.5">
      {PROJECT_ITEMS.map((item) => (
        <li key={item.label} className="flex items-start gap-3 text-sm text-ink">
          <span
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
              item.done ? "border-teal bg-teal text-paper" : "border-line bg-paper"
            }`}
          >
            {item.done && <CheckIcon className="h-2.5 w-2.5" />}
          </span>
          <span className="leading-snug">{item.label}</span>
          <span
            className={`ml-auto shrink-0 pt-0.5 font-mono text-[10px] ${
              item.done ? "text-teal" : "text-ink-faint"
            }`}
          >
            {item.done ? "shipped" : "next"}
          </span>
        </li>
      ))}
    </ul>
  </ArtifactCard>
);

const HUMOR_ARTIFACT = (
  <ArtifactCard rotate="-rotate-[0.4deg]">
    <div className="flex items-center justify-between gap-3">
      <SampleTag />
      <span className="font-mono text-[11px] text-ink-faint">dev humor</span>
    </div>
    <blockquote className="mt-4 text-[15px] font-medium leading-relaxed text-ink">
      “There are only two hard things in computer science: cache invalidation, naming things,
      and off-by-one errors.”
    </blockquote>
    <p className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 font-mono text-[11px] text-ink-faint">
      <span>groans: 4/5</span>
      <span>recurrences: weekly</span>
    </p>
  </ArtifactCard>
);

const TOPICS = [
  {
    index: "01",
    title: "Practical coding tips",
    description:
      "Short, tested notes from real work — the git command you actually reach for, the CSS trick that finally centers the thing, the refactor that earns its keep. Read one, try it, keep what helps.",
    artifact: TIP_ARTIFACT,
  },
  {
    index: "02",
    title: "Small projects",
    description:
      "Tiny builds with clear finish lines: a script, a page, a weekend tool. Projects small enough to ship and sharp enough to teach you something on the way.",
    artifact: PROJECT_ARTIFACT,
  },
  {
    index: "03",
    title: "Developer humor",
    description:
      "Because debugging at 11 p.m. deserves company. Gentle, nerdy jokes about naming things, off-by-one errors, and the cache that was never actually the problem.",
    artifact: HUMOR_ARTIFACT,
  },
];

export default function Highlights() {
  return (
    <section id="content" aria-labelledby="content-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[13px] text-teal">{"// 01 · what you'll find"}</p>
              <h2
                id="content-heading"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Three things, done properly.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                Every post on the page lands in one of these buckets. The cards on the right are
                clearly marked samples — the real ones will live on Facebook.
              </p>
            </div>
            <p className="rounded-md border border-line bg-card px-3 py-2 font-mono text-xs text-ink-faint">
              below: sample content only
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {TOPICS.map((topic, i) => (
            <Reveal key={topic.index} delay={i * 90}>
              <article className="group grid gap-7 border-b border-line px-2 py-10 transition-colors duration-300 hover:bg-card/80 sm:px-4 lg:grid-cols-12 lg:items-start lg:gap-10">
                <div className="lg:col-span-1">
                  <span className="font-mono text-sm font-medium text-teal">{topic.index}</span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-teal-deep">
                    {topic.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                    {topic.description}
                  </p>
                </div>
                <div className="lg:col-span-5">{topic.artifact}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
