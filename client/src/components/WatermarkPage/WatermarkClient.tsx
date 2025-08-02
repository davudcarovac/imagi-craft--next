"use client";

import { useRef, useState } from "react";
import UploadFile from "../UploadFile";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import dynamic from "next/dynamic";
import ServiceIntro from "../ServiceIntro";
import { useWatermark } from "@/hooks/useWatermark";
import DownloadArea from "../DownloadArea";
import { deleteAllFiles } from "@/api/deleteAllApi";
import LetsTryActions from "../LetsTryActions/LetsTryActions";
import { useAuthContext } from "@/hooks/useAuthContext";
import { PLAN_LIMITS_WM } from "@/utils/planLimits";
import { bytesToMB } from "@/utils/bytesToMb";
import { useToast } from "@/context/ToastContext";

const WatermarkKonva = dynamic(
  () => import("@/components/WatermarkPage/WatermarkKonva"),
  {
    ssr: false,
    loading: () => (
      <div className="  max-w-[900px] h-[600px] flex items-center justify-center my-5 mx-auto">
        <p className="text-[#1aac83] text-lg">Loading...</p>
      </div>
    ),
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
  const [, setIsWatermarking] = useState(false);
  const [selected, setSelected] = useState(false);
  const [, setErrorMessage] = useState<string | null>(null);
  const [downloadItem, setDownloadItem] = useState<string | null>(null);

  const fileUploadRef = useRef<FileUpload>(null);

  const { showToast } = useToast();
  const { user } = useAuthContext();
  const currentPlan = user?.plan || "STARTER";
  const { bgFileSize } = PLAN_LIMITS_WM[currentPlan];

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
        showToast("error", "Cannot process", error.message, 5000);
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

  const removeWatermark = () => {
    setWatermarkSrc(null);
    setWatermarkPos({ x: 50, y: 50 });
    setWatermarkSize({ width: 100, height: 100 });
    setSelected(false);
    fileUploadRef.current?.clear();
  };

  const uploadHandler = (e: FileUploadHandlerEvent) => {
    const file = e.files?.[0];

    if (!file) {
      showToast(
        "warn",
        "No file selected",
        "Please select a file to upload",
        6000
      );
      return;
    }

    // Provera veličine fajla (3MB)
    if (file.size > bgFileSize) {
      showToast(
        "error",
        "File number limit",
        `Your ${currentPlan} plan allows maximum ${bytesToMB(
          bgFileSize
        )}MB watermark. Upgrade to upload more.`,
        6000
      );

      // Resetujte file input
      fileUploadRef.current?.clear();
      return;
    }

    // Provera tipa fajla
    if (!file.type.startsWith("image/")) {
      showToast(
        "error",
        "Invalid file type",
        "Please upload an image file",
        3000
      );
      fileUploadRef.current?.clear();
      return;
    }

    // Postavite watermark fajl
    setWatermarkFile(file);
    setWatermarkSrc(URL.createObjectURL(file));
    setSelected(true);
  };

  return (
    <div className="mx-5">
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
            action="watermarking"
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
            <div className="pt-5 flex items-center justify-between gap-2 ">
              <div className="flex items-center gap-4 flex-row">
                <FileUpload
                  ref={fileUploadRef}
                  chooseLabel="Add Watermark"
                  className="custom-file-upload font-medium"
                  mode="basic"
                  name="demo[]"
                  accept="image/jpeg,image/png,image/webp, image/gif"
                  auto
                  customUpload
                  uploadHandler={uploadHandler}
                />
              </div>
              <Button
                label="Remove all"
                className="custom-cancel-upload saira-font font-medium-"
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
              isPending={isPending}
              setSelected={setSelected}
              setWatermarkPos={setWatermarkPos}
              setWatermarkSize={setWatermarkSize}
              removeWatermark={removeWatermark}
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
