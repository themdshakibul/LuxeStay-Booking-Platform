"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
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

import {
  MdOutlineAttachMoney,
  MdOutlineApartment,
  MdBookmarkAdded,
  MdOutlineFileDownload,
} from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { myOwnerAnalytics } from "@/lib/api/Add-Properties/data";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";

export default function OwnerAnalytics() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // eslint-disable-next-line react-hooks/immutability
      fetchAnalyticsData(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const fetchAnalyticsData = async (email) => {
    const { data } = await authClient.token();
    const token = data?.token;

    setLoading(true);
    try {
      const data = await myOwnerAnalytics(email, token);
      setTotalEarnings(data.totalEarnings || 0);
      setTotalProperties(data.totalProperties || 0);
      setTotalBookings(data.totalBookings || 0);

      if (data.payments && data.payments.length > 0) {
        calculateMonthlyEarnings(data.payments);
      } else {
        setChartData(generateEmptyMonths());
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
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
        label: `${monthsShort[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`,
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
        label: `${monthsShort[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`,
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

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 45, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("Rento Rental Platform", 15, 20);
      doc.setFontSize(10);
      doc.setTextColor(156, 163, 175);
      doc.text(`Report generated: ${new Date().toLocaleString()}`, 15, 30);
      doc.text(`Owner: ${user?.name} (${user?.email})`, 15, 38);

      // Summary table
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.text("Portfolio Summary", 15, 60);

      autoTable(doc, {
        startY: 65,
        head: [["Metric", "Value"]],
        body: [
          ["Total Properties", totalProperties.toString()],
          ["Total Bookings", totalBookings.toString()],
          ["Total Earnings", `${totalEarnings.toLocaleString()}`],
        ],
        theme: "striped",
        headStyles: { fillColor: [124, 58, 237] },
      });

      // Monthly breakdown
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(
        "Monthly Earnings (Last 12 Months)",
        15,
        doc.lastAutoTable.finalY + 15,
      );

      const rows = chartData.map((c) => [
        c.label,
        `${c.earnings.toLocaleString()}`,
      ]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Month", "Earnings"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [15, 23, 42] },
      });

      doc.save(`Rento_Earnings_${user?.name?.replace(/\s+/g, "_")}.pdf`);
    } catch (e) {
      console.error("PDF error:", e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingPages />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time statistics of payouts, occupancy, and properties
          </p>
        </div>

        <Button
          size="sm"
          onClick={handleDownloadPDF}
          className="bg-violet-600 hover:bg-violet-700 font-bold text-white shadow-lg px-4 h-10 flex items-center gap-2"
        >
          <MdOutlineFileDownload size={18} />
          Download PDF
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-wider block">
                Total Earnings
              </span>
              <span className="text-3xl font-black text-white mt-1 block">
                {totalEarnings.toLocaleString()}
              </span>
            </div>
            <div className="text-violet-400">
              <MdOutlineAttachMoney size={28} />
            </div>
          </div>
        </Card>

        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-wider block">
                Total Properties
              </span>
              <span className="text-3xl font-black text-white mt-1 block">
                {totalProperties}
              </span>
            </div>
            <div className="text-violet-400">
              <MdOutlineApartment size={28} />
            </div>
          </div>
        </Card>

        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-wider block">
                Total Bookings
              </span>
              <span className="text-3xl font-black text-white mt-1 block">
                {totalBookings}
              </span>
            </div>
            <div className="text-violet-400">
              <MdBookmarkAdded size={28} />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
        <CardBody className="p-0">
          <h2 className="font-bold text-base text-white mb-6 tracking-wide">
            Monthly Earnings Chart
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
