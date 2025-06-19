import deleteIcon from "../assets/button images/delete.png";
import fileImage from "../assets/button images/file-img1.png";
import { formatFileSize } from "../utils/formatFileSize";
import DownloadButton from "./DownloadButton";
import { isDisabledDownload } from "../utils/isDisabledDownload";

type UploadedFileType = {
  id: string;
  link: string;
  index?: number;
  isProcessed: boolean;
  size?: number;
  disabledLinks: string[];
  handleDisableLink: ((link: string) => void) | null;
  handleRemoveFile: ((id: string) => void) | null;
};

const UploadedFile = ({
  id,
  link,
  isProcessed,
  size,
  index,
  disabledLinks,
  handleDisableLink,
  handleRemoveFile,
}: UploadedFileType) => {
  return (
    <div
      key={id}
      className=" bg-[#f6fff8] border-[0.5px] border-solid border-[#E0F2E4] rounded-sm  p-3 pr-6 flex flex-row justify-between gap-5 items-center"
    >
      <div className="flex flex-row gap-4 items-center">
        <img src={fileImage} alt="file-img" height={50} width={50} />
        <div className="flex flex-col gap-1">
          <p className="text-sm">{link}</p>
          {size && <p className="text-xs">{formatFileSize(size)}</p>}
        </div>
      </div>
      {!isProcessed && handleRemoveFile ? (
        <button onClick={() => handleRemoveFile(id)}>
          <img src={deleteIcon} alt="remove-file-icon" height={25} width={25} />
        </button>
      ) : (
        <DownloadButton
          link={link}
          index={index || 1}
          isDisabledDownload={isDisabledDownload}
          disabledLinks={disabledLinks}
          onClick={handleDisableLink}
        />
      )}
    </div>
  );
};

export default UploadedFile;
