"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Tooltip } from "primereact/tooltip";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FileType } from "../types/apiTypes";
import { v4 as uuidv4 } from "uuid";
import NextImage from "next/image";

type UploadFileType = {
  tooltip: string;
  action: string;
  isMultiple: boolean;
  files?: FileType[];
  isPending?: boolean;
  globalFormat?: string | null;
  formatOptions?: { name: string; value: string }[];
  errorMessage?: string | null;

  handleGlobalFormatChange?: (newFormat: string | null) => void;
  setErrorMessage?: Dispatch<SetStateAction<string | null>>;
  setIsOpenCompressionSb?: React.Dispatch<React.SetStateAction<boolean>>;
  setImage?: (image: string) => void;
  setFile?: (file: File) => void;
  setFiles?: React.Dispatch<React.SetStateAction<FileType[]>>;
  setBackgroundOptions?: (url: string) => void;
};

export default function UploadFile({
  tooltip,
  isMultiple,
  files,
  action,
  isPending,
  formatOptions,
  globalFormat,
  handleGlobalFormatChange,
  setErrorMessage,
  setImage,
  setFile,
  setFiles,
  setBackgroundOptions,
}: UploadFileType) {
  const toast = useRef<Toast | null>(null);
  const fileUploadRef = useRef<FileUpload | null>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [imageDimensions, setImageDimensions] = useState<
    Record<string, { width: number; height: number }>
  >({});

  // NEW: Global format state

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;

    let newFiles = [...e.files];
    if (action === "crop-face" && newFiles.length > 5) {
      newFiles = newFiles.slice(0, 5);
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: (
          <span style={{ fontSize: "13px" }}>
            You can only upload up to 5 files at a time.
          </span>
        ),
        life: 4000,
      });

      fileUploadRef?.current?.setFiles(newFiles);
      return;
    }

    if (!isMultiple && setErrorMessage && e.files.length > 0) {
      if (e.files[0]?.size > 2145728) {
        setErrorMessage("File size exceeds the maximum limit of 6 MB.");
        return;
      }
    }

    if (Array.isArray(e.files)) {
      if (setImage) {
        const objectURL = URL.createObjectURL(e.files[0]);
        setImage(objectURL);
      }

      if (setBackgroundOptions) {
        const objectURL = URL.createObjectURL(e.files[0]);
        setBackgroundOptions(objectURL);
      }

      if (setFile) {
        setFile(e.files[0]);
      }

      if (setFiles) {
        const transformed = Array.from(e.files).map((item) => ({
          id: uuidv4(),
          file: item,
          format: globalFormat || "png",
        }));
        setFiles(transformed);
      }

      e.files.forEach((file) => {
        _totalSize += file.size || 0;
      });
    }

    setTotalSize(_totalSize);
  };

  const handleFormatChange = (fileName: string, newFormat: string) => {
    if (setFiles) {
      setFiles((prevFiles) =>
        prevFiles.map((item) =>
          item.file.name === fileName ? { ...item, format: newFormat } : item
        )
      );
    }
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file: File, callback: () => void) => {
    setTotalSize(totalSize - file.size);
    if (setFiles) {
      setFiles((prev) => prev.filter((item) => item.file.name !== file.name));
    }
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    if (setFiles) setFiles([]);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef.current?.formatSize(totalSize) ?? "0 B";

    return (
      <div className={`${className} p-4`}>
        <div className="flex flex-col md:flex-row items-center w-full gap-4">
          {/* Leva strana — dugmad i progress */}
          <div className="flex-1 flex flex-wrap items-center gap-3">
            {chooseButton}
            {isPending ? (
              <ProgressSpinner
                strokeWidth="3"
                style={{ width: 50, height: 50, color: "#1aac83" }}
              />
            ) : (
              React.cloneElement(cancelButton, {
                "aria-hidden": "false",
                "aria-label": "Cancel upload",
              })
            )}

            <div className="flex items-center gap-2 ">
              <span>{formatedValue} / 15 MB</span>
              <ProgressBar
                value={value}
                showValue={false}
                style={{ width: "10rem", height: "12px" }}
              />
            </div>
          </div>

          {/* Desna strana — samo Submit dugme */}
          <div className="flex-shrink-0">
            {isMultiple && totalSize > 0 && (
              <button
                disabled={isPending}
                type="submit"
                className={`${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                } custom-upload-btn bg-[#1aac83] py-2 px-3 text-[#ffffff] border border-[#1aac83] rounded-md flex items-center gap-2 font-semibold cursor-pointer saira-font`}
              >
                Submit
                {/* <img
                  src={arrowRightIcon.src}
                  alt="next-icon"
                  height={15}
                  width={15}
                /> */}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const loadImageDimensions = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageDimensions((prev) => ({
          ...prev,
          [file.name]: { width: img.width, height: img.height },
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const itemTemplate = (file: object, options: ItemTemplateOptions) => {
    const typedFile = file as File & { objectURL?: string };
    let currentFile;
    if (files)
      currentFile = files.find((item) => item.file.name === typedFile.name);

    if (action === "resize") {
      files?.forEach((item) => loadImageDimensions(item.file));
    }

    return (
      <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-3 p-4 rounded-lg">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <NextImage
            alt={typedFile.name}
            role="presentation"
            src={typedFile.objectURL || ""}
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-medium text-gray-800 truncate">
              {typedFile.name}
            </span>
            <small className="text-gray-500 text-xs">
              {new Date().toLocaleDateString()}
            </small>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Tag
            value={options.formatSize}
            severity="success"
            className="px-2 py-1 text-xs sm:text-sm bg-[#1aac83]"
          />
          {action === "convert" && (
            <Dropdown
              disabled={isPending}
              value={currentFile?.format || "png"}
              onChange={(e) =>
                handleFormatChange(typedFile.name, e.target.value)
              }
              options={formatOptions}
              optionLabel="name"
              placeholder="Format"
              className="min-w-[100px] text-xs sm:text-sm"
              dropdownIcon="pi pi-chevron-down"
            />
          )}
          {action === "resize" && (
            <div className="w-full flex items-center justify-center flex-1">
              <p className="text-sm text-gray-600 whitespace-nowrap">
                {imageDimensions[typedFile.name]?.width} ×{" "}
                {imageDimensions[typedFile.name]?.height} px
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end sm:justify-center flex-shrink-0">
          <Button
            onClick={(e) =>
              onTemplateRemove(typedFile, () => options.onRemove(e))
            }
            type="button"
            icon="pi pi-times"
            disabled={isPending}
            className={`p-button-outlined p-button-rounded p-button-danger w-8 h-8 ${
              isPending ? "opacity-50" : ""
            }`}
          />
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex justify-center items-center flex-col px-2 py-3">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        />
        <span className="pb-5 pt-2">Drag and Drop Image Here</span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    root: {
      "aria-hidden": "false",
      "aria-label": "Cancel upload",
    },
  };

  return (
    <div className={`max-w-[800px] mx-auto px-5 py-5`}>
      <Toast ref={toast} />
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip
        target=".custom-upload-btn"
        content={tooltip}
        position="bottom"
      />

      <FileUpload
        customUpload={true}
        ref={fileUploadRef}
        multiple={isMultiple}
        name="demo[]"
        accept="image/*"
        maxFileSize={6145728}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
