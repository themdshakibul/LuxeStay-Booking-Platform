"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Button,
} from "@nextui-org/react";
import { MdOutlineBookmarkAdded, MdPayment } from "react-icons/md";
import Link from "next/link";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    // setLoading(true);
    // try {
    //   const response = await axiosSecure.get("/bookings/tenant");
    //   if (response.data.success) {
    //     setBookings(response.data.bookings);
    //   }
    // } catch (error) {
    //   console.error("Error fetching tenant bookings list:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const statusColorMap = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Monitor reservation statuses and checkout transaction records
          </p>
        </div>
      </div>

      {/* {loading ? ( */}
      <div className="flex justify-center py-20">
        <Spinner label="Loading reservation requests..." />
      </div>
      {/* ) : bookings.length === 0 ? ( */}
      <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
        <MdOutlineBookmarkAdded
          size={48}
          className="text-slate-600 mx-auto mb-3"
        />
        <p className="text-slate-450 font-bold text-sm">
          You haven&lsquo;t placed any bookings yet.
        </p>
        <Link href="/properties">
          <Button
            size="sm"
            color="primary"
            className="bg-violet-600 font-bold text-xs mt-4"
          >
            Explore Properties
          </Button>
        </Link>
      </div>
      {/* ) : ( */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <Table
          aria-label="Tenant Bookings Table"
          className="text-slate-200"
          classNames={{
            wrapper: "bg-slate-950 shadow-none p-0",
            th: "bg-slate-900 text-slate-300 font-bold text-xs border-b border-slate-800 py-4",
            td: "border-b border-slate-900 py-4 text-xs font-semibold",
          }}
        >
          <TableHeader>
            <TableColumn>PROPERTY NAME</TableColumn>
            <TableColumn>BOOKING DATE</TableColumn>
            <TableColumn>AMOUNT PAID</TableColumn>
            <TableColumn>BOOKING STATUS</TableColumn>
            <TableColumn>PAYMENT STATUS</TableColumn>
            <TableColumn>TRANSACTION ID</TableColumn>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  {booking.property ? (
                    <Link
                      href={`/properties/${booking.property._id}`}
                      className="hover:text-violet-400 font-bold transition-colors"
                    >
                      {booking.property.title}
                    </Link>
                  ) : (
                    <span className="text-slate-500 italic">
                      Property Deleted
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>${booking.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    color={statusColorMap[booking.status] || "default"}
                    size="sm"
                    variant="flat"
                    className="font-bold text-[10px]"
                  >
                    {booking.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  {booking.paymentStatus === "Paid" ? (
                    <Chip
                      color="success"
                      size="sm"
                      variant="dot"
                      className="font-bold text-[10px] text-emerald-400"
                    >
                      Paid
                    </Chip>
                  ) : (
                    <Link href={`/payment/${booking._id}`}>
                      <Button
                        size="sm"
                        color="primary"
                        className="bg-violet-600 font-bold text-[10px] h-7 px-3 flex items-center gap-1 text-white"
                        startContent={<MdPayment size={12} />}
                      >
                        Pay Now
                      </Button>
                    </Link>
                  )}
                </TableCell>
                <TableCell className="font-mono text-slate-500 text-[10px] select-all">
                  {booking.transactionId || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* )} */}
    </div>
  );
};

export default BookingPage;
