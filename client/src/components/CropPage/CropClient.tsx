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
import Sidebar from "@/components/CropPage/Sidebar";
import ServiceIntro from "../ServiceIntro";

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

const options: string[] = ["On", "Off"];

type StencilComponentType = typeof RectangleStencil | typeof CircleStencil;

const CropClient = () => {
  const cropperRef = useRef<CropperRef<CropperState>>(null);
  const [isCropped, setIsCropped] = useState(false);
  const [isGridActive, setIsGridActive] = useState(true);
  const [file, setFile] = useState<File>();
  const [downloadItem, setDownloadItem] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [handlersValue, setHandlersValue] = useState<string>(options[0]);
  const [stencilValue, setStencilValue] = useState<"rectangle" | "circle">(
    "rectangle"
  );
  const [currentStencil, setCurrentStencil] =
    useState<StencilComponentType>(RectangleStencil);
  const [coordinates, setCoordinates] = useState<
    CropperState["coordinates"] | null
  >(null);
  const [ratio, setRatio] = useState<number | boolean>(aspectRatios[1].value);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handlers =
    handlersValue === "Off"
      ? {
          eastNorth: false,
          north: false,
          westNorth: false,
          west: false,
          westSouth: false,
          south: false,
          eastSouth: false,
          east: false,
        }
      : {
          eastNorth: true,
          north: true,
          westNorth: true,
          west: true,
          westSouth: true,
          south: true,
          eastSouth: true,
          east: true,
        };

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
        <div className="flex w-full flex-col lg2:flex-row  h-[90vh] overflow-hidden">
          <div className="p-5">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="flex text-lg font-semibold items-center flex-row gap-2 text-[#1aac83] lg2:hidden p-1 rounded-full cursor-pointer hover:opacity-50 transition duration-150 saira-font"
              >
                Options
                <i
                  className="pi pi-arrow-right text-[#1aac83]"
                  style={{ fontSize: "18px" }}
                ></i>
              </button>
            )}
          </div>
          <form onSubmit={submitCropping}>
            {/* Sidebar */}
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
            />
          </form>

          {/* Crop Area */}
          <div className=" flex-1  flex justify-center items-center flex-col   p-4 h-[90vh] overflow-y-scroll ">
            <div className="h-full  w-full  flex justify-center items-center   max-w-[900px] ">
              <Cropper
                ref={cropperRef}
                src={image}
                className="w-full  "
                transformImage={{
                  adjustStencil: false,
                }}
                stencilComponent={currentStencil}
                stencilProps={{
                  grid: isGridActive,
                  handlers: handlers,
                  aspectRatio: ratio,
                  resizable: true,
                  movable: true,
                }}
                backgroundWrapperProps={{ className: "grid-overlay" }}
                onChange={handleCropChange}
              />
            </div>
            <div className="w-full lg2:hidden py-5">
              {!sidebarOpen && (
                <button
                  onClick={submitCropping}
                  disabled={isPending}
                  className="className={`mt-4 py-5 px-16 bg-[#1aac83] text-white rounded-lg text-xl cursor-pointer"
                >
                  {" "}
                  Crop Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default CropClient;
