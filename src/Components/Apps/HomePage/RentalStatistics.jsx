"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import {
  MdOutlineApartment,
  MdPeopleOutline,
  MdPaid,
  MdSupportAgent,
} from "react-icons/md";
import { motion } from "framer-motion";

export default function RentalStatistics() {
  const stats = [
    {
      icon: (
        <MdOutlineApartment
          size={26}
          className="text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
        />
      ),
      number: "1,200+",
      label: "Premium Properties",
      description: "Carefully curated active luxury listings.",
    },
    {
      icon: (
        <MdPeopleOutline
          size={26}
          className="text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
        />
      ),
      number: "15,000+",
      label: "Happy Tenants",
      description: "Verified global community members.",
    },
    {
      icon: (
        <MdPaid
          size={26}
          className="text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
        />
      ),
      number: "$25M+",
      label: "Payouts Processed",
      description: "Secured through trusted Stripe billing.",
    },
    {
      icon: (
        <MdSupportAgent
          size={26}
          className="text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
        />
      ),
      number: "24/7",
      label: "Support SLA",
      description: "Direct real-time host communication.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900/60 relative overflow-hidden">
      {/* Background Subtle Light Flairs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.25em] text-violet-500 font-extrabold"
          >
            LuxeStay In Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-black mt-3 text-white tracking-tight"
          >
            Platform Performance Metrics
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-linear-to-r from-violet-600 to-indigo-600 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card
                isHoverable
                className="group bg-slate-900/40 border border-slate-800/60 hover:border-violet-500/40 backdrop-blur-md text-center transition-all duration-300 rounded-2xl shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)] bg-none"
              >
                <CardBody className="p-8 flex flex-col items-center gap-4">
                  {/* Icon Wrapper */}
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 group-hover:border-violet-500/30 flex items-center justify-center transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <h3 className="text-3xl font-black text-white mt-1 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {stat.number}
                  </h3>

                  {/* Label */}
                  <h4 className="font-bold text-xs uppercase tracking-wider text-violet-400/90">
                    {stat.label}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed font-medium px-2">
                    {stat.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
