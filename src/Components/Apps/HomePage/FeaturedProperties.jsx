"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const demoProperties = [
    {
      _id: "1",
      title: "Luxury Ocean View Apartment",
      location: "Gulshan-2, Dhaka",
      description:
        "Stunning 3 bedroom apartment with breathtaking city and lake views.",
      rent: 125000,
      rentType: "Monthly",
      propertyType: "Apartment",
      bedrooms: 3,
      bathrooms: 3,
      propertySize: 1850,
      images:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",

      owner: "owner@example.com",
    },
    {
      _id: "2",
      title: "Modern Family House",
      location: "Banani, Dhaka",
      description: "Spacious family home with garden and rooftop terrace.",
      rent: 85000,
      rentType: "Monthly",
      propertyType: "House",
      bedrooms: 4,
      bathrooms: 4,
      propertySize: 3200,
      images:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",

      owner: "houseowner@gmail.com",
    },
    {
      _id: "3",
      title: "Premium Villa with Pool",
      location: "Bashundhara, Dhaka",
      description:
        "Exclusive villa featuring private swimming pool and luxurious interiors.",
      rent: 20000,
      rentType: "Monthly",
      propertyType: "Villa",
      bedrooms: 5,
      bathrooms: 5,
      propertySize: 5200,
      images:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      owner: "villa@luxury.com",
    },
  ];

  // useEffect(() => {
  //   const fetchFeatured = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/properties/featured`,
  //       );
  //       if (response.data.success) {
  //         setProperties(response.data.properties);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching featured listings:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFeatured();
  // }, []);

  return (
    <section className="py-20 container mx-auto px-2">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-violet-500 font-extrabold"
        >
          Curated Listings
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold mt-2 text-white tracking-tight"
        >
          Featured Properties
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="h-1 bg-violet-600 mx-auto mt-4 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-lg mx-auto text-sm mt-4 leading-relaxed"
        >
          Discover some of our highest-rated residences available for rent,
          handpicked and verified by our editorial board.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {demoProperties.map((demoProperty) => (
          <PropertyCard key={demoProperty._id} property={demoProperty} />
        ))}
      </div>
    </section>
  );
}
