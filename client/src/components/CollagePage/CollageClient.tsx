"use client";

import { useState } from "react";
import { TEMPLATES, TemplateSelector } from "./components/TemplateSelector";
import { ImageUpload } from "./components/ImageUpload";
import { CollageCanvas } from "./components/CollageCanvas";
import { ImageAsset } from "@/types/types";

export const CollageClient = () => {
  const [state, setState] = useState<{
    images: ImageAsset[];
    template: string;
    isPremium: boolean;
  }>({
    images: [],
    template: "grid",
    isPremium: false,
  });

  const handleImageUpload = (newImages: ImageAsset[]) => {
    setState((prev) => ({
      ...prev,
      images: newImages.map((img) => ({
        ...img,
        position: { x: 0, y: 0 }, // Default position
      })),
    }));
  };

  const handleImageMove = (id: string, x: number, y: number) => {
    setState((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, position: { x, y } } : img
      ),
    }));
  };

  const selectedTemplate = TEMPLATES.find((t) => t.id === state.template)!;

  return (
    <div className="collage-maker">
      <TemplateSelector
        selectedTemplate={state.template}
        onSelect={(templateId) => setState({ ...state, template: templateId })}
        isPremium={state.isPremium}
      />

      <ImageUpload
        onUpload={handleImageUpload}
        maxImages={state.isPremium ? 10 : 4}
      />

      <CollageCanvas
        images={state.images}
        template={selectedTemplate}
        onImageMove={handleImageMove}
      />

      {!state.isPremium && (
        <div className="watermark-notice">
          <p>
            Free version adds watermark. <button>Upgrade</button>
          </p>
        </div>
      )}
    </div>
  );
};
