"use client";

import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Image,
  Textarea,
  Divider,
} from "@nextui-org/react";
import {
  MdLocationOn,
  MdKingBed,
  MdBathtub,
  MdFullscreen,
  MdCheckCircle,
  MdApartment,
  MdStar,
} from "react-icons/md";
import Swal from "sweetalert2";
import { TextArea } from "@heroui/react";
import BookingModal from "@/Components/Apps/AllPropertiesPage/BookingModal";

const property = {
  title: "Premium Luxury Apartment in Gulshan",
  location: "Road 12, Gulshan-2, Dhaka",
  description:
    "Experience refined living in this premium apartment. Featuring modern architecture, floor-to-ceiling windows, and top-tier security. Perfectly located near the business district, shopping centers, and elite restaurants.",
  rent: "25,000",
  bedrooms: 3,
  bathrooms: 2,
  size: "1500",
  type: "Apartment",
  reviews: [
    {
      name: "John Doe",
      comment: "Excellent location and very clean interior.",
      rating: 5,
    },
    {
      name: "Sarah Khan",
      comment: "The management is very responsive.",
      rating: 5,
    },
  ],
};

export default function PropertyDetailsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(property.reviews);

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) return;

    setReviews([{ name: "You", comment: reviewText, rating: 5 }, ...reviews]);
    setReviewText("");

    const isDarkMode = document.documentElement.classList.contains("dark");
    Swal.fire({
      title: "Success!",
      text: "Review added successfully!",
      icon: "success",
      background: isDarkMode ? "#0f172a" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020618] text-slate-900 dark:text-slate-100 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black">{property.title}</h1>
          <p className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 font-medium text-lg">
            <MdLocationOn /> {property.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3 h-112.5">
              <Image
                width={300}
                height={300}
                alt={property.title}
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="grid grid-rows-2 gap-3">
                <Image
                  width={300}
                  height={300}
                  alt={property.title}
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600"
                  className="w-full h-full object-cover rounded-3xl"
                />
                <Image
                  width={300}
                  height={300}
                  alt={property.title}
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* About & Stats */}
            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this Property</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <MdKingBed />,
                  label: "Beds",
                  value: property.bedrooms,
                },
                {
                  icon: <MdBathtub />,
                  label: "Baths",
                  value: property.bathrooms,
                },
                { icon: <MdFullscreen />, label: "SqFt", value: property.size },
                { icon: <MdApartment />, label: "Type", value: property.type },
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

            {/* Reviews Section */}
            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Reviews & Comments</h3>
              <TextArea
                label="Write your review"
                placeholder="Share your thoughts..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-4 w-full"
              />
              <Button
                color="primary"
                size="lg"
                className="font-bold"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </Button>

              <div className="mt-8 space-y-4">
                {reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 dark:bg-[#020618] p-6 rounded-2xl border border-slate-200 dark:border-white/5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{rev.name}</span>
                      <div className="flex text-yellow-500">
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl">
              <CardBody className="gap-6">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Monthly Rent
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 dark:text-blue-400">
                    ৳{property.rent}
                  </h2>
                </div>

                {/* Update your "Book Now" Button */}
                <Button
                  size="lg"
                  color="primary"
                  className="h-14 font-bold text-lg"
                  onPress={onOpen}
                >
                  Book Now
                </Button>

                {/* Add the Modal component */}
                <BookingModal isOpen={isOpen} onOpenChange={onOpenChange} />

                {/* <Button
                  size="lg"
                  color="primary"
                  className="h-14 font-bold text-lg"
                >
                  Book Now
                </Button> */}
                <Button
                  size="lg"
                  color="primary"
                  className="h-14 font-bold text-lg"
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
    </div>
  );
}
