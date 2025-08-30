"use client";

import { useExtractMetadata } from "@/hooks/useExtractMetadata";
// import { TransformedDownloadLinks } from "@/types/apiTypes";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import ServiceIntro from "../ServiceIntro";
import UploadFile from "../UploadFile";
import { useToast } from "@/context/ToastContext";
import MetadataViewer from "./components/MetadataViewer";
import { useEditMetadata } from "@/hooks/useEditMetadata";

const ExtractMetadataClient = () => {
  const [file, setFile] = useState<File>();
  // const [image, setImage] = useState<string | null>(null);
  // const [downloadItem, setDownloadItem] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [showMetadata, setShowMetadata] = useState<null | "readOnly" | "edit">(
    null
  );

  const [changedMetadata, setChangedMetadata] = useState<Record<string, any>>(
    {}
  );

  // const [downloadLinks, setDownloadLinks] = useState<
  //   TransformedDownloadLinks[]
  // >([]);

  const toast = useRef<Toast | null>(null);
  const { showToast } = useToast();

  const formData = new FormData();
  const { mutate } = useExtractMetadata();
  const { mutate: mutateEditMetadata } = useEditMetadata();

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

  const cancelProcess = () => {
    setShowMetadata(null);
    setFile(undefined);
    setMetadata(null);
    formData.delete("files");
  };

  const submitEditMetadata = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      formData.append("files", file);
    }

    // function normalizeMetadata(meta: any) {
    //   const normalized: any = {};
    //   for (const key in meta) {
    //     const value = meta[key];
    //     if (value && typeof value === "object" && value.rawValue) {
    //       normalized[key] = value.rawValue; // koristi ExifTool raw string
    //     } else {
    //       normalized[key] = value;
    //     }
    //   }
    //   return normalized;
    // }

    // formData.append(
    //   "editableMetadata",
    //   JSON.stringify(normalizeMetadata(metadata.metadata))
    // );

    formData.append("editableMetadata", JSON.stringify(changedMetadata));

    mutateEditMetadata(formData, {
      onSuccess: (response) => {
        console.log("response edit metadata ===> ", response);
      },
      onError: (error) => {
        console.log("Error during editing metadata ===> ", error);
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* 🎯 Toast na početku */}
      <Toast ref={toast} />
      {/* <div className="flex items-center gap-2">
        <span className="bg-white border border-solid border-slate-200 text-gray-500 font-semibold px-4 py-2 rounded-full text-md flex items-center gap-2 ">
          <i className="pi pi-crown text-yellow-500"></i>
          Premium
        </span>
      </div> */}
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
            setShowMetadata={setShowMetadata}
            // setImage={setImage}
            isMultiple={false}
            setFile={setFile}
            metadataFile={file}
          />
        </form>
      )}

      {metadata && (
        <form onSubmit={submitEditMetadata} className="space-y-6">
          <MetadataViewer
            metadata={metadata}
            showMetadata={showMetadata}
            changedMetadata={changedMetadata}
            setChangedMetadata={setChangedMetadata}
            onMetadataChange={(updated) => {
              setMetadata(updated);
            }}
          />
          <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
            {showMetadata === "edit" && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer rounded-lg font-medium saira-font">
                  Reset
                </button>

                {/* Cancel + Confirm */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={cancelProcess}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer rounded-lg font-medium saira-font"
                  >
                    Cancel
                  </button>
                  <button
                    className="cursor-pointer bg-[#1aac83] text-white hover:bg-[#159e77] transition-colors rounded-lg px-4 py-2 font-medium saira-font shadow-sm"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}

            {showMetadata === "readOnly" && (
              <>
                <button
                  onClick={cancelProcess}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer rounded-lg font-medium saira-font"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowMetadata("edit")}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer  bg-[#1aac83] text-white rounded-md font-semibold saira-font"
                >
                  <i className="pi pi-pencil" />
                  Edit
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ExtractMetadataClient;
