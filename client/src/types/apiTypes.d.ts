export type FileType = {
  file: File;
  id: string;
  format?: string;
};

export type DownloadLinksType = {
  name: string;
  size: number;
  height: number;
  width: number;
  format: string;
} & { error?: string };

// api

export type ResponseApiType = {
  success: boolean;
  downloadLinks?: DownloadLinksType[];
};

// links

export type TransformedDownloadLinks = {
  id: string;
  link: string;
  size: number;
  height: number;
  width: number;
  format: string;
};

// resize

export type ImageOptionsType = {
  width: string | number;
  height: string | number;
};

export type FileTypeResize = {
  file: File;
  id: string;
  width?: number;
  height?: number;
};

export type FitType =
  | "cover"
  | "cover"
  | "contain"
  | "fill"
  | "inside"
  | "outside";

// crop

export type OriginalImageSizeType = {
  width: null | number;
  height: null | number;
};

// export type CoordinatesType = {
//   top: number;
//   left: number;
//   width: number;
//   height: number;
// };

// crop face

export type NoDetectedFacesType = {
  name: string;
  error: string;
};
