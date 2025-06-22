import sharp, { type OutputInfo } from "sharp";
// import deleteFile from "./deleteFile.js";
import ErrorResponse from "./CustomErrorResponse.ts";

// Tipiziranje opcija za poziciju vodenog žiga
type compositeOptions = {
  top: number; // Y koordinata
  left?: number; // X koordinata, opcionalno
  width: number;
  height: number;
};

// Tipiziranje povratnih informacija o slici
interface ImageMetadata {
  width: number;
  height: number;
}

export default async function watermarkFile(
  filePath: string, // Putanja do glavne slike
  inputImgPath: string, // Putanja do slike za vodeni žig
  outputPath: string, // Putanja za izlaznu sliku
  compositeOptions: compositeOptions // Pozicija vodenog žiga
): Promise<OutputInfo> {
  // Funkcija ne vraća vrednost, samo baca greške ili zapisuje fajl
  // main image
  const background = sharp(filePath);
  const backgroundInfo: ImageMetadata =
    (await background.metadata()) as ImageMetadata;

  // overlay (vodeni žig)
  // const overlay = sharp(inputImgPath);
  // const overlayInfo: ImageMetadata =
  //   (await overlay.metadata()) as ImageMetadata;

  try {
    const resizedWatermarkBuffer = await sharp(inputImgPath)
      .resize({
        height: compositeOptions.height,
        width: compositeOptions.width,
        fit: "fill",
      })
      .toBuffer();
    const watermark = await background.composite([
      {
        input: resizedWatermarkBuffer,
        top: compositeOptions.top,
        left: compositeOptions.left,
      },
    ]);
    const info = await watermark.toFile(outputPath);
    return info;
  } catch (error) {
    console.error("Error in watermarkFile:", error);
    throw new ErrorResponse("Failed to process watermark", 500);
  }

  // Kreiranje vodenog žiga na osnovu pozicije
  // if (compositePosition === "topLeft") {
  //   await background
  //     .composite([{ input: inputImgPath, top: 50, left: 50 }])
  //     .toFile(outputPath)
  //     .then((result) => console.log("Result => ", result))
  //     .catch((error: Error) => {
  //       throw new ErrorResponse(error.message, 400);
  //     });
  // }

  // if (compositePosition === "bottomLeft") {
  //   const top = backgroundInfo.height - overlayInfo.height - 50;

  //   await background
  //     .composite([{ input: inputImgPath, top: top, left: 50 }])
  //     .toFile(outputPath)
  //     .then((result) => console.log("Result => ", result))
  //     .catch((error: Error) => {
  //       throw new ErrorResponse(error.message, 400);
  //     });
  // }

  // if (compositePosition === "topRight") {
  //   const left = backgroundInfo.width - overlayInfo.width - 50;

  //   await background
  //     .composite([{ input: inputImgPath, top: 50, left: left }])
  //     .toFile(outputPath)
  //     .then((result) => console.log("Result => ", result))
  //     .catch((error: Error) => {
  //       throw new ErrorResponse(error.message, 400);
  //     });
  // }

  // if (compositePosition === "bottomRight") {
  //   const top = backgroundInfo.height - overlayInfo.height - 50;
  //   const left = backgroundInfo.width - overlayInfo.width - 50;

  //   await background
  //     .composite([{ input: inputImgPath, top: top, left: left }])
  //     .toFile(outputPath)
  //     .then((result) => console.log("Result => ", result))
  //     .catch((error: Error) => {
  //       throw new ErrorResponse(error.message, 400);
  //     });
  // }

  // if (compositePosition === "center") {
  //   const left = backgroundInfo.width / 2 - overlayInfo.width / 2; // Centered horizontally
  //   const top = backgroundInfo.height / 2 - overlayInfo.height / 2; // Centered vertically
  //   console.log(top, left);

  //   await background
  //     .composite([{ input: inputImgPath, top: top, left: left }])
  //     .toFile(outputPath)
  //     .then((result) => console.log("Result => ", result))
  //     .catch((error: Error) => {
  //       throw new ErrorResponse(error.message, 400);
  //     });
  // }
}
