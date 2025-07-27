export const getAcceptTypes = (action: string): string => {
  switch (action) {
    case "watermarking":
    case "crop":
      // Dozvoljavamo sve image osim HEIF, TIFF i AVIF
      return "image/jpeg,image/png,image/webp,image/gif";
    case "compress":
      // Dozvoljavamo sve image osim HEIF
      return "image/jpeg,image/png,image/webp,image/gif,image/tiff,image/avif";
    case "convert":
      return "image/jpeg,image/png,image/webp,image/gif,image/tiff,image/avif";
    case "resize":
      return "image/tiff,image/png, image/webp,image/jpeg, image/avif, image/gif";
    default:
      return "image/*";
  }
};
