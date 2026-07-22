import { useEffect, useRef } from "react";
import PillButton from "./PillButton";
import useReveal from "../hooks/useReveal";
import { asset } from "../lib/media";
import patchImage from "../assets/patch.jpg";

// slight scroll linked vertical drift, off when reduced motion is set
function useParallax(factor: number) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
        el.style.transform = `translateY(${offset}px)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);

  return ref;
}

export default function Story() {
  const header = useReveal<HTMLDivElement>();
  const body = useReveal<HTMLDivElement>();
  const media = useReveal<HTMLDivElement>(0.2);
  const bigImg = useParallax(-0.05);
  const smallImg = useParallax(0.04);

  return (
    <section id="network" className="py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={header.ref}
          className={`hero-anim ${header.inView ? "hero-fade" : ""} max-w-3xl`}
        >
          <p className="text-xs tracking-[0.25em] text-white/40 uppercase mb-6">
            The machine room
          </p>
          <h2 className="text-white text-4xl sm:text-5xl md:text-7xl leading-[1.02]">
            <span
              className="block font-medium"
              style={{ letterSpacing: "-0.04em" }}
            >
              Every request ends
            </span>
            <span
              className="block font-playfair italic font-normal bg-gradient-to-r from-[#b7c9e8] to-[#6082B6] bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.03em" }}
            >
              on real metal
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-5 mt-16 md:mt-24 items-start">
          <div ref={media.ref} className="col-span-12 md:col-span-7 relative">
            <div ref={bigImg} className="will-change-transform">
              <div
                className={`img-anim ${media.inView ? "img-reveal" : ""} relative rounded-3xl overflow-hidden border border-white/10`}
              >
                <video
                  src={asset("media/servers.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Server racks glowing softly in a dark machine hall"
                  className="w-full h-[420px] md:h-[560px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
                <p className="absolute bottom-6 left-6 text-xs text-white/60 tracking-wide">
                  Rack row C, Munich. Cabled by hand, two hops from most of
                  Europe.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={body.ref}
            className={`hero-anim ${body.inView ? "hero-fade" : ""} col-span-12 md:col-span-5 md:pl-8 lg:pl-14 md:pt-10`}
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              The cloud is somebody else&rsquo;s computer, so we bought the
              computers. We own the racks, we pulled the fiber, and we can name
              every switch. Your code runs two hops from the people using it.
            </p>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mt-6">
              Push a branch and watch the build land. There are no cold starts,
              no tenants stealing your CPU, and nothing sitting between you and
              the machine.
            </p>

            <div className="mt-10">
              <PillButton label="Tour the racks" />
            </div>

            <div
              ref={smallImg}
              className="will-change-transform mt-12 md:mt-16 md:-ml-24 lg:-ml-32 relative z-10 max-w-[320px]"
            >
              <div
                className={`img-anim ${media.inView ? "img-reveal" : ""} relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]`}
                style={{ animationDelay: "0.25s" }}
              >
                <img
                  src={patchImage}
                  alt="Numbered patch panel with blue ethernet cables"
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <p className="absolute bottom-4 left-4 text-[11px] text-white/60">
                  Patch panel 074. Every port is somebody&rsquo;s launch day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
