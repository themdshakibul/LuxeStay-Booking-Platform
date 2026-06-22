"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  MdHome,
  MdOutlineApartment,
  MdDashboard,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import Logo from "./Reusable/Logo";
import { ThemeSwitch } from "./ThemeProvider/ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-2">
        <NextUINavbar
          maxWidth="xl"
          className="bg-transparent h-14 sm:h-16 md:h-20"
          classNames={{
            wrapper: "px-4 justify-between gap-2 w-full",
          }}
        >
          <NavbarContent justify="start" className="max-w-fit">
            <NavbarBrand>
              <Logo />
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavbarContent className="gap-6 lg:gap-8" justify="center">
              <NavbarItem isActive={pathname === "/"}>
                <Link
                  href="/"
                  className={`text-xs uppercase tracking-widest font-bold transition-all duration-200 relative py-1.5 ${
                    pathname === "/"
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Home
                  {pathname === "/" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full" />
                  )}
                </Link>
              </NavbarItem>

              <NavbarItem isActive={pathname === "/properties"}>
                <Link
                  href="/properties"
                  className={`text-xs uppercase tracking-widest font-bold transition-all duration-200 relative py-1.5 ${
                    pathname === "/properties"
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  All Properties
                  {pathname === "/properties" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full" />
                  )}
                </Link>
              </NavbarItem>
            </NavbarContent>
          </div>

          {/* Desktop Right Side */}
          <NavbarContent justify="end" className="gap-2 max-w-fit">
            <div className="hidden lg:flex items-center gap-4">
              <ThemeSwitch
                className="text-slate-600 dark:text-slate-400 rounded-xl w-10 h-10"
                iconSize={20}
                variant="light"
              />

              {user ? (
                <Dropdown
                  placement="bottom-end"
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/40 p-0 overflow-hidden min-w-65"
                >
                  <DropdownTrigger>
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      width={100}
                      height={100}
                      className="rounded-full w-11 h-11 object-cover"
                    />
                  </DropdownTrigger>

                  <DropdownMenu
                    aria-label="Profile Actions"
                    variant="flat"
                    className="p-2 gap-1"
                    disabledKeys={["profile_summary"]}
                  >
                    <DropdownItem
                      key="profile_summary"
                      isReadOnly
                      className="h-auto py-3 px-3 mb-1 rounded-xl bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40 cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={user?.image}
                          alt={user?.name}
                          width={100}
                          height={100}
                          className="rounded-full w-11 h-11 object-cover"
                        />
                        <div className="flex flex-col min-w-0">
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                            {user.name || "User"}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {user.email || ""}
                          </p>
                        </div>
                      </div>
                    </DropdownItem>

                    <DropdownItem
                      key="dashboard"
                      as={Link}
                      href={`/dashboard/${session.user.role}`}
                      startContent={
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/40">
                          <MdDashboard className="text-base text-violet-600 dark:text-violet-400" />
                        </span>
                      }
                      endContent={
                        <span className="text-[10px] uppercase font-bold tracking-wide text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-2 py-0.5 rounded-full">
                          {user?.role}
                        </span>
                      }
                      className="rounded-xl py-2.5 px-3 text-xs font-semibold data-[hover=true]:bg-violet-50 dark:data-[hover=true]:bg-violet-950/30"
                    >
                      Dashboard
                    </DropdownItem>

                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={handleLogout}
                      startContent={
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/30">
                          <MdLogout className="text-base text-rose-500" />
                        </span>
                      }
                      className="rounded-xl py-2.5 px-3 text-xs font-semibold text-rose-500 data-[hover=true]:bg-rose-50 dark:data-[hover=true]:bg-rose-950/20"
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    as={Link}
                    href="/author/login"
                    variant="light"
                    className="text-xs flex items-center uppercase font-bold text-slate-600 h-9 px-3"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    href="/author/register"
                    color="primary"
                    className="bg-linear-to-r flex items-center from-violet-600 to-indigo-600 font-bold text-xs uppercase text-white rounded-xl px-4"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-slate-700 dark:text-slate-200 w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl outline-none z-50 relative"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </NavbarContent>
        </NextUINavbar>

        {/* Mobile Menu */}
        <div
          className={`fixed left-0 right-0 top-14 sm:top-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out z-40 lg:hidden overflow-hidden ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible p-5 pt-4 flex flex-col gap-4"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          {/* User Profile (only if logged in) */}
          {user && (
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-900">
              <div className="flex items-center gap-3 truncate">
                <Image
                  src={user?.image}
                  alt={user?.name}
                  width={100}
                  height={100}
                  className="rounded-full w-11 h-11 object-cover ring-2 ring-violet-500/50 text-xs shrink-0"
                />
                <div className="flex flex-col truncate">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user.email || ""}
                  </p>
                </div>
              </div>
              <ThemeSwitch
                className="bg-white dark:bg-slate-800 shadow-sm rounded-lg w-9 h-9"
                iconSize={18}
                variant="flat"
              />
            </div>
          )}

          {/* Menus */}
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-1">
              Menus
            </p>

            <Link
              className={`w-full text-sm font-bold tracking-wide flex items-center gap-3 px-3 py-2.5 rounded-lg ${pathname === "/" ? "text-violet-600 bg-violet-50 dark:bg-violet-950/30" : "text-slate-600 dark:text-slate-300"}`}
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdHome size={20} /> Home
            </Link>

            <Link
              className={`w-full text-sm font-bold tracking-wide flex items-center gap-3 px-3 py-2.5 rounded-lg ${pathname === "/properties" ? "text-violet-600 bg-violet-50 dark:bg-violet-950/30" : "text-slate-600 dark:text-slate-300"}`}
              href="/properties"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdOutlineApartment size={20} /> All Properties
            </Link>

            {user && (
              <Link
                className={`w-full text-sm font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg ${pathname === "/dashboard" ? "text-violet-600 bg-violet-50 dark:bg-violet-950/30" : "text-slate-600 dark:text-slate-300"}`}
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdDashboard size={20} /> Dashboard ({user?.role})
              </Link>
            )}
          </div>

          {/* Account Section */}
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-1">
              Account
            </p>

            {user ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-sm font-bold text-rose-500 flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left"
              >
                <MdLogout size={20} /> Log Out
              </button>
            ) : (
              <div className="flex flex-col gap-2 px-2">
                <Button
                  as={Link}
                  href="/author/login"
                  variant="light"
                  className="w-full justify-center text-sm font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/author/register"
                  color="primary"
                  className="w-full justify-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
