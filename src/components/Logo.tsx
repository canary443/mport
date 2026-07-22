type Props = {
  className?: string;
  showWord?: boolean;
  wordClass?: string;
};

// mport mark. the hexagon column top with a cut facet, drawn in one color
// so it lives inside the monochrome system on any surface.
export function Logo({ showWord = true, className = "", wordClass = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M9 3.5 H23 L30 16 L23 28.5 H9 L2 16 Z M9 3.5 L16 16 L23 3.5 Z"
          fill="currentColor"
        />
      </svg>
      {showWord && (
        <span
          className={`text-[16px] font-normal lowercase leading-none tracking-[-0.01em] ${wordClass}`}
        >
          mport
        </span>
      )}
    </span>
  );
}
