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
  return (
    <a
      onClick={() => {
        const transformedLink = `${link}-${index}`;
        onClick && onClick(transformedLink);
      }}
      href={`http://localhost:4000/download/${link}`}
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
      ${isDisabledDownload(link, index, disabledLinks) && "pointer-events-none"}

   `}
    >
      <Image src={downloadIcon} alt="download-icon" height={22} width={22} />
    </a>
  );
};

export default DownloadButton;
