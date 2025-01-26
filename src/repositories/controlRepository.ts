import { controlService } from "@/services/controlService";

export const controlRepository = {
    async createControl(controlDate: { tipo: string }) {
        const newControl = await controlService.createControl(controlDate);
        return newControl;
    },

    async getControls({ page = 1, pageSize = 15 } = {}) {
        const controls = await controlService.getControls({ page, pageSize });
        return controls;
    },

    async getAllControls({ page = 1, pageSize = 10 } = {}){
        const allControls = await controlService.getAllControls({ page, pageSize });
        return allControls;
    }
}