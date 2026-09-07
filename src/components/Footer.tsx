import { FACEBOOK_PAGE_URL } from "../lib/config";
import { BrandMark } from "./Header";
import { ArrowUpIcon, ExternalIcon, FacebookIcon } from "./Icons";

export default function Footer() {
  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="on-dark border-t-2 border-cyan bg-navy-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 rounded-sm">
            <BrandMark onDark />
            <span aria-hidden="true" className="hidden h-5 w-px bg-navy-700 sm:block" />
            <span className="font-display text-[16px] font-bold tracking-tight text-surface">
              Code to the Bone
            </span>
          </a>
          <p className="mt-2 font-mono text-xs text-[#7d97b2]">
            © {new Date().getFullYear()} Code to the Bone
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-cyan-bright underline-offset-4 transition-colors hover:text-cyan-soft hover:underline"
          >
            <FacebookIcon className="h-4 w-4" />
            Follow the page
            <ExternalIcon className="h-3.5 w-3.5" />
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-navy-700" />
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex items-center gap-1.5 rounded-sm font-mono text-xs text-[#a9bdd2] transition-colors hover:text-cyan-bright"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
