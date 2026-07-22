import { useState } from "react";
import {
  siSupabase,
  siSentry,
  siPosthog,
  siGrafana,
  siFramer,
  siRaycast,
  siLinear,
  siClerk,
  siResend,
  siRailway,
  siMeilisearch,
  siPrisma,
} from "simple-icons";
import useReveal from "../hooks/useReveal";

type Brand = { title: string; path: string };

// real teams from the developer-tools world, rendered as flat monochrome
// marks. a plausible customer list for a hosting company, not the giants.
const BRANDS: Brand[] = [
  siLinear,
  siSupabase,
  siSentry,
  siPosthog,
  siResend,
  siRaycast,
  siClerk,
  siRailway,
  siGrafana,
  siMeilisearch,
  siPrisma,
  siFramer,
].map((i) => ({ title: i.title, path: i.path }));

function LogoMarquee() {
  // doubled list makes the loop seamless
  const items = [...BRANDS, ...BRANDS];
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="marquee-mask overflow-hidden py-2 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="marquee-track flex w-max items-center gap-12"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((brand, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2.5 text-white/45 transition-colors duration-300 hover:text-white/80"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            >
              <path d={brand.path} />
            </svg>
            <span className="text-base font-medium tracking-tight">
              {brand.title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Quote() {
  const quote = useReveal<HTMLDivElement>(0.3);
  const strip = useReveal<HTMLDivElement>(0.4);

  return (
    <section className="py-28 md:py-40">
      <div
        ref={strip.ref}
        className={`hero-anim ${strip.inView ? "hero-fade" : ""}`}
      >
        <p className="text-center text-xs tracking-[0.25em] text-white/30 uppercase mb-8">
          Teams shipping on mport
        </p>
        <div className="border-y border-white/[0.06]">
          <LogoMarquee />
        </div>
      </div>

      <div
        ref={quote.ref}
        className={`hero-anim ${quote.inView ? "hero-fade" : ""} max-w-5xl mx-auto px-5 pt-24 md:pt-32 text-center`}
      >
        <span
          className="block font-playfair italic text-[#6082B6] text-7xl md:text-8xl leading-none mb-2"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="text-white/90 text-3xl md:text-5xl leading-[1.2]">
          <span style={{ letterSpacing: "-0.03em" }}>
            Every host shows you a dashboard.{" "}
          </span>
          <span
            className="font-playfair italic bg-gradient-to-r from-[#b7c9e8] to-[#6082B6] bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.02em" }}
          >
            mport hands you the machine.
          </span>
        </blockquote>
        <div
          className={`hero-anim ${quote.inView ? "hero-fade" : ""} mt-12`}
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-white text-sm font-medium">Lena Okafor</p>
          <p className="text-white/40 text-sm mt-1">
            Head of platform at Driftline. She moved 214 services onto mport.
          </p>
        </div>
      </div>
    </section>
  );
}
