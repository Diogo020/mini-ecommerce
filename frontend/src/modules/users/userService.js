import { api } from "../../services/api";

export async function getUsers() {
  const response = await api.get("/api/users");
  return response.data;
}

export async function createUser(user) {
  const response = await api.post("/api/users", user);
  return response.data;
}

export async function updateUser(id, user) {
  const response = await api.put(`/api/users/${id}`, user);
  return response.data;
}

export async function deleteUser(id) {
  await api.delete(`/api/users/${id}`);
}