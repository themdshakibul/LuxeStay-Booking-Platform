"use client";

import { useTheme } from "next-themes";
import { MdNightsStay, MdSunny } from "react-icons/md";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    // <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
    <button onClick={() => setTheme}>
      {theme === "dark" ? (
        <MdNightsStay size={20} className="text-violet-600" />
      ) : (
        <MdSunny size={20} className="text-amber-400" />
      )}
    </button>
  );
}
