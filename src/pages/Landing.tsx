import { useEffect } from "react";
import Lenis from "lenis";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Story from "../components/Story";
import Stats from "../components/Stats";
import Quote from "../components/Quote";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SectionDivider from "../components/SectionDivider";

export default function Landing() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black tracking-[-0.02em]">
      <Nav />
      <Hero />
      {/* everything below rides over the pinned hero like a dark curtain */}
      <div className="relative z-20 bg-black">
        <Story />
        <Stats />
        <SectionDivider />
        <Quote />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <CTA />
        <Footer />
      </div>
      <CookieBanner />
    </div>
  );
}
