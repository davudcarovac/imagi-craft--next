"use client";

import { useEffect, useState } from "react";
import UploadFile from "../UploadFile";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import dynamic from "next/dynamic";
import ServiceIntro from "../ServiceIntro";
import { useWatermark } from "@/hooks/useWatermark";
import DownloadArea from "../DownloadArea";
import { deleteAllFiles } from "@/api/deleteAllApi";
import LetsTryActions from "../LetsTryActions/LetsTryActions";

const WatermarkKonva = dynamic(
  () => import("@/components/WatermarkPage/WatermarkKonva"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const WatermarkClient = () => {
  const [file, setFile] = useState<File>();
  const [watermarkFile, setWatermarkFile] = useState<File>();
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const [watermarkSrc, setWatermarkSrc] = useState<string | null>(null);
  const [watermarkPos, setWatermarkPos] = useState({ x: 50, y: 50 });
  const [watermarkSize, setWatermarkSize] = useState({
    width: 100,
    height: 100,
  });
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [selected, setSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadItem, setDownloadItem] = useState<string | null>(null);

  const formData = new FormData();
  const { mutate, isPending } = useWatermark();

  const setBackgroundOptions = (url: string) => {
    setBackgroundSrc(url);
    setWatermarkSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setSelected(false);
  };

  const handleCancel = () => {
    setWatermarkSrc(null);
    setBackgroundSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setWatermarkSize({ width: 100, height: 100 });
    setSelected(false);
  };

  const submitWatermarking = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e?.preventDefault();

    const watermarkOptions = {
      left: Math.round(watermarkPos.x),
      top: Math.round(watermarkPos.y),
      width: Math.round(watermarkSize.width),
      height: Math.round(watermarkSize.height),
    };

    if (file) {
      formData.append("files", file);
    }
    if (watermarkFile) {
      formData.append("file", watermarkFile);
    }

    formData.append("watermarkOptions", JSON.stringify(watermarkOptions));

    mutate(formData, {
      onSuccess: (response) => {
        console.log(response);
        if (
          response?.success &&
          response.downloadLinks &&
          response.downloadLinks?.length > 0
        ) {
          resetAll();
          setDownloadItem(String(response?.downloadLinks[0]));
        }
      },
      onError: (error) => {
        console.error("Error occured ===> ", error);
      },
    });
  };

  const deleteAll = () => {
    try {
      deleteAllFiles();
      resetAll();
    } catch (error) {
      console.log("This is Error ===> ", error);
    }
  };

  const resetAll = () => {
    console.log("Resetting all state variables");
    setIsWatermarking(false);
    setDownloadItem(null);
    setBackgroundSrc(null);
    setWatermarkSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setWatermarkSize({ width: 100, height: 100 });
    setSelected(false);
    setFile(undefined);
    setWatermarkFile(undefined);
    setErrorMessage(null);
  };

  return (
    <div>
      {/* Faza 1: Uvod i Upload */}
      {!backgroundSrc && !downloadItem && (
        <>
          <ServiceIntro
            titleBeforeHighlight="Add a custom"
            highlightedWord="Watermark"
            titleAfterHighlight="to your images"
            description="Upload an image and apply a personalized watermark to protect your content. Adjust position, opacity, and size with ease."
          />
          <UploadFile
            setFile={setFile}
            setErrorMessage={setErrorMessage}
            action="watermark"
            tooltip="resize images"
            isMultiple={false}
            setBackgroundOptions={setBackgroundOptions}
          />
        </>
      )}

      {/* Faza 2: Watermark Konva + opcija za dodavanje watermark slike */}
      {backgroundSrc && !downloadItem && (
        <div className="max-w-[900px] my-5 mx-auto">
          {!watermarkSrc && (
            <div className="pt-5 flex items-center gap-2 ">
              <FileUpload
                chooseLabel="Add Watermark"
                className="custom-file-upload"
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={1048576}
                auto
                customUpload
                uploadHandler={(e) => {
                  const file = e.files[0];
                  if (file) {
                    setWatermarkFile(file);
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

          <form onSubmit={submitWatermarking}>
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
          </form>
        </div>
      )}

      {/* Faza 3: Download */}
      {downloadItem && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              handleDisableLink={null}
              downloadLinks={[]}
              isSingle={true}
              text="Your image has been watermarked. Download it!"
              resetAll={resetAll}
              deleteAll={deleteAll}
              downloadItem={downloadItem}
            />
            {/* Let's try */}
          </div>
          <LetsTryActions />
        </div>
      )}
    </div>
  );
};

export default WatermarkClient;
