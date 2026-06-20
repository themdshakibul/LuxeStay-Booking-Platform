"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TextArea } from "@heroui/react";

export default function AddProperty() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [rent, setRent] = useState("");
  const [rentType, setRentType] = useState("Monthly");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [images, setImages] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [extraFeatures, setExtraFeatures] = useState("");

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Cabin",
    "Penthouse",
  ];
  const rentTypes = ["Daily", "Weekly", "Monthly"];
  const defaultAmenities = [
    "Wi-Fi",
    "Air Conditioning",
    "Swimming Pool",
    "Gym",
    "Private Parking",
    "Furnished",
    "24/7 Security",
    "Pet Friendly",
    "Washing Machine",
    "Kitchen",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Add logic here
    console.log({ title, location, amenities });
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/*  */}

      <Card className="bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-xl">
        <CardBody className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Property Title"
                value={title}
                onChange={setTitle}
                placeholder="Luxury Apartment"
              />
              <InputField
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="Khulna, Bangladesh"
              />
              <SelectField
                label="Property Type"
                value={propertyType}
                onChange={setPropertyType}
                options={propertyTypes}
              />
              <SelectField
                label="Rent Type"
                value={rentType}
                onChange={setRentType}
                options={rentTypes}
              />
              <InputField
                label="Monthly Rent"
                type="number"
                value={rent}
                onChange={setRent}
                placeholder="15000"
              />
              <InputField
                label="Property Size (sqft)"
                type="number"
                value={propertySize}
                onChange={setPropertySize}
                placeholder="1200"
              />
              <InputField
                label="Bedrooms"
                type="number"
                value={bedrooms}
                onChange={setBedrooms}
                placeholder="2"
              />
              <InputField
                label="Bathrooms"
                type="number"
                value={bathrooms}
                onChange={setBathrooms}
                placeholder="2"
              />
              <InputField
                label="Extra Features"
                value={extraFeatures}
                onChange={setExtraFeatures}
                placeholder="Balcony, Rooftop, CCTV"
              />
              <InputField
                label="Image URL"
                value={images}
                onChange={setImages}
                clglassName=""
                placeholder="Cloudinary / Imgbb URL"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Description
              </label>

              <TextArea
                minRows={3}
                placeholder="Write property details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                classNames={{
                  input: "bg-slate-900",
                  inputWrapper: "bg-slate-900 border border-slate-700",
                }}
              />
            </div>

            {/* Amenities Section - 2 Lines Professional Look */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {defaultAmenities.map((amenity) => (
                <Checkbox
                  key={amenity}
                  isSelected={amenities.includes(amenity)}
                  onValueChange={(selected) => {
                    selected
                      ? setAmenities([...amenities, amenity])
                      : setAmenities(
                          amenities.filter((item) => item !== amenity),
                        );
                  }}
                  classNames={{
                    base: "flex items-center gap-6",
                    label: "text-sm font-medium text-slate-300",
                  }}
                >
                  {amenity}
                </Checkbox>
              ))}
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-bold h-12 shadow-lg"
              isLoading={submitting}
            >
              Add Property
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

// Helper Components
function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        classNames={{
          input: "bg-slate-900",
          inputWrapper: "bg-slate-900 border border-slate-700",
        }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white w-full outline-none focus:border-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
