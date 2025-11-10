"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropdownChangeEvent } from "primereact/dropdown";
import {
  FileTypeResize,
  FitType,
  ImageOptionsType,
  TransformedDownloadLinks,
} from "@/types/apiTypes";
import { useResize } from "@/hooks/useResize";
import { deleteAllFiles } from "@/api/deleteAllApi";
import UploadFile from "@/components/UploadFile";
import ResizeOptions from "@/components/ResizePage/ResizeOptions";
import DownloadArea from "@/components/DownloadArea";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";
import ServiceIntro from "../ServiceIntro";
import { useToast } from "@/context/ToastContext";

const ResizeClient = () => {
  const [files, setFiles] = useState<FileTypeResize[]>([]);

  const aspectRatio = 16 / 9;
  const [isActiveAR, setIsActiveAR] = useState(true);
  const [imageOptions, setImageOptions] = useState<ImageOptionsType>({
    height: "",
    width: "",
  });
  const [fit, setFit] = useState<FitType>("cover");
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [, setIsResized] = useState<boolean>(false);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const formData = new FormData();
  const { mutate, isPending } = useResize();
  const { showToast } = useToast();

  // const [imageLoading, setImageLoading] = useState(false);
  // const [imageError, setImageError] = useState<null | string>(null);

  const handleChangeImageOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Ako je prazno polje, postavi praznu vrednost
    if (value === "") {
      setImageOptions((prev) => ({
        ...prev,
        [id]: "",
      }));
      return;
    }

    const convertedValue = Number(value);

    setImageOptions((prev) => {
      if (id === "width") {
        return {
          width: convertedValue,
          height: isActiveAR
            ? Math.round(convertedValue / aspectRatio)
            : prev.height,
        };
      } else if (id === "height") {
        return {
          height: convertedValue,
          width: isActiveAR
            ? Math.round(convertedValue * aspectRatio)
            : prev.width,
        };
      }
      return prev;
    });
  };

  const toggleAspectRatio = () => {
    setIsActiveAR(!isActiveAR);
  };

  const selectFit = (e: DropdownChangeEvent) => {
    setFit(e.target.value as FitType);
  };

  const resetOptions = () => {
    setFit("cover");
    setIsActiveAR(false);
    setImageOptions({ height: "", width: "" });
  };

  const submitResizing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    files.forEach((item) => formData.append("files", item.file));
    formData.append(
      "imageOptions",
      JSON.stringify({
        width: imageOptions.width,
        height: imageOptions.height,
        fit: fit,
      })
    );

    mutate(formData, {
      onSuccess: (response) => {
        console.log(response?.downloadLinks);
        const transformedLinks = response?.downloadLinks?.map((item) => {
          return { ...item, link: item.name, id: uuidv4() };
        });
        setDownloadLinks(transformedLinks);
      },

      onError: (error) => {
        showToast("error", "Cannot process", error.message, 5000);
      },
    });
  };

  const resetAll = () => {
    setFiles([]);
    setFit("cover");
    setIsResized(false);
    setDownloadLinks([]);
    setImageOptions({ height: "", width: "" });
    setDisabledLinks([]);
  };

  const deleteAll = () => {
    try {
      resetAll();
      deleteAllFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisableLink = (link: string) => {
    setDisabledLinks((prev) => [...prev, link]);
  };

  useEffect(() => {
    if (files.length > 0) {
      resetOptions();
    }
  }, [files]);

  return (
    <div>
      <div className="pt-16">
        <ServiceIntro
          titleBeforeHighlight=""
          highlightedWord="Resize"
          titleAfterHighlight="your images quickly"
          description="Scale your images up or down to fit your desired dimensions without losing quality."
        />
      </div>

      {files.length > 0 && downloadLinks && downloadLinks.length === 0 && (
        <ResizeOptions
          imageOptions={imageOptions}
          handleChangeImageOptions={handleChangeImageOptions}
          selectFit={selectFit}
          fit={fit}
          resetOptions={resetOptions}
          toggleAspectRatio={toggleAspectRatio}
          isActiveAR={isActiveAR}
        />
      )}
      {downloadLinks && downloadLinks.length === 0 && (
        <form onSubmit={submitResizing}>
          <UploadFile
            action="resize"
            setFiles={setFiles}
            tooltip="resize images"
            isMultiple={true}
            isPending={isPending}
            files={files}
          />
        </form>
      )}

      {downloadLinks && downloadLinks.length > 0 && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              isSingle={false}
              text="Your images have been resized. Download them!"
              resetAll={resetAll}
              deleteAll={deleteAll}
              downloadLinks={downloadLinks}
              disabledLinks={disabledLinks}
              handleDisableLink={handleDisableLink}
            />
            {/* Let's try */}
          </div>
          <LetsTryActions />
        </div>
      )}
    </div>
  );
};

export default ResizeClient;
