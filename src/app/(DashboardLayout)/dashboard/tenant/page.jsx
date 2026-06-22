"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Calendar, Heart, Home, User } from "lucide-react";

const TenantOverviewPage = () => {
  return (
    <div className="container m-auto space-y-6 min-h-screen">
      <div className="bg-slate-900 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-slate-300">
          Manage your bookings, favorite properties, and profile from your
          dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Bookings",
            value: "12",
            icon: <Calendar size={20} />,
          },
          { title: "Favorites", value: "8", icon: <Heart size={20} /> },
          { title: "Active Rentals", value: "2", icon: <Home size={20} /> },
          {
            title: "Profile Status",
            value: "Completed",
            icon: <User size={20} />,
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="shadow-sm border border-slate-800 rounded-2xl"
          >
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className=" font-medium text-2xl">{item.title}</span>
                <span className="text-slate-400">{item.icon}</span>
              </div>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className=" p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            • Booked a 2-bedroom apartment in Dhaka.
          </li>
          <li className="flex items-center gap-2">
            • Added Luxury Family Flat to favorites.
          </li>
          <li className="flex items-center gap-2">
            • Updated profile information.
          </li>
          <li className="flex items-center gap-2">
            • Viewed 5 new rental properties.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TenantOverviewPage;
