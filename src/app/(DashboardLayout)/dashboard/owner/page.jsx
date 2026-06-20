"use client";

import React, { useEffect, useState, useContext } from "react";

import { Card, CardBody, Button, Spinner } from "@nextui-org/react";
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
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

export default function OwnerAnalytics() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Metrics
  const [totalEarnings, setTotalEarnings] = useState(100);
  const [totalProperties, setTotalProperties] = useState(2220);
  const [totalBookings, setTotalBookings] = useState(444440);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Fetch Owner properties
      const propResponse = await axiosSecure.get("/properties/owner");
      let propsCount = 0;
      if (propResponse.data.success) {
        setProperties(propResponse.data.properties);
        propsCount = propResponse.data.properties.length;
        setTotalProperties(propsCount);
      }

      // Fetch booking requests for owner properties
      const bookingsResponse = await axiosSecure.get("/bookings/owner");
      if (bookingsResponse.data.success) {
        const ownerBookings = bookingsResponse.data.bookings;
        setBookings(ownerBookings);
        setTotalBookings(ownerBookings.length);

        // Calculate earnings (Paid bookings)
        const paidBookings = ownerBookings.filter(
          (b) => b.paymentStatus === "Paid",
        );
        const earningsSum = paidBookings.reduce(
          (sum, curr) => sum + curr.amount,
          0,
        );
        setTotalEarnings(earningsSum);

        // Group by month for last 12 months
        calculateMonthlyEarnings(paidBookings);
      }
    } catch (error) {
      console.error("Error fetching analytics details:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyEarnings = (paidBookings) => {
    // Generate last 12 months template
    const months = [];
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

    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: `${monthsShort[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`,
        earnings: 0,
      });
    }

    // Allocate booking amounts to correct months
    paidBookings.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const match = months.find((m) => m.monthKey === key);
      if (match) {
        match.earnings += booking.amount;
      }
    });

    setChartData(months);
  };

  const handleDownloadPDFReport = () => {
    try {
      const doc = new jsPDF();

      // Heading banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 45, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("Outfit", "bold");
      doc.setFontSize(22);
      doc.text("LuxeStay Rental Platform", 15, 20);

      doc.setFontSize(10);
      doc.setTextColor(156, 163, 175); // gray-400
      doc.text(
        `Earnings report generated on: ${new Date().toLocaleString()}`,
        15,
        30,
      );
      doc.text(`Account Owner: ${user?.name} (${user?.email})`, 15, 36);

      // Section title
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("Portfolio Summary Details", 15, 60);

      // Summary table details
      doc.autoTable({
        startY: 65,
        head: [["Portfolio Metric", "Aggregate Value"]],
        body: [
          ["Total Properties Created", totalProperties.toString()],
          ["Total Booking Inquiries", totalBookings.toString()],
          ["Total Aggregated Earnings", `$${totalEarnings.toLocaleString()}`],
        ],
        theme: "striped",
        headStyles: { fillColor: [124, 58, 237] }, // violet-600
      });

      // Monthly Breakdowns
      doc.text(
        "Monthly Earnings Details (Last 12 Months)",
        15,
        doc.lastAutoTable.finalY + 15,
      );

      const rows = chartData.map((c) => [
        c.label,
        `$${c.earnings.toLocaleString()}`,
      ]);

      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Calendar Period", "Earnings Received"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [15, 23, 42] },
      });

      doc.save(
        `LuxeStay_Earnings_Report_${user?.name.replace(/\s+/g, "_")}.pdf`,
      );

      Swal.fire({
        icon: "success",
        title: "PDF Export Complete",
        text: "Monthly earnings summary report PDF file successfully downloaded!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Error compiling PDF data.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner label="Loading portfolio analytics..." />
      </div>
    );
  }

  return (
    <div className="w-full">
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
          color="primary"
          className="bg-violet-600 hover:bg-violet-700 transition-colors font-bold text-white shadow-lg shadow-violet-500/20 px-4 h-10 flex items-center gap-2"
          onClick={handleDownloadPDFReport}
        >
          <MdOutlineFileDownload size={18} />
          Download PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Earnings Card */}
        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between flex-row">
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                Total Earnings
              </span>
              <span className="text-3xl font-black text-white mt-1 block">
                ${totalEarnings.toLocaleString()}
              </span>
            </div>
            <div className="text-violet-400">
              <MdOutlineAttachMoney size={28} />
            </div>
          </div>
        </Card>

        {/* Properties Card */}
        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between flex-row">
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
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

        {/* Bookings Card */}
        <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between flex-row">
            <div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
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

      {/* Chart Layout */}
      <Card className="bg-slate-950 border border-slate-800 p-6 shadow-xl">
        <CardBody className="p-0">
          <h2 className="font-bold text-base text-white mb-6 tracking-wide">
            Monthly Earnings Chart
          </h2>
          <div className="w-full h-80 text-xs">
            {chartData.length === 0 ? (
              <div className="h-full flex justify-center items-center text-slate-500 italic">
                No historical payouts logged
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
                    name="Earnings ($)"
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
