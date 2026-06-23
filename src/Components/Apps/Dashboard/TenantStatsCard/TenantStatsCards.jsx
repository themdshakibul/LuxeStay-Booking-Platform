"use client";

import { Card, CardBody } from "@nextui-org/react";
import { Calendar, Heart, Home, User } from "lucide-react";

export default function TenantStatsCards({ bookingsData }) {
  const stats = [
    {
      title: "Total Bookings",
      value: bookingsData?.bookings ?? 0,
      icon: <Calendar size={20} />,
    },
    {
      title: "Favorites",
      value: bookingsData?.favorites ?? 0,
      icon: <Heart size={20} />,
    },
    {
      title: "Active Rentals",
      value: bookingsData?.activeRentals ?? 0,
      icon: <Home size={20} />,
    },
    {
      title: "Profile Status",
      value: "Completed",
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <Card
          key={index}
          className="shadow-sm border border-slate-800 rounded-2xl"
        >
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="font-medium text-2xl">{item.title}</span>
              <span className="text-slate-400">{item.icon}</span>
            </div>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
