"use server";

import { deleteMutaiton, serverMutation } from "../server";

export const myBookingProperties = async (data) => {
  const resData = await serverMutation("/api/booking", "POST", data);
  return resData;
};

export const addFevoritesCard = async (data) => {
  const resData = await serverMutation("/api/favorites", "POST", data);
  return resData;
};

export const deleteFevoritesCard = async (id) => {
  const resData = await deleteMutaiton(`/api/favorites/${id}`, "DELETE");
  return resData;
};
export async function submitReview(data) {
  const res = await serverMutation(`/api/reviews`, "POST", data);
  return res;
}
