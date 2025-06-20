import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import UploadFile from "../UploadFile";

const WatermarkEditor = () => {
  const [background, setBackground] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const backgroundRef = useRef<HTMLImageElement>(null);
  const watermarkRef = useRef<HTMLImageElement>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBackground(URL.createObjectURL(file));
  };

  const handleWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setWatermark(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (naturalSize.width > 0 && displaySize.width > 0) {
      const scaleX = displaySize.width / naturalSize.width;
      const scaleY = displaySize.height / naturalSize.height;

      //   const desiredRealSize = { width: 200, height: 200 };

      const maxWatermarkWidth = naturalSize.width * 0.5; // max 50% širine
      const maxWatermarkHeight = naturalSize.height * 0.5;

      const desiredRealSize = {
        width: Math.min(100, maxWatermarkWidth),
        height: Math.min(100, maxWatermarkHeight),
      };

      setSize({
        width: Math.round(desiredRealSize.width * scaleX),
        height: Math.round(desiredRealSize.height * scaleY),
      });

      setPosition({
        x: Math.round(50 * scaleX),
        y: Math.round(50 * scaleY),
      });
    }
  }, [naturalSize, displaySize]);

  useEffect(() => {
    const handleResize = () => {
      const img = backgroundRef.current;
      if (img) {
        setDisplaySize({
          width: img.clientWidth,
          height: img.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   useEffect(() => {
  //     console.log(watermarkRef.current);
  //   }),
  //     [
  //       watermarkRef.current?.naturalHeight || 0,
  //       watermarkRef.current?.naturalWidth || 0,
  //     ];

  return (
    <div>
      {background === null && (
        <UploadFile
          action="watermark"
          setBackground={setBackground}
          isMultiple={false}
          tooltip="watermark"
        />
      )}

      {background && (
        <div className="max-w-[800px] my-0 mx-auto flex items-center justify-between mt-10 mb-3">
          {/* <input type="file" onChange={handleBackgroundUpload} /> */}
          <div>
            <label
              htmlFor="watermark-upload"
              className="inline-block px-4 py-2 bg-[#1aac83] text-white rounded-md cursor-pointer font-semibold hover:opacity-70 transition duration-200"
            >
              Add Image{" "}
            </label>
            <input
              id="watermark-upload"
              type="file"
              accept="image/*"
              onChange={handleWatermarkUpload}
              className="hidden"
            />
          </div>

          {watermark && (
            <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm leading-relaxed z-10 font-sans">
              <div>
                <strong>Position:</strong> X: {position.x}px, Y: {position.y}px
              </div>
              <div>
                <strong>Size:</strong> W: {displaySize.width}px, H:{" "}
                {displaySize.height}px
              </div>
            </div>
          )}
        </div>
      )}
      <div
        // style={{
        //     position: "relative",
        //   width: "100%",
        //   maxWidth: 800,
        //   margin: "0 auto",
        // }}
        className="w-full max-w-[800px] mx-auto my-0  "
      >
        {background && (
          <img
            ref={backgroundRef}
            src={background}
            alt="Background"
            className="w-full"
            onLoad={() => {
              const img = backgroundRef.current;
              if (img) {
                setNaturalSize({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                });
                setDisplaySize({
                  width: img.clientWidth,
                  height: img.clientHeight,
                });
              }
            }}
          />
        )}

        {background && watermark && size.width > 0 && (
          <Rnd
            // key={`${size.width}x${size.height}-${position.x}-${position.y}`} // garantuje re-render
            dragGrid={[1, 1]}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            lockAspectRatio={true}
            resizeHandleStyles={{
              bottomRight: { backgroundColor: "white", width: 11, height: 11 },
              topLeft: { backgroundColor: "white", width: 11, height: 11 },
              topRight: { backgroundColor: "white", width: 11, height: 11 },
              bottomLeft: { backgroundColor: "white", width: 11, height: 11 },
            }}
            default={{
              x: position.x,
              y: position.y,
              width: size.width,
              height: size.height,
            }}
            bounds="parent"
            onDragStop={(_, d) => {
              const scaleX = naturalSize.width / displaySize.width;
              const scaleY = naturalSize.height / displaySize.height;

              const realX = Math.round(d.x * scaleX);
              const realY = Math.round(d.y * scaleY);

              console.log("Real coords:", realX, realY);
              setPosition({ x: realX, y: realY });
            }}
            onResizeStop={(e, dir, ref, delta, pos) => {
              console.log("Top:", pos.y, "Left:", pos.x);
              const scaleX = naturalSize.width / displaySize.width;
              const scaleY = naturalSize.height / displaySize.height;

              const realX = Math.round(pos.x * scaleX);
              const realY = Math.round(pos.y * scaleY);
              const realWidth = Math.round(ref.offsetWidth * scaleX);
              const realHeight = Math.round(ref.offsetHeight * scaleY);

              console.log("Real position:", realX, realY);
              console.log("Real size:", realWidth, realHeight);

              setPosition({ x: realX, y: realY });
              setSize({ width: realWidth, height: realHeight });
            }}
          >
            <img
              src={watermark}
              ref={watermarkRef}
              alt="Watermark"
              draggable={false}
              className="w-full h-full block p-0 m-0 border-none cursor-move box-border pointer-events-auto select-none"
            />
          </Rnd>
        )}
        {/* {background && (
          <div
            style={{
              //   position: "absolute",
              //   top: 10,
              //   right: 10,
              background: "rgba(0, 0, 0, 0.6)",
              color: "white",
              padding: "10px 15px",
              borderRadius: "8px",
              fontSize: "14px",
              lineHeight: "1.6",
              zIndex: 10,
              fontFamily: "sans-serif",
            }}
          >
            <div>
              <strong>Position:</strong> X: {position.x}px, Y: {position.y}px
            </div>
            <div>
              <strong>Size:</strong> W: {size.width}px, H: {size.height}px
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WatermarkEditor;
