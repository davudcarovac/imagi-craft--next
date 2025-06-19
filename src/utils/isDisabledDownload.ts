import { TransformedDownloadLinks } from "../types/apiTypes";

export const isDisabledDownload = (
  link: string,
  index: number,
  disabledLinks: string[]
): boolean => {
  return disabledLinks.includes(`${link}-${index}`);
};

export const isDisabledUpload = (downloadLinks: TransformedDownloadLinks[]) => {
  return downloadLinks.length > 0;
};
