"use client";

import { motion } from "framer-motion";
import { Textarea, useDisclosure } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { Card, CardBody, Button, Divider } from "@nextui-org/react";

import {
  MdLocationOn,
  MdKingBed,
  MdBathtub,
  MdFullscreen,
  MdCheckCircle,
  MdApartment,
  MdStar,
} from "react-icons/md";
import BookingModal from "@/Components/Apps/AllPropertiesPage/BookingModal";
import { myAllPropertiesDetails } from "@/lib/api/CardData/data";
import Image from "next/image";
import Review from "@/Components/Apps/AllPropertiesPage/Review";
import { authClient } from "@/lib/auth-client";
import { addFevoritesCard } from "@/lib/api/Tenent/action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";
import NotFoundPage from "@/Components/Shared/Reusable/NotFoundPage";

export default function PropertyDetailsPage({ params }) {
  const { id } = use(params);
  const { data } = authClient.useSession();
  const user = data?.user;

  // if (!user) {
  //   redirect("/author/login");
  // }

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await myAllPropertiesDetails(id);
        setProperty(result);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hadelFevorites = async () => {
    const payload = {
      title: property.title,
      propertyType: property.propertyType,
      location: property.location,
      rent: property.rent,
      bathrooms: property.bathrooms,
      bedrooms: property.bedrooms,
      email: user?.email,
      favoritesId: property._id,
    };

    const resData = await addFevoritesCard(payload);

    if (resData?.success) {
      toast.success("Property added to favorites!");
    } else {
      toast.error("Already in favorites!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingPages />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-screen bg-slate-50 dark:bg-[#020618] text-slate-900 dark:text-slate-100 py-12 px-4 transition-colors duration-300"
    >
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Image
              width={800}
              height={500}
              alt={property?.title}
              src={property?.images}
              className="w-full h-125 object-cover rounded-3xl"
            />
            <div className="mb-10">
              <h1 className="text-5xl font-black">{property.title}</h1>
              <p className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 font-medium text-lg">
                <MdLocationOn /> {property.location}
              </p>
            </div>

            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this Property</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {property?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <MdKingBed />,
                  label: "Beds",
                  value: property?.bedrooms,
                },
                {
                  icon: <MdBathtub />,
                  label: "Baths",
                  value: property?.bathrooms,
                },
                {
                  icon: <MdFullscreen />,
                  label: "SqFt",
                  value: property?.propertySize,
                },
                {
                  icon: <MdApartment />,
                  label: "Type",
                  value: property?.propertyType,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl flex flex-col items-center border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
                    {item.icon}
                  </div>
                  <span className="font-bold text-xl">{item.value}</span>
                  <span className="text-xs text-slate-500 uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Amenities Section */}
              <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {property?.amenities?.map((amenity, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-medium border border-blue-100 dark:border-blue-800"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Features Section */}
              {property?.extraFeatures && (
                <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Extra Features</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg flex items-center gap-2">
                    <span className="text-blue-500 text-2xl">✨</span>
                    {property.extraFeatures}
                  </p>
                </div>
              )}
            </div>

            {/* reviews & reating */}
            <Review propertyId={id} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-28 p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl">
              <CardBody className="gap-6">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Monthly Rent
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 dark:text-blue-400">
                    {property.rent}
                  </h2>
                </div>

                <Button
                  size="lg"
                  color="primary"
                  className="h-14 font-bold text-lg"
                  onPress={onOpen}
                >
                  Book Now
                </Button>

                <BookingModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  user={user}
                  property={property}
                />

                <Button
                  size="lg"
                  color="primary"
                  className="h-14 font-bold text-lg"
                  onClick={hadelFevorites}
                >
                  Add to Favorites
                </Button>

                <Divider className="bg-slate-200 dark:bg-white/10" />

                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  {["Verified Listing", "Premium Location", "24/7 Support"].map(
                    (text) => (
                      <p
                        key={text}
                        className="flex items-center gap-3 font-medium"
                      >
                        <MdCheckCircle className="text-green-500 text-2xl" />{" "}
                        {text}
                      </p>
                    ),
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
