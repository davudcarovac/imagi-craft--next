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
// Eksterni tipovi (u posebnom types.ts fajlu)
import { LucideIcon } from "lucide-react";

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "yearly" | "forever";
  featured?: boolean;
  description: string;
  features: {
    text: string;
    icon: LucideIcon;
    negative?: boolean; // For negative features (like limitations)
    premium?: boolean; // For premium-only features
  }[];
  cta: {
    text: string;
    variant: "contained" | "outlined" | "text";
    icon?: string; // PrimeReact icon class
    severity?:
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "help"
      | "danger"
      | "contrast";
    disabled?: boolean;
  };
  ribbon?: string;
  badge?: string;
  custom?: boolean;
  annualDiscount?: number;
  mostPopular?: boolean;
  // Optional additional fields
  storage?: string; // e.g. "10GB", "Unlimited"
  teamMembers?: number;
};

export type PrimeIcons = `pi ${string}`; // Za PrimeReact ikonice
