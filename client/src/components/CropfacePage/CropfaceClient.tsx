"use client";

import React, { useRef, useState, useEffect } from "react";
import UploadFile from "../UploadFile";
import { Toast } from "primereact/toast";

import ServiceIntro from "../ServiceIntro";
import {
  DownloadLinksType,
  FileType,
  TransformedDownloadLinks,
} from "@/types/apiTypes";
import { useCropface } from "@/hooks/useCropface";
import { v4 as uuidv4 } from "uuid";
import DownloadArea from "../DownloadArea";
import { deleteAllFiles } from "@/api/deleteAllApi";
import LetsTryActions from "../LetsTryActions/LetsTryActions";
import axios from "axios";

const CropfaceClient = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [noDetectedFaces, setNoDetectedFaces] = useState<DownloadLinksType[]>(
    []
  );
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const toast = useRef<Toast | null>(null);

  const formData = new FormData();
  const { mutate, isPending } = useCropface();

  // 🔥 Efekat koji ispaljuje toaste kada se noDetectedFaces promeni
  useEffect(() => {
    if (noDetectedFaces.length > 0) {
      noDetectedFaces.forEach((item) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `${item.name}: ${item.error}`,
          life: 4000,
        });
      });
    }
  }, [noDetectedFaces]);

  const submitCropface = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    files.forEach(({ file }) => {
      formData.append("files", file);
    });

    mutate(formData, {
      onSuccess: (response) => {
        const processedFiles = response?.downloadLinks?.filter(
          (item) => !item.error
        );

        const transformedLinks = processedFiles?.map((item) => ({
          ...item,
          link: item.name,
          id: uuidv4(),
        }));
        setDownloadLinks(transformedLinks || []);

        const noDetectedItems = response?.downloadLinks?.filter(
          (item) => item.error
        );

        if (noDetectedItems && noDetectedItems.length > 0) {
          setNoDetectedFaces(noDetectedItems); // toast-ovi će se ispaliti iz useEffect
        } else {
          setNoDetectedFaces([]);
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: (
              <span style={{ fontSize: "13px" }}>
                {error?.response?.data.error}
              </span>
            ),
            sticky: true,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: (
              <span style={{ fontSize: "18px" }}>Unknown error occurred.</span>
            ),
            sticky: true,
          });
        }
      },
    });
  };

  const resetAll = () => {
    setFiles([]);
    setDownloadLinks([]);
    setNoDetectedFaces([]);
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

  return (
    <div className="p-4 space-y-6">
      {/* 🎯 Toast na početku */}
      <Toast ref={toast} />

      <div className="flex items-center gap-2">
        <span className="bg-white border border-solid border-slate-200 text-gray-500 font-semibold px-4 py-2 rounded-full text-md flex items-center gap-2 ">
          <i className="pi pi-crown text-yellow-500"></i>
          Premium
        </span>
      </div>

      <ServiceIntro
        titleBeforeHighlight=""
        highlightedWord="Crop"
        titleAfterHighlight=" face from image"
        description="Automatically detect and crop faces with professional accuracy. Save time and get perfectly framed portraits for profiles, team photos, or creative projects — all in just a few clicks."
      />

      {downloadLinks.length === 0 && (
        <form onSubmit={submitCropface}>
          <UploadFile
            isPending={isPending}
            setFiles={setFiles}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            files={files}
            isMultiple={true}
            tooltip="crop face"
            action="crop-face"
          />
        </form>
      )}

      {downloadLinks.length > 0 && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10">
            <DownloadArea
              isSingle={false}
              text="Your images have been resized. Download them!"
              resetAll={resetAll}
              deleteAll={deleteAll}
              downloadLinks={downloadLinks}
              disabledLinks={disabledLinks}
              handleDisableLink={handleDisableLink}
            />
          </div>
          <LetsTryActions />
        </div>
      )}
    </div>
  );
};

export default CropfaceClient;
