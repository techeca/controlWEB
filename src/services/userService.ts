import apiClient from "./apiClient";

export const userService = {
  getUsers: async () => {
    return apiClient("/user/all");
  },

  getUserById: async (id: string) => {
    return apiClient(`/users/${id}`);
  },

  createUser: async (userData: { nombre: string; segundoNombre: string; apellido: string; segundoApellido: string; cargo: string; tipo: string; correo: string; contrasena: string; rut: string }) => {
    return apiClient("/user/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (rut: string, userData: Partial<{ nombre: string; segundoNombre: string; apellido: string; segundoApellido: string; cargo: string; tipo: string; correo: string; contrasena: string; }>) => {
    return apiClient(`/user/${rut}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (rut: string) => {
    return apiClient(`/user/${rut}`, { method: "DELETE" });
  },
};
