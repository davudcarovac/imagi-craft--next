import sharp from "sharp";
import type { FormatEnum, OutputInfo } from "sharp";
import ErrorResponse from "./CustomErrorResponse.ts";

// Tipiziranje funkcije convertFile
export default async function convertFile(
  filePath: string,
  outputPath: string,
  outputZipDir: string,
  convertTo: keyof FormatEnum
): Promise<OutputInfo> {
  const image = sharp(filePath);

  if (convertTo === "png") {
    return image
      .toFormat(convertTo, { quality: 60 })
      .toFile(outputPath)
      .then(() => {
        return sharp(filePath)
          .toFormat(convertTo, { quality: 60 })
          .toFile(outputZipDir)
          .then((info) => {
            return info;
          });
      })
      .catch((error: any) => {
        console.log(error);
        throw new ErrorResponse(error.message, 400);
      });
  } else if (convertTo === "heif") {
    return image
      .toFormat(convertTo, {
        quality: 80,
        compression: "av1",
      })
      .toFile(outputPath)
      .then(() => {
        return sharp(filePath)
          .toFormat(convertTo, {
            quality: 80,
            compression: "av1",
          })
          .toFile(outputZipDir)
          .then((info) => {
            return info;
          });
      })
      .catch((error: any) => {
        console.log(error);
        throw new ErrorResponse(error.message, 400);
      });
  } else {
    return image
      .toFormat(convertTo)
      .toFile(outputPath)
      .then(() => {
        return sharp(filePath)
          .toFormat(convertTo)
          .toFile(outputZipDir)
          .then((info) => {
            return info;
          });
      })
      .catch((error: any) => {
        console.log(error);
        // "error" može biti bilo koji objekat koji `sharp` može baciti, pa koristimo "any"
        throw new ErrorResponse(error.message, 400);
      });
  }
}
