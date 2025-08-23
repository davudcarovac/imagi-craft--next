"use client";

import { useExtractMetadata } from "@/hooks/useExtractMetadata";
import { TransformedDownloadLinks } from "@/types/apiTypes";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import ServiceIntro from "../ServiceIntro";
import UploadFile from "../UploadFile";
import { useToast } from "@/context/ToastContext";
import MetadataViewer from "./components/MetadataViewer";

const ExtractMetadataClient = () => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string | null>(null);
  const [downloadItem, setDownloadItem] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toast = useRef<Toast | null>(null);
  const { showToast } = useToast();

  const formData = new FormData();
  const { mutate, isPending } = useExtractMetadata();

  const submitExtraction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      formData.append("files", file);
    }

    mutate(formData, {
      onSuccess: (response) => {
        console.log(response);

        if (response?.success) {
          setMetadata(response.metadatas[0]);
        }
      },
      onError: (error) => {
        showToast("error", "Cannot process", error.message, 5000);
      },
    });
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
      {!metadata && (
        <ServiceIntro
          titleBeforeHighlight=""
          highlightedWord="Image metadata"
          titleAfterHighlight=""
          description="View and edit image metadata with ease — from technical details to custom fields, giving you full control over your image information."
        />
      )}

      {!metadata && (
        <form onSubmit={submitExtraction}>
          <UploadFile
            tooltip="extract metadata image"
            action="extract-metadata"
            setImage={setImage}
            isMultiple={false}
            setFile={setFile}
          />

          {file && <button type="submit">Submit</button>}
        </form>
      )}

      {metadata && (
        <MetadataViewer
          metadata={metadata}
          onMetadataChange={(updated) => setMetadata(updated)}
        />
      )}
    </div>
  );
};

export default ExtractMetadataClient;
