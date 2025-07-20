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
  description?: string;
  backgroundColor?:
    | string
    | { r: number; g: number; b: number; alpha?: number };
}

export const PROFESSIONAL_TEMPLATES: Record<string, CollageTemplate> = {
  INSTAGRAM_GRID: {
    name: "Instagram Grid",
    description:
      "Perfect 3x3 grid for Instagram feed posts. Maintains perfect square ratio for consistent profile appearance.",
    width: 1080,
    height: 1080,
    rows: 3,
    cols: 3,
    cellPadding: 2,
    displayScale: 0.7,
    backgroundColor: "ffffff",
  },

  PRINT_POSTER: {
    name: "A4 Poster",
    description:
      "High-resolution A4 format (2480×3508px) suitable for professional printing and digital displays.",
    width: 2480,
    height: 3508,
    rows: 4,
    cols: 3,
    displayScale: 0.6,
    cellPadding: 10,
    backgroundColor: "#f8f8f8",
  },

  CLASSIC: {
    name: "Classic Grid",
    description:
      "Simple 2x2 layout ideal for before/after comparisons or quadrant-style storytelling.",
    width: 1080,
    height: 1080,
    rows: 2,
    cols: 2,
    cellPadding: 2,
    displayScale: 0.6,
    backgroundColor: "#ffffff",
  },

  PINTEREST_PIN: {
    name: "Pinterest Pin",
    description:
      "Vertical 2:3 ratio optimized for Pinterest engagement and discovery.",
    width: 1000,
    height: 1500,
    rows: 2,
    cols: 1,
    cellPadding: 0,
    displayScale: 0.6,
    backgroundColor: "#f5f5f5",
  },

  INSTAGRAM_STORY: {
    name: "Instagram Story Split",
    description:
      "Full-screen vertical format for Instagram Stories with clear visual division.",
    width: 1080,
    height: 1920,
    rows: 2,
    cols: 1,
    cellPadding: 4,
    displayScale: 0.7,
    backgroundColor: "#ffffff",
  },

  PHOTO_BOOTH: {
    name: "Photo Booth Strip",
    description:
      "Narrow vertical layout mimicking classic photo strips with 4 image slots.",
    width: 600,
    height: 1800,
    rows: 4,
    cols: 1,
    cellPadding: 5,
    displayScale: 0.6,
    backgroundColor: "#eeeeee",
  },

  BEFORE_AFTER: {
    name: "Before / After",
    description:
      "Horizontal split layout perfect for transformation showcases and comparisons.",
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
    description:
      "Widescreen 2:1 ratio mimicking professional magazine layouts.",
    width: 1600,
    height: 800,
    rows: 1,
    cols: 2,
    cellPadding: 6,
    displayScale: 0.6,
    backgroundColor: "#fafafa",
  },

  // NEW ADDITIONS:
  YOUTUBE_THUMBNAIL: {
    name: "YouTube Thumbnail",
    description:
      "1280×720px standard thumbnail size with safe zones for text and branding.",
    width: 1280,
    height: 720,
    rows: 2,
    cols: 2,
    cellPadding: 8,
    displayScale: 0.7,
    backgroundColor: "#000000",
  },

  FACEBOOK_EVENT: {
    name: "Facebook Event Cover",
    description:
      "1920×1080px widescreen format for Facebook events and promotional banners.",
    width: 1920,
    height: 1080,
    rows: 1,
    cols: 3,
    cellPadding: 15,
    displayScale: 0.5,
    backgroundColor: "#1877f2",
  },

  TWITTER_THREAD: {
    name: "Twitter Thread",
    description:
      "Square format optimized for Twitter threads with multiple visual elements.",
    width: 1200,
    height: 1200,
    rows: 3,
    cols: 1,
    cellPadding: 10,
    displayScale: 0.6,
    backgroundColor: "#e1e8ed",
  },

  LINKEDIN_CAROUSEL: {
    name: "LinkedIn Carousel",
    description:
      "1080×1080px square format perfect for LinkedIn document carousels.",
    width: 1080,
    height: 1080,
    rows: 2,
    cols: 2,
    cellPadding: 5,
    displayScale: 0.6,
    backgroundColor: "#f3f6f8",
  },

  PORTFOLIO_SHOWCASE: {
    name: "Portfolio Showcase",
    description:
      "Dynamic 3×3 grid for creative portfolios with balanced whitespace.",
    width: 2000,
    height: 2000,
    rows: 3,
    cols: 3,
    cellPadding: 20,
    displayScale: 0.6,
    backgroundColor: "#ffffff",
  },
};
