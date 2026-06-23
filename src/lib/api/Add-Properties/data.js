import { serverFetch } from "../server";

export const myProperties = async (email) => {
  const result = await serverFetch(`/api/myproperty/${email}`);
  return result;
};

export const myOwnerAnalytics = async (email) => {
  const result = await serverFetch(`/api/owner/analyse/${email}`);
  return result;
};
