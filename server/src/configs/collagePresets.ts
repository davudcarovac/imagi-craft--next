import type { CollageTemplate } from "../types/output.js";

export const PROFESSIONAL_TEMPLATES: Record<string, CollageTemplate> = {
  INSTAGRAM_GRID: {
    name: "Instagram Grid",
    width: 1080,
    height: 1080,
    rows: 3,
    cols: 3,
    cellPadding: 2,
    backgroundColor: "#ffffff",
  },
  PRINT_POSTER: {
    name: "A4 Poster",
    width: 2480,
    height: 3508,
    rows: 4,
    cols: 3,
    targetDPI: 300,
    backgroundColor: { r: 255, g: 255, b: 255, alpha: 1 },
  },
};
