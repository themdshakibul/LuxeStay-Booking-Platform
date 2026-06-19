"use client";

import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import {
  MdLocationOn,
  MdKingBed,
  MdBathtub,
  MdFullscreen,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/properties/${property._id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full flex flex-col bg-slate-900 border border-slate-800 text-slate-100 shadow-md">
        {/* Rent Badge */}
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            src={
              property.images[0] ||
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"
            }
            radius="none"
          />
          <div className="absolute top-3 right-3 z-10 bg-violet-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white font-bold text-xs shadow-lg">
            ${property.rent.toLocaleString()} /{" "}
            {property.rentType === "Daily"
              ? "day"
              : property.rentType === "Weekly"
                ? "wk"
                : "mo"}
          </div>
          <div className="absolute top-3 left-3 z-10 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-slate-300 font-medium text-xs">
            {property.propertyType}
          </div>
        </div>

        {/* Card Details */}
        <CardBody className="p-5 grow flex flex-col gap-3">
          <h3 className="font-bold text-lg text-white line-clamp-1 hover:text-violet-400 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <MdLocationOn size={16} className="text-violet-500 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed grow">
            {property.description}
          </p>

          {/* Grid Spec */}
          <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-800 py-3 mt-2 text-xs text-slate-300 text-center font-medium">
            <div className="flex flex-col items-center gap-1">
              <MdKingBed size={16} className="text-slate-500" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdBathtub size={16} className="text-slate-500" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdFullscreen size={16} className="text-slate-500" />
              <span>{property.propertySize} sqft</span>
            </div>
          </div>
        </CardBody>

        <CardFooter className="p-4 border-t border-slate-800 flex justify-between items-center bg-slate-950/40">
          <div className="text-[10px] text-slate-500 tracking-wider">
            OWNED BY:{" "}
            <span className="text-slate-400">
              {property.owner.split("@")[0]}
            </span>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="solid"
            className="bg-violet-600 font-bold hover:bg-violet-700 text-white"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
