"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
import WatermarkInfo from "./WatermarkInfo";

type WatermarkKonvaProps = {
  backgroundSrc: string | null;
  watermarkSrc: string | null;
  watermarkPos: { x: number; y: number };
  watermarkSize: {
    width: number;
    height: number;
  };
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
  setWatermarkPos: (pos: { x: number; y: number }) => void;
  setWatermarkSize: (size: { width: number; height: number }) => void;
};

const UploadedImage = React.forwardRef(
  (
    {
      src,
      onLoad,
      onClick,
      ...props
    }: {
      src: string;
      onLoad?: (img: HTMLImageElement) => void;
      onClick?: () => void;
    } & any,
    ref: React.Ref<any>
  ) => {
    const [image] = useImage(src, "anonymous");
    const hasLoaded = useRef(false);

    useEffect(() => {
      hasLoaded.current = false;
    }, [src]);

    useEffect(() => {
      if (image && onLoad && !hasLoaded.current) {
        onLoad(image);
        hasLoaded.current = true;
      }
    }, [image, onLoad]);

    return image ? (
      <KonvaImage
        image={image}
        ref={ref}
        onClick={onClick}
        onTap={onClick}
        {...props}
      />
    ) : null;
  }
);

UploadedImage.displayName = "UploadedImage";

const WatermarkKonva = ({
  backgroundSrc,
  watermarkSrc,
  watermarkPos,
  watermarkSize,
  selected,
  setSelected,
  setWatermarkPos,
  setWatermarkSize,
}: WatermarkKonvaProps) => {
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

  const watermarkRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

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
    if (setWatermarkSize) {
      setWatermarkSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }

    // Aktiviraj transformer odmah po učitavanju
    setTimeout(() => {
      if (transformerRef.current && watermarkRef.current) {
        transformerRef.current.nodes([watermarkRef.current]);
        transformerRef.current.getLayer().batchDraw();
      }
    }, 0);
  };

  const scaledPos = {
    x: (watermarkPos.x / naturalSize.width) * stageSize.width,
    y: (watermarkPos.y / naturalSize.height) * stageSize.height,
  };

  return (
    <div ref={containerRef} className="w-full py-1">
      {backgroundSrc && (
        <div className="mt-4">
          <WatermarkInfo
            watermarkSrc={watermarkSrc}
            position={watermarkPos}
            size={watermarkSize}
          />
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={(e) => {
              if (e.target === e.target.getStage()) {
                setSelected(false);
              }
            }}
            onTouchStart={(e) => {
              if (e.target === e.target.getStage()) {
                setSelected(false);
              }
            }}
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
                    onDragEnd={(e: any) => {
                      const x =
                        (e.target.x() / stageSize.width) * naturalSize.width;
                      const y =
                        (e.target.y() / stageSize.height) * naturalSize.height;

                      if (setWatermarkPos) {
                        setWatermarkPos({ x, y });
                      }
                    }}
                    onTransformEnd={(e: any) => {
                      const node = watermarkRef.current;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      node.scaleX(1);
                      node.scaleY(1);

                      const newWidth =
                        ((node.width() * scaleX) / stageSize.width) *
                        naturalSize.width;
                      const newHeight =
                        ((node.height() * scaleY) / stageSize.height) *
                        naturalSize.height;

                      if (setWatermarkSize) {
                        setWatermarkSize({
                          width: newWidth,
                          height: newHeight,
                        });
                      }

                      const newX =
                        (node.x() / stageSize.width) * naturalSize.width;
                      const newY =
                        (node.y() / stageSize.height) * naturalSize.height;

                      if (setWatermarkPos) {
                        setWatermarkPos({ x: newX, y: newY });
                      }
                    }}
                    onClick={() => setSelected(true)}
                    onTap={() => setSelected(true)}
                  />
                  {selected && (
                    <Transformer
                      ref={transformerRef}
                      rotateEnabled={false}
                      boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 20 || newBox.height < 20) {
                          return oldBox;
                        }
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
