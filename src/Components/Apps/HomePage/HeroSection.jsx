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
      <div className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden px-6">
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
        <div className="relative z-20 max-w-4xl text-center flex flex-col items-center gap-6 mt-8">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="w-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-8 text-left items-end"
          >
            {/* Location */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 ml-1">
                <MdLocationOn className="text-violet-500 text-sm" /> Location
              </label>
              <Input
                size="md"
                variant="bordered"
                placeholder="Enter city, area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-950/90 border-slate-800/80 hover:border-slate-700/80 focus-within:!border-violet-500/80 rounded-xl h-11 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none ring-0",
                  input:
                    "text-slate-200 placeholder:text-slate-600 text-xs font-medium bg-transparent outline-none border-none focus:ring-0 focus:outline-none",
                  mainWrapper: "outline-none ring-0",
                }}
              />
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 ml-1">
                <MdOutlineApartment className="text-violet-500 text-sm" />{" "}
                Property Type
              </label>
              <Select
                size="md"
                variant="bordered"
                placeholder="Any Type"
                selectedKeys={propertyType ? [propertyType] : []}
                onChange={(e) => setPropertyType(e.target.value)}
                classNames={{
                  trigger:
                    "bg-slate-950/90 border-slate-800/80 hover:border-slate-700/80 data-[focus=true]:!border-violet-500/80 data-[open=true]:border-violet-500/80 rounded-xl h-11 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] data-[focus=true]:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none ring-0 border-none",
                  value: "text-slate-200 text-xs font-medium",
                  innerWrapper: "text-slate-400 outline-none",
                  popoverContent:
                    "bg-slate-950/95 border border-slate-800/80 text-slate-200 rounded-xl backdrop-blur-md shadow-2xl",
                }}
              >
                {propertyTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-xs text-slate-300 data-[hover=true]:bg-slate-900 data-[selectable=true]:focus:bg-violet-600/20 data-[selected=true]:bg-violet-600/30 data-[selected=true]:text-violet-300 rounded-lg transition-all"
                  >
                    {type}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Min Price */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 ml-1">
                <MdAttachMoney className="text-violet-500 text-sm" /> Min Price
              </label>
              <Input
                type="number"
                size="md"
                variant="bordered"
                placeholder="Min USD"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-950/90 border-slate-800/80 hover:border-slate-700/80 focus-within:!border-violet-500/80 rounded-xl h-11 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none ring-0",
                  input:
                    "text-slate-200 placeholder:text-slate-600 text-xs font-medium bg-transparent outline-none border-none focus:ring-0 focus:outline-none",
                }}
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 ml-1">
                <MdAttachMoney className="text-violet-500 text-sm" /> Max Price
              </label>
              <Input
                type="number"
                size="md"
                variant="bordered"
                placeholder="Max USD"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-950/90 border-slate-800/80 hover:border-slate-700/80 focus-within:!border-violet-500/80 rounded-xl h-11 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none ring-0",
                  input:
                    "text-slate-200 placeholder:text-slate-600 text-xs font-medium bg-transparent outline-none border-none focus:ring-0 focus:outline-none",
                }}
              />
            </div>

            {/* Search Button */}
            <div className="w-full">
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-violet-600 to-indigo-600 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-violet-500/10 hover:shadow-violet-500/30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 rounded-xl h-11 active:scale-[0.98]"
                startContent={<MdSearch size={20} />}
              >
                Search
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
