import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

function SampleTag() {
  return (
    <span className="rounded-full border border-cyan/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-teal">
      sample
    </span>
  );
}

function CategoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-teal">
      {children}
    </p>
  );
}

/** Featured card — practical coding tips, with a tiny sample snippet. */
function FeaturedTipsCard() {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-linecool bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.4)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <CategoryLabel>tips</CategoryLabel>
        <SampleTag />
      </div>
      <span aria-hidden="true" className="mt-4 block h-[2px] w-10 bg-cyan" />

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy-800">
        Practical coding tips
      </h3>
      <p className="mt-3 leading-relaxed text-slate">
        Short, specific tips you can apply the same day — a git flag that saves a commit, a
        one-liner that replaces a loop, a shortcut that earns back ten minutes. One tip, one tiny
        example, nothing to skim past.
      </p>

      {/* sample tip artifact */}
      <div className="mt-6 overflow-hidden rounded-md border border-navy-700 bg-navy-900">
        <div className="flex items-center justify-between border-b border-navy-700 px-4 py-2">
          <span className="font-mono text-[11px] text-[#7d97b2]">tip № 001 — example</span>
          <span className="font-mono text-[11px] text-cyan">sh</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-codefg sm:text-[13px]">
          <code>
            <span className="text-slate-faint italic">{"# fix the last commit message, no new commit"}</span>
            {"\n"}
            <span className="text-cyan-bright">git</span> commit{" "}
            <span className="text-sand">--amend --no-edit</span>
          </code>
        </pre>
      </div>

      <p className="mt-auto pt-6 font-mono text-xs text-slate">
        format <span className="text-cyan">→</span> one tip · one example · real use case
      </p>
    </article>
  );
}

/** Compact card — small projects. */
function ProjectsCard() {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-linecool bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.4)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <CategoryLabel>projects</CategoryLabel>
        <SampleTag />
      </div>
      <span aria-hidden="true" className="mt-3 block h-[2px] w-10 bg-cyan" />

      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-navy-800">
        Small projects
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate">
        Weekend-scale builds with real finish lines — small enough to complete, complete enough
        to teach you something honest.
      </p>

      <ul className="mt-4 space-y-1.5 font-mono text-[12.5px] text-navy-700">
        <li>
          <span className="text-cyan">[ ]</span> fetch the forecast
        </li>
        <li>
          <span className="text-cyan">[ ]</span> shape it into clean json
        </li>
        <li>
          <span className="text-teal">[x]</span> understand every line you wrote
        </li>
      </ul>
      <p className="mt-auto pt-4 font-mono text-[11px] text-slate">
        a sample outline — not a published post
      </p>
    </article>
  );
}

/** Compact card — developer humor. */
function HumorCard() {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-linecool bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.4)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <CategoryLabel>humor</CategoryLabel>
        <SampleTag />
      </div>
      <span aria-hidden="true" className="mt-3 block h-[2px] w-10 bg-cyan" />

      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-navy-800">
        Developer humor
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate">
        The jokes we tell while the tests run. Dry, nerdy, and strictly for people who have
        mass-renamed a variable by accident.
      </p>

      <blockquote className="mt-4 m-0 rounded-md border-l-2 border-cyan bg-paleblue px-4 py-3 font-mono text-[12.5px] leading-relaxed text-navy-700">
        {"// I'd tell you a UDP joke,"}
        <br />
        {"// but you might not get it."}
      </blockquote>
      <p className="mt-auto pt-4 font-mono text-[11px] text-slate">sample joke — the archive lives on the page</p>
    </article>
  );
}

export default function Highlights() {
  return (
    <section id="content" aria-labelledby="content-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          num="01"
          label="EXPLORE"
          title={
            <span id="content-heading">
              What lives on the page<span className="text-cyan">.</span>
            </span>
          }
          blurb="Three threads, one feed. Everything below is sample material so you know the shape of things."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-7">
            <FeaturedTipsCard />
          </Reveal>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal delay={120} className="h-full">
              <ProjectsCard />
            </Reveal>
            <Reveal delay={220} className="h-full">
              <HumorCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
