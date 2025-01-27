import { authService } from "../services/authService";

export const authRepository = {
    async login(rut: string, password: string) {
      const response = await authService.login({ rut, password });
      localStorage.setItem('token', response.token)
      return response;
    },
  
    async logout() {
      await authService.logout();
    },
  
    async getProfile() {
      const profile = await authService.getProfile();
      return profile;
    },

    async refreshToken() {
      const response = await authService.refreshToken();
      localStorage.setItem('token', response.token)
      return response;
    },

    async validateToken() {
      const response = await authService.validateToken();
      return response;
    }
  };