export function sanitizeSize(value: unknown, fallback: number): number {
  return typeof value === "number" && value > 0 ? value : fallback;
}
