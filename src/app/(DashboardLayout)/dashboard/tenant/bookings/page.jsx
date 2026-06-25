// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Chip,
//   Spinner,
//   Button,
// } from "@nextui-org/react";
// import { MdOutlineBookmarkAdded, MdPayment } from "react-icons/md";
// import Link from "next/link";
// import { getBookingProperties } from "@/lib/api/Tenent/data";
// import { useSession } from "@/lib/auth-client";

// const BookingPage = () => {
//   const { data: session } = useSession();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchBookings();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session]);

//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const response = await getBookingProperties(session?.user?.email);
//       if (response) {
//         setBookings(response);
//       }
//     } catch (error) {
//       console.error("Error fetching tenant bookings list:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-black text-white tracking-tight">
//             My Bookings
//           </h1>
//           <p className="text-slate-400 text-xs mt-1">
//             Monitor reservation statuses and checkout transaction records
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <Spinner label="Loading reservation requests..." />
//         </div>
//       ) : bookings.length === 0 ? (
//         <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
//           <MdOutlineBookmarkAdded
//             size={48}
//             className="text-slate-600 mx-auto mb-3"
//           />
//           <p className="text-slate-450 font-bold text-sm">
//             You haven&lsquo;t placed any bookings yet.
//           </p>
//           <Link href="/properties">
//             <Button
//               size="sm"
//               color="primary"
//               className="bg-violet-600 font-bold text-xs mt-4"
//             >
//               Explore Properties
//             </Button>
//           </Link>
//         </div>
//       ) : (
//         <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
//           <Table
//             aria-label="Tenant Bookings Table"
//             className="text-slate-200"
//             classNames={{
//               wrapper: "bg-slate-950 shadow-none p-0",
//               th: "bg-slate-900 text-slate-300 font-bold text-sm border-b border-slate-800 py-4 text-left",
//               td: "border-b border-slate-900 py-4 text-sm font-semibold",
//             }}
//           >
//             <TableHeader>
//               <TableColumn>User Name</TableColumn>
//               <TableColumn>Email</TableColumn>
//               <TableColumn>Amount</TableColumn>
//               <TableColumn>Payment Status</TableColumn>3
//               <TableColumn>Booking Status</TableColumn>
//             </TableHeader>

//             <TableBody>
//               {bookings.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell className="text-sm">{booking.userName}</TableCell>
//                   <TableCell className="text-sm">{booking.email}</TableCell>
//                   <TableCell className="text-sm">
//                     {booking.propertyPrice?.toLocaleString()}
//                   </TableCell>

//                   <TableCell>
//                     {booking.paymentStatus === "Paid" ? (
//                       <Chip
//                         color="success"
//                         variant="dot"
//                         className="text-emerald-400 uppercase text-sm"
//                       >
//                         Paid
//                       </Chip>
//                     ) : (
//                       <Link href={`/payment/${booking._id}`}>
//                         <Button
//                           size="sm"
//                           color="primary"
//                           className="bg-violet-600 text-white h-7"
//                         >
//                           Pay Now
//                         </Button>
//                       </Link>
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     <Chip
//                       size="sm"
//                       variant="flat"
//                       className={`font-bold text-sm uppercase ${
//                         booking.bookingStatus === "Pending"
//                           ? "bg-yellow-100 text-yellow-700 px-2"
//                           : booking.bookingStatus === "Approved"
//                             ? "bg-green-100 text-green-700 px-2"
//                             : "bg-red-100 text-red-700 px-2"
//                       }`}
//                     >
//                       {booking.bookingStatus}
//                     </Chip>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;

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
  Pagination,
} from "@nextui-org/react";
import { MdOutlineBookmarkAdded, MdPayment } from "react-icons/md";
import Link from "next/link";
import { getBookingProperties } from "@/lib/api/Tenent/data";
import { useSession } from "@/lib/auth-client";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";

const ITEMS_PER_PAGE = 10;

const BookingPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookingProperties(session?.user?.email);
      if (response) {
        setBookings(response);
      }
    } catch (error) {
      console.error("Error fetching tenant bookings list:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = bookings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

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

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingPages />
        </div>
      ) : bookings.length === 0 ? (
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
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <Table
              aria-label="Tenant Bookings Table"
              className="text-slate-200"
              classNames={{
                wrapper: "bg-slate-950 shadow-none p-0",
                th: "bg-slate-900 text-slate-300 font-bold text-sm border-b border-slate-800 py-4 text-left",
                td: "border-b border-slate-900 py-4 text-sm font-semibold",
              }}
            >
              <TableHeader>
                <TableColumn>User Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Payment Status</TableColumn>
                <TableColumn>Booking Status</TableColumn>
              </TableHeader>

              <TableBody>
                {paginatedBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="text-sm">
                      {booking.userName}
                    </TableCell>
                    <TableCell className="text-sm">{booking.email}</TableCell>
                    <TableCell className="text-sm">
                      {booking.propertyPrice?.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      {booking.paymentStatus === "Paid" ? (
                        <Chip
                          color="success"
                          variant="dot"
                          className="text-emerald-400 uppercase text-sm"
                        >
                          Paid
                        </Chip>
                      ) : (
                        <Link href={`/api/checkout_session/${booking._id}`}>
                          <Button
                            size="sm"
                            color="primary"
                            className="bg-violet-600 text-white h-7"
                          >
                            Pay Now
                          </Button>
                        </Link>
                      )}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold text-sm uppercase ${
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
};

export default BookingPage;
