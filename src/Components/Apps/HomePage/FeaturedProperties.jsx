"use client";

import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";
import { myFeaturesProperties } from "@/lib/api/CardData/data";

// fetch fetures
const featuresProperties = await myFeaturesProperties();

const FeaturedProperties = () => {
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
          className="text-3xl md:text-4xl font-extrabold mt-2 text-black dark:text-white tracking-tight"
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
        {featuresProperties.map((fetures) => (
          <PropertyCard key={fetures._id} property={fetures} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
