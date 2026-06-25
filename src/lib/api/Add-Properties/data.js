import { protectedServerFetch } from "../server";

export async function getOwnerBookings(email, token) {
  const res = await protectedServerFetch(`/api/owner/bookings/${email}`, token);
  return res;
}

export const myProperties = async (email, token) => {
  const result = await protectedServerFetch(`/api/myproperty/${email}`, token);
  return result;
};

export const myOwnerAnalytics = async (email, token) => {
  const result = await protectedServerFetch(
    `/api/owner/analyse/${email}`,
    token,
  );
  return result;
};
