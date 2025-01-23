import { z } from "zod"

const tiposPermitidos = ["ADMIN", "USER"] as const;
// Expresión regular para validar mayúsculas, números y signos especiales
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const newUserSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }).max(16, {
        message: "El nombre debe tener como máximo 16 caracteres.",
    }),

    segundoNombre: z.string(),

    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }).max(20, {
        message: "El apellido debe tener máximo 20 caracteres."
    }),

    segundoApellido: z.string(),

    rut: z.string().min(2, {
        message: "RUT debe tener mínimo 2 caracteres.",
    }),

    correo: z.string().email({
        message: "Formato de correo inválido"
    }),

    tipo: z.enum(tiposPermitidos, {
        message: "El tipo debe ser uno de los valores permitidos: ADMIN, USER.",
    }),

    cargo: z.string().min(2, {
        message: "El cargo debe tener al menos 2 caracteres.",
    }),

    contrasena: z.string().min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
    }).regex(passwordRegex, {
        message: "La contraseña debe tener al menos una letra mayúscula, un número y un signo especial.",
    }),

    recontrasena: z.string().min(8, {
        message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),

}).refine((data) => data.contrasena === data.recontrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["recontrasena"], // El error se asignará al campo `repassword`
});

export default newUserSchema;