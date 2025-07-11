import { ImageAsset, Template } from "@/types/types";
import { useRef, useEffect } from "react";

interface CollageCanvasProps {
  images: ImageAsset[];
  template: Template;
  onImageMove: (id: string, x: number, y: number) => void;
}

export const CollageCanvas = ({
  images,
  template,
  onImageMove,
}: CollageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render collage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    if (template.dimensions) {
      ctx.clearRect(
        0,
        0,
        template.dimensions.width,
        template.dimensions.height
      );
    }

    // Draw images
    images.forEach((img) => {
      if (img.position) {
        const imgElement = new Image();
        imgElement.src = img.previewUrl;
        imgElement.onload = () => {
          ctx.drawImage(imgElement, img.position?.x || 0, img.position?.y || 0);
        };
      }
    });
  }, [images, template]);

  return (
    template.dimensions && (
      <canvas
        ref={canvasRef}
        width={template.dimensions.width}
        height={template.dimensions.height}
        className="collage-canvas"
      />
    )
  );
};
