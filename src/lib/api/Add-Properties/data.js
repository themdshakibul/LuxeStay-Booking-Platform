import { serverFetch } from "../server";

export const myProperties = async (email) => {
  const result = await serverFetch(`/api/myproperty/${email}`);
  return result;
};
