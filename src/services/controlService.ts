import apiClient from "./apiClient";

export const controlService = {
    getControls: async () => {
        return apiClient("/control/")
    },

    createControl: async (controlData: {tipo: string}) => {
        return apiClient(`/control/`, {
            method: "POST",
            body: JSON.stringify(controlData)
        })
    }
}