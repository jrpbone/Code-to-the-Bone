import type { CSSProperties, ReactNode } from "react";

/* syntax colors on navy */
const KW = "text-cyan-bright"; // keywords
const STR = "text-sand"; // strings & numbers
const COM = "text-slate-faint italic"; // comments
const FN = "text-cyan-soft"; // calls & builtins
const PN = "text-[#9db4cc]"; // punctuation

const LINES: ReactNode[] = [
  <span className={COM}>{"# tidy_desktop.py — sample snippet"}</span>,
  <>
    <span className={KW}>from</span> pathlib <span className={KW}>import</span> Path
  </>,
  <>
    <span className={KW}>import</span> shutil
  </>,
  <>{" "}</>,
  <>
    inbox <span className={PN}>=</span> <span className={FN}>Path</span>
    <span className={PN}>(</span>
    <span className={STR}>"~/Downloads"</span>
    <span className={PN}>)</span>.<span className={FN}>expanduser</span>
    <span className={PN}>()</span>
  </>,
  <>{" "}</>,
  <>
    <span className={KW}>for</span> file <span className={KW}>in</span> inbox.
    <span className={FN}>iterdir</span>
    <span className={PN}>():</span>
  </>,
  <>
    {"    "}
    <span className={KW}>if</span> file.suffix <span className={PN}>==</span>{" "}
    <span className={STR}>".pdf"</span>
    <span className={PN}>:</span>
  </>,
  <>
    {"        "}shutil.<span className={FN}>move</span>
    <span className={PN}>(</span>file, inbox <span className={PN}>/</span>{" "}
    <span className={STR}>"docs"</span>
    <span className={PN}>)</span>
  </>,
  <>{" "}</>,
  <span className={COM}>{"# small script, big calm"}</span>,
  <>
    <span className={FN}>print</span>
    <span className={PN}>(</span>
    <span className={STR}>"tidied."</span>
    <span className={PN}>)</span>
    <span
      aria-hidden="true"
      className="cursor-blink ml-1.5 inline-block h-[15px] w-[8px] translate-y-[2px] rounded-[1px] bg-cyan"
    />
  </>,
];

export default function CodeWindow() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg border border-navy-700 bg-navy-900 shadow-[0_32px_60px_-42px_rgba(10,29,51,0.7)]">
        {/* slim window chrome */}
        <div className="flex h-10 items-center gap-3 border-b border-navy-700 bg-navy-800 px-4">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-navy-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-navy-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-xs text-[#9db4cc]">tidy_desktop.py</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="rounded-full border border-cyan/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-bright">
              sample
            </span>
          </span>
        </div>

        {/* code body */}
        <pre className="overflow-x-auto py-5 font-mono text-[12.5px] leading-[1.95] sm:text-sm">
          <code>
            {LINES.map((tokens, i) => (
              <div
                key={i}
                className="code-line flex"
                style={{ "--d": `${0.25 + i * 0.07}s` } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="w-9 shrink-0 select-none pr-4 text-right text-[#4f6a87]"
                >
                  {i + 1}
                </span>
                <span className="whitespace-pre pr-5 text-codefg">{tokens}</span>
              </div>
            ))}
          </code>
        </pre>

        {/* status bar */}
        <div className="flex h-9 items-center justify-between border-t border-navy-700 px-4 font-mono text-[11px] text-[#7d97b2]">
          <span>python 3.12 · utf-8 · lf</span>
          <span>
            <span className="text-cyan">{"// "}</span>inspiration, not a post
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-right font-mono text-xs text-slate">
        {"// automation you can read in one coffee"}
      </figcaption>
    </figure>
  );
}
