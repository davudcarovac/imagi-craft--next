// src/templates.ts

export interface CollageTemplate {
  name: string;
  width: number;
  height: number;
  rows: number;
  cols: number;
  cellPadding?: number;
  gridHeight?: string;
  gridWidth?: string;

  backgroundColor?:
    | string
    | { r: number; g: number; b: number; alpha?: number };
}

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

    cellPadding: 10,
    backgroundColor: "#f8f8f8",
  },

  CLASSIC: {
    name: "Classic Grid",
    width: 1080,
    height: 1080,
    rows: 2,
    cols: 2,
    cellPadding: 2,
    backgroundColor: "#ffffff",
  },
  PINTEREST_PIN: {
    name: "Pinterest Pin",
    width: 1000,
    height: 1500,
    rows: 2,
    cols: 1,
    cellPadding: 0,
    backgroundColor: "#f5f5f5",
  },
};
