"use client";
import Image from "next/image";
import downloadIcon from "../assets/button images/download-file2.png";

type DownloadButtonType = {
  link: string;
  index: number;
  disabledLinks: string[];
  isDisabledDownload: (
    link: string,
    index: number,
    disabledLinks: string[]
  ) => boolean;
  onClick: ((link: string) => void) | null;
};

const DownloadButton = ({
  link,
  index,
  disabledLinks = [],
  isDisabledDownload,
  onClick,
}: DownloadButtonType) => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:4000";

  return (
    <a
      onClick={() => {
        const transformedLink = `${link}-${index}`;
        onClick?.(transformedLink);
        console.log(`${BASE_URL}/download/${link}`);
      }}
      href={`${BASE_URL}/download/${link}`}
      download
      className={`
      ${
        !isDisabledDownload(link, index, disabledLinks)
          ? "cursor-pointer"
          : "cursor-not-allowed"
      }
      ${
        isDisabledDownload(link, index, disabledLinks)
          ? "opacity-50"
          : "opacity-100"
      }
${isDisabledDownload(link, index, disabledLinks) ? "pointer-events-none" : ""}

   `}
    >
      <Image src={downloadIcon} alt="download-icon" height={22} width={22} />
    </a>
  );
};

export default DownloadButton;
