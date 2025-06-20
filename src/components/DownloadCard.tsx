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
    <Fade direction="left" cascade damping={0.5}>
      <div
        key={id}
        className=" bg-[#f6fff8] border-[0.5px] border-solid border-[#E0F2E4] rounded-sm  p-3 pr-6 flex flex-row justify-between gap-5 items-center"
      >
        <div className="flex flex-row gap-4 items-center">
          <Image src={downloadFileImg} alt="file-img" height={50} width={50} />
          <div className="flex flex-col gap-1">
            <p className="text-sm">{link}</p>
            {size && <p className="text-xs">{formatFileSize(size)}</p>}
          </div>
        </div>

        <DownloadButton
          link={link}
          index={index || 1}
          isDisabledDownload={isDisabledDownload}
          disabledLinks={disabledLinks}
          onClick={handleDisableLink}
        />
      </div>
    </Fade>
  );
};

export default DownloadCard;
