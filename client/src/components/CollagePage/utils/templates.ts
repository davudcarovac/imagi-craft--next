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
  displayScale?: number;

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
    displayScale: 0.8,
    backgroundColor: "ffffff",
  },

  PRINT_POSTER: {
    name: "A4 Poster",
    width: 2480,
    height: 3508,
    rows: 4,
    cols: 3,
    displayScale: 0.7,

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
    displayScale: 0.7,
    backgroundColor: "#ffffff",
  },

  PINTEREST_PIN: {
    name: "Pinterest Pin",
    width: 1000,
    height: 1500,
    rows: 2,
    cols: 1,
    cellPadding: 0,
    displayScale: 0.8,
    backgroundColor: "#f5f5f5",
  },

  INSTAGRAM_STORY: {
    name: "Instagram Story Split",
    width: 1080,
    height: 1920,
    rows: 2,
    cols: 1,
    cellPadding: 4,
    displayScale: 0.8,
    backgroundColor: "#ffffff",
  },

  PHOTO_BOOTH: {
    name: "Photo Booth Strip",
    width: 600,
    height: 1800,
    rows: 4,
    cols: 1,
    cellPadding: 5,
    displayScale: 0.9,
    backgroundColor: "#eeeeee",
  },

  BEFORE_AFTER: {
    name: "Before / After",
    width: 1200,
    height: 600,
    rows: 1,
    cols: 2,
    cellPadding: 3,
    displayScale: 0.5,
    backgroundColor: "#ffffff",
  },

  MAGAZINE_SPREAD: {
    name: "Magazine Spread",
    width: 1600,
    height: 800,
    rows: 1,
    cols: 2,
    cellPadding: 6,
    displayScale: 0.5,
    backgroundColor: "#fafafa",
  },
};
