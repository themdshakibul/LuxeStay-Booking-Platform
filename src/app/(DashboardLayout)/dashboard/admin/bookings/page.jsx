/* eslint-disable react-hooks/immutability */
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
  Pagination,
} from "@nextui-org/react";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { getAllBookings } from "@/lib/api/Admin/data";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";
import { authClient } from "@/lib/auth-client";

const ITEMS_PER_PAGE = 10;

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data } = await authClient.token();
    const token = data?.token;

    setLoading(true);
    try {
      const data = await getAllBookings(token);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusColorMap = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
  };

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          System Bookings
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Audit active reservations and lease holds across the platform
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingPages />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <MdOutlineBookmarkAdded
            size={48}
            className="text-slate-600 mx-auto mb-3"
          />
          <p className="text-slate-400 font-bold text-sm">
            No reservations logged in database.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <Table
              aria-label="Admin Bookings Table"
              className="text-slate-200"
              classNames={{
                wrapper: "bg-slate-950 shadow-none p-0",
                th: "bg-slate-900 text-slate-300 text-left font-bold text-sm border-b border-slate-800 py-4",
                td: "border-b border-slate-900 py-4 text-sm font-semibold",
              }}
            >
              <TableHeader>
                <TableColumn>User Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Phone Number</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Payment</TableColumn>
                <TableColumn>Booking Status</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-bold text-white">
                      {booking.userName}
                    </TableCell>
                    <TableCell className="font-mono text-slate-400 select-all">
                      {booking.email}
                    </TableCell>
                    <TableCell className="font-mono text-slate-500 text-xs select-all">
                      {booking.phone}
                    </TableCell>
                    <TableCell>
                      {booking.date
                        ? new Date(booking.date).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {Number(booking.propertyPrice || 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          booking.paymentStatus === "Paid"
                            ? "success"
                            : "danger"
                        }
                        size="sm"
                        variant="dot"
                        className={`font-bold text-xs ${
                          booking.paymentStatus === "Paid"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {booking.paymentStatus}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold text-sm flex items-center justify-center uppercase ${
                          booking.bookingStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700 px-2"
                            : booking.bookingStatus === "Approved"
                              ? "bg-green-100 text-green-700 px-2"
                              : "bg-red-100 text-red-700 px-2"
                        }`}
                      >
                        {booking.bookingStatus}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                color="secondary"
                showControls
              />
            </div>
          )}

          <p className="text-center text-slate-500 text-xs">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, bookings.length)} of{" "}
            {bookings.length} bookings
          </p>
        </div>
      )}
    </div>
  );
}
