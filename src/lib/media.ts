// build a url for a file in public/, works under a github pages subfolder too
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base + path : base + "/" + path;
}
