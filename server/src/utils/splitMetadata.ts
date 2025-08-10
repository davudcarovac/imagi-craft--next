import type { Tags } from "exiftool-vendored";

const EXIF_KEYS = new Set([
  "Make",
  "Model",
  "ExposureTime",
  "FNumber",
  "ISO",
  "DateTimeOriginal",
  "Flash",
  "FocalLength",
  "ExifVersion",
  "ExifImageWidth",
  "ExifImageHeight",
  // dodaš po potrebi
]);

export function splitMetadata(metadata: Tags) {}
