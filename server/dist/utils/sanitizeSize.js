export function sanitizeSize(value, fallback) {
    return typeof value === "number" && value > 0 ? value : fallback;
}
