"use client";

import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { SliderChangeEvent } from "primereact/slider";
import { useCompress } from "@/hooks/useCompress";
import { FileType, TransformedDownloadLinks } from "@/types/apiTypes";
import { deleteAllFiles } from "@/api/deleteAllApi";
import UploadFile from "@/components/UploadFile";
import DownloadArea from "@/components/DownloadArea";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";
import CompressOptions from "./CompressOptions";
import { formats } from "@/utils/selectData";
import ServiceIntro from "../ServiceIntro";

const greyscaleOptions = ["Off", "On"];

const CompressClient = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const [, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [greyscaleValue, setGreyscaleValue] = useState(greyscaleOptions[0]);
  const formData = new FormData();

  const { mutate, isPending } = useCompress();

  const submitCompression = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFormat !== null && selectedFormat !== undefined) {
      formData.append("convertTo", selectedFormat);
    }

    formData.append("greyscale", greyscaleValue);
    formData.append("qualityLevel", sliderValue.toString());
    files.forEach((item) => formData.append("files", item.file));

    mutate(formData, {
      onSuccess: (response) => {
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

  const handleDisableLink = (link: string) => {
    setDisabledLinks((prev) => [...prev, link]);
  };

  const resetAll = () => {
    setFiles([]);
    setDownloadLinks([]);
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

  const onSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const onFormatChange = (value: string | null) => {
    setSelectedFormat(value);
  };

  const onGreyscaleChange = (value: string) => {
    setGreyscaleValue(value);
  };

  const onReset = () => {
    setSliderValue(30);
    setSelectedFormat(null);
    setGreyscaleValue(greyscaleOptions[0]);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Introductory text */}
      <ServiceIntro
        titleBeforeHighlight=""
        highlightedWord="Compress"
        titleAfterHighlight="your images easily and quickly"
        description="Upload one or more images and reduce their file size with adjustable quality, format, and greyscale options. Once compressed, you can download your images directly from here."
      />

      {/* Options section */}
      {files.length > 0 && downloadLinks && downloadLinks.length === 0 && (
        <CompressOptions
          sliderValue={sliderValue}
          selectedFormat={selectedFormat}
          greyscaleValue={greyscaleValue}
          greyscaleOptions={greyscaleOptions}
          formats={formats}
          onSliderChange={onSliderChange}
          onFormatChange={onFormatChange}
          onGreyscaleChange={onGreyscaleChange}
          onReset={onReset}
        />
      )}

      {/* Upload section */}
      {downloadLinks && downloadLinks.length === 0 && (
        <form onSubmit={submitCompression} className="w-full">
          <UploadFile
            isPending={isPending}
            setIsOpenCompressionSb={setIsOpen}
            tooltip="compress image"
            action="compress"
            isMultiple={true}
            files={files}
            setFiles={setFiles}
          />
        </form>
      )}

      {/* Download section */}
      {downloadLinks && downloadLinks.length > 0 && (
        <div className="max-w-[700px] w-full flex justify-center flex-col py-10">
          <DownloadArea
            isSingle={false}
            text="Your images have been compressed. Download them!"
            resetAll={resetAll}
            deleteAll={deleteAll}
            downloadLinks={downloadLinks}
            disabledLinks={disabledLinks}
            handleDisableLink={handleDisableLink}
          />
          <LetsTryActions />
        </div>
      )}
    </div>
  );
};

export default CompressClient;
