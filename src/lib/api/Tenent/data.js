import { serverFetch } from "../server";

export const getFevoritesCard = async (email) => {
  const result = await serverFetch(`/api/favorites/${email}`);
  return result;
};

export const getBookingProperties = async (email) => {
  const result = await serverFetch(`/api/booking/${email}`);
  return result;
};
