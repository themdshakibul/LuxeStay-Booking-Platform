"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  const scriptProps =
    typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      scriptProps={scriptProps}
    >
      {children}
    </ThemeProvider>
  );
}
