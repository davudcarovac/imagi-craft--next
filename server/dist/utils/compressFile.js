// utils/compressFile.ts
import sharp, {} from "sharp";
import ErrorResponse from "./CustomErrorResponse.js";
sharp.cache(false);
export default async function compressFile(filePath, outputPath, outputZipDir, qualityLevel, convertTo, greyscale) {
    try {
        let image = sharp(filePath);
        const metadata = await image.metadata();
        const format = metadata.format;
        if (!format) {
            throw new Error("Unable to determine image format.");
        }
        const q = +qualityLevel;
        // ✅ Resize ako je veće od 2000px
        const MAX_DIMENSION = 2000;
        if ((metadata.width && metadata.width > MAX_DIMENSION) ||
            (metadata.height && metadata.height > MAX_DIMENSION)) {
            const resizeOptions = {};
            // proporcionalno smanjenje dimenzija
            if (metadata.width &&
                metadata.height &&
                metadata.width > metadata.height) {
                resizeOptions.width = MAX_DIMENSION;
            }
            else {
                resizeOptions.height = MAX_DIMENSION;
            }
            image = image.resize(resizeOptions);
        }
        // Apply grayscale if needed
        if (greyscale === "On") {
            image = image.grayscale();
        }
        const applyCompression = (instance, formatType) => {
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
                default:
                    throw new Error("Unsupported image format for compression");
            }
        };
        if (convertTo) {
            // convert to new format
            const converted = image.toFormat(convertTo, { quality: q });
            const info = await converted.toFile(outputPath);
            // create zip version from processed file
            await sharp(outputPath).toFile(outputZipDir);
            return info;
        }
        // compress using original format
        applyCompression(image, format);
        const info = await image.toFile(outputPath);
        // create zip version from already saved file
        await sharp(outputPath).toFile(outputZipDir);
        return info;
    }
    catch (error) {
        console.error("Compress error:", error.message);
        throw new ErrorResponse(error.message, 400);
    }
}
