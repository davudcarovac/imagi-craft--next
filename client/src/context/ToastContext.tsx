"use client";

import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

type ToastContextType = {
  showToast: (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string | React.ReactNode,
    life?: number
  ) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string | React.ReactNode,
    life: number = 3000
  ) => {
    toastRef.current?.show({ severity, summary, detail, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
