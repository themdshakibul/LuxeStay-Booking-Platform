"use server";

import { auth } from "@/lib/auth";
import { deleteMutaiton, serverMutation } from "../server";
import { headers } from "next/headers";

export const addProperty = async (data) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const resData = await serverMutation("/api/property", "POST", data, token);
  return resData;
};

export async function updateBookingStatus(id, bookingStatus) {
  const data = await serverMutation(
    `/api/owner/bookings/${id}/status`,
    "PATCH",
    { bookingStatus },
  );
  return data;
}

export const upDateProperty = async (data, id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const resData = await serverMutation(
    `/api/property/${id}`,
    "PATCH",
    data,
    token,
  );
  return resData;
};

export const deleteProperty = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const resData = await deleteMutaiton(`/api/property/${id}`, token);
  return resData;
};
