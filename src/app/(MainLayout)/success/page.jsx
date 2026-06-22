import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { myBookingProperties } from "@/lib/api/Tenent/action";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Invalid session</h1>
      </div>
    );
  }

  let bookingSaved = false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // metadata
      const {
        userName,
        email,
        phone,
        date,
        propertyId,
        propertyTitle,
        propertyPrice,
        ownerEmail,
      } = session.metadata;

      const payload = {
        userName,
        email,
        phone,
        date,
        propertyId,
        propertyTitle,
        ownerEmail,
        propertyPrice: Number(propertyPrice),
        paymentStatus: "Paid",
        bookingStatus: "Pending",
        stripeSessionId: sessionId,

        paidAt: new Date().toISOString(),
      };

      const resData = await myBookingProperties(payload);

      if (resData) {
        toast.success("Booking saved successfully!");
      }
      bookingSaved = true;
    }
  } catch (err) {
    toast.error("Payment verification failed");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      {bookingSaved ? (
        <>
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-green-500">
            Booking Confirmed!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-center">
            Payment successful. Your booking has been saved.
          </p>

          <Button className="bg-brand rounded-lg">
            <Link
              href="/dashboard/tenant/bookings"
              className="text-white px-6 py-2 font-semibold"
            >
              Go To Dashboard
            </Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-500">
            Payment verification failed
          </h1>
          <p className="text-slate-600">Please contact support.</p>
        </>
      )}
    </div>
  );
}
