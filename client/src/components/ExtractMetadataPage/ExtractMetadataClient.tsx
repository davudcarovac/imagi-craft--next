"use client";

import { useExtractMetadata } from "@/hooks/useExtractMetadata";
import { useEditMetadata } from "@/hooks/useEditMetadata";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import ServiceIntro from "../ServiceIntro";
import UploadFile from "../UploadFile";
import { useToast } from "@/context/ToastContext";
import MetadataViewer from "./components/MetadataViewer";
import DownloadArea from "../DownloadArea";
import { deleteAllFiles } from "@/api/deleteAllApi";
import LetsTryActions from "../LetsTryActions/LetsTryActions";

// Tipovi za Exif vrednosti i Metadata
export type ExifPrimitive = string | number | boolean | null;
export type ExifValue =
  | ExifPrimitive
  | { [key: string]: ExifValue }
  | ExifValue[];

export type MetadataRecord = Record<string, ExifValue>;

export type MetadataType = {
  metadata: MetadataRecord;
  readOnly: MetadataRecord;
  fileName: string; // obavezno da bude kompatibilno sa MetadataViewer
};

const ExtractMetadataClient: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();
  const [metadata, setMetadata] = useState<MetadataType | null>(null);
  const [showMetadata, setShowMetadata] = useState<null | "readOnly" | "edit">(
    null
  );
  const [downloadLink, setDownloadLink] = useState<string>();
  const [changedMetadata, setChangedMetadata] = useState<MetadataRecord>({});

  const toast = useRef<Toast | null>(null);
  const { showToast } = useToast();

  const formData = new FormData();
  const { mutate } = useExtractMetadata();
  const { mutate: mutateEditMetadata } = useEditMetadata();

  const submitExtraction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) formData.append("files", file);

    mutate(formData, {
      onSuccess: (response) => {
        if (response?.success && response.metadatas?.length) {
          const meta = response.metadatas[0];

          // filtriranje undefined vrednosti
          const filteredMetadata: Record<string, ExifValue> = {};
          Object.entries(meta.metadata).forEach(([k, v]) => {
            if (v !== undefined) filteredMetadata[k] = v;
          });

          const filteredReadOnly: Record<string, ExifValue> = {};
          Object.entries(meta.readOnly).forEach(([k, v]) => {
            if (v !== undefined) filteredReadOnly[k] = v;
          });

          setMetadata({
            metadata: filteredMetadata,
            readOnly: filteredReadOnly,
            fileName: file?.name || "unknown",
          });
        }
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        showToast("error", "Cannot process", message, 5000);
      },
    });
  };

  const cancelProcess = () => {
    setShowMetadata(null);
    setFile(undefined);
    setMetadata(null);
    formData.delete("files");
    setDownloadLink(undefined);
  };

  const submitEditMetadata = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) formData.append("files", file);
    formData.append("editableMetadata", JSON.stringify(changedMetadata));

    mutateEditMetadata(formData, {
      onSuccess: (response) => {
        console.log("response edit metadata ===> ", response);
        setDownloadLink(response?.fileId);
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        console.log("Error during editing metadata ===> ", message);
      },
    });
  };

  const resetAll = () => {
    setDownloadLink(undefined);
    formData.delete("files");
    setFile(undefined);
    setMetadata(null);
    setShowMetadata(null);
    setChangedMetadata({});
  };

  const deleteAll = () => {
    try {
      deleteAllFiles();
      resetAll();
    } catch (error) {
      console.log("error while deleting all ===> ", error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Toast ref={toast} />

      {!metadata && !downloadLink && (
        <div className="pt-16">
          <ServiceIntro
            titleBeforeHighlight=""
            highlightedWord="Image metadata"
            titleAfterHighlight=""
            description="View and edit image metadata with ease — from technical details to custom fields, giving you full control over your image information."
          />
        </div>
      )}

      {downloadLink && (
        <DownloadArea
          deleteAll={deleteAll}
          downloadLinks={[]}
          handleDisableLink={null}
          text="Your image has been edited. Download it!"
          resetAll={resetAll}
          isSingle={true}
          downloadItem={downloadLink}
        />
      )}

      {downloadLink && <LetsTryActions />}

      {!metadata && !downloadLink && (
        <form onSubmit={submitExtraction}>
          <UploadFile
            tooltip="extract metadata image"
            action="extract-metadata"
            setShowMetadata={setShowMetadata}
            isMultiple={false}
            setFile={setFile}
            metadataFile={file}
          />
        </form>
      )}

      {metadata && !downloadLink && (
        <form onSubmit={submitEditMetadata} className="space-y-6">
          <MetadataViewer
            metadata={{
              metadata: metadata.metadata,
              readOnly: metadata.readOnly,
              filename: metadata.fileName,
            }}
            showMetadata={showMetadata}
            changedMetadata={changedMetadata}
            setChangedMetadata={setChangedMetadata}
            onMetadataChange={(updated) =>
              setMetadata({
                metadata: updated.metadata,
                readOnly: updated.readOnly,
                fileName: updated.filename,
              })
            }
          />
          <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
            {showMetadata === "edit" && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer rounded-lg font-medium saira-font">
                  Reset
                </button>

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
