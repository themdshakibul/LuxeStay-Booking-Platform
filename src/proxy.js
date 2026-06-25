import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const sesson = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sesson) {
    return NextResponse.redirect(new URL("/author/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/admin",
    "/dashboard/admin/users",
    "/dashboard/admin/properties",
    "/dashboard/admin/bookings",

    "/dashboard/profile",
    "/properties/:path",

    "/dashboard/owner",
    "/dashboard/owner/add-property",
    "/dashboard/owner/properties",
    "/dashboard/owner/bookings",

    "/dashboard/tenant",
    "/dashboard/tenant/bookings",
    "/dashboard/tenant/favorites",
  ],
};
