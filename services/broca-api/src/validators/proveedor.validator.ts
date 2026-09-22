import { z } from 'zod';

export const proveedorIdSchema = z.object({
    params: z.object({
    id: z.coerce
      .number()
      .int()
      .positive('El ID debe ser válido'),
  }),
})

export const createProveedorSchema = z.object({
    body: z.object({
    nombre: z
      .string()
      .trim()
      .min(1, 'El nombre es obligatorio')
      .max(150, 'El nombre no puede superar 150 caracteres'),

    contacto: z
      .string()
      .trim()
      .max(150, 'El contacto no puede superar 150 caracteres')
      .optional(),

    telefono: z
      .string()
      .trim()
      .max(30, 'El teléfono no puede superar 30 caracteres')
      .optional(),

    correo: z
      .string()
      .trim()
      .email('El correo electrónico no es válido')
      .transform((value) => value.toLowerCase())
      .optional(),
  }),
})

export const updateProveedorSchema = z.object({
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

      contacto: z
        .string()
        .trim()
        .max(150, 'El contacto no puede superar 150 caracteres')
        .nullable()
        .optional(),

      telefono: z
        .string()
        .trim()
        .max(30, 'El teléfono no puede superar 30 caracteres')
        .nullable()
        .optional(),

      correo: z
        .string()
        .trim()
        .email('El correo electrónico no es válido')
        .transform((value) => value.toLowerCase())
        .nullable()
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0,
    {
        message: 'Debes proporcionar al menos un campo para actualizar'
    }
    )
})

export const updateEstadoProveedorSchema = z.object({
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

export type CreateProveedorBody = z.infer<typeof createProveedorSchema>['body']
export type UpdateProveedorBody = z.infer<typeof updateProveedorSchema>['body']