"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Coordinates, CropperRef } from "react-advanced-cropper";
import {
  Cropper,
  CropperState,
  RectangleStencil,
  CircleStencil,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useCrop } from "@/hooks/useCrop";
import { deleteAllFiles } from "@/api/deleteAllApi";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";
import DownloadArea from "@/components/DownloadArea";
import UploadFile from "@/components/UploadFile";
import Sidebar from "@/components/CropPage/components/Sidebar";
import ServiceIntro from "../ServiceIntro";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "primereact/button";

const aspectRatios = [
  { value: 1 / 1, name: "1/1" },
  { value: false, name: "Custom" },
  { value: 3 / 2, name: "3/2" },
  { value: 16 / 9, name: "16/9" },
  { value: 9 / 16, name: "Instagram story" }, // Instagram story
  { value: 4 / 3, name: "4/3" },
  { value: 3 / 1, name: "Twitter header" }, //  Twitter header
  { value: 2 / 3, name: "Pinterest pin" }, // Pinterest pin,
  { value: 5 / 4, name: "5/4" },
];

const options: string[] = ["on", "off"];

type StencilComponentType = typeof RectangleStencil | typeof CircleStencil;

const CropClient = () => {
  const cropperRef = useRef<CropperRef<CropperState>>(null);
  const [isCropped, setIsCropped] = useState(false);
  const [isGridActive, setIsGridActive] = useState(true);
  const [file, setFile] = useState<File>();
  const [downloadItem, setDownloadItem] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [handlersValue, setHandlersValue] = useState<boolean>(false);
  const [stencilValue, setStencilValue] = useState<"rectangle" | "circle">(
    "rectangle"
  );
  const [currentStencil, setCurrentStencil] =
    useState<StencilComponentType>(RectangleStencil);
  const [coordinates, setCoordinates] = useState<
    CropperState["coordinates"] | null
  >(null);
  const [ratio, setRatio] = useState<number | boolean>(aspectRatios[1].value);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formData = new FormData();
  const { mutate, isPending } = useCrop();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCropChange = () => {
    const cropper = cropperRef.current;

    if (cropper) {
      const state = cropper.getState();

      if (state) {
        setCoordinates(state.coordinates);
      }
    }
  };

  const toggleStencil = () => {
    setStencilValue(stencilValue === "rectangle" ? "circle" : "rectangle");
    setCurrentStencil(
      currentStencil === RectangleStencil ? CircleStencil : RectangleStencil
    );
  };

  const roundCoordinates = (coords: Coordinates) => {
    return {
      width: Math.round(coords?.width ?? 0),
      height: Math.round(coords?.height ?? 0),
      top: Math.round(coords?.top ?? 0),
      left: Math.round(coords?.left ?? 0),
    };
  };

  const rounded = coordinates && roundCoordinates(coordinates);

  useEffect(() => {
    handleCropChange();
  }, [ratio, stencilValue]);

  const submitCropping = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e?.preventDefault();

    const imageOptions = {
      left: rounded?.left,
      top: rounded?.top,
      width: rounded?.width,
      height: rounded?.height,
    };

    if (file) {
      formData.append("files", file);
    }
    formData.append("imageOptions", JSON.stringify(imageOptions));

    mutate(formData, {
      onSuccess: (response) => {
        console.log(response);
        if (
          response?.success &&
          response.downloadLinks &&
          response.downloadLinks?.length > 0
        ) {
          setDownloadItem(String(response?.downloadLinks[0]));
          setImage(null);
          setIsCropped(true);
        }
      },
      onError: (error) => {
        console.error("Error occured ===> ", error);
      },
    });
  };

  const resetAll = () => {
    setIsCropped(false);
    setDownloadItem(null);
  };

  const deleteAll = () => {
    try {
      deleteAllFiles();
      resetAll();
    } catch (error) {
      console.log("This is Error ===> ", error);
    }
  };

  const cancelCrop = () => {
    setImage(null);
    setFile(undefined);
    setIsCropped(false);
    setDownloadItem(null);
    setCoordinates(null);
    setRatio(aspectRatios[1].value);
    setHandlersValue(false);
    setStencilValue("rectangle");
    setCurrentStencil(RectangleStencil);
    setIsGridActive(true);
    toggleSidebar();
  };

  const renderBackground = () => {
    if (!file) return;

    if (file?.type.split("/")[1] === "png") {
      return {
        backgroundImage: `
      linear-gradient(45deg, #e5e7eb 25%, #ffffff 25%),
      linear-gradient(-45deg, #e5e7eb 25%, #ffffff 25%),
      linear-gradient(45deg, #ffffff 75%, #e5e7eb 75%),
      linear-gradient(-45deg, #ffffff 75%, #e5e7eb 75%)
    `,
        backgroundSize: "20px 20px",
        backgroundColor: "#f3f4f6", // Fallback boja
      };
    } else return {};
  };

  // useEffect(() => {
  //   console.log("File ===> ", );
  //   console.log("Image ===> ", image);
  // }, [file, image]);

  return (
    // <div className="w-full ">
    <div>
      {!image && !downloadItem && (
        <ServiceIntro
          titleBeforeHighlight=""
          highlightedWord="Crop"
          titleAfterHighlight="your images precisely"
          description="Trim your images to focus on the most important parts. Adjust the crop area with an intuitive interface to get the perfect framing."
        />
      )}

      {!image && !isCropped && (
        <UploadFile
          tooltip="crop image"
          action="crop"
          setImage={setImage}
          isMultiple={false}
          setFile={setFile}
        />
      )}
      {isCropped && downloadItem && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              handleDisableLink={null}
              downloadLinks={[]}
              isSingle={true}
              text="You image has been cropped. Download it!"
              resetAll={resetAll}
              deleteAll={deleteAll}
              downloadItem={downloadItem}
            />
            {/* Let's try */}
          </div>
          <LetsTryActions />
        </div>
      )}
      {image && (
        <div className="flex w-full flex-col lg2:flex-row h-[90vh] overflow-hidden">
          {/* Dugme za otvaranje sidebara (prikazuje se samo na malim ekranima) */}
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="w-fit cursor-pointer lg2:hidden p-3 text-[#1aac83] hover:bg-[#1aac83]/10 rounded-lg transition-colors"
              aria-label="Open options panel"
            >
              <PanelLeftOpen className="w-6 h-6" />
            </button>
          )}

          <form onSubmit={submitCropping}>
            <Sidebar
              options={options}
              isGridActive={isGridActive}
              aspectRatios={aspectRatios}
              rounded={rounded}
              sidebarOpen={sidebarOpen}
              ratio={ratio}
              stencilValue={stencilValue}
              handlersValue={handlersValue}
              setRatio={setRatio}
              setIsGridActive={setIsGridActive}
              toggleSidebar={toggleSidebar}
              toggleStencil={toggleStencil}
              setHandlersValue={setHandlersValue}
              cancelCrop={cancelCrop}
            />
          </form>

          {/* Glavni sadržaj - Cropper */}
          <div className="flex-1 flex justify-center items-center flex-col p-4 h-[90vh] overflow-y-auto">
            <div className="h-full w-full max-w-[900px] flex justify-center items-center">
              <Cropper
                ref={cropperRef}
                src={image}
                className="w-full max-h-full object-contain"
                transformImage={{
                  adjustStencil: false,
                }}
                stencilComponent={currentStencil}
                stencilProps={{
                  grid: isGridActive,
                  handlers: handlersValue,
                  aspectRatio: ratio,
                  resizable: true,
                  movable: true,
                }}
                backgroundWrapperProps={{ className: "grid-overlay" }}
                style={renderBackground()}
                onChange={handleCropChange}
              />
            </div>

            {/* Dugme za crop na mobilnim (prikazuje se samo kada je sidebar zatvoren) */}
            {!sidebarOpen && (
              <div className="my-5 flex gap-3 flex-row lg2:hidden">
                <button
                  onClick={submitCropping}
                  disabled={isPending}
                  className=" py-3 px-8 bg-[#1aac83] text-white rounded-lg text-lg cursor-pointer saira-font font-semibold"
                >
                  Crop image
                </button>
                <Button
                  onClick={cancelCrop}
                  label="Cancel"
                  className="custom-cancel-upload saira-font font-medium py-3 px-8 saira-font"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default CropClient;
