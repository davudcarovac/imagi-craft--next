"use client";

import { getCsrfToken } from "@/api/user/csrfTokenApi";
import { useEffect } from "react";

export default function CsrfInitializer() {
  useEffect(() => {
    const getToken = async () => {
      await getCsrfToken();
    };
    getToken();
  }, []);

  return null;
}
