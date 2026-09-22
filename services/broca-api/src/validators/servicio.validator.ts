import { z } from 'zod'

export const servicioIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const createServicioSchema = z.object({
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

export const updateServicioSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z
    .object({
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

export const updateEstadoServicioSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z.object({
        activo: z.boolean(),
    }),
})

export type CreateServicioBody = z.infer<typeof createServicioSchema>['body']
export type UpdateServicioBody = z.infer<typeof updateServicioSchema>['body']