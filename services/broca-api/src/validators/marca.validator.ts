import { z } from 'zod'

export const marcaIdSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .int()
      .positive('El ID debe ser válido'),
  }),
})

export const createMarcaSchema = z.object({
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

export const updateMarcaSchema = z.object({
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
            .max(
            150, 'El nombre no puede superar 150 caracteres')
            .optional(),

        descripcion: z
            .string()
            .trim()
            .max(500, 'La descripción no puede superar 500 caracteres')
            .nullable()
            .optional(),
        })
        .refine((data) => Object.keys(data).length > 0,
        {
            message:'Debes proporcionar al menos un campo para actualizar',
        },
    ),
})

export const updateEstadoMarcaSchema = z.object({
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

export type CreateMarcaBody = z.infer<typeof createMarcaSchema>['body']
export type UpdateMarcaBody = z.infer<typeof updateMarcaSchema>['body']