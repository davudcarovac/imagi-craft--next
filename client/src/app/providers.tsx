"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContextProvider>
  );
};

export default Providers;
