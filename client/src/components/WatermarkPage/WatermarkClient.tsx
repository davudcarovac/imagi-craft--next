"use client";

import { useEffect, useState } from "react";
import UploadFile from "../UploadFile";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import dynamic from "next/dynamic";
import ServiceIntro from "../ServiceIntro";

const WatermarkKonva = dynamic(
  () => import("@/components/WatermarkPage/WatermarkKonva"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const WatermarkClient = () => {
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const [watermarkSrc, setWatermarkSrc] = useState<string | null>(null);
  const [watermarkPos, setWatermarkPos] = useState({ x: 50, y: 50 });
  const [watermarkSize, setWatermarkSize] = useState({
    width: 100,
    height: 100,
  });
  const [selected, setSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const setBackgroundOptions = (url: string) => {
    setBackgroundSrc(url);
    setWatermarkSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setSelected(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   console.log(backgroundSrc);
  // }, [backgroundSrc]);

  const handleCancel = () => {
    setWatermarkSrc(null);
    setBackgroundSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setWatermarkSize({ width: 100, height: 100 });
    setSelected(false);
  };

  // useEffect(() => {
  //   console.log(errorMessage);
  // }, [errorMessage]);

  return (
    <div>
      <ServiceIntro
        titleBeforeHighlight="Add a custom"
        highlightedWord="Watermark"
        titleAfterHighlight="to your images"
        description="Upload an image and apply a personalized watermark to protect your content. Adjust position, opacity, and size with ease."
      />

      {!backgroundSrc && (
        <UploadFile
          setErrorMessage={setErrorMessage}
          action="watermark"
          tooltip="resize images"
          isMultiple={false}
          setBackgroundOptions={setBackgroundOptions}
        />
      )}
      {/* <WatermarkEditor /> */}
      {backgroundSrc && (
        <div className="max-w-[900px] my-5 mx-auto">
          {!watermarkSrc && (
            <div className="pt-5 flex items-center gap-2 ">
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, "wm")}
              /> */}
              <FileUpload
                chooseLabel="Add Watermark"
                className="custom-file-upload"
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={1048576} // 1MB
                auto
                customUpload
                uploadHandler={(e) => {
                  const file = e.files[0];
                  if (file) {
                    setWatermarkSrc(file.objectURL);
                    setSelected(true);
                  }
                }}
              />
              <Button
                label="Cancel"
                className="custom-cancel-upload"
                onClick={handleCancel}
              />
            </div>
          )}
          {typeof window !== "undefined" && backgroundSrc && (
            <WatermarkKonva
              backgroundSrc={backgroundSrc}
              watermarkSrc={watermarkSrc}
              watermarkPos={watermarkPos}
              watermarkSize={watermarkSize}
              selected={selected}
              setSelected={setSelected}
              setWatermarkPos={setWatermarkPos}
              setWatermarkSize={setWatermarkSize}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WatermarkClient;
