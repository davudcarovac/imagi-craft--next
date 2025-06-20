import sharp from "sharp";
import ErrorResponse from "./CustomErrorResponse.ts";

type ImageOptionsType = {
  left: number;
  top: number;
  width: number;
  height: number;
};
export default async function cropFile(
  filePath: string,
  outputPath: string,
  imageOptions: ImageOptionsType
) {
  const { left, top, width, height } = imageOptions;

  console.log("Image Options ==> ", imageOptions);

  return sharp(filePath)
    .extract({
      left: left,
      top: top,
      width: width,
      height: height,
    })
    .toFile(outputPath)
    .then((info) => console.log("Crop info ===> ", info))
    .catch((error) => {
      throw new ErrorResponse(error.message, 400);
    });
}
