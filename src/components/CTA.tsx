import useReveal from "../hooks/useReveal";
import PillButton from "./PillButton";
import satelliteImage from "../assets/satellite.jpg";

export default function CTA() {
  const block = useReveal<HTMLDivElement>(0.25);

  return (
    <section className="py-20 md:py-28 px-5">
      <div
        ref={block.ref}
        className={`hero-anim ${block.inView ? "hero-fade" : ""} relative max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10`}
      >
        <img
          src={satelliteImage}
          alt="A satellite over Europe at night, city lights tracing the network"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,71,171,0.12), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center py-24 md:py-36 px-5">
          <p className="text-xs tracking-[0.25em] text-white/50 uppercase mb-8">
            Power on
          </p>
          <h2 className="text-white text-5xl md:text-7xl leading-[1.02] max-w-3xl">
            <span
              className="block font-medium"
              style={{ letterSpacing: "-0.04em" }}
            >
              Start shipping
            </span>
            <span
              className="block font-playfair italic font-normal"
              style={{ letterSpacing: "-0.03em" }}
            >
              on real metal
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mt-8">
            One push, thirty-eight cities, hardware you could walk up and
            touch. The first deploy takes about ninety seconds.
          </p>

          <div
            className={`hero-anim ${block.inView ? "hero-fade" : ""} flex flex-wrap items-center justify-center gap-4 mt-12`}
            style={{ animationDelay: "0.2s" }}
          >
            <button className="bg-[#0047AB] hover:bg-[#003c91] text-white text-sm font-medium px-8 py-3.5 rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] hover:shadow-md hover:shadow-[#0047AB]/20">
              Deploy now
            </button>
            <PillButton label="Read the docs" />
          </div>
        </div>
      </div>
    </section>
  );
}
