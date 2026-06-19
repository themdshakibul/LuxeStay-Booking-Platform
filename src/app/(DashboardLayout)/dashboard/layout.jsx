"use client";

import DashboardSidebar from "@/Components/Apps/Dashboard/DashboardSideBar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSidebar />

      <main className="px-6 py-10 w-full mx-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
