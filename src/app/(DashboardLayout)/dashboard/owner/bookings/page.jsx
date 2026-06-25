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
  Button,
  Chip,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { MdCheck, MdClose, MdOutlineBookmarkAdded } from "react-icons/md";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { getOwnerBookings } from "@/lib/api/Add-Properties/data";
import { updateBookingStatus } from "@/lib/api/Add-Properties/action";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";

const ITEMS_PER_PAGE = 10;

export default function BookingRequests() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.email) {
      fetchBookings(user?.email);
    }
  }, [user?.email]);

  const fetchBookings = async (email) => {
    const { data } = await authClient.token();
    const token = data?.token;

    console.log(token);

    setLoading(true);
    try {
      const data = await getOwnerBookings(email, token);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching owner bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, bookingStatus) => {
    const result = await Swal.fire({
      title: `${bookingStatus} Request?`,
      text: `Are you sure you want to ${bookingStatus.toLowerCase()} this booking?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: bookingStatus === "Approved" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: `Yes, ${bookingStatus.toLowerCase()}`,
    });

    if (result.isConfirmed) {
      try {
        const data = await updateBookingStatus(bookingId, bookingStatus);
        if (data.success) {
          setBookings(
            bookings.map((b) =>
              b._id === bookingId ? { ...b, bookingStatus } : b,
            ),
          );
          Swal.fire({
            icon: "success",
            title: `Request ${bookingStatus}`,
            text: `Booking successfully ${bookingStatus.toLowerCase()}.`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Update status failed:", error);
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: "Error processing request.",
        });
      }
    }
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
          Booking Requests
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Moderate tenant reservation inquiries for your listings
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          {/* <Spinner label="Retrieving inquiries..." /> */}
          <LoadingPages />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
          <MdOutlineBookmarkAdded
            size={48}
            className="text-slate-600 mx-auto mb-3"
          />
          <p className="text-slate-400 font-bold text-sm">
            No booking inquiries have been made yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <Table
              aria-label="Booking Requests Table"
              className="text-slate-200"
              classNames={{
                wrapper: "bg-slate-950 shadow-none p-0",
                th: "bg-slate-900 text-slate-300 text-left font-bold text-sm border-b border-slate-800 py-4",
                td: "border-b border-slate-900 py-4 text-sm font-semibold",
              }}
            >
              <TableHeader>
                <TableColumn>Tenant</TableColumn>
                <TableColumn>Property</TableColumn>
                <TableColumn>Phone</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Payment</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn className="text-center">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-mono text-slate-400 select-all">
                      {booking.email}
                    </TableCell>
                    <TableCell className="font-bold text-white">
                      {booking.propertyTitle || (
                        <span className="text-slate-500 italic">
                          Property Deleted
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-slate-400">
                      {booking.phone || "-"}
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
                    <TableCell className="text-center">
                      {booking.bookingStatus === "Pending" ? (
                        <div className="flex justify-center gap-1.5">
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-emerald-500 rounded-full flex items-center justify-center text-white w-6 h-6 hover:bg-emerald-600"
                            onClick={() =>
                              handleStatusUpdate(booking._id, "Approved")
                            }
                            title="Approve"
                          >
                            <MdCheck size={18} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-rose-500 rounded-full flex items-center justify-center w-6 h-6 text-white hover:bg-rose-600"
                            onClick={() =>
                              handleStatusUpdate(booking._id, "Rejected")
                            }
                            title="Reject"
                          >
                            <MdClose size={18} />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs italic">
                          Moderated
                        </span>
                      )}
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
