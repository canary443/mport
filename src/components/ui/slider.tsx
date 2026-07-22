import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/utils";

// custom slider built on motion springs instead of a headless library.
// the thumb and the filled range chase the value with a spring, so clicks
// glide and dragging over coarse steps still feels fluid.
type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  "aria-label"?: string;
};

function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();

  const current = value[0];
  const percent = ((current - min) / (max - min)) * 100;

  // stiff spring while dragging keeps the thumb glued to the finger,
  // softer spring for clicks and keyboard so the glide reads
  const spring = useSpring(percent, {
    stiffness: dragging ? 900 : 320,
    damping: dragging ? 60 : 32,
  });
  useEffect(() => {
    if (reduced) {
      spring.jump(percent);
    } else {
      spring.set(percent);
    }
  }, [percent, spring, reduced]);

  const left = useTransform(spring, (v) => `${v}%`);
  const width = useTransform(spring, (v) => `${v}%`);

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return current;
      const rect = track.getBoundingClientRect();
      const raw = min + ((clientX - rect.left) / rect.width) * (max - min);
      const snapped = Math.round(raw / step) * step;
      return Math.min(max, Math.max(min, snapped));
    },
    [current, min, max, step],
  );

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    onValueChange([valueFromPointer(e.clientX)]);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    onValueChange([valueFromPointer(e.clientX)]);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = current + step;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = current - step;
    if (e.key === "Home") next = min;
    if (e.key === "End") next = max;
    if (e.key === "PageUp") next = current + step * 5;
    if (e.key === "PageDown") next = current - step * 5;
    if (next === null) return;
    e.preventDefault();
    onValueChange([Math.min(max, Math.max(min, next))]);
  }

  return (
    <div
      className={cn(
        "group relative flex w-full touch-none select-none items-center py-3",
        dragging ? "cursor-grabbing" : "cursor-pointer",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* track */}
      <div
        ref={trackRef}
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08] transition-colors duration-200 group-hover:bg-white/[0.12]"
      >
        {/* filled range, springs after the value */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#003c91] to-[#4a72b8]"
          style={{ width }}
        />
        {/* soft glow that breathes while dragging */}
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-[#0047AB] blur-[6px] transition-opacity duration-300",
            dragging ? "opacity-60" : "opacity-25",
          )}
          style={{ width }}
        />
      </div>

      {/* thumb */}
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        onKeyDown={onKeyDown}
        className={cn(
          "absolute top-1/2 z-10 size-[18px] rounded-full border-[3px] border-[#0047AB] bg-white outline-none",
          "shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
          "transition-[box-shadow,scale] duration-200 ease-out",
          "hover:ring-8 hover:ring-[#0047AB]/15",
          "focus-visible:ring-8 focus-visible:ring-[#0047AB]/25",
          dragging
            ? "scale-125 ring-[10px] ring-[#0047AB]/20"
            : "group-hover:scale-105",
        )}
        style={{ left, x: "-50%", y: "-50%" }}
      />
    </div>
  );
}

export { Slider };
