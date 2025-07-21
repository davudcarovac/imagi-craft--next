"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import type { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Image as KonvaImageType } from "konva/lib/shapes/Image";
import useImage from "use-image";
import WatermarkInfo from "./WatermarkInfo";
import Konva from "konva";

type WatermarkKonvaProps = {
  backgroundSrc: string | null;
  watermarkSrc: string | null;
  watermarkPos: { x: number; y: number };
  watermarkSize: { width: number; height: number };
  selected: boolean;
  isPending: boolean;
  removeWatermark: () => void;
  setSelected: Dispatch<SetStateAction<boolean>>;
  setWatermarkPos: (pos: { x: number; y: number }) => void;
  setWatermarkSize: (size: { width: number; height: number }) => void;
};

type UploadedImageProps = {
  src: string;
  onLoad?: (img: HTMLImageElement) => void;
  onClick?: (evt: KonvaEventObject<MouseEvent>) => void;
  onTap?: (evt: KonvaEventObject<TouchEvent>) => void;
} & Omit<Konva.ImageConfig, "image">;

// UploadedImage component with typed ref and props
const UploadedImage = React.forwardRef<KonvaImageType, UploadedImageProps>(
  ({ src, onLoad, onClick, onTap, ...props }, ref) => {
    const [image] = useImage(src, "anonymous");
    const hasLoaded = useRef(false);

    useEffect(() => {
      hasLoaded.current = false;
    }, [src]);

    useEffect(() => {
      if (image && onLoad && !hasLoaded.current) {
        onLoad(image as HTMLImageElement);
        hasLoaded.current = true;
      }
    }, [image, onLoad]);

    return image ? (
      <KonvaImage
        image={image}
        ref={ref}
        onClick={onClick}
        onTap={onTap}
        {...props}
      />
    ) : null;
  }
);

UploadedImage.displayName = "UploadedImage";

const WatermarkKonva: React.FC<WatermarkKonvaProps> = ({
  backgroundSrc,
  watermarkSrc,
  watermarkPos,
  watermarkSize,
  selected,
  isPending,
  removeWatermark,
  setSelected,
  setWatermarkPos,
  setWatermarkSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedWidth = 900;

  const [stageSize, setStageSize] = useState({
    width: fixedWidth,
    height: 600,
  });
  const [naturalSize, setNaturalSize] = useState({
    width: fixedWidth,
    height: 600,
  });

  const watermarkRef = useRef<KonvaImageType>(null);
  const transformerRef = useRef<TransformerType>(null);

  const updateStageSize = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const scaleFactor =
      containerWidth < fixedWidth ? containerWidth / fixedWidth : 1;

    setStageSize({
      width: fixedWidth * scaleFactor,
      height:
        (naturalSize.height / naturalSize.width) * fixedWidth * scaleFactor,
    });
  };

  useEffect(() => {
    updateStageSize();
    window.addEventListener("resize", updateStageSize);
    return () => window.removeEventListener("resize", updateStageSize);
  }, [naturalSize]);

  const handleBackgroundLoad = (img: HTMLImageElement) => {
    setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    setStageSize({
      width: fixedWidth,
      height: (img.naturalHeight / img.naturalWidth) * fixedWidth,
    });
  };

  const handleWatermarkLoad = (img: HTMLImageElement) => {
    // Proporcija između pozadinske slike i watermarka
    const widthRatio = naturalSize.width / img.naturalWidth;
    const heightRatio = naturalSize.height / img.naturalHeight;

    // Odaberite manji ratio da watermark ne pređe granice
    const scale = Math.min(widthRatio, heightRatio) * 0.2; // 0.2 = 1/5 željenog odnosa

    setWatermarkSize({
      width: img.naturalWidth * scale,
      height: img.naturalHeight * scale,
    });

    setTimeout(() => {
      if (transformerRef.current && watermarkRef.current) {
        transformerRef.current.nodes([watermarkRef.current]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }, 0);
  };

  const scaledPos = {
    x: (watermarkPos.x / naturalSize.width) * stageSize.width,
    y: (watermarkPos.y / naturalSize.height) * stageSize.height,
  };

  return (
    <div ref={containerRef} className="w-full py-1 ">
      {backgroundSrc && (
        <div className="mt-4">
          <WatermarkInfo
            watermarkSrc={watermarkSrc}
            position={watermarkPos}
            size={watermarkSize}
            isPending={isPending}
            removeWatermark={removeWatermark}
          />
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={(e) =>
              e.target === e.target.getStage() && setSelected(false)
            }
            onTouchStart={(e) =>
              e.target === e.target.getStage() && setSelected(false)
            }
          >
            <Layer>
              <UploadedImage
                src={backgroundSrc}
                width={stageSize.width}
                height={stageSize.height}
                onLoad={handleBackgroundLoad}
              />
              {watermarkSrc && (
                <>
                  <UploadedImage
                    ref={watermarkRef}
                    src={watermarkSrc}
                    x={scaledPos.x}
                    y={scaledPos.y}
                    width={
                      stageSize.width *
                      (watermarkSize.width / naturalSize.width)
                    }
                    height={
                      stageSize.height *
                      (watermarkSize.height / naturalSize.height)
                    }
                    draggable
                    onLoad={handleWatermarkLoad}
                    onDragEnd={(e: KonvaEventObject<DragEvent>) => {
                      const node = e.target;
                      setWatermarkPos({
                        x: (node.x() / stageSize.width) * naturalSize.width,
                        y: (node.y() / stageSize.height) * naturalSize.height,
                      });
                    }}
                    onTransformEnd={() => {
                      const node = watermarkRef.current;
                      if (!node) return;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      node.scaleX(1);
                      node.scaleY(1);

                      setWatermarkSize({
                        width:
                          ((node.width() * scaleX) / stageSize.width) *
                          naturalSize.width,
                        height:
                          ((node.height() * scaleY) / stageSize.height) *
                          naturalSize.height,
                      });

                      setWatermarkPos({
                        x: (node.x() / stageSize.width) * naturalSize.width,
                        y: (node.y() / stageSize.height) * naturalSize.height,
                      });
                    }}
                    onClick={() => setSelected(true)}
                    onTap={() => setSelected(true)}
                  />
                  {selected && (
                    <Transformer
                      ref={transformerRef}
                      rotateEnabled={false}
                      boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 20 || newBox.height < 20)
                          return oldBox;
                        return newBox;
                      }}
                    />
                  )}
                </>
              )}
            </Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default WatermarkKonva;
