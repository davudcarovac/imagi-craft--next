import { ReactNode } from "react";
import downloadSingleIcon from "../assets/button images/download-single.png";

type SingleDownloadButtonProps = {
  link: string;
  resetAll: () => void;
  children: ReactNode;
};

const SingleDownloadButton = ({
  link,
  resetAll,
  children,
}: SingleDownloadButtonProps) => {
  return (
    <button
      onClick={resetAll}
      className="px-5 py-4 text-lg rounded-md bg-[#1aac83] flex items-center flex-row gap-2 text-white cursor-pointer"
    >
      <img
        src={downloadSingleIcon}
        alt="download-single"
        height={20}
        width={20}
      />
      <a
        href={`http://localhost:3000/download/${link}`}
        className="font-semibold"
      >
        {children}
      </a>
    </button>
  );
};

export default SingleDownloadButton;
