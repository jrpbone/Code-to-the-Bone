import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    num: "01",
    term: "Learn by building",
    detail: "Concepts stick only after they survive a real build. Ship smaller than feels impressive, sooner than feels ready.",
  },
  {
    num: "02",
    term: "Share what's useful",
    detail: "If it saved an evening of head-scratching, it earns a post. If it won't help someone's ordinary Tuesday, it doesn't.",
  },
  {
    num: "03",
    term: "Enjoy the process",
    detail: "The typos, the bugs, the mystery fixes — half the craft is learning to laugh inside them.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-y border-linecool bg-paleblue"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* sticky intro column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-4">
                  <p className="m-0 font-mono text-xs font-medium tracking-[0.28em] text-teal">
                    02 <span className="text-cyan">/</span> ABOUT
                  </p>
                  <span aria-hidden="true" className="h-px w-10 bg-cyan" />
                  <span aria-hidden="true" className="h-px flex-1 bg-linecool" />
                </div>

                <h2
                  id="about-heading"
                  className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-navy-800 sm:text-[2.4rem]"
                >
                  Learning by building, <span className="text-teal">in public.</span>
                </h2>

                <blockquote className="relative m-0 mt-10 rounded-md border border-linecool bg-surface p-6 pt-7 shadow-[0_18px_40px_-32px_rgba(13,42,74,0.5)]">
                  <span aria-hidden="true" className="absolute inset-y-6 left-0 w-[3px] rounded-full bg-cyan" />
                  <p className="m-0 font-display text-xl font-medium leading-snug text-navy-800">
                    “Understand it past the syntax — down to the bone.”
                  </p>
                  <footer className="mt-3 font-mono text-xs text-slate">
                    — the whole philosophy, one line
                  </footer>
                </blockquote>
              </div>
            </Reveal>
          </div>

          {/* flowing copy + principles */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <p className="m-0 text-lg leading-relaxed text-navy-700">
                Code to the Bone exists because reading docs is only half the loop. You make the
                small thing, break it, fix it — and only then call it understood.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                The page passes along whatever proved useful this week: a shortcut, a snippet, a
                project pattern — shared while it's still warm.
              </p>

              <dl className="mt-10 border-t border-linecool">
                {PRINCIPLES.map((p) => (
                  <div
                    key={p.num}
                    className="grid gap-2 border-b border-linecool py-6 sm:grid-cols-[64px_200px_1fr] sm:gap-5"
                  >
                    <span aria-hidden="true" className="font-mono text-sm font-medium text-cyan">
                      {p.num}
                    </span>
                    <dt className="font-display text-[16px] font-bold text-navy-800">{p.term}</dt>
                    <dd className="m-0 text-[15px] leading-relaxed text-slate">{p.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
