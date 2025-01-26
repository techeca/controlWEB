import apiClient from "./apiClient";

export const controlService = {
    createControl: async (controlData: {tipo: string}) => {
        return apiClient(`/control/`, {
            method: "POST",
            body: JSON.stringify(controlData)
        })
    },

    getControls: async ({ page = 1, pageSize = 15 } = {}) => {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            pageSize: pageSize.toString(),
        });
        return apiClient(`/control/?${queryParams}`);
    },

    getAllControls: async ({ page = 1, pageSize = 10 } = {}) => {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            pageSize: pageSize.toString(),
        });
        return apiClient(`/control/all?${queryParams}`);
    }
}