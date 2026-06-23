import { serverFetch } from "../server";

export async function getAllUsers() {
  const res = await serverFetch(`/api/admin/users`);
  return res;
}

export async function getAllProperties() {
  const res = await serverFetch(`/api/admin/properties`);
  return res;
}

export async function getAllBookings() {
  const res = await serverFetch(`/api/admin/bookings`);
  return res;
}

export async function getAdminOverview() {
  const res = await serverFetch(`/api/admin/stats`);
  return res;
}
