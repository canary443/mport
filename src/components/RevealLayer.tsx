import { useEffect, useRef } from "react";
import { SPOTLIGHT_R } from "./Hero";
import { asset } from "../lib/media";

type RevealLayerProps = {
  cursorX: number;
  cursorY: number;
  mediaTransform: string;
};

// the spotlight is a plain css radial-gradient mask, updated per frame.
// no canvas and no data urls, so safari keeps up with the cursor.
export default function RevealLayer({
  cursorX,
  cursorY,
  mediaTransform,
}: RevealLayerProps) {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = maskRef.current;
    if (!el) return;
    const gradient = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;
    el.style.maskImage = gradient;
    el.style.webkitMaskImage = gradient;
    el.style.maskRepeat = "no-repeat";
    el.style.webkitMaskRepeat = "no-repeat";
  }, [cursorX, cursorY]);

  return (
    // the mask sits on this untransformed wrapper so the spotlight stays
    // in viewport space while the video moves with the base image
    <div
      ref={maskRef}
      className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
    >
      <video
        src={asset("reveal.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center", transform: mediaTransform }}
      />
    </div>
  );
}
