import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    term: "learn by building",
    detail:
      "Concepts stick when they survive contact with a real project. Start smaller than feels impressive, ship sooner than feels ready.",
  },
  {
    term: "share what's useful",
    detail:
      "No theory for theory's sake. If it won't help someone's ordinary Tuesday, it doesn't make the page.",
  },
  {
    term: "enjoy the process",
    detail:
      "The typos, the bugs, the “it works but I don't know why” moments — half the craft is learning to laugh inside them.",
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* sticky intro column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[13px] text-teal">{"// 02 · about"}</p>
                <h2
                  id="about-heading"
                  className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                >
                  Learning by building, in public.
                </h2>

                <div className="relative mt-10 rounded-lg border border-line bg-card p-6 pt-7">
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 left-5 font-display text-7xl leading-none text-teal/60"
                  >
                    “
                  </span>
                  <p className="font-display text-xl font-medium leading-snug text-ink">
                    Understand it past the syntax — down to the bone.
                  </p>
                  <p className="mt-3 font-mono text-xs text-ink-faint">
                    the whole philosophy in one line
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* flowing copy + principles */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ink">
                Code to the Bone started from one stubborn belief: you learn fastest when your
                hands are on the keyboard. Read the docs, sure — then build the small thing,
                break it, fix it, and only then call it understood.
              </p>
              <p className="mt-5 leading-relaxed text-ink-soft">
                Everything on the page comes out of that loop. Useful discoveries get passed
                along while they're still warm — if something saved an evening of
                head-scratching, it's worth a post. If it didn't, it doesn't get posted.
              </p>

              <dl className="mt-10 border-t border-line">
                {PRINCIPLES.map((p) => (
                  <div
                    key={p.term}
                    className="grid gap-2 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-6"
                  >
                    <dt className="font-mono text-sm font-medium text-teal">
                      <span className="mr-2 text-ink-faint">{">_"}</span>
                      {p.term}
                    </dt>
                    <dd className="m-0 text-[15px] leading-relaxed text-ink-soft">{p.detail}</dd>
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
