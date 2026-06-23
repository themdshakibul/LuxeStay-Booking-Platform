"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  // next-themes injects an inline <script> to prevent theme flicker on load.
  // React 19 warns about script tags in components; on the client, use a
  // non-executable type so hydration stays quiet while SSR still runs the script.
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
