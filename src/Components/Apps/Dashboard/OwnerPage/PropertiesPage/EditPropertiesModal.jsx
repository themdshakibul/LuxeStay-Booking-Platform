/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import { upDateProperty } from "@/lib/api/Add-Properties/action";
import { TextArea } from "@heroui/react";
import toast from "react-hot-toast";
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

const EditPropertiesModal = ({
  isOpen,
  onOpenChange,
  propertyData,
  onSuccess,
}) => {
  const [updating, setUpdating] = useState(false);
  const formRef = useRef(null);

  const [amenities, setAmenities] = useState([]);
  const [descLength, setDescLength] = useState(0);

  useEffect(() => {
    if (propertyData && isOpen) {
      setAmenities(propertyData.amenities || []);
      setDescLength((propertyData.description || "").length);
    }
  }, [propertyData, isOpen]);

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleUpdateSubmit = async (onClose) => {
    setUpdating(true);

    const formData = Object.fromEntries(
      new FormData(formRef.current).entries(),
    );

    const payload = {
      ...formData,
      amenities,
    };

    const resData = await upDateProperty(payload, propertyData?._id);

    if (resData) {
      toast.success("Property updated successfully!");
    } else {
      toast.error(resData?.message);
    }

    setUpdating(false);
    // if (onSuccess) onSuccess(payload);
    onClose();

    setUpdating(false);
  };

  const inputStyles = {
    input: "bg-slate-900 text-slate-100 placeholder:text-slate-500",
    inputWrapper:
      "bg-slate-900 border border-slate-700 hover:border-slate-600 focus-within:border-violet-500 data-[hover=true]:bg-slate-900",
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      placement="center"
      className="bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="border-b border-slate-800 mt-5">
              Edit Property
            </ModalHeader>
            <ModalBody className="max-h-[70vh] overflow-y-auto p-6 flex flex-col gap-6">
              <form
                ref={formRef}
                key={propertyData?.id || "new"}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Property Title
                    </label>
                    <Input
                      name="title"
                      defaultValue={propertyData?.title}
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Location
                    </label>
                    <Input
                      name="location"
                      defaultValue={propertyData?.location}
                      classNames={inputStyles}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      defaultValue={propertyData?.propertyType}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-300 w-full outline-none"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Rent Type
                    </label>
                    <select
                      name="rentType"
                      defaultValue={propertyData?.rentType}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-300 w-full outline-none"
                    >
                      {rentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Rent
                    </label>
                    <Input
                      type="number"
                      name="rent"
                      defaultValue={propertyData?.rent}
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Size (sqft)
                    </label>
                    <Input
                      type="number"
                      name="propertySize"
                      defaultValue={propertyData?.propertySize}
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Bedrooms
                    </label>
                    <Input
                      type="number"
                      name="bedrooms"
                      defaultValue={propertyData?.bedrooms}
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Bathrooms
                    </label>
                    <Input
                      type="number"
                      name="bathrooms"
                      defaultValue={propertyData?.bathrooms}
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Image URLs
                    </label>
                    <Input
                      name="images"
                      defaultValue={
                        Array.isArray(propertyData?.images)
                          ? propertyData.images.join(", ")
                          : propertyData?.images || ""
                      }
                      classNames={inputStyles}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium ml-1">
                      Extra Features
                    </label>
                    <Input
                      name="extraFeatures"
                      defaultValue={
                        Array.isArray(propertyData?.extraFeatures)
                          ? propertyData.extraFeatures.join(", ")
                          : propertyData?.extraFeatures || ""
                      }
                      classNames={inputStyles}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-xs text-slate-400 font-medium">
                      Description
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {descLength} / 1000
                    </span>
                  </div>
                  <TextArea
                    name="description"
                    defaultValue={propertyData?.description}
                    onChange={(e) => setDescLength(e.target.value.length)}
                    classNames={{
                      ...inputStyles,
                      input: `${inputStyles.input} leading-relaxed`,
                    }}
                    minRows={5}
                    maxLength={1000}
                    placeholder="Describe what makes this property stand out — layout, light, neighborhood, anything a renter would want to know..."
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
                          onClick={() => toggleAmenity(amenity)}
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
              </form>
            </ModalBody>
            <ModalFooter className="border-t border-slate-800">
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={updating}
                onPress={() => handleUpdateSubmit(onClose)}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditPropertiesModal;
