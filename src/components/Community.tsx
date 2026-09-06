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
          <div className="on-dark relative overflow-hidden rounded-xl bg-coal text-paper">
            {/* dot texture on dark */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(rgba(250,246,239,0.05) 1px, transparent 1.3px)",
                backgroundSize: "22px 22px",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -right-3 select-none font-mono text-[170px] leading-none text-paper/[0.045]"
            >
              {"}"}
            </span>

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
              <div className="lg:col-span-7">
                <p className="font-mono text-[13px] text-teal-foam">{"// 03 · community"}</p>
                <h2
                  id="community-heading"
                  className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]"
                >
                  The page is new.
                  <br />
                  Pull up a chair.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-paper-dim">
                  Code to the Bone is just getting started — which means you're early, not late.
                  Follow the page now and the next tip, project, and questionable pun will land
                  in your feed the moment it's written.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-teal-bright px-5 py-3 text-[15px] font-semibold text-coal transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-foam"
                  >
                    <FacebookIcon className="h-[18px] w-[18px]" />
                    Follow on Facebook
                  </a>
                </div>
                <p className="mt-5 font-mono text-xs text-[#8b8574]">
                  no follower counts here — just good posts when they're ready
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-lg border border-coal-line bg-coal-raise p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-teal-foam">{"// coming next"}</p>
                    <p className="font-mono text-[11px] text-[#8b8574]">status: warming up</p>
                  </div>
                  <ul className="mt-5">
                    {COMING_NEXT.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-coal-line py-3.5 text-[15px] leading-snug text-[#eae4d6] last:border-b-0"
                      >
                        <span aria-hidden="true" className="font-mono text-teal-foam">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-[11px] leading-relaxed text-[#8b8574]">
                    * everything above the fold is sample material — the real thing ships on the
                    page.
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
