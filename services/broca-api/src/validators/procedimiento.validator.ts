import z, { positive } from "zod";

export const procedimientoIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const createProcedimientoSchema = z.object({
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

export const updateProcedimientoSchema = z.object({
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

export const updateEstadoProcedimientoSchema = z.object({
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

export type CreateProcedimientoBody = z.infer<typeof createProcedimientoSchema>['body']
export type UpdateProcedimientoBody = z.infer<typeof updateProcedimientoSchema>['body']