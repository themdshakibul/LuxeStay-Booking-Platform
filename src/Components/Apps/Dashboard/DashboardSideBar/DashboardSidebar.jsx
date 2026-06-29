/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import {
  MdDashboard,
  MdOutlineApartment,
  MdAddHome,
  MdOutlineBookmarkAdded,
  MdFavorite,
  MdOutlineAccountCircle,
  MdPeople,
  MdOutlineCheckCircleOutline,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import Logo from "@/Components/Shared/Reusable/Logo";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const role = user?.role;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    redirect("/");
  };

  const menuItems = {
    tenant: [
      { label: "Overview", href: "/dashboard/tenant", icon: FiHome },
      {
        label: "My Bookings",
        href: "/dashboard/tenant/bookings",
        icon: MdOutlineBookmarkAdded,
      },
      {
        label: "My Favorites",
        href: "/dashboard/tenant/favorites",
        icon: MdFavorite,
      },
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
    owner: [
      { label: "Analytics", href: "/dashboard/owner", icon: MdDashboard },
      {
        label: "Add Property",
        href: "/dashboard/owner/add-property",
        icon: MdAddHome,
      },
      {
        label: "My Properties",
        href: "/dashboard/owner/properties",
        icon: MdOutlineApartment,
      },
      {
        label: "Booking",
        href: "/dashboard/owner/bookings",
        icon: MdOutlineCheckCircleOutline,
      },
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
    admin: [
      { label: "Overview", href: "/dashboard/admin", icon: FiHome },
      { label: "Users", href: "/dashboard/admin/users", icon: MdPeople },
      {
        label: "Properties",
        href: "/dashboard/admin/properties",
        icon: MdOutlineApartment,
      },
      {
        label: "Bookings",
        href: "/dashboard/admin/bookings",
        icon: MdOutlineCheckCircleOutline,
      },
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
  };

  const activeLinks = menuItems[role] || [];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b flex items-center justify-between border-slate-900">
        <Logo />

        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-slate-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-600 shrink-0">
            <Image
              src={user?.image}
              alt={user?.name}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate">
              {user?.name}
            </p>
            <span className="text-[10px] font-black uppercase tracking-wider text-violet-400 bg-violet-600/20 px-2 py-0.5 rounded-full">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="grow p-4 space-y-1 overflow-y-auto">
        {activeLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-900 space-y-1">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900"
        >
          <FaHome size={18} /> Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-900/20"
        >
          <FaSignOutAlt size={18} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-950 border-b border-slate-800 flex items-center gap-4 px-4 py-3">
        <button
          onClick={() => setIsOpen(true)}
          className="text-slate-400 hover:text-white"
        >
          <MdMenu size={26} />
        </button>
        <Logo />
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800 flex-col h-screen shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSidebar;
