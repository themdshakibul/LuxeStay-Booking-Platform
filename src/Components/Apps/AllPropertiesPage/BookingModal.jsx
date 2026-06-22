"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function BookingModal({ isOpen, onOpenChange, user, property }) {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !date) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    const bookingData = {
      userName: user?.name,
      email: user?.email,
      phone,
      date,
      propertyId: property?._id,
      propertyTitle: property?.title,
      propertyPrice: property?.rent,
      bookingStatus: "Pending",
      ownerEmail: property?.ownerEmail,
    };

    try {
      const res = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment session error!");
      }
    } catch (err) {
      toast.error("Payment session error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      className="dark:bg-[#0f172a] rounded-2xl p-2"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="pt-10">Booking Request</ModalHeader>
            <ModalBody className="py-4 gap-6">
              {/* User Name */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  User Name
                </span>
                <Input
                  isReadOnly
                  value={user?.name || ""}
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </span>
                <Input
                  isReadOnly
                  type="email"
                  value={user?.email || ""}
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Phone
                </span>
                <Input
                  isRequired
                  type="number"
                  placeholder="0196XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Preferred Booking Date
                </span>
                <Input
                  isRequired
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  variant="bordered"
                  color="primary"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                className="font-bold"
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
