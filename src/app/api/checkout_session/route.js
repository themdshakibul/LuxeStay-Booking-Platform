import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const bookingData = await req.json();
    const {
      userName,
      email,
      phone,
      date,
      propertyId,
      propertyTitle,
      propertyPrice,
      ownerEmail,
    } = bookingData;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: propertyTitle || "Property Booking",
              description: `Booking date: ${date}`,
            },

            unit_amount: Math.round((propertyPrice || 0) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,

      metadata: {
        userName,
        email,
        phone,
        date,
        propertyId,
        propertyTitle,
        propertyPrice: String(propertyPrice),
        bookingStatus: "Pending",
        ownerEmail,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
