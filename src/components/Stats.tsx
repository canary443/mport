import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

type Stat = {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 99.99, decimals: 2, suffix: "%", label: "fleet uptime, trailing year" },
  { value: 38, suffix: "", label: "cities with mport metal" },
  { value: 9200, suffix: "+", label: "deploys land every day" },
  { value: 41, suffix: "ms", label: "median TTFB, worldwide" },
];

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  const [display, setDisplay] = useState("0");
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const format = (v: number) =>
      stat.decimals
        ? v.toFixed(stat.decimals)
        : Math.round(v).toLocaleString("en-US");

    if (reduced) {
      setDisplay(format(stat.value));
      return;
    }

    const duration = 1800;
    let startTime: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(format(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat]);

  return (
    <span>
      {display}
      <span className="text-[#6082B6]">{stat.suffix}</span>
    </span>
  );
}

export default function Stats() {
  const block = useReveal<HTMLDivElement>(0.3);

  return (
    <section className="py-6">
      <div
        ref={block.ref}
        className="max-w-7xl mx-auto px-5 border-y border-white/[0.07]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`hero-anim ${block.inView ? "hero-fade" : ""} py-12 md:py-16 px-2 sm:px-6 ${
                i > 0 ? "lg:border-l lg:border-white/[0.07]" : ""
              } ${i % 2 === 1 ? "border-l border-white/[0.07] lg:border-l" : ""}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div
                className="font-playfair italic text-5xl md:text-6xl text-white/90"
                style={{ letterSpacing: "-0.03em" }}
              >
                <Counter stat={stat} start={block.inView} />
              </div>
              <p className="text-sm text-white/45 mt-4 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
