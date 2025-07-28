import sharp, {} from "sharp";
import ErrorResponse from "./CustomErrorResponse.js";
export default async function compressFile(filePath, outputPath, outputZipDir, qualityLevel, convertTo, greyscale) {
    try {
        const image = sharp(filePath);
        const forZip = sharp(filePath);
        const { format } = await image.metadata();
        const q = +qualityLevel;
        // Ako je uključena grayscale opcija
        if (greyscale === "On") {
            image.grayscale();
            forZip.grayscale();
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
    }
    catch (error) {
        console.error("Compress error:", error);
        throw new ErrorResponse(error.message, 400);
    }
}
