import { serverFetch } from "../server";

export const myAllProperties = async () => {
  const result = await serverFetch(`/api/property`);
  return result;
};

export const myAllPropertiesDetails = async (id) => {
  const result = await serverFetch(`/api/property/${id}`);
  return result;
};

export const myFeaturesProperties = async () => {
  const result = await serverFetch(`/api/features`);
  return result;
};
