"use client";

import SingleDownloadButton from "./SingleDownloadButton";
import DeleteAllButton from "./DeleteAllButton";
import trashIcon from "../assets/button images/trash-single.png";
import { Fade } from "react-awesome-reveal";
import { TransformedDownloadLinks } from "../types/apiTypes";
import DownloadCard from "./DownloadCard";
import DownloadAllButton from "./DownloadAllButton";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";

type DownloadAreaType = {
  text: string;
  isSingle: boolean;
  downloadItem?: string;
  downloadLinks?: TransformedDownloadLinks[];
  disabledLinks?: string[];
  resetAll: () => void;
  deleteAll: () => void;
  handleDisableLink: ((link: string) => void) | null;
};

const DownloadArea = ({
  text,
  isSingle,
  downloadItem,
  downloadLinks,
  disabledLinks = [],
  handleDisableLink,
  resetAll,
  deleteAll,
}: DownloadAreaType) => {
  return (
    <Fade direction={isSingle ? "down" : undefined}>
      <div className="flex items-center flex-col px-5 sm:px-10 py-5 ">
        <h1 className="py-3  text-xl">{text}</h1>
        {isSingle && downloadItem ? (
          <div className="flex items-center justify-center flex-row gap-3">
            <i
              className="pi pi-info-circle "
              style={{ marginLeft: 10, color: "#949494", fontSize: 20 }}
            ></i>
            <Tooltip
              target=".pi-info-circle"
              content="Processed image will be automatically deleted after 1 hour of processing."
              position="top"
            />
            <div className="py-2 ">
              <SingleDownloadButton link={downloadItem} resetAll={resetAll}>
                Download image
              </SingleDownloadButton>
            </div>
            <DeleteAllButton deleteAll={deleteAll} className="p-4.5">
              <Image
                src={trashIcon.src}
                alt="trash-icon"
                height={23}
                width={23}
              />
            </DeleteAllButton>
          </div>
        ) : (
          <div className=" w-full">
            <div className="py-5 w-full flex flex-col gap-3">
              {downloadLinks?.map((item, index) => (
                <DownloadCard
                  key={item.id}
                  {...item}
                  index={index}
                  disabledLinks={disabledLinks}
                  handleDisableLink={handleDisableLink}
                />
              ))}
            </div>
            <div className="w-full flex justify-between items-center">
              <i
                className="pi pi-info-circle"
                style={{ marginLeft: 10, color: "#949494", fontSize: 20 }}
              ></i>
              <Tooltip
                target=".pi-info-circle"
                content="Processed images will be automatically deleted after 1 hour of processing."
                position="right"
              />
              <div className="flex items-center gap-2 ">
                <DownloadAllButton resetAll={resetAll} />
                <DeleteAllButton deleteAll={deleteAll} className="px-3 py-2">
                  Delete
                </DeleteAllButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default DownloadArea;
