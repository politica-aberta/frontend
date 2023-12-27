"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Worker } from "@react-pdf-viewer/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient();
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
          {children}
        </Worker>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
