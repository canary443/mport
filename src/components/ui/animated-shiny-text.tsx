import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from "react";
import { cn } from "../../lib/utils";

// magic ui shiny text, tuned for this always-dark palette: a pale glare
// pans across a muted white label.
export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "text-white/40",
        // shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-size:var(--shiny-width)_100%] [background-position:0_0]",
        // shine gradient
        "bg-gradient-to-r from-transparent via-white/90 via-50% to-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
