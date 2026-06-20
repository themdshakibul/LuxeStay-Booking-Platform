"use client";

import React from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import {
  MdDashboard,
  MdOutlineApartment,
  MdAddHome,
  MdOutlineBookmarkAdded,
  MdFavorite,
  MdOutlineAccountCircle,
  MdPeople,
  MdReceiptLong,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import Logo from "@/Components/Shared/Reusable/Logo";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const role = user?.role;

  const handleLogout = async () => {
    await authClient.signOut();
    redirect("/");
  };

  const menuItems = {
    tenant: [
      {
        label: "Overview",
        href: "/dashboard/tenant",
        icon: FiHome,
      },
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
        label: "Profile Settings",
        href: "/dashboard/tenant/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
    owner: [
      {
        label: "Analytics Home",
        href: "/dashboard/owner",
        icon: MdDashboard,
      },
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
        label: "Booking Requests",
        href: "/dashboard/owner/bookings",
        icon: MdOutlineCheckCircleOutline,
      },
      {
        label: "Profile Settings",
        href: "/dashboard/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
    admin: [
      { label: "All Users", href: "/dashboard/admin/users", icon: MdPeople },
      {
        label: "All Properties",
        href: "/dashboard/admin/properties",
        icon: MdOutlineApartment,
      },
      {
        label: "All Bookings",
        href: "/dashboard/admin/bookings",
        icon: MdOutlineCheckCircleOutline,
      },
      {
        label: "Audit Transactions",
        href: "/dashboard/admin/transactions",
        icon: MdReceiptLong,
      },
      {
        label: "Profile Settings",
        href: "/dashboard/profile",
        icon: MdOutlineAccountCircle,
      },
    ],
  };

  const activeLinks = menuItems[role] || [];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen shrink-0">
      {/* Brand/Logo Area */}
      <div className="p-6 border-b flex items-center gap-3 border-slate-900">
        <Logo />
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-600">
            <Image
              src={user?.image}
              alt="Avatar"
              width={100}
              height={100}
              className="object-cover"
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

      {/* Navigation Menu */}
      <nav className="grow p-4 space-y-1 overflow-y-auto">
        {activeLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
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
    </aside>
  );
};

export default DashboardSidebar;
