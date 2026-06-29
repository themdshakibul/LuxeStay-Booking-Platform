import { protectedServerFetch, serverFetch } from "../server";

export const myAllProperties = async () => {
  const result = await serverFetch(`/api/property`);
  return result;
};

export const myAllPropertiesDetails = async (id, token) => {
  const result = await protectedServerFetch(`/api/property/${id}`, token);
  return result;
};

export const myFeaturesProperties = async () => {
  const result = await serverFetch(`/api/features`);
  return result;
};
