import { controlService } from "@/services/controlService";

export const controlRepository = {
    async createControl(controlDate: { tipo: string }) {
        const newControl = await controlService.createControl(controlDate);
        return newControl;
    },

    async getControls() {
        const controls = await controlService.getControls();
        return controls;
    }
}