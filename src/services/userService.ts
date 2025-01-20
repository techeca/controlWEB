import apiClient from "./apiClient";

export const userService = {
  getUsers: async () => {
    return apiClient("/users");
  },

  getUserById: async (id: string) => {
    return apiClient(`/users/${id}`);
  },

  createUser: async (userData: { name: string; email: string }) => {
    return apiClient("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id: string, userData: { name: string; email: string }) => {
    return apiClient(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (id: string) => {
    return apiClient(`/users/${id}`, { method: "DELETE" });
  },
};
