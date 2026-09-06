import { FACEBOOK_PAGE_URL } from "../lib/config";
import { ArrowUpIcon, ExternalIcon, FacebookIcon } from "./Icons";

export default function Footer() {
  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-line bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 rounded-sm">
            <span className="font-display text-[17px] font-bold tracking-tight text-ink">
              Code to the Bone
            </span>
            <span
              aria-hidden="true"
              className="cursor-blink inline-block h-[13px] w-[6px] translate-y-[1px] rounded-[1px] bg-teal"
            />
          </a>
          <p className="mt-2 font-mono text-xs text-ink-faint">
            © {new Date().getFullYear()} code to the bone — html, css & a little js
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-teal-deep underline-offset-4 transition-colors hover:text-teal hover:underline"
          >
            <FacebookIcon className="h-4 w-4" />
            Follow the page
            <ExternalIcon className="h-3.5 w-3.5 text-ink-faint" />
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-line" />
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex items-center gap-1.5 rounded-sm font-mono text-xs text-ink-soft transition-colors hover:text-teal-deep"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
