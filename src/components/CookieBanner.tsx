import { useEffect, useState } from "react";

// dark translucent consent bar. it waits until the reader has left the hero
// so it never sits on top of the hero call to action. demo only, nothing is
// tracked.
export default function CookieBanner() {
  const [accepted, setAccepted] = useState(() => {
    try {
      return localStorage.getItem("cookies-ok") === "1";
    } catch {
      return false;
    }
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (accepted) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [accepted]);

  if (accepted) return null;

  function accept() {
    try {
      localStorage.setItem("cookies-ok", "1");
    } catch {
      /* fine */
    }
    setShow(false);
    // let the slide-out play before we drop it from the tree
    window.setTimeout(() => setAccepted(true), 300);
  }

  return (
    <div
      data-show={show}
      className="fixed bottom-4 right-4 z-[90] flex w-[calc(100%-2rem)] max-w-[400px] translate-y-4 items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-500 ease-out pointer-events-none data-[show=true]:translate-y-0 data-[show=true]:opacity-100 data-[show=true]:pointer-events-auto"
    >
      <p className="flex-1 text-[13px] leading-[1.4] text-white/70">
        This website uses cookies to ensure you get the best experience.{" "}
        <a href="#" className="text-white underline underline-offset-2">
          Privacy policy
        </a>
      </p>
      <button
        onClick={accept}
        className="shrink-0 rounded-full bg-white px-6 py-2.5 text-[13px] font-medium text-gray-900 transition-transform duration-200 ease-out hover:bg-gray-100 active:scale-[0.97]"
      >
        Accept
      </button>
    </div>
  );
}
