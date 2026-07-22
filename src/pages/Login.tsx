import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { Logo } from "../components/Logo";

const inputClass =
  "flex h-10 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus-visible:border-[#0047AB] focus-visible:ring-2 focus-visible:ring-[#0047AB]/40";

const labelClass = "text-sm font-medium text-white/80";

const outlineButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-transparent text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(false);
  const timer = useRef<number | null>(null);

  // demo only, there is no account behind this
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setNote(false);
    setLoading(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setNote(true);
    }, 1100);
  }

  return (
    <main
      className="login-fade relative flex min-h-[100dvh] items-center justify-center bg-black px-4 py-16 tracking-[-0.02em]"
      style={{
        background:
          "radial-gradient(60% 40% at 50% 0%, rgba(0,71,171,0.10), transparent 70%), #000",
      }}
    >
      <Link
        to="/"
        viewTransition
        className="login-fade absolute left-5 top-5 flex items-center gap-2.5 text-white"
        aria-label="mport home"
      >
        <Logo showWord={false} />
        <span className="text-xl font-playfair italic">mport</span>
      </Link>

      <div className="w-full max-w-sm">
        <div className="login-card rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Log in to your mport account.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-white/45 transition-colors hover:text-white"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="your password"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#0047AB] text-sm font-medium text-white transition-colors hover:bg-[#003c91] disabled:opacity-60"
            >
              {loading ? "One moment" : "Log in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className={outlineButton}>
              <GithubLogo size={18} /> GitHub
            </button>
            <button type="button" className={outlineButton}>
              <GoogleLogo size={18} /> Google
            </button>
          </div>

          {note && (
            <p className="mt-6 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] leading-[1.4] text-white/60">
              This is a demo, so there is nothing behind the door yet.
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-[13px] text-white/45">
          New to mport?{" "}
          <a href="#" className="text-white hover:underline underline-offset-2">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
