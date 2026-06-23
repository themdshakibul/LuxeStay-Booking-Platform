import { deleteMutaiton, serverMutation } from "../server";

export async function updateUserRole(id, role) {
  const res = await serverMutation(`/api/admin/users/${id}/role`, "PATCH", {
    role,
  });
  return res;
}

export async function updatePropertyStatus(id, status, rejectionFeedback) {
  const data = await serverMutation(
    `/api/admin/properties/${id}/status`,
    "PATCH",
    { status, rejectionFeedback },
  );
  return data;
}

export async function deleteProperty(id) {
  const data = await deleteMutaiton(`/api/admin/properties/${id}`);
  return data;
}
