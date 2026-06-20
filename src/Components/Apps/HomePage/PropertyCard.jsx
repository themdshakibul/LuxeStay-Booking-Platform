"use client";

import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/properties/${property._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            width={300}
            height={300}
            alt={property.title}
            src={
              property?.images ||
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
            }
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            radius="none"
          />

          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow">
            {property.propertyType}
          </div>
        </div>

        <CardBody className="flex-1 p-6 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
            {property.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
            <MdLocationOn className="text-pink-500 text-xl shrink-0" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="mt-auto">
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-500">
              ৳{property.rent?.toLocaleString()}
              <span className="text-base font-normal text-slate-500 dark:text-slate-400">
                /
                {property.rentType === "Monthly"
                  ? "month"
                  : property.rentType === "Weekly"
                    ? "week"
                    : "day"}
              </span>
            </p>
          </div>
        </CardBody>

        <div className="px-6 pb-6 pt-2">
          <Button
            onClick={handleViewDetails}
            className="w-full flex items-center bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold py-6 text-base rounded-2xl"
            size="lg"
          >
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
