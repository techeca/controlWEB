import { configService } from "@/services/configService";

export const configRepository = {
    async getConfig() {
        const config = await configService.getConfig();
        return config;
    },

    async configDays(daysData: { LUNES: Boolean, MARTES: Boolean, MIERCOLES: Boolean, JUEVES: Boolean, VIERNES: Boolean, SABADO: Boolean, DOMINGO: Boolean }) {
        const config = await configService.configDays(daysData);
        return config;
    }
}