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

// user

// Input podaci za signup
export type SignupUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

// User objekat iz backend responsa
export type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  premiumExpires: string | null;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
  twoFactorEnabled: boolean;
  role: "user" | "admin";
};

// Povratni tip od /signup rute
export type SignupResponse = {
  success: boolean;
  message: string;
  // token: string;
  user: User;
};

export type LoginResponse = SignupResponse;
export type ForgotPasswordResponse = SignupResponse;
export type ResetPasswordResponse = {
  success: boolean;
  // token: string;
  message: string;
  user: User;
};
export type RemoveProfilePictureResponse = {
  success: boolean;
  message: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
  token: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ResetPasswordUserData = {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type verifyEnableTwoFactorData = {
  currentPassword: string;
  token: string;
};

export type getUserResponse = {
  message: string;
  success: boolean;
  user: User;
};
export type ChangeNameResponse = {
  success: boolean;
  message: string;
};

export type SetupTwoFactorResponse = {
  success: boolean;
  message: string;
  qrCode: string;
};

export type VerifyEnableTwoFactorResponse = {
  success: boolean;
  message: string;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};
