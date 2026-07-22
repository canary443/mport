// a thin gradient hairline with a glowing cobalt node at its center.
// gives the dark sections a quiet rhythm as you scroll.
export default function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5" aria-hidden="true">
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent">
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-[#0047AB] shadow-[0_0_14px_3px_rgba(0,71,171,0.55)]" />
      </div>
    </div>
  );
}
