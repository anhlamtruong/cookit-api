"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function detectUserTheme() {
  // 1. Check for stored preferences (highest priority)
  if (typeof window !== "undefined") {
    // Ensure we're running in the browser
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
  }

  // 2. Check for the OS preference using media queries
  if (typeof window !== "undefined" && window.matchMedia) {
    // Ensure we're running in the browser
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light"; // Default to light if no preference found
  }

  // 3. If nothing found, you can provide a safe default
  return "light";
}
