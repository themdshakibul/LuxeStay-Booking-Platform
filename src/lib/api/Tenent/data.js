import { protectedServerFetch, serverFetch } from "../server";

export const getTenentOverview = async (email, token) => {
  console.log("Token value:", token);
  const res = await protectedServerFetch(`/api/tenant/stats/${email}`, token);
  return res;
};

export const getFevoritesCard = async (email, token) => {
  const result = await protectedServerFetch(`/api/favorites/${email}`, token);
  return result;
};

export const getBookingProperties = async (email, token) => {
  const result = await protectedServerFetch(`/api/booking/${email}`, token);
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
