import { serverFetch } from "../server";

export const myProperties = async (email) => {
  const result = await serverFetch(`/api/property/${email}`);
  return result;
};
