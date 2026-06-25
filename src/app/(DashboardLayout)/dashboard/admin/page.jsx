/* eslint-disable react-hooks/immutability */
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MdPeople, MdOutlineApartment, MdBookmarkAdded } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { getAdminOverview } from "@/lib/api/Admin/data";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminOverview();
      setTotalUsers(data.totalUsers || 0);
      setTotalOwners(data.totalOwners || 0);
      setTotalProperties(data.totalProperties || 0);
      setTotalBookings(data.totalBookings || 0);

      if (data.payments && data.payments.length > 0) {
        calculateMonthlyEarnings(data.payments);
      } else {
        setChartData(generateEmptyMonths());
      }
    } catch (err) {
      console.error("Error fetching admin stats:", err);
      setError("Could not load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateEmptyMonths = () => {
    const monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: `${monthsShort[d.getMonth()]}`,
        earnings: 0,
      });
    }
    return months;
  };

  const calculateMonthlyEarnings = (payments) => {
    const monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: `${monthsShort[d.getMonth()]}`,
        earnings: 0,
      });
    }
    payments.forEach((payment) => {
      const date = new Date(payment.paidAt || payment.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const match = months.find((m) => m.monthKey === key);
      if (match) {
        match.earnings += payment.amount || 0;
      }
    });
    setChartData(months);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingPages />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3 p-8 border border-red-900/40 bg-red-950/20 rounded-2xl max-w-md">
          <p className="text-2xl">⚠️</p>
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <MdPeople size={28} />,
      color: "text-blue-400",
    },
    {
      label: "Total Owners",
      value: totalOwners,
      icon: <FaUserTie size={24} />,
      color: "text-green-400",
    },
    {
      label: "Total Properties",
      value: totalProperties,
      icon: <MdOutlineApartment size={28} />,
      color: "text-orange-400",
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: <MdBookmarkAdded size={28} />,
      color: "text-violet-400",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Admin Overview
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Platform-wide statistics and monthly earnings summary
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <Card
            key={card.label}
            className="bg-slate-950 border border-slate-800 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-3xl font-black text-white mt-1 block">
                  {card.value}
                </span>
              </div>
              <div className={card.color}>{card.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
        <CardBody className="p-0">
          <h2 className="font-bold text-base text-white mb-6 tracking-wide">
            Monthly Earnings
          </h2>
          <div className="w-full h-80 text-xs">
            {chartData.every((d) => d.earnings === 0) ? (
              <div className="h-full flex justify-center items-center text-slate-500 italic">
                No earnings data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                    itemStyle={{ color: "#7c3aed" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    name="Earnings (৳)"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
