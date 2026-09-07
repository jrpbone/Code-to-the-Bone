import { useEffect, useState } from "react";
import { FACEBOOK_PAGE_URL } from "../lib/config";
import { CloseIcon, FacebookIcon, MenuIcon } from "./Icons";

const NAV_LINKS = [
  { num: "01", label: "Explore", href: "#content" },
  { num: "02", label: "About", href: "#about" },
  { num: "03", label: "Community", href: "#community" },
];

/** Compact angle-bracket brand mark: </CTB> */
export function BrandMark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-baseline font-mono text-[15px] font-bold tracking-tight">
      <span className={onDark ? "text-cyan" : "text-teal"}>&lt;</span>
      <span className={onDark ? "text-surface" : "text-navy-800"}>CTB</span>
      <span className={onDark ? "text-cyan" : "text-teal"}>&gt;</span>
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/95 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-linecool shadow-[0_8px_24px_-20px_rgba(13,42,74,0.6)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="inline-flex shrink-0 items-center gap-3 rounded-sm">
          <span className="hidden sm:inline-flex">
            <BrandMark />
          </span>
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-linecool sm:block"
          />
          <span className="whitespace-nowrap font-display text-[16px] font-bold tracking-tight text-navy-800">
            Code to the Bone
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group inline-flex items-baseline gap-1.5 rounded-sm font-mono text-[13px] text-slate transition-colors hover:text-navy-800"
            >
              <span className="text-[11px] text-teal transition-colors group-hover:text-teal-deep">
                {link.num}
              </span>
              <span className="uppercase tracking-[0.14em]">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-3 py-2 text-sm font-medium text-surface transition-colors duration-200 hover:bg-teal sm:px-4"
          >
            <FacebookIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Follow on Facebook</span>
            <span className="sm:hidden">Follow</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-md border border-linecool p-2 text-navy-800 transition-colors hover:border-cyan hover:text-teal lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-linecool bg-surface px-5 pb-5 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-3 border-b border-hair py-3 font-mono text-sm text-navy-800 transition-colors hover:text-teal"
              >
                <span className="text-xs text-teal">{link.num}</span>
                <span className="uppercase tracking-[0.14em]">{link.label}</span>
              </a>
            ))}
          </nav>
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-4 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-teal"
          >
            <FacebookIcon className="h-4 w-4" />
            Follow on Facebook
          </a>
        </div>
      )}
    </header>
  );
}
