import { userService } from "@/services/userService";

export const userRepository = {
  async getAllUsers() {
    const users = await userService.getUsers();
    return users;
  },

  async getUserById(id: string) {
    const user = await userService.getUserById(id);
    return user;
  },

  async createUser(userData: { nombre: string; segundoNombre: string; apellido: string; segundoApellido: string; cargo: string; tipo: string; correo: string; contrasena: string; rut: string }) {
    const newUser = await userService.createUser(userData);
    return newUser;
  },

  async updateUser(rut: string, userData: Partial<{ nombre: string; segundoNombre: string; apellido: string; segundoApellido: string; cargo: string; tipo: string; correo: string; contrasena: string; }>) {
    const updatedUser = await userService.updateUser(rut, userData);
    return updatedUser;
  },

  async deleteUser(rut: string) {
    await userService.deleteUser(rut);
  },
};
