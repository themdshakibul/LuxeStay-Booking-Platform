"use server";

import { deleteMutaiton, serverMutation } from "../server";

export const addProperty = async (data) => {
  const resData = await serverMutation("/api/property", "POST", data);
  return resData;
};

export const upDateProperty = async (data, id) => {
  const resData = await serverMutation(`/api/property/${id}`, "PATCH", data);
  return resData;
};

export const deleteProperty = async (id) => {
  const resData = await deleteMutaiton(`/api/property/${id}`);
  return resData;
};
