import Header from "./components/Header";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import About from "./components/About";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip font-body text-navy-800">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-surface"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
