"use server";

import { auth } from "@/lib/auth";
import { deleteMutaiton, serverMutation } from "../server";
import { headers } from "next/headers";

export const myBookingProperties = async (data) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const resData = await serverMutation("/api/booking", "POST", data, token);
  return resData;
};

export const addFevoritesCard = async (data) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const resData = await serverMutation("/api/favorites", "POST", data, token);
  return resData;
};

export const deleteFevoritesCard = async (id, token) => {
  const resData = await deleteMutaiton(`/api/favorites/${id}`, token);
  return resData;
};
export async function submitReview(data) {
  const res = await serverMutation(`/api/reviews`, "POST", data);
  return res;
}
