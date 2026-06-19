// "use client";

// import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { Button } from "@nextui-org/react";
// import { MdSunny, MdNightsStay } from "react-icons/md";

// export default function ThemeSwitch({
//   className = "",
//   iconSize = 20,
//   variant = "light",
// }) {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const frame = requestAnimationFrame(() => setMounted(true));
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   if (!mounted) {
//     return (
//       <Button isIconOnly variant={variant} className={className}>
//         <div style={{ width: iconSize, height: iconSize }} />
//       </Button>
//     );
//   }

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <Button
//       isIconOnly
//       variant={variant}
//       onClick={toggleTheme}
//       className={className}
//     >
//       {theme === "dark" ? (
//         <MdSunny size={iconSize} className="text-amber-400" />
//       ) : (
//         <MdNightsStay size={iconSize} className="text-violet-600" />
//       )}
//     </Button>
//   );
// }

"use client";

import { useTheme } from "next-themes";
import { MdNightsStay, MdSunny } from "react-icons/md";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <MdSunny size={20} className="text-amber-400" />
      ) : (
        <MdNightsStay size={20} className="text-violet-600" />
      )}
    </button>
  );
}
