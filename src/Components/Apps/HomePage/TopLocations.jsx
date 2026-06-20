"use client";

import React from "react";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TopLocations() {
  const locations = [
    {
      city: "Miami",
      state: "Florida",
      properties: 120,
      image:
        "https://images.unsplash.com/photo-1562517634-baa2da3acfbf?q=80&w=1074&auto=format&fit=crop",
    },
    {
      city: "New York",
      state: "New York",
      properties: 85,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop",
    },
    {
      city: "Los Angeles",
      state: "California",
      properties: 94,
      image:
        "https://images.unsplash.com/photo-1429554429301-1c7d5ae2d42e?q=80&w=1170&auto=format&fit=crop",
    },
    {
      city: "Aspen",
      state: "Colorado",
      properties: 42,
      image:
        "https://plus.unsplash.com/premium_photo-1733342541985-35432ba0244c?q=80&w=1224&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 px-2 container mx-auto">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-violet-500 font-extrabold"
        >
          Prime Destinations
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold mt-2 text-white tracking-tight"
        >
          Top Rental Locations
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="h-1 bg-violet-600 mx-auto mt-4 rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {locations.map((loc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href={"/"}>
              <Card className="h-64 relative overflow-hidden group cursor-pointer border border-slate-800">
                <Image
                  fill
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {loc.city}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">{loc.state}</p>
                  <div className="mt-2.5 inline-block bg-violet-600/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                    {loc.properties} Properties
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
