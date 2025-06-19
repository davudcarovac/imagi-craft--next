"use client";

import { deleteAllFiles } from "@/api/deleteAllApi";
import DownloadArea from "@/components/DownloadArea";
import LetsTryActions from "@/components/LetsTryActions/LetsTryActions";
import UploadFile from "@/components/UploadFile";
import { useConvert } from "@/hooks/useConvert";
import { FileType, TransformedDownloadLinks } from "@/types/apiTypes";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ConvertClient = () => {
  // const [convertTo, setConvertTo] = useState<null | string>("jpeg");
  const [files, setFiles] = useState<FileType[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<
    TransformedDownloadLinks[] | undefined
  >([]);
  const [disabledLinks, setDisabledLinks] = useState<string[]>([]);
  const formData = new FormData();

  const { mutate, isPending, data } = useConvert();

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

  return (
    <div>
      {downloadLinks && downloadLinks?.length === 0 && (
        <form onSubmit={submitConversion}>
          <UploadFile
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
