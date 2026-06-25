import { protectedServerFetch, serverFetch } from "../server";

export async function getOwnerBookings(email) {
  const res = await protectedServerFetch(`/api/owner/bookings/${email}`);
  return res;
}

export const myProperties = async (email, token) => {
  const result = await protectedServerFetch(`/api/myproperty/${email}`, token);
  return result;
};

export const myOwnerAnalytics = async (email, token) => {
  const result = await serverFetch(`/api/owner/analyse/${email}`, token);
  return result;
};
