"use client";

import { TransformedDownloadLinks } from "../types/apiTypes";
import downloadFileImg from "../assets/button images/file-img1.png";
import { formatFileSize } from "../utils/formatFileSize";
import DownloadButton from "./DownloadButton";
import { isDisabledDownload } from "../utils/isDisabledDownload";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

const DownloadCard = ({
  size,
  link,
  id,
  index,
  disabledLinks,
  handleDisableLink,
}: TransformedDownloadLinks & {
  index: number;
  disabledLinks: string[];
  handleDisableLink: ((link: string) => void) | null;
}) => {
  return (
    <Fade direction="left" cascade damping={0.5} triggerOnce>
      <div
        key={id}
        className="group bg-white hover:bg-[#f6fff8] border border-gray-200 hover:border-[#1aac83]/50 rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-4 items-center transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <div className="flex flex-row gap-4 items-center w-full">
          <div className="p-2 bg-[#1aac83]/10 rounded-lg">
            <Image
              src={downloadFileImg}
              alt="file-icon"
              height={40}
              width={40}
              className="object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-800 truncate">
                {link.split("/").pop()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              {size && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {formatFileSize(size)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <DownloadButton
            link={link}
            index={index || 1}
            isDisabledDownload={isDisabledDownload}
            disabledLinks={disabledLinks}
            onClick={handleDisableLink}
          />
        </div>
      </div>
    </Fade>
  );
};

export default DownloadCard;
