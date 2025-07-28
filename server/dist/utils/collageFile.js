import sharp from "sharp";
export const processImageForCell = async (imagePath, cellWidth, cellHeight, borderRadius = 0) => {
    if (borderRadius <= 0) {
        return sharp(imagePath)
            .rotate()
            .resize({
            width: cellWidth,
            height: cellHeight,
            fit: sharp.fit.cover,
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: false,
        })
            .normalise()
            .linear(1.1, -10)
            .sharpen({ sigma: 1.2 })
            .toBuffer();
    }
    // Kreirajte masku sa zaobljenim uglovima
    const roundedCorners = Buffer.from(`<svg width="${cellWidth}" height="${cellHeight}">
      <rect x="0" y="0" 
            width="${cellWidth}" 
            height="${cellHeight}" 
            rx="${borderRadius}" 
            ry="${borderRadius}" 
            fill="black"/>
    </svg>`);
    // Prvo obradite sliku
    const processedImage = await sharp(imagePath)
        .rotate()
        .resize({
        width: cellWidth,
        height: cellHeight,
        fit: sharp.fit.cover,
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false,
    })
        .normalise()
        .linear(1.1, -10)
        .sharpen({ sigma: 1.2 })
        .toBuffer();
    // Kreirajte novu sliku sa transparentnim pozadinom
    return sharp({
        create: {
            width: cellWidth,
            height: cellHeight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    })
        .composite([
        {
            input: processedImage,
            blend: "over",
        },
        {
            input: roundedCorners,
            blend: "dest-in",
        },
    ])
        .png() // Koristite PNG format za podršku transparentnosti
        .toBuffer();
};
