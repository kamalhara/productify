const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI(endpoint, options = {}) {
  const { headers: optHeaders, ...restOptions } = options;
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...optHeaders,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Something went wrong");
  }

  return res.json();
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

// User
export const syncUser = (data, token) =>
  fetchAPI("/api/user/sync", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

// Products
export const getAllProducts = () => fetchAPI("/api/product");

export const getProductById = (id) => fetchAPI(`/api/product/${id}`);

export const getMyProducts = (token) =>
  fetchAPI("/api/product/my", { headers: authHeaders(token) });

export const createProduct = (data, token) =>
  fetchAPI("/api/product", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

export const updateProduct = (id, data, token) =>
  fetchAPI(`/api/product/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

export const deleteProduct = (id, token) =>
  fetchAPI(`/api/product/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

// Comments
export const createComment = (productId, data, token) =>
  fetchAPI(`/api/comment/${productId}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

export const deleteComment = (commentId, token) =>
  fetchAPI(`/api/comment/${commentId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
