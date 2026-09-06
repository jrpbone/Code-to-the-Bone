import { FACEBOOK_PAGE_URL } from "../lib/config";
import { FacebookIcon } from "./Icons";
import Reveal from "./Reveal";

const COMING_NEXT = [
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
              className="pointer-events-none absolute -bottom-14 -right-2 select-none font-mono text-[180px] leading-none text-cyan/[0.06]"
            >
              {"}"}
            </span>
            {/* thin cyan edge along the top */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-cyan" />

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
                  The page is new.
                  <br />
                  <span className="text-cyan">Pull up a chair.</span>
                </h2>

                <p className="mt-5 max-w-xl leading-relaxed text-[#a9bdd2]">
                  You're early, not late. Follow now and the next tip, project, and questionable
                  pun lands in your feed the moment it's written.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md bg-cyan px-5 py-3 text-[15px] font-semibold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-soft"
                  >
                    <FacebookIcon className="h-[18px] w-[18px]" />
                    Follow on Facebook
                  </a>
                </div>
                <p className="mt-5 font-mono text-xs text-[#7d97b2]">
                  no follower counts to report — just posts when they're ready
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-md border border-navy-700 bg-navy-800 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="m-0 font-mono text-xs tracking-[0.2em] text-cyan-bright">
                      {"// COMING NEXT"}
                    </p>
                    <p className="m-0 font-mono text-[11px] text-[#7d97b2]">status: warming up</p>
                  </div>
                  <ul className="mt-5">
                    {COMING_NEXT.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-navy-700 py-3.5 text-[15px] leading-snug text-[#d5e4f4] last:border-b-0"
                      >
                        <span aria-hidden="true" className="font-mono font-bold text-cyan">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-[11px] leading-relaxed text-[#7d97b2]">
                    * the previews above the fold are sample material — the real thing ships on
                    the page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
