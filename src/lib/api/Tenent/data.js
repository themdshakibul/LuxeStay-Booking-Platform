import { serverFetch } from "../server";

export const getTenentOverview = async (email) => {
  const res = await serverFetch(`/api/tenant/stats/${email}`);
  return res;
};

export const getFevoritesCard = async (email) => {
  const result = await serverFetch(`/api/favorites/${email}`);
  return result;
};

export const getBookingProperties = async (email) => {
  const result = await serverFetch(`/api/booking/${email}`);
  return result;
};

export async function getPropertyReviews(propertyId) {
  const res = await serverFetch(`/api/reviews/${propertyId}`);
  return res;
}

export async function getUserReviews(email) {
  const res = await serverFetch(`/api/reviews/user/${email}`);
  return res;
}
