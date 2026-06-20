"use client";

import React from "react";
import { Card, CardBody, Avatar } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Reviews() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Premium Tenant",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "Renting the beachfront villa through LuxeStay was incredibly seamless! The Stripe checkout processed the holding deposit in seconds, and the owner approved my application within an hour.",
    },
    {
      name: "Sarah Jenkins",
      role: "Corporate Renter",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "The admin team's moderation system gives me so much peace of mind. All locations are fully checked, and the interface is incredibly smooth. Highly recommend the dashboard for managing active rent terms.",
    },
    {
      name: "Darnell Carter",
      role: "Verified Renter",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "I love the My Favorites system! I was browsing apartments on my mobile device, saved 5 items, and booked the winner later in the evening from my laptop. Layout alignment is perfect and responsive.",
    },
    {
      name: "Elena Rostova",
      role: "Annual Tenant",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "Excellent experience. The details page includes accurate metrics on sizes, bedrooms, and bathrooms. Writing reviews directly inside the platform after confirmation ensures authenticity.",
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
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold mt-2 text-white tracking-tight"
        >
          Customer Reviews
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="h-1 bg-violet-600 mx-auto mt-4 rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-slate-900 border border-slate-800 shadow-md">
              <CardBody className="p-8 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" size={16} />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  {rev.comment}
                </p>

                {/* Profile detail */}
                <div className="flex items-center gap-4 mt-2">
                  <Image
                    src={rev.photo}
                    alt={rev.name}
                    width={100}
                    height={100}
                    className="rounded-full w-11 h-11 object-cover ring-2 ring-violet-500/50"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                    <span className="text-slate-500 text-xs">{rev.role}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
