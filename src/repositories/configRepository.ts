import { configService } from "@/services/configService";

export const configRepository = {
    async getConfig() {
        const config = await configService.getConfig();
        return config;
    }
}