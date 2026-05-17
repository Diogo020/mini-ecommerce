import { api } from "../../services/api";

export async function getProducts() {
  const response = await api.get("/api/products");
  return response.data;
}

export async function createProduct(product) {
  const response = await api.post("/api/products", product);
  return response.data;
}

export async function updateProduct(id, product) {
  const response = await api.put(`/api/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(id) {
  await api.delete(`/api/products/${id}`);
}