import { BaseUrl } from "./baseUrl";

export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteMutaiton = async (path) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    method: "DELETE",
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${BaseUrl}${path}`);
  return res.json();
};
