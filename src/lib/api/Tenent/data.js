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
