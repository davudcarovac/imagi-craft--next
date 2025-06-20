"use client";

import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { SliderChangeEvent } from "primereact/slider";
import { useCompress } from "@/hooks/useCompress";
import { FileType, TransformedDownloadLinks } from "@/types/apiTypes";
import { deleteAllFiles } from "@/api/deleteAllApi";
import UploadFile from "@/components/UploadFile";
import SidebarCompress from "@/components/CompressPage/SidebarCompress";
import DownloadArea from "@/components/DownloadArea";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";

const greyscaleOptions = ["Off", "On"];

const CompressClient = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [greyscaleValue, setGreyscaleValue] = useState(greyscaleOptions[0]);
  const formData = new FormData();

  const { mutate, isPending } = useCompress();

  const handleSliderValue = (e: SliderChangeEvent) => {
    setSliderValue(e.value as number);
  };

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

  return (
    <div>
      {downloadLinks && downloadLinks?.length === 0 && (
        <form onSubmit={submitCompression}>
          <UploadFile
            isPending={isPending}
            setIsOpenCompressionSb={setIsOpen}
            tooltip="compress image"
            action="compress"
            isMultiple={true}
            files={files}
            setFiles={setFiles}
          />
          <SidebarCompress
            selectedFormat={selectedFormat}
            isOpen={isOpen}
            sliderValue={sliderValue}
            greyscaleValue={greyscaleValue}
            greyscaleOptions={greyscaleOptions}
            setSelectedFormat={setSelectedFormat}
            setIsOpen={setIsOpen}
            handleSliderValue={handleSliderValue}
            setGreyscaleValue={setGreyscaleValue}
          />
        </form>
      )}

      {downloadLinks && downloadLinks.length > 0 && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              isSingle={false}
              text="Your images have been compressed. Download them!"
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

export default CompressClient;
