import { CaretDoubleRight } from "@phosphor-icons/react";

export default function PillButton({ label }: { label: string }) {
  return (
    <button className="group rounded-full bg-white/[0.06] border border-white/10 backdrop-blur px-1.5 py-1.5 pr-5 flex items-center gap-3 transition-[background-color,border-color,transform] duration-300 ease-out hover:bg-white/[0.1] hover:border-white/20 active:scale-[0.98]">
      <span className="bg-[#0047AB] rounded-full p-2 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        <CaretDoubleRight size={14} className="text-white" />
      </span>
      <span className="text-sm text-white">{label}</span>
    </button>
  );
}
