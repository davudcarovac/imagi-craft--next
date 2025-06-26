"use client";

import { deleteAllFiles } from "@/api/deleteAllApi";
import DownloadArea from "@/components/DownloadArea";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";
import UploadFile from "@/components/UploadFile";
import { useConvert } from "@/hooks/useConvert";
import { FileType, TransformedDownloadLinks } from "@/types/apiTypes";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConvertOptions from "./ConvertOptions";
import ServiceIntro from "../ServiceIntro";

const formatOptions = [
  { name: "PNG", value: "png" },
  { name: "WEBP", value: "webp" },
  { name: "JPG", value: "jpg" },
  { name: "HEIF", value: "heif" },
  { name: "AVIF", value: "avif" },
  { name: "GIF", value: "gif" },
];

const ConvertClient = () => {
  // const [convertTo, setConvertTo] = useState<null | string>("jpeg");
  const [files, setFiles] = useState<FileType[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const [globalFormat, setGlobalFormat] = useState<string | null>(null);

  const formData = new FormData();

  const { mutate, isPending } = useConvert();

  const submitConversion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    files.forEach(({ file, format }) => {
      formData.append("files", file);
      formData.append("formats", format as string);
    });
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
  };

  const deleteAll = () => {
    try {
      resetAll();
      deleteAllFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGlobalFormatChange = (value: string) => {
    setGlobalFormat(value);
    // Update all files with the new global format
    setFiles((prevFiles) =>
      prevFiles.map((file) => ({ ...file, format: value }))
    );
  };

  return (
    <div>
      <ServiceIntro
        titleBeforeHighlight=""
        highlightedWord="Convert"
        titleAfterHighlight="your images to different formats"
        description="Easily change your images between popular formats like PNG, JPG, WEBP, AVIF, and more, to suit your needs and optimize performance."
      />

      {/* Global format dropdown — samo kad je action "convert" */}
      {files &&
        files.length > 0 &&
        downloadLinks &&
        downloadLinks.length < 0 && (
          <ConvertOptions
            globalFormat={globalFormat}
            formatOptions={formatOptions}
            handleGlobalFormatChange={handleGlobalFormatChange}
          />
        )}

      {downloadLinks && downloadLinks?.length === 0 && (
        <form onSubmit={submitConversion}>
          <UploadFile
            globalFormat={globalFormat}
            formatOptions={formatOptions}
            isPending={isPending}
            tooltip="crop image"
            action="convert"
            isMultiple={true}
            files={files}
            setFiles={setFiles}
          />
        </form>
      )}

      {downloadLinks && downloadLinks.length > 0 && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              isSingle={false}
              text="Your images have been converted. Download them!"
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

export default ConvertClient;
