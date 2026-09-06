type SectionHeadProps = {
  num: string;
  label: string;
  title: React.ReactNode;
  blurb?: string;
};

/** Numbered section header with a thin cyan segment + pale rule. */
export default function SectionHead({ num, label, title, blurb }: SectionHeadProps) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-4">
        <p className="m-0 font-mono text-xs font-medium tracking-[0.28em] text-teal">
          {num} <span className="text-cyan">/</span> {label}
        </p>
        <span aria-hidden="true" className="h-px w-10 bg-cyan" />
        <span aria-hidden="true" className="h-px flex-1 bg-linecool" />
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <h2 className="m-0 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-navy-800 sm:text-[2.4rem]">
          {title}
        </h2>
        {blurb && <p className="m-0 max-w-xs text-sm leading-relaxed text-slate">{blurb}</p>}
      </div>
    </div>
  );
}
