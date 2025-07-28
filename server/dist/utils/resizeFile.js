import sharp, {} from "sharp";
import ErrorResponse from "./CustomErrorResponse.js";
import { sanitizeSize } from "./sanitizeSize.js";
export default function resizeFile(filePath, outputPath, outputZipDir, image) {
    let { width, height, fit } = image;
    // setting default values if values are not provided or equal 0
    width = sanitizeSize(width, 1);
    height = sanitizeSize(height, 1);
    fit = fit || "cover";
    return sharp(filePath)
        .resize({ width: +width, height: +height, fit: fit })
        .toFile(outputPath)
        .then(() => {
        return sharp(filePath)
            .resize({ width: +width, height: +height, fit: fit })
            .toFile(outputZipDir)
            .then((info) => {
            return info;
        });
    })
        .catch((error) => {
        console.log("Sharp error ===> ", error);
        throw new ErrorResponse(error.message, 404);
    });
}
