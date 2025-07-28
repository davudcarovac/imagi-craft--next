import sharp, {} from "sharp";
import ErrorResponse from "./CustomErrorResponse.js";
export default async function cropfaceFile(filePath, outputFileDir, imageOptions) {
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
    }
    catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
}
