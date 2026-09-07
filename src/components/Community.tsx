import { FACEBOOK_PAGE_URL } from "../lib/config";
import { FacebookIcon } from "./Icons";
import Reveal from "./Reveal";

const FEED_HIGHLIGHTS = [
  "Practical tips — one good one at a time",
  "Weekend-scale projects with real finish lines",
  "Humor for the late-night bug hunt",
  "The occasional “it works — and here's why”",
];

export default function Community() {
  return (
    <section id="community" aria-labelledby="community-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <div className="on-dark relative overflow-hidden rounded-lg border border-navy-700 bg-navy-900 text-surface">
            {/* faint blueprint dots on dark */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(rgba(11,196,234,0.07) 1px, transparent 1.3px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-14 -right-2 select-none font-mono text-[180px] leading-none text-cyan/6"
            >
              {"}"}
            </span>
            {/* thin cyan edge along the top */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-cyan" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4">
                  <p className="m-0 font-mono text-xs font-medium tracking-[0.28em] text-cyan-bright">
                    03 <span className="text-cyan">/</span> COMMUNITY
                  </p>
                  <span aria-hidden="true" className="h-px w-10 bg-cyan/60" />
                  <span aria-hidden="true" className="h-px flex-1 bg-navy-700" />
                </div>

                <h2
                  id="community-heading"
                  className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]"
                >
                  Keep building.
                  <br />
                  <span className="text-cyan">Keep learning.</span>
                </h2>

                <p className="mt-5 max-w-xl leading-relaxed text-[#a9bdd2]">
                  Follow for practical coding tips, small projects to try, and a little
                  developer humor between builds. Bring your questions and what you're working on.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md bg-cyan px-5 py-3 text-[15px] font-semibold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-soft"
                  >
                    <FacebookIcon className="h-4.5 w-4.5" />
                    Follow on Facebook
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-md border border-navy-700 bg-navy-800 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="m-0 font-mono text-xs tracking-[0.2em] text-cyan-bright">
                      {"// IN YOUR FEED"}
                    </p>
                  </div>
                  <ul className="mt-5">
                    {FEED_HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-navy-700 py-3.5 text-[15px] leading-snug text-codefg last:border-b-0"
                      >
                        <span aria-hidden="true" className="font-mono font-bold text-cyan">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
