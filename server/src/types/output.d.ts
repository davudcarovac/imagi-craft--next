import { sharp } from "sharp";
export type DownloadLinksType = {
  name: string;
  size: number;
  height: number;
  width: number;
  format: string;
} & { error?: string };

export type CollageTemplate = {
  name: string;
  width: number;
  height: number;
  rows: number;
  cols: number;
  cellPadding?: number;
  description?: string;
  targetDPI?: number;
  backgroundColor?: string | sharp.Color;
};

export type ImageAsset = {
  buffer: Buffer;
  metadata: sharp.Metadata;
  position: {
    row: number;
    col: number;
  };
};
