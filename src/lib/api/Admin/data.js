import { protectedServerFetch, serverFetch } from "../server";

export async function getAllUsers(token) {
  const res = await protectedServerFetch(`/api/admin/users`, token);
  return res;
}

export async function getAllProperties(token) {
  const res = await protectedServerFetch(`/api/admin/properties`, token);
  return res;
}

export async function getAllBookings(token) {
  const res = await protectedServerFetch(`/api/admin/bookings`, token);
  return res;
}

export async function getAdminOverview() {
  const res = await serverFetch(`/api/admin/stats`);
  return res;
}
