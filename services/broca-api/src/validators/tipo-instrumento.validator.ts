import { z } from 'zod'

export const tipoInstrumentoIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const createTipoInstrumentoSchema = z.object({
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

export const updateTipoInstrumentoSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),

    body: z.object({
        codigo: z
            .string()
            .trim()
            .min(1, 'El código no puede estar vacío')
            .max(50, 'El código no puede superar 50 caracteres')
            .transform((value) => value.toUpperCase())
            .optional(),

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
            message:'Debes proporcionar al menos un campo para actualizar',
        },
        ),
})

export const updateEstadoTipoInstrumentoSchema =
    z.object({
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

export type CreateTipoInstrumentoBody = z.infer<typeof createTipoInstrumentoSchema>['body']
export type UpdateTipoInstrumentoBody = z.infer<typeof updateTipoInstrumentoSchema>['body']