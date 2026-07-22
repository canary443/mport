import { Link } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Network", href: "#network" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Status", href: "#" },
];

export default function Nav() {
  return (
    <nav
      className="hero-anim hero-fade-down fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5"
      style={{ animationDelay: "0.1s" }}
    >
      <Link to="/" viewTransition className="flex items-center gap-2.5 text-white">
        <Logo showWord={false} />
        <span className="text-white text-2xl font-playfair italic">mport</span>
      </Link>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        <a
          href="#"
          className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium"
        >
          Platform
        </a>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>

      <Link
        to="/login"
        viewTransition
        className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-[background-color,transform] duration-200 ease-out hover:bg-gray-100 active:scale-[0.97]"
      >
        Sign in
      </Link>

      <button
        className="md:hidden text-white p-2 transition-transform duration-200 ease-out active:scale-90"
        aria-label="Open menu"
      >
        <List size={24} />
      </button>
    </nav>
  );
}
