import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5 group">
      <div className="bg-linear-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white shadow-md shadow-violet-500/10 group-hover:scale-105 transition-transform duration-200">
        <FaHome className="text-sm md:text-xl" />
      </div>
      <p className="font-black text-base md:text-xl tracking-wider text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-300">
        LuxeStay
      </p>
    </Link>
  );
}
