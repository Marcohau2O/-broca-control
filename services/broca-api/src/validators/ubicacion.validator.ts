import { z } from 'zod'


export const ubicacionIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const createUbicacionSchema = z.object({
    body: z.object({
        codigo: z
            .string()
            .trim()
            .min(1, 'El código es obligatorio')
            .max(50, 'El código no puede superar 50 caracteres')
            .transform((value) => value.toUpperCase()),

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

export const updateUbicacionSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z
        .object({
        codigo: z
            .string()
            .trim()
            .min(1)
            .max(50)
            .transform((value) => value.toUpperCase())
            .optional(),

        nombre: z
            .string()
            .trim()
            .min(1)
            .max(150)
            .optional(),

        descripcion: z
            .string()
            .trim()
            .max(500)
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

export const updateEstadoUbicacionSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z.object({
        activo: z.boolean(),
    }),
})

export type CreateUbicacionBody = z.infer<typeof createUbicacionSchema>['body']
export type UpdateUbicacionBody = z.infer<typeof updateUbicacionSchema>['body']
export type UpdateEstadoUbicacionBody = z.infer<typeof updateEstadoUbicacionSchema>['body']