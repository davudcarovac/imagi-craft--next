import type { Tags } from "exiftool-vendored";
import { ExifDateTime, BinaryField } from "exiftool-vendored";

const READ_ONLY_TAGS: string[] = [
  "FileType",
  "FileSize",
  "FileModifyDate",
  "FileAccessDate",
  "FileInodeChangeDate",
  "ImageWidth",
  "ImageHeight",
  "Megapixels",
  "Make",
  "Model",
  "ISO",
  "ShutterSpeed",
  "Aperture",
  "FNumber",
  "FocalLength",
  "ColorSpace",
  "ExifVersion",
  "Software",
  "Orientation",
  "ResolutionUnit",
  "XResolution",
  "YResolution",
  "GPSLatitude",
  "GPSLongitude",
  "GPSPosition",
  // "Directory",
  "FileName",
  "FileTypeExtension",
  "BitsPerSample",
  "Compression",
  "MimeType",
  "EncodingProcess",
  "PreviewImage",
  "ThumbnailImage",
];

const IMPORTANT_EDITABLE_ORDER: string[] = [
  "Title",
  "ObjectName",
  "Description",
  "ImageDescription",
  "Caption",
  "Artist",
  "Creator",
  "By-line",
  "Copyright",
  "Keywords",
  "Subject",
  "Category",
  "SubCategory",
  "Location",
  "City",
  "ProvinceState",
  "Country",
  "Rating",
  "Instructions",
];

// Mapiranje različitih imena istih tagova
const TAG_ALIASES: Record<string, string> = {
  "XMP:Title": "Title",
  ObjectName: "ObjectName",
  "Caption-Abstract": "Caption",
  "By-line": "Artist",
  Creator: "Artist",
  ImageDescription: "Description",
};

export function splitMetadata(metadata: Tags, filename: string) {
  const readOnly: Record<string, unknown> = {};
  let editable: Record<string, unknown> = {};

  const ALWAYS_INCLUDE = [
    "Title",
    "Description",
    "Author",
    "Copyright",
    "Keywords",
    "Rating",
  ];

  for (const [key, value] of Object.entries(metadata)) {
    // Mapiraj alias odmah
    const normalizedKey = TAG_ALIASES[key] || key;

    // Ako je u read-only listi
    if (READ_ONLY_TAGS.includes(normalizedKey)) {
      if (key === "FileName") {
        readOnly[normalizedKey] = filename;
      } else if (value instanceof ExifDateTime) {
        readOnly[normalizedKey] = value.toISOString();
      } else if (value instanceof BinaryField) {
        readOnly[normalizedKey] = "[Binary data]";
      } else {
        readOnly[normalizedKey] = value;
      }
      continue;
    }

    // Ako može da se edituje (tekst ili broj)
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      (Array.isArray(value) &&
        value.every((v) => typeof v === "string" || typeof v === "number"))
    ) {
      editable[normalizedKey] = value;

      // Ako je u "uvek uključiti", kopiraj ga i u readOnly
      if (ALWAYS_INCLUDE.includes(normalizedKey)) {
        readOnly[normalizedKey] = value;
      }
    } else {
      readOnly[normalizedKey] = value;
    }
  }

  // Sortiranje editable tagova po važnosti
  editable = Object.fromEntries(
    Object.entries(editable).sort(([keyA], [keyB]) => {
      const indexA = IMPORTANT_EDITABLE_ORDER.indexOf(keyA);
      const indexB = IMPORTANT_EDITABLE_ORDER.indexOf(keyB);

      if (indexA === -1 && indexB === -1) return keyA.localeCompare(keyB);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    })
  );

  // Dodaj prazna polja ako fale
  for (const tag of IMPORTANT_EDITABLE_ORDER) {
    if (!(tag in editable)) {
      editable[tag] = "";
    }
    if (ALWAYS_INCLUDE.includes(tag) && !(tag in readOnly)) {
      readOnly[tag] = "";
    }
  }

  return { readOnly, editable };
}
