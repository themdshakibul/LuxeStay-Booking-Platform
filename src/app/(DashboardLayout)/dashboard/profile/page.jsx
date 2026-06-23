"use client";

import React from "react";
import { MdOutlineAccountCircle, MdEmail, MdWork } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const profileData = [
    {
      label: "Full Name",
      value: user?.name || "John Doe",
      icon: <MdOutlineAccountCircle size={24} />,
    },
    {
      label: "Email Address",
      value: user?.email || "owner@gmail.com",
      icon: <MdEmail size={24} />,
    },
    { label: "Role", value: user?.role, icon: <MdWork size={24} /> },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-CA")
        : "",
      icon: <FaCalendarAlt size={20} />,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100">
      {/* Cover and Avatar Section */}
      <div className="relative mb-24 max-w-5xl mx-auto">
        <div className="h-48 w-full bg-linear-to-r from-violet-600 to-blue-600 rounded-3xl"></div>
        <div className="absolute -bottom-16 left-8">
          <Image
            width={300}
            height={300}
            alt={user?.name}
            src={user?.image}
            className="w-32 h-32 rounded-full text-large border-4 bg-slate-800 bject-cover border-violet-600 dark:border-violet-400"
          />
        </div>
      </div>

      {/* Name and Role */}
      <div className="px-8 max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-black">{user?.name}</h1>
        <span className="inline-block bg-slate-800 text-xs font-bold uppercase px-3 py-1 rounded-full mt-2 tracking-widest">
          {user?.role || "owner"}
        </span>
      </div>

      {/* Grid Details - শুধুমাত্র ইনফরমেশন কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-8">
        {profileData.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 transition-all"
          >
            <div className="text-violet-500">{item.icon}</div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {item.label}
              </p>
              <p className="font-semibold text-slate-100 mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
