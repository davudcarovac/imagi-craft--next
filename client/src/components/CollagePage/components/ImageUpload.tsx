import { ImageAsset } from "@/types/types";
import { useState, useCallback } from "react";

interface ImageUploadProps {
  onUpload: (images: ImageAsset[]) => void;
  maxImages: number;
}

export const ImageUpload = ({ onUpload, maxImages }: ImageUploadProps) => {
  const [previews, setPreviews] = useState<ImageAsset[]>([]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).slice(0, maxImages);

      const newImages = files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setPreviews(newImages);
      onUpload(newImages);
    },
    [maxImages, onUpload]
  );

  return (
    <div
      className="drop-zone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {previews.length === 0 ? (
        <p>Drop images here (max {maxImages})</p>
      ) : (
        <div className="image-previews">
          {previews.map((img) => (
            <img
              key={img.id}
              src={img.previewUrl}
              alt="Preview"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("imageId", img.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
