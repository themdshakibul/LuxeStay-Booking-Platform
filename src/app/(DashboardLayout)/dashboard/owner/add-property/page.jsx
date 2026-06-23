"use client";

import React, { useState } from "react";
import { Card, CardBody, Input, Button, Checkbox } from "@nextui-org/react";
import { TextArea } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { addProperty } from "@/lib/api/Add-Properties/action";
import { redirect } from "next/navigation";

export default function AddProperty() {
  const { data } = authClient.useSession();
  const user = data?.user;

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

    const payload = {
      title,
      description,
      location,
      propertyType,
      rent,
      rentType,
      bedrooms,
      bathrooms,
      propertySize,
      images,
      amenities,
      extraFeatures,
      status: "Pending",
      ownerEmail: user?.email,
    };

    if (Number(rent) < 55) {
      toast.error("Minimum rent must be 55!");
      return;
    }

    const resData = await addProperty(payload);
    if (resData?.insertedId) {
      toast.success("Property added successfully!");
      redirect("/dashboard/owner/properties");
    } else {
      toast.error("Failed to add property!");
    }

    setSubmitting(true);

    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Add New Property
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Submit property parameters for administrative review
        </p>
      </div>

      <Card className="bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-xl">
        <CardBody className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Property Title"
                value={title}
                onChange={setTitle}
                placeholder="Luxury Apartment"
                required
              />
              <InputField
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="Khulna, Bangladesh"
                required
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
                required
              />
              <InputField
                label="Property Size (sqft)"
                type="number"
                value={propertySize}
                onChange={setPropertySize}
                placeholder="1200"
                required
              />
              <InputField
                label="Bedrooms"
                type="number"
                value={bedrooms}
                onChange={setBedrooms}
                placeholder="2"
                required
              />
              <InputField
                label="Bathrooms"
                type="number"
                value={bathrooms}
                onChange={setBathrooms}
                placeholder="2"
                required
              />
              <InputField
                label="Extra Features"
                value={extraFeatures}
                onChange={setExtraFeatures}
                placeholder="Balcony, Rooftop, CCTV"
              />
              {/* <InputField
                label="Image URL"
                value={images}
                onChange={setImages}
                placeholder="Cloudinary / Imgbb URL"
                required
              /> */}

              <InputField
                label="Image URL"
                value={images}
                onChange={(val) => {
                  // শুধু URL allow করো
                  if (
                    val === "" ||
                    val.startsWith("http://") ||
                    val.startsWith("https://")
                  ) {
                    setImages(val);
                  }
                }}
                onBlur={() => {
                  // Blur এ validate করো
                  if (
                    images &&
                    !images.startsWith("http://") &&
                    !images.startsWith("https://")
                  ) {
                    setImages("");
                    toast.error(
                      "Please enter a valid URL starting with http:// or https://",
                    );
                  }
                }}
                placeholder="https://example.com/image.jpg"
                required
              />
              {images && !images.startsWith("http") && (
                <p className="text-red-500 text-xs mt-1">
                  URL must start with https://
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Description
              </label>
              <TextArea
                isRequired
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

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-300">
                  Amenities
                </label>
                <span className="text-xs text-slate-500">
                  {amenities.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {defaultAmenities.map((amenity) => {
                  const selected = amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        setAmenities(
                          selected
                            ? amenities.filter((a) => a !== amenity)
                            : [...amenities, amenity],
                        )
                      }
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium text-left transition-colors duration-150 ${
                        selected
                          ? "bg-violet-500/15 border-violet-500 text-violet-300"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                          selected
                            ? "bg-violet-500 border-violet-500"
                            : "border-slate-600"
                        }`}
                      >
                        {selected && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-2.5 w-2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {amenity}
                    </button>
                  );
                })}
              </div>
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
function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <Input
        isRequired={required}
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

function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <select
        required={required}
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
