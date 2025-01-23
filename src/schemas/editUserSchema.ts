import { z } from "zod"

const tiposPermitidos = ["ADMIN", "USER"] as const;
// Expresión regular para validar mayúsculas, números y signos especiales
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const editUserSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }).max(16, {
        message: "El nombre debe tener como máximo 16 caracteres.",
    }).optional(),

    segundoNombre: z.string(),

    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }).max(20, {
        message: "El apellido debe tener máximo 20 caracteres."
    }).optional(),

    segundoApellido: z.string(),

    rut: z.string().min(2, {
        message: "RUT debe tener mínimo 2 caracteres.",
    }).optional(),

    correo: z.string().email({
        message: "Formato de correo inválido"
    }).optional(),

    tipo: z.enum(tiposPermitidos, {
        message: "El tipo debe ser uno de los valores permitidos: ADMIN, USER.",
    }).optional(),

    cargo: z.string().min(2, {
        message: "El cargo debe tener al menos 2 caracteres.",
    }).optional(),

    contrasena: z.string()
        .optional()
        .refine((value) => !value || value.length >= 8, {
            message: "La contraseña debe tener al menos 8 caracteres.",
        })
        .refine((value) => !value || passwordRegex.test(value), {
            message: "La contraseña debe tener al menos una letra mayúscula, un número y un signo especial.",
        }),

    recontrasena: z.string()
        .optional()
        .refine((value) => !value || value.length >= 8, {
            message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
        }),

}).refine((data) => {
    // Validar solo si ambas contraseñas están presentes
    if (data.contrasena && data.recontrasena) {
        return data.contrasena === data.recontrasena;
    }
    return true; // Si no están presentes, no validar la coincidencia
}, {
    message: "Las contraseñas no coinciden.",
    path: ["recontrasena"], // El error se asignará al campo `recontrasena`
});

export default editUserSchema;