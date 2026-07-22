import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { Slider } from "./ui/slider";

type Knob = {
  key: "cpu" | "ram" | "disk" | "net";
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  format: (v: number) => string;
};

const KNOBS: Knob[] = [
  { key: "cpu", label: "Compute", min: 1, max: 32, step: 1, unit: "vCPU", format: (v) => `${v} vCPU` },
  { key: "ram", label: "Memory", min: 1, max: 128, step: 1, unit: "GB", format: (v) => `${v} GB` },
  { key: "disk", label: "NVMe storage", min: 25, max: 1000, step: 25, unit: "GB", format: (v) => `${v} GB` },
  { key: "net", label: "Guaranteed bandwidth", min: 5, max: 200, step: 5, unit: "Gbps", format: (v) => `${v} Gbps` },
];

// per-unit monthly rates, tuned to sit a little above the fixed presets so
// a custom build is a small premium over the nearest named size
const RATE = { cpu: 2, ram: 1.2, disk: 0.03, net: 0.28 };

function KnobRow({
  knob,
  value,
  onChange,
}: {
  knob: Knob;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-white/60">{knob.label}</span>
        <span className="text-sm font-medium text-white tabular-nums">
          {knob.format(value)}
        </span>
      </div>
      <Slider
        min={knob.min}
        max={knob.max}
        step={knob.step}
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        aria-label={knob.label}
        className="mt-4"
      />
    </div>
  );
}

export default function CustomVps() {
  const [spec, setSpec] = useState({ cpu: 4, ram: 8, disk: 160, net: 20 });

  const price = Math.round(
    spec.cpu * RATE.cpu +
      spec.ram * RATE.ram +
      spec.disk * RATE.disk +
      spec.net * RATE.net,
  );

  // the shown price chases the real one with a spring, so dragging a
  // slider makes the number settle instead of snapping
  const springPrice = useSpring(price, { stiffness: 170, damping: 24 });
  useEffect(() => {
    springPrice.set(price);
  }, [price, springPrice]);
  const shownPrice = useTransform(springPrice, (v) => `$${Math.round(v)}`);

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-7">
          {KNOBS.map((knob) => (
            <KnobRow
              key={knob.key}
              knob={knob}
              value={spec[knob.key]}
              onChange={(v) => setSpec((s) => ({ ...s, [knob.key]: v }))}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-white/[0.07] lg:pl-16">
          <div>
            <p className="text-sm text-white/40">Your build</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {spec.cpu} vCPU · {spec.ram} GB RAM · {spec.disk} GB NVMe ·{" "}
              <span className="text-[#6082B6]">{spec.net} Gbps</span>
            </p>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className="inline-block min-w-[3ch] font-playfair italic text-6xl text-white/90"
                style={{ letterSpacing: "-0.03em" }}
              >
                {shownPrice}
              </motion.span>
              <span className="text-sm text-white/40">/mo</span>
            </div>
            <button className="mt-6 w-full rounded-full bg-[#0047AB] px-6 py-3 text-sm font-medium text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-[#003c91] hover:shadow-md hover:shadow-[#0047AB]/20 active:scale-[0.98]">
              Deploy this build
            </button>
            <p className="mt-3 text-center text-xs text-white/35">
              Hourly billing, destroy it whenever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
