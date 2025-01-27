import apiClient from "./apiClient";

export const configService = {
    getConfig: async () => {
        return apiClient("/config/");
    }
}