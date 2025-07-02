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
