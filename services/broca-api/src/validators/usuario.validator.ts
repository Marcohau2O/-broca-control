import { z } from "zod";

export const usuarioIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('El ID debe ser válido')
    }),
})

export const createUsuarioSchema = z.object({
    body: z.object({
        nombre: z
            .string()
            .trim()
            .min(1, 'El nombre es obligatorio')
            .max(150, 'El nombre no puede superar 150 caracteres'),

        correo: z
            .string()
            .trim()
            .toLowerCase()
            .email('El correo electrónico no es válido')
            .max(255, 'El correo no puede superar 255 caracteres'),

        password: z
            .string()
            .min(12, 'La contraseña debe tener al menos 12 caracteres')
            .max(128, 'La contraseña no puede superar 128 caracteres'),

        rolId: z.coerce
            .number()
            .int()
            .positive('El rol debe ser válido'),
    }),
})

export const updateUsuarioSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('El ID debe ser válido'),
    }),

    body: z.object({
        nombre: z
            .string()
            .trim()
            .min(1, 'El nombre no puede estar vacío')
            .max(150, 'El nombre no puede superar 150 caracteres')
            .optional(),

        correo: z
            .string()
            .trim()
            .toLowerCase()
            .email('El correo electrónico no es válido')
            .max(255, 'El correo no puede superar 255 caracteres')
            .optional(),

        rolId: z.coerce
            .number()
            .int()
            .positive('El rol debe ser válido')
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: 'Debes proporcionar al menos un campo para actualizar',
        },
    ),
})

export const updateEstadoUsuarioSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('El ID debe ser válido'),
    }),

    body: z.object({
        activo: z.boolean(),
    }),
})

export const updatePasswordUsuarioSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('El ID debe ser válido'),
    }),

    body: z.object({
        password: z
            .string()
            .min(12, 'La contraseña debe tener al menos 12 caracteres')
            .max(128, 'La contraseña no puede superar 128 caracteres'),
    }),
})

export type UpdatePasswordUsuarioBody = z.infer<typeof updatePasswordUsuarioSchema>['body']
export type UpdateUsuarioBody = z.infer<typeof updateUsuarioSchema>['body']
export type CreateUsuarioBody = z.infer<typeof createUsuarioSchema>['body']