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

// types.ts (novi fajl za bolju organizaciju)
export type Role = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isPremium: boolean;
  token: string;
}

export type AuthStatus =
  | { state: "loading" }
  | { state: "authenticated"; user: User }
  | { state: "unauthenticated" };

// Collage

// Tipovi za Collage
export type Template = {
  id: string;
  name: string;
  icon: string;
  premium: boolean;
  dimensions?: { width: number; height: number };
};

export type ImageAsset = {
  id: string;
  file: File;
  previewUrl: string;
  position?: { x: number; y: number };
};

export type CollageState = {
  images: ImageAsset[];
  selectedTemplate: string;
  background: string;
  textElements: TextElement[];
};

export type TextElement = {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
};
