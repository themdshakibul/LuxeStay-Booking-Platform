import { BaseUrl } from "./baseUrl";

const handleStatus = async (res) => {
  if (!res.ok) {
    let message = `Server error (${res.status})`;
    try {
      const body = await res.json();
      message = body?.message || body?.msg || message;
    } catch (_) {}
    throw new Error(message);
  }
  return res.json();
};

export const serverMutation = async (path, method, data, token) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteMutaiton = async (path, token) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    cache: "no-store",
  });

  return res.json();
};

export const protectedServerFetch = async (path, token) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return handleStatus(res);
};
