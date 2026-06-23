"use client";

import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdLocationOn,
  MdAttachMoney,
  MdOutlineApartment,
} from "react-icons/md";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Cabin",
    "Penthouse",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (propertyType) params.append("propertyType", propertyType);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Hero Banner Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden px-2">
        {/* Background Image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-950/80 to-slate-950/40 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl text-center flex flex-col items-center gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-violet-600/30 text-violet-300 border border-violet-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              ✨ Discover Your Next Luxury Lease
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Find Properties Worth <br />
            {/* FIXED: bg-linear-to-r -> bg-gradient-to-r */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              Living In.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          >
            LuxeStay connects verified owners with premium tenants. Explore
            curated apartments, villas, and penthouses with secure Stripe
            transaction logging.
          </motion.p>

          {/* Search Bar Form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="w-full bg-[#0c1427]/70 border border-slate-800/40 backdrop-blur-3xl p-5 rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 text-left items-center group"
          >
            {/* Location */}
            <div className="w-full">
              <Input
                type="number"
                size="md"
                variant="flat"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                startContent={
                  <MdAttachMoney className="text-slate-400 text-lg shrink-0" />
                }
                classNames={{
                  inputWrapper:
                    "bg-white hover:bg-slate-50 data-[focus=true]:bg-white rounded-xl h-14 transition-all duration-200 shadow-sm border border-transparent data-[focus=true]:border-slate-300 pl-3 flex items-center",
                  innerWrapper: "flex items-center gap-2 pb-0 mb-0",
                  input:
                    "text-slate-800 text-sm font-normal bg-transparent h-full p-0 m-0 flex items-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                }}
              />
            </div>

            {/* Property Type*/}
            <div className="w-full">
              <Select
                size="md"
                variant="flat"
                placeholder="Property Type"
                selectedKeys={propertyType ? [propertyType] : []}
                onChange={(e) => setPropertyType(e.target.value)}
                startContent={
                  <MdOutlineApartment className="text-slate-400 text-lg mr-1 shrink-0" />
                }
                classNames={{
                  trigger:
                    "bg-white hover:bg-slate-50 data-[focus=true]:bg-white rounded-xl h-14 transition-all duration-200 shadow-sm border border-transparent data-[focus=true]:border-slate-300 relative pr-10",
                  value: "text-slate-800 text-sm font-normal",
                  innerWrapper:
                    "text-slate-400 flex items-center justify-start",
                  selectorButton:
                    "text-slate-400 text-sm absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center",
                  popoverContent:
                    "bg-white border border-slate-200 text-slate-800 rounded-xl shadow-xl p-1",
                }}
              >
                {propertyTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-sm text-slate-700 data-[hover=true]:bg-slate-100 data-[selected=true]:bg-slate-200 data-[selected=true]:text-slate-900 rounded-lg transition-all py-2"
                  >
                    {type}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Min Price */}
            <div className="w-full">
              <Input
                type="number"
                size="md"
                variant="flat"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                startContent={
                  <MdAttachMoney className="text-slate-400 text-lg shrink-0" />
                }
                classNames={{
                  inputWrapper:
                    "bg-white hover:bg-slate-50 data-[focus=true]:bg-white rounded-xl h-14 transition-all duration-200 shadow-sm border border-transparent data-[focus=true]:border-slate-300 pl-3 flex items-center",
                  innerWrapper: "flex items-center gap-2 pb-0 mb-0",
                  input:
                    "text-slate-800 text-sm font-normal bg-transparent h-full p-0 m-0 flex items-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                }}
              />
            </div>

            {/* Max Price  */}
            <div className="w-full">
              <Input
                type="number"
                size="md"
                variant="flat"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                startContent={
                  <MdAttachMoney className="text-slate-400 text-lg shrink-0" />
                }
                classNames={{
                  inputWrapper:
                    "bg-white hover:bg-slate-50 data-[focus=true]:bg-white rounded-xl h-14 transition-all duration-200 shadow-sm border border-transparent data-[focus=true]:border-slate-300 pl-3 flex items-center",
                  innerWrapper: "flex items-center gap-2 pb-0 mb-0",
                  input:
                    "text-slate-800 text-sm font-normal bg-transparent h-full p-0 m-0 flex items-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                }}
              />
            </div>

            {/* Search Button */}
            <div className="w-full group/btn">
              <Button
                type="submit"
                className="flex items-center justify-center w-full bg-[#0c1427] hover:bg-[#15223f] text-white font-medium text-sm transition-all duration-200 rounded-xl h-14 shadow-lg border border-slate-700/40 hover:-translate-y-px active:translate-y-px active:scale-[0.99] relative pl-12 pr-6"
              >
                <MdSearch
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-[-55%]"
                />
                <span>Search</span>
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
