"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import resizeButtonImg from "../assets/button images/resolution.png";

import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
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
  const [isResized, setIsResized] = useState<boolean>(false);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const formData = new FormData();
  const { mutate, isPending } = useResize();

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
        console.error("Error occured ===> ", error);
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

  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const downloadFile = async (fileId: string) => {
  //   setImageLoading(true);
  //   setImageError(null);

  //   try {
  //     const response = await axios.get(`${BASE_URL}/download/${fileId}`, {
  //       responseType: "blob",
  //     });

  //     const blob = response.data;

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = fileId;
  //     a.click();

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     setImageError("Javio se error");
  //   } finally {
  //     setImageLoading(false);
  //   }
  // }

  return (
    <div>
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
