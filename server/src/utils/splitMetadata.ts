import type { Tags } from "exiftool-vendored";

const READ_ONLY_TAGS: string[] = [
  "FileType",
  "FileSize",
  "ImageWidth",
  "ImageHeight",
  "Megapixels",
  "CreateDate",
  "ModifyDate",
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
  "Directory",
  "FileName",
  "FileTypeExtension",
  "BitsPerSample",
  "Compression",
  "MimeType",
  "EncodingProcess",
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

// Mapa ekvivalencija naziva
const TAG_ALIASES: Record<string, string> = {
  "XMP:Title": "Title",
  ObjectName: "ObjectName",
  "Caption-Abstract": "Caption",
  "By-line": "Artist",
  Creator: "Artist",
  ImageDescription: "Description",
};

export function splitMetadata(metadata: Tags) {
  const readOnly: Record<string, unknown> = {};
  let editable: Record<string, unknown> = {};

  console.log("deskripcija slike ===> ", metadata.Description);

  for (const [key, value] of Object.entries(metadata)) {
    if (READ_ONLY_TAGS.includes(key)) {
      readOnly[key] = value;
      continue;
    }

    if (
      typeof value === "string" ||
      (Array.isArray(value) && value.every((v) => typeof v === "string"))
    ) {
      editable[key] = value;
    } else {
      readOnly[key] = value;
    }
  }

  editable = Object.fromEntries(
    Object.entries(editable).sort(([keyA], [keyB]) => {
      const normA = TAG_ALIASES[keyA] || keyA;
      const normB = TAG_ALIASES[keyB] || keyB;

      const indexA = IMPORTANT_EDITABLE_ORDER.indexOf(normA);
      const indexB = IMPORTANT_EDITABLE_ORDER.indexOf(normB);

      if (indexA === -1 && indexB === -1) {
        return keyA.localeCompare(keyB);
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    })
  );

  return { readOnly, editable };
}
