import sharp, { type OutputInfo } from "sharp";
import ErrorResponse from "./CustomErrorResponse.ts";

type ImageOptionsType = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export default async function cropfaceFile(
  filePath: string,
  outputFileDir: string,
  imageOptions: ImageOptionsType
): Promise<OutputInfo> {
  try {
    const { x, y, width, height } = imageOptions;

    const buffer = await sharp(filePath)
      .extract({
        left: Math.floor(x),
        top: Math.floor(y),
        width: Math.floor(width),
        height: Math.floor(height),
      })
      .toBuffer();

    const info = await sharp(buffer).toFile(outputFileDir);
    return info;
  } catch (error: any) {
    throw new ErrorResponse(error.message, 500);
  }
}
