import { useEffect, useState } from "react";
import { FACEBOOK_PAGE_URL } from "../lib/config";
import { CloseIcon, FacebookIcon, MenuIcon } from "./Icons";

const NAV_LINKS = [
  { label: "Content", href: "#content" },
  { label: "About", href: "#about" },
  { label: "Community", href: "#community" },
];

function Wordmark() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2 rounded-sm">
      <span className="font-display text-[17px] font-bold tracking-tight text-ink">
        Code to the Bone
      </span>
      <span
        aria-hidden="true"
        className="cursor-blink inline-block h-[15px] w-[7px] translate-y-[2px] rounded-[1px] bg-teal"
      />
    </a>
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
      className={`sticky top-0 z-50 border-b bg-paper transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-line shadow-[0_6px_20px_-16px_rgba(38,35,29,0.5)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm text-ink-soft underline-offset-4 decoration-teal/60 decoration-0 transition-[color,text-decoration-color] duration-200 hover:text-teal-deep hover:decoration-2 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors duration-200 hover:bg-teal"
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
            className="rounded-md border border-line p-2 text-ink transition-colors hover:border-teal hover:text-teal md:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-5 pb-5 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md border-b border-line-soft py-3 text-base text-ink transition-colors hover:text-teal-deep"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-teal"
          >
            <FacebookIcon className="h-4 w-4" />
            Follow on Facebook
          </a>
        </div>
      )}
    </header>
  );
}
