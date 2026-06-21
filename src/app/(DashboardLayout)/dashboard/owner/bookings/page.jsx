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
} from "@nextui-org/react";
import { MdCheck, MdClose, MdOutlineBookmarkAdded } from "react-icons/md";
import Swal from "sweetalert2";

export default function BookingRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // setLoading(true);
    // try {
    //   const response = await axiosSecure.get("/bookings/owner");
    //   if (response.data.success) {
    //     setBookings(response.data.bookings);
    //   }
    // } catch (error) {
    //   console.error("Error fetching owner bookings list:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  // const handleStatusUpdate = async (bookingId, status) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: `${status} Request?`,
  //       text: `Are you sure you want to update this booking status to '${status}'?`,
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonColor: status === "Approved" ? "#10b981" : "#ef4444",
  //       cancelButtonColor: "#0f172a",
  //       confirmButtonText: `Yes, ${status.toLowerCase()}`,
  //     });

  //     if (result.isConfirmed) {
  //       const response = await axiosSecure.patch(
  //         `/bookings/${bookingId}/status`,
  //         { status },
  //       );
  //       if (response.data.success) {
  //         setBookings(
  //           bookings.map((b) => (b._id === bookingId ? { ...b, status } : b)),
  //         );
  //         Swal.fire({
  //           icon: "success",
  //           title: `Request ${status}`,
  //           text: `Booking request successfully updated to ${status}.`,
  //           toast: true,
  //           position: "top-end",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Update status failed:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Action Failed",
  //       text: error.response?.data?.message || "Error processing request.",
  //     });
  //   }
  // };

  const statusColorMap = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
  };

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

      {/* {loading ? ( */}
      <div className="flex justify-center py-20">
        <Spinner label="Retrieving inquiries..." />
      </div>
      {/* ) : bookings.length === 0 ? ( */}
      <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
        <MdOutlineBookmarkAdded
          size={48}
          className="text-slate-655 mx-auto mb-3"
        />
        <p className="text-slate-400 font-bold text-sm">
          No booking inquiries have been made yet.
        </p>
      </div>
      {/* ) : ( */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <Table
          aria-label="Booking Requests Table"
          className="text-slate-200"
          classNames={{
            wrapper: "bg-slate-950 shadow-none p-0",
            th: "bg-slate-900 text-slate-300 font-bold text-xs border-b border-slate-800 py-4",
            td: "border-b border-slate-900 py-4 text-xs font-semibold",
          }}
        >
          <TableHeader>
            <TableColumn>TENANT EMAIL</TableColumn>
            <TableColumn>PROPERTY TITLE</TableColumn>
            <TableColumn>CONTACT PHONE</TableColumn>
            <TableColumn>MOVE-IN DATE</TableColumn>
            <TableColumn>RENT AMOUNT</TableColumn>
            <TableColumn>PAYMENT STATUS</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn className="text-center">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell className="font-mono text-slate-400 select-all">
                  {booking.tenantEmail}
                </TableCell>
                <TableCell>
                  {booking.property ? (
                    <span className="font-bold text-slate-200">
                      {booking.property.title}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">
                      Property Deleted
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-mono text-slate-400 select-all">
                  {booking.contactNumber}
                </TableCell>
                <TableCell>
                  {new Date(booking.moveInDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${booking.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    color={
                      booking.paymentStatus === "Paid" ? "success" : "danger"
                    }
                    size="sm"
                    variant="dot"
                    className={`font-bold text-[10px] ${booking.paymentStatus === "Paid" ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {booking.paymentStatus}
                  </Chip>
                </TableCell>
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
                <TableCell className="text-center">
                  {booking.status === "Pending" ? (
                    <div className="flex justify-center gap-1.5">
                      <Button
                        isIconOnly
                        size="sm"
                        color="success"
                        className="bg-emerald-500 text-white hover:bg-emerald-600"
                        onClick={() =>
                          handleStatusUpdate(booking._id, "Approved")
                        }
                        title="Approve Request"
                      >
                        <MdCheck size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        className="bg-rose-500 text-white hover:bg-rose-600"
                        onClick={() =>
                          handleStatusUpdate(booking._id, "Rejected")
                        }
                        title="Reject Request"
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
      {/* )} */}
    </div>
  );
}
