// "use client";

// import DashboardSidebar from "@/Components/Apps/Dashboard/DashboardSideBar/DashboardSidebar";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex bg-[#080c16]">
//       <DashboardSidebar />
//       <main className="px-6 py-10 w-full mx-auto">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;

"use client";

import DashboardSidebar from "@/Components/Apps/Dashboard/DashboardSideBar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSidebar />
      {/* pt-14 = mobile top bar height, md:pt-0 = desktop এ দরকার নেই */}
      <main className="px-4 md:px-6 py-6 md:py-10 pt-20 md:pt-10 w-full mx-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
