import type { ExifDate, ExifDateTime } from "exiftool-vendored";
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

export interface TokenPayload extends JwtPayload {
  userId: string;
  plan: string;
}

export type EditableMetadata = {
  title?: string; // Naziv slike (ako postoji kao IPTC/XMP)
  description?: string; // Opis slike
  author?: string; // Fotograf / autor
  copyright?: string; // Autorska prava
  keywords?: string | string[]; // Ključne reči

  dateTimeOriginal?: string | ExifDateTime; // Kada je fotografija napravljena
  createDate?: string | number | ExifDateTime | ExifDate; // Kada je fajl kreiran
  modifyDate?: string | ExifDateTime; // Kada je poslednji put izmenjen

  gpsLatitude?: number | string; // GPS latituda
  gpsLongitude?: number | string; // GPS longituda
  gpsAltitude?: number; // GPS visina (ako postoji)

  rating?: number; // Ocena slike

  quality?: string;
  make?: string;
  model?: string;
};
