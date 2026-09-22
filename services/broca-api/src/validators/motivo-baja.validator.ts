import z from "zod";

export const motivoBajaIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('El ID debe ser válido')
    }),
})

export const createMotivoBajaSchema = z.object({
    body: z.object({
        nombre: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .max(150, 'El nombre no puede superar 150 caracteres'),

        descripcion: z
        .string()
        .trim()
        .max(500, 'La descripción no puede superar 500 caracteres')
        .optional(),
    }),
})

export const updateMotivoBajaSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),

    body: z
        .object({
        nombre: z
        .string()
        .trim()
        .min(1, 'El nombre no puede estar vacío')
        .max(150, 'El nombre no puede superar 150 caracteres')
        .optional(),

        descripcion: z
        .string()
        .trim()
        .max(500, 'La descripción no puede superar 500 caracteres')
        .nullable()
        .optional(),
        })
        .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: 'Debes proporcionar al menos un campo para actualizar',
        },
        ),
})

export const updateEstadoMotivoBajaSchema = z.object({
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

export type CreateMotivoBajaBody = z.infer<typeof createMotivoBajaSchema>['body']
export type UpdateMotivoBajaBody = z.infer<typeof updateMotivoBajaSchema>['body']