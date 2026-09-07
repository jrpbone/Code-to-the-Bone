import { useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import About from "./components/About";
import Community from "./components/Community";
import Footer from "./components/Footer";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import { articles } from "./data/articles";

function RouteEffects() {
  const { pathname, hash, search, key } = useLocation();
  const previousLocation = useRef<{ pathname: string; hash: string; search: string } | null>(null);
  useEffect(() => {
    const previous = previousLocation.current;
    previousLocation.current = { pathname, hash, search };
    if (previous?.pathname === pathname && previous.hash === hash && previous.search !== search) return;
    const article = articles.find((entry) => pathname === `/articles/${entry.slug}`);
    document.title = article ? `${article.title} — Code to the Bone`
      : pathname === "/articles" ? "Articles — Code to the Bone"
      : pathname === "/" ? "Code to the Bone — Learn it. Build it." : "Not found — Code to the Bone";
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : document.getElementById("main-content");
      if (hash && target) target.scrollIntoView();
      else {
        target?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, search, key]);
  return null;
}

export function AppRoutes() {
  return (
    <div className="min-h-screen overflow-x-clip font-body text-navy-800">
      <RouteEffects />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-surface"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="scroll-mt-24">
        <Routes>
          <Route path="/" element={<><Hero /><Highlights /><About /><Community /></>} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="*" element={<section className="mx-auto min-h-[60vh] max-w-3xl px-5 py-20 sm:px-8"><h1 className="font-display text-4xl font-bold">Page not found</h1><Link to="/" className="mt-6 inline-block text-teal underline">Back to home</Link></section>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
