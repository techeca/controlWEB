import apiClient from "./apiClient";

export const configService = {
    getConfig: async () => {
        return apiClient("/config/");
    },

    configDays: async (daysData: { LUNES: Boolean, MARTES: Boolean, MIERCOLES: Boolean, JUEVES: Boolean, VIERNES: Boolean, SABADO: Boolean, DOMINGO: Boolean }) => {
        return apiClient("/config/days", {
            method: "PUT",
            body: JSON.stringify(daysData)
        });
    }
}