import { serverFetch } from "../server";

export const Payments = async (email) => {
  const result = await serverFetch(`/api/payment/${email}`);
  return result;
};
