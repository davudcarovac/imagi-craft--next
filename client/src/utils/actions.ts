import resizeImg from "../assets/action icons/resize.png";
import convertImg from "../assets/action icons/convert.png";
import cropImg from "../assets/action icons/crop.png";
import compressImg from "../assets/action icons/compressed-file.png";
import watermarking from "../assets/action icons/watermark.png";

export const actions = [
  {
    actionName: "Convert IMAGE",
    description:
      "Convert any image to JPEG, PNG, WEBP format. The process is reliable and quick.",
    icon: convertImg,
    to: "convert-image",
  },
  {
    actionName: "Resize IMAGE",
    description: "Resize image by defining new height and width pixels.",
    icon: resizeImg,
    to: "resize-image",
  },
  {
    actionName: "Crop IMAGE",
    description:
      "Crop image easy by defining a rectangle in pixels. Upload and transform it.",
    icon: cropImg,
    to: "crop-image",
  },
  {
    actionName: "Compress IMAGE",
    description:
      "Choose multiple images and compress them by selecting quality level.",
    icon: compressImg,
    to: "compress-image",
  },
  {
    actionName: "Watermark IMAGE",
    description:
      "Choose multiple images and compress them by selecting quality level.",
    icon: watermarking,
    to: "watermark-image",
  },
];
