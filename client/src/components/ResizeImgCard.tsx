"use client";

import Image from "next/image";
import deleteIcon from "../assets/button images/delete.png";
import DownloadButton from "./DownloadButton";

type ResizeImgProps = {
  isProcessed: boolean;
  id: string;
  height?: number | undefined;
  name: string;
  width?: number | undefined;
  imageUrl: string;
  index: number;
  disabledLinks: string[];
  handleLoadImage: (id: string, height: number, width: number) => void;
  handleRemoveFile: (id: string) => void;
  isDisabledDownload: (
    link: string,
    index: number,
    disabledLinks: string[]
  ) => boolean;
  onClick: (link: string) => void;
};

const ResizeImgCard = ({
  isProcessed,
  id,
  height,
  width,
  index,
  imageUrl,
  name,
  disabledLinks,
  handleLoadImage,
  handleRemoveFile,
  isDisabledDownload,
  onClick,
}: ResizeImgProps) => {
  return (
    <div
      key={id}
      className="border border-solid border-gray-200 p-2.5 rounded-md"
    >
      <Image
        src={imageUrl}
        alt={name}
        className="w-[150px] h-[150px] object-contain"
        onLoad={(e) => {
          const img = e.currentTarget;
          handleLoadImage(id, img.naturalWidth, img.naturalHeight);
        }}
      />
      <div>
        <div className="pt-1">
          <p className="text-sm">{name}</p>
          {!isProcessed && (
            <p className="text-[10px]">
              {width && height ? `${width} x ${height} px` : "loading..."}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end w-full">
          {!isProcessed ? (
            <button
              onClick={() => handleRemoveFile(id)}
              className="cursor-pointer"
            >
              <Image
                src={deleteIcon}
                height={20}
                width={20}
                alt="delete-resize-img"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  handleLoadImage(id, img.naturalWidth, img.naturalHeight);
                }}
              />
            </button>
          ) : (
            <DownloadButton
              link={name}
              index={index}
              disabledLinks={disabledLinks}
              isDisabledDownload={isDisabledDownload}
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResizeImgCard;
