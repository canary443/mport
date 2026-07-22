import useReveal from "../hooks/useReveal";
import { Logo } from "./Logo";

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Explore", links: ["Platform", "Network", "Pricing", "Status"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Connect", links: ["GitHub", "X", "Newsletter", "Contact"] },
];

export default function Footer() {
  const giant = useReveal<HTMLDivElement>(0.2);

  return (
    <footer className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 pt-20 md:pt-28">
        <div className="grid grid-cols-12 gap-10 pb-16">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2.5 text-white">
              <Logo showWord={false} />
              <span className="text-white text-2xl font-playfair italic">
                mport
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mt-6 max-w-xs">
              Hosting on real metal. Racked, wired, and running in 38 cities,
              two hops from your users.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Based in Munich, on hardware we own.
            </p>
          </div>

          {COLUMNS.map(({ title, links }) => (
            <div key={title} className="col-span-6 sm:col-span-4 md:col-span-2">
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-white/[0.07]">
          <p className="text-xs text-white/30">
            © 2026 mport. All packets delivered.
          </p>
          <p className="text-xs text-white/30">
            Served hot from a rack in Munich.
          </p>
        </div>
      </div>

      <div
        ref={giant.ref}
        className="relative h-[24vw] sm:h-[20vw]"
        aria-hidden="true"
      >
        <span
          className={`hero-anim ${giant.inView ? "hero-rise" : ""} absolute left-1/2 -translate-x-1/2 top-0 font-playfair italic text-[24vw] sm:text-[18vw] leading-[0.8] text-white/5 whitespace-nowrap select-none`}
          style={{ letterSpacing: "-0.04em" }}
        >
          mport
        </span>
      </div>
    </footer>
  );
}
