import Header from "./components/Header";
import Hero, { MarqueeStrip } from "./components/Hero";
import Highlights from "./components/Highlights";
import About from "./components/About";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main>
        <Hero />
        <MarqueeStrip />
        <Highlights />
        <About />
        <Community />
      </main>

      <Footer />
    </div>
  );
}
