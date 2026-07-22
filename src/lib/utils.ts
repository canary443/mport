// tiny classnames joiner. keeps the ui components self-contained without
// pulling in clsx or tailwind-merge for a demo of this size.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
