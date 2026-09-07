import type { CSSProperties } from "react";
import { FACEBOOK_PAGE_URL } from "../lib/config";
import { ArrowDownIcon, FacebookIcon } from "./Icons";
import CodeWindow from "./CodeWindow";
import Reveal from "./Reveal";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* quiet pale-blue wash, top-right — flat, no glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 right-[-14%] h-145 w-145 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(11,196,234,0.10) 0%, transparent 65%)",
        }}
      />
      {/* oversized brace watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-4 hidden select-none font-mono text-[210px] leading-none text-navy-800/4.5 lg:block"
      >
        {"{ }"}
      </span>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* copy */}
          <div className="lg:col-span-6">
            <p className="fade-in m-0 font-mono text-[13px] text-teal" style={d(0.05)}>
              <span className="text-cyan">$</span> ~/facebook/code-to-the-bone
            </p>

            <h1
              id="hero-heading"
              className="mt-5 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-navy-800 sm:text-5xl lg:text-[3.4rem]"
            >
              <span className="mask-line" style={d(0.12)}>
                <span>Learn it. Build it.</span>
              </span>
              <span className="mask-line" style={d(0.24)}>
                <span>
                  Code{" "}
                  <mark className="box-decoration-clone rounded-sm bg-cyanmark px-1.5 text-navy-800 shadow-[inset_0_-0.28em_0_0_#8fe0f6]">
                    to&nbsp;the&nbsp;Bone.
                  </mark>
                </span>
              </span>
            </h1>

            <p className="fade-in mt-6 max-w-lg text-lg leading-relaxed text-slate" style={d(0.4)}>
              A Facebook page for people who learn with their hands on the keyboard — practical
              tips you can use today, small projects with real finish lines, and developer humor
              for the long debug nights.
            </p>

            <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={d(0.52)}>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-md bg-navy-800 px-5 py-3 text-[15px] font-medium text-surface transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
                Follow on Facebook
              </a>
              <a
                href="#content"
                className="inline-flex items-center gap-2 rounded-md border border-linecool bg-surface px-5 py-3 text-[15px] font-medium text-navy-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal hover:text-teal"
              >
                Explore the Content
                <ArrowDownIcon className="h-4 w-4 text-teal" />
              </a>
            </div>

            <p className="fade-in mt-5 font-mono text-xs text-slate" style={d(0.64)}>
              free to follow <span className="text-cyan">·</span> posts land in your feed{" "}
              <span className="text-cyan">·</span> zero spam
            </p>
          </div>

          {/* code panel */}
          <div className="lg:col-span-6">
            <Reveal delay={220} className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-cyan/40 bg-paleblue"
              />
              <div className="relative">
                <CodeWindow />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* thin closing rule */}
      <div aria-hidden="true" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="h-px w-14 bg-cyan" />
          <span className="h-px flex-1 bg-linecool" />
          <span className="font-mono text-xs text-slate">end of intro — scroll for the good part</span>
        </div>
      </div>
    </section>
  );
}
