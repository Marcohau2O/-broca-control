import { z } from 'zod'

export const modeloIdSchema = z.object({
    params: z.object({
    id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const getModelosSchema = z.object({
    query: z.object({
        marcaId: z.coerce
        .number()
        .int()
        .positive('El ID de la marca debe ser válido')
        .optional(),
    }),
})

export const createModeloSchema = z.object({
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

        marcaId: z.coerce
        .number()
        .int()
        .positive('El ID de la marca debe ser válido'),
    }),
})

export const updateModeloSchema = z.object({
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

        marcaId: z.coerce
            .number()
            .int()
            .positive('El ID de la marca debe ser válido')
            .optional(),
        })
        .refine((data) => Object.keys(data).length > 0,
            {
                message:'Debes proporcionar al menos un campo para actualizar',
            },
        ),
})

export const updateEstadoModeloSchema = z.object({
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

export type CreateModeloBody = z.infer<typeof createModeloSchema>['body']
export type UpdateModeloBody = z.infer<typeof updateModeloSchema>['body']