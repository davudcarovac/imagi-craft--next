import sharp, { type OutputInfo, type FormatEnum } from "sharp";
import ErrorResponse from "./CustomErrorResponse.ts";

export default async function compressFile(
  filePath: string,
  outputPath: string,
  outputZipDir: string,
  qualityLevel: number,
  convertTo?: keyof FormatEnum,
  greyscale?: string
): Promise<OutputInfo> {
  try {
    const image = sharp(filePath);
    const forZip = sharp(filePath);
    const { format } = await image.metadata();
    console.log("Format slike ===> ", format);

    const q = +qualityLevel;

    // Ako je uključena grayscale opcija
    if (greyscale === "On") {
      image.grayscale();
      forZip.grayscale();
    }

    const applyCompression = (
      instance: sharp.Sharp,
      formatType: string | undefined
    ) => {
      switch (formatType) {
        case "jpeg":
        case "jpg":
          return instance.jpeg({ quality: q });
        case "webp":
          return instance.webp({ quality: q });
        case "png":
          return instance.png({ compressionLevel: Math.round(q / 10) });
        case "tiff":
          return instance.tiff({ compression: "jpeg", quality: q });
        case "heif":
          return instance.heif({ quality: q, compression: "av1" });
        // case "avif":
        //   return instance.avif({ quality: q, effort: 4, lossless: false });
        default:
          throw new Error("Unsupported image format for compression");
      }
    };

    // Ako korisnik želi konverziju u drugi format
    if (convertTo) {
      const compressed = image.toFormat(convertTo, { quality: q });
      const info = await compressed.toFile(outputPath);
      await forZip.toFile(outputZipDir);
      return info;
    }

    // Inače, kompresuj u originalnom formatu
    applyCompression(image, format);
    applyCompression(forZip, format);

    const info = await image.toFile(outputPath);
    await forZip.toFile(outputZipDir);
    return info;
  } catch (error: any) {
    console.error("Compress error:", error.message);
    throw new ErrorResponse(error.message, 400);
  }
}
