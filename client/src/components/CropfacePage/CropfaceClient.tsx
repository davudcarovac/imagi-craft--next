"use client";

import React, { useEffect, useState } from "react";
import UploadFile from "../UploadFile";
import ServiceIntro from "../ServiceIntro";
import { FileType, TransformedDownloadLinks } from "@/types/apiTypes";
import { useCrop } from "@/hooks/useCrop";
import { useCropface } from "@/hooks/useCropface";
import { v4 as uuidv4 } from "uuid";

const CropfaceClient = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formData = new FormData();
  const { mutate, isPending } = useCropface();

  const submitCropface = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    files.forEach(({ file }) => {
      formData.append("files", file);
    });

    mutate(formData, {
      onSuccess: (response) => {
        console.log("Crop face response ===> ", response);
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

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        {/* Premium badge */}
        <span className="bg-white border border-solid border-slate-200 text-gray-500 font-semibold px-4 py-2 rounded-full text-md flex items-center gap-2 ">
          <i
            className="pi pi-crown text-yellow-500 "
            // style={{ fontSize: "22px" }}
          ></i>
          Premium
        </span>
      </div>

      <ServiceIntro
        titleBeforeHighlight=""
        highlightedWord="Crop"
        titleAfterHighlight=" face from image"
        description="Automatically detect and crop faces with professional accuracy. Save time and get perfectly framed portraits for profiles, team photos, or creative projects — all in just a few clicks."
      />

      {/* Premium features list */}

      {/* Upload file */}
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

      {/* Call to action for non-subscribers */}
      {/* <div className="flex items-center flex-col justify-center w-full">
        <div className="w-full flex   flex-col bg-yellow-50 border border-yellow-200 p-6 rounded-md space-y-2 shadow-sm">
          <ul className="flex flex-col">
            <li className="flex items-center gap-2">
              <i className="pi pi-check-circle text-yellow-500 w-5 h-5"></i>
              High-precision face detection
            </li>
            <li className="flex items-center gap-2">
              <i className="pi pi-check-circle text-yellow-500 w-5 h-5"></i>
              Unlimited cropping with no watermarks
            </li>
            <li className="flex items-center gap-2">
              <i className="pi pi-check-circle text-yellow-500 w-5 h-5"></i>
              Priority processing & instant preview
            </li>
          </ul>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Unlock all premium features today.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-full shadow-lg transition">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CropfaceClient;
