// compress select format type

export type SelectFormatType = {
  name: string;
  value: string | null;
};

// resize

export type ResizeOptionsType = {
  isActiveAR: boolean;
  imageOptions: ImageOptionsType;
  fit: string;
  handleChangeImageOptions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectFit: (e: DropdownChangeEvent) => void;
  resetOptions: () => void;
  toggleAspectRatio: () => void;
};
