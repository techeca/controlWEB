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

  async createUser(userData: { name: string; email: string }) {
    const newUser = await userService.createUser(userData);
    return newUser;
  },

  async updateUser(id: string, userData: { name: string; email: string }) {
    const updatedUser = await userService.updateUser(id, userData);
    return updatedUser;
  },

  async deleteUser(id: string) {
    await userService.deleteUser(id);
  },
};
