import sharp from "sharp";

export const processImageForCell = async (
  imagePath: string,
  cellWidth: number,
  cellHeight: number
): Promise<Buffer> => {
  return sharp(imagePath)
    .rotate() // Auto-rotacija prema EXIF
    .resize({
      width: cellWidth,
      height: cellHeight,
      fit: sharp.fit.cover,
      // position: sharp.strategy.attention,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .normalise()
    .linear(1.1, -10)
    .sharpen({ sigma: 1.2 })
    .toBuffer();
};
