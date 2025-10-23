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

// osnovni tipovi
export type ExifPrimitive = string | number | boolean | null;

// rekurzivni tipovi
export type ExifValue =
  | ExifPrimitive
  | { [key: string]: ExifValue } // ugnježdeni objekti
  | ExifValue[]; // niz vrednosti

// Generički tip za mapu EXIF podataka
export type ExifData = {
  [key: string]: ExifValue | undefined;
};

// Jedan set metapodataka za jednu sliku
export type MetadataItem = {
  metadata: ExifData;
  filename: string;
  readOnly: ExifData;
  // editable: ExifData;
  // fullData: ExifData;
};

// Odgovor backend-a za više fajlova
export type ExtractMetadataResponse = {
  success: boolean;
  message: string;
  metadatas: MetadataItem[];
};

export type EditMetadataResponse = {
  success: boolean;
  message: string;
  fileId: string;
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
  plan: "STARTER" | "PROFESSIONAL" | "BUSINESS";
  planExpires: Date | null;
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
  email: string;
  // token: string;
  // user: User;
};

export type GetCsrfTokenResponse = {
  success: boolean;
  message: string;
  // token: string;
  csrfToken: string;
};

export type LoginResponse =
  | { message: string }
  | { message: string; user: User; success: boolean }
  | { success: boolean; message: string; twoFactor: boolean; userId: string };

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

export type VerifyEmailData = {
  verificationToken: string;
};

export type verifyEnableTwoFactorData = {
  currentPassword: string;
  token: string;
};

export type VerifyLoginTwoFactorData = {
  token: string | null;
  id: string | null;
};

export type ResendVerificationEmailData = {
  email: string;
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

export type DisableTwoFactorResponse = VerifyEnableTwoFactorResponse;

export type VerifyLoginTwoFactorResponse = {
  message: string;
  success: boolean;
  user: User;
};
export type ErrorResponse = {
  success: boolean;
  message: string;
};

export type ResendVerificationEmailResponse = {
  success: boolean;
  message: string;
};

export type VerifyEmailResponse = {
  message: string;
  success: boolean;
};
