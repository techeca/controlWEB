import apiClient from "./apiClient";

export const authService = {
    login: async (credentials: { rut: string; password: string }) => {
        return apiClient("/auth/signIn", {
            method: "POST",
            body: JSON.stringify(credentials)
        });
    },

    logout: async () => {
        return apiClient("/auth/logout", { method: "POST" });
    },

    getProfile: async () => {
        return apiClient("/auth/profile");
    },

    refreshToken: async () => {
        return apiClient("/auth/refresh", {
            method: "POST",
        })
    },

    validateToken: async () => {
        return apiClient("/auth/validateToken")
    }
};