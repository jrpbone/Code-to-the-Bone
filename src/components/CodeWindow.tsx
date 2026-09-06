import type { CSSProperties, ReactNode } from "react";

/* token colors (on coal) */
const KW = "text-teal-foam"; // keywords
const STR = "text-sand"; // strings & numbers
const COM = "text-[#8b8574] italic"; // comments
const FN = "text-[#e6dcc3]"; // function names
const PN = "text-[#b7b0a0]"; // punctuation

const LINES: ReactNode[] = [
  <span className={COM}>{"// learn.ts — the loop behind this page"}</span>,
  <>
    <span className={KW}>function</span> <span className={FN}>codeToTheBone</span>
    <span className={PN}>(</span>topic<span className={PN}>:</span> <span className={KW}>string</span>
    <span className={PN}>)</span> <span className={PN}>{"{"}</span>
  </>,
  <>
    {"  "}
    <span className={KW}>let</span> confidence <span className={PN}>=</span>{" "}
    <span className={STR}>0</span>
    <span className={PN}>;</span>
  </>,
  <>{" "}</>,
  <>
    {"  "}
    <span className={KW}>while</span> <span className={PN}>(</span>confidence{" "}
    <span className={PN}>&lt;</span> <span className={STR}>100</span>
    <span className={PN}>)</span> <span className={PN}>{"{"}</span>
  </>,
  <>
    {"    "}
    <span className={FN}>read</span>
    <span className={PN}>();</span> <span className={COM}>{"// learn it"}</span>
  </>,
  <>
    {"    "}
    <span className={FN}>build</span>
    <span className={PN}>();</span> <span className={COM}>{"// build it"}</span>
  </>,
  <>
    {"    "}confidence <span className={PN}>+=</span> <span className={STR}>1</span>
    <span className={PN}>;</span> <span className={COM}>{"// it sticks"}</span>
  </>,
  <>
    {"  "}
    <span className={PN}>{"}"}</span>
  </>,
  <>{" "}</>,
  <>
    {"  "}
    <span className={KW}>return</span> understanding<span className={PN}>;</span>
  </>,
  <>
    <span className={PN}>{"}"}</span>
    <span
      aria-hidden="true"
      className="cursor-blink ml-1 inline-block h-[15px] w-[8px] translate-y-[2px] rounded-[1px] bg-teal-foam"
    />
  </>,
];

export default function CodeWindow() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border border-coal-line bg-coal shadow-[0_32px_56px_-40px_rgba(35,33,27,0.55)]">
        {/* window chrome */}
        <div className="flex h-11 items-center gap-3 border-b border-coal-line bg-coal-raise px-4">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-coal-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-coal-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal-bright" />
          </span>
          <span className="font-mono text-xs text-paper-dim">learn.ts</span>
          <span className="ml-auto rounded-full border border-coal-line px-2 py-0.5 font-mono text-[10px] text-[#8b8574]">
            sample
          </span>
        </div>

        {/* code body */}
        <pre className="overflow-x-auto py-5 font-mono text-[12.5px] leading-[1.9] sm:text-sm">
          <code>
            {LINES.map((tokens, i) => (
              <div
                key={i}
                className="code-line flex"
                style={{ "--d": `${0.2 + i * 0.07}s` } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="w-9 shrink-0 select-none pr-4 text-right text-[#6b6557]"
                >
                  {i + 1}
                </span>
                <span className="whitespace-pre pr-5 text-[#eae4d6]">{tokens}</span>
              </div>
            ))}
          </code>
        </pre>

        {/* status bar */}
        <div className="flex h-9 items-center justify-between border-t border-coal-line px-4 font-mono text-[11px] text-[#8b8574]">
          <span>ts · utf-8 · lf</span>
          <span>
            <span className="text-teal-foam">{"//"}</span> the spirit, not a post
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-right font-mono text-xs text-ink-faint">
        {"// one snippet, zero homework"}
      </figcaption>
    </figure>
  );
}
