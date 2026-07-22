import { useEffect, useRef, useState } from "react";
import RevealLayer from "./RevealLayer";
import { asset } from "../lib/media";
import baseImage from "../assets/base.webp";

export const SPOTLIGHT_R = 260;

export default function Hero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 639px)").matches,
  );

  // pushes the media down and scales it, used by image and video both
  // so they stay pixel aligned
  const mediaTransform = "translate(0px, 110px) scale(0.85)";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    if (hasFinePointer) {
      window.addEventListener("mousemove", onMouseMove);
    }

    const tick = (time: number) => {
      if (!hasFinePointer) {
        // touch devices get a slow drift around the machine instead
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight * 0.55;
        const r = Math.min(window.innerWidth, window.innerHeight) * 0.22;
        const t = time * 0.0004;
        mouse.current.x = cx + Math.cos(t) * r;
        mouse.current.y = cy + Math.sin(t) * r * 0.7;
      }

      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <section
      className="sticky top-0 z-0 w-full overflow-hidden h-screen bg-black"
      style={{ height: "100dvh" }}
    >
      {isMobile ? (
        <video
          src={asset("reveal.mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain z-10"
          style={{ transform: "scale(1.3)" }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10"
            style={{
              backgroundImage: `url(${baseImage})`,
              transform: mediaTransform,
            }}
          />
          <RevealLayer
            cursorX={cursorPos.x}
            cursorY={cursorPos.y}
            mediaTransform={mediaTransform}
          />
        </>
      )}

      <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
        <h1 className="text-white leading-[0.95]">
          <span
            className="hero-anim hero-reveal block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
          >
            Metal remembers
          </span>
          <span
            className="hero-anim hero-reveal block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1"
            style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
          >
            what the cloud forgot
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          Under every app is a real machine. Ours sit in 38 cities, plugged
          straight into the local exchanges, waiting for your code.
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Push a branch and it lands on NVMe bare metal behind our anycast
          edge. It goes live in a few seconds and stays quick wherever people
          open it.
        </p>
        <button className="bg-[#0047AB] hover:bg-[#003c91] text-white text-sm font-medium px-7 py-3 rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] hover:shadow-md hover:shadow-[#0047AB]/20">
          Deploy now
        </button>
      </div>
    </section>
  );
}
