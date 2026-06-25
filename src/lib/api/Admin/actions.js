"use server";

import { auth } from "@/lib/auth";
import { deleteMutaiton, serverMutation } from "../server";
import { headers } from "next/headers";

export async function updateUserRole(id, role) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const res = await serverMutation(
    `/api/admin/users/${id}/role`,
    "PATCH",
    {
      role,
    },
    token,
  );
  return res;
}

export async function updatePropertyStatus(id, status, rejectionFeedback) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const data = await serverMutation(
    `/api/admin/properties/${id}/status`,
    "PATCH",
    { status, rejectionFeedback },
    token,
  );
  return data;
}

export async function deleteProperty(id) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return { success: false, message: "No token found" };
  }

  const data = await deleteMutaiton(`/api/admin/properties/${id}`, token);
  return data;
}
