import { z } from "zod";
import { EstadoOperativo } from "@prisma/client";

export const instrumentoIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    })
})

export const instrumentoQrSchema = z.object({
    params: z.object({
        qrToken: z
        .string()
        .trim()
        .uuid('El código QR no es válido'),
    }),
})

export const getInstrumentosSchema = z.object({
    query: z.object({
    search: z
      .string()
      .trim()
      .max(150, 'La búsqueda no puede superar 150 caracteres')
      .optional(),

    tipoInstrumentoId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    marcaId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    modeloId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    proveedorId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    ubicacionId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    responsableId: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    estadoOperativo: z.nativeEnum(EstadoOperativo).optional(),

    activo: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
  }),
})

export const createInstrumentoSchema = z.object({
    body: z.object({
        descripcion: z
        .string()
        .trim()
        .max(500, 'La descripción no puede superar 500 caracteres')
        .optional(),

        lote: z
        .string()
        .trim()
        .max(100, 'El lote no puede superar 100 caracteres')
        .optional(),

        serie: z
        .string()
        .trim()
        .max(100, 'La serie no puede superar 100 caracteres')
        .optional(),

        facturaRemision: z
        .string()
        .trim()
        .max(150, 'La factura o remisión no puede superar 150 caracteres')
        .optional(),

        tipoInstrumentoId: z.coerce
        .number()
        .int()
        .positive('El tipo de instrumento debe ser válido'),

        marcaId: z.coerce
        .number()
        .int()
        .positive('La marca debe ser válida')
        .optional(),

        modeloId: z.coerce
        .number()
        .int()
        .positive('El modelo debe ser válido')
        .optional(),

        proveedorId: z.coerce
        .number()
        .int()
        .positive('El proveedor debe ser válido')
        .optional(),

        ubicacionId: z.coerce
        .number()
        .int()
        .positive('La ubicación debe ser válida')
        .optional(),

        responsableId: z.coerce
        .number()
        .int()
        .positive('El responsable debe ser válido')
        .optional(),
    }),
})

export const updateInstrumentoSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),

    body: z.object({
        descripcion: z
        .string()
        .trim()
        .max(500, 'La descripción no puede superar 500 caracteres')
        .nullable()
        .optional(),

        lote: z
        .string()
        .trim()
        .max(100, 'El lote no puede superar 100 caracteres')
        .nullable()
        .optional(),

        serie: z
        .string()
        .trim()
        .max(100, 'La serie no puede superar 100 caracteres')
        .nullable()
        .optional(),

        facturaRemision: z
        .string()
        .trim()
        .max(150, 'La factura o remisión no puede superar 150 caracteres')
        .nullable()
        .optional(),

        marcaId: z.coerce
        .number()
        .int()
        .positive('La marca debe ser válida')
        .nullable()
        .optional(),

        modeloId: z.coerce
        .number()
        .int()
        .positive('El modelo debe ser válido')
        .nullable()
        .optional(),

        proveedorId: z.coerce
        .number()
        .int()
        .positive('El proveedor debe ser válido')
        .nullable()
        .optional(),

        responsableId: z.coerce
        .number()
        .int()
        .positive('El responsable debe ser válido')
        .nullable()
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0,
    {
        message: 'Debes proporcionar al menos un campo para actualizar',
    },
    ),
})

export const updateUbicacionInstrumentoSchema =
  z.object({
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),

    body: z.object({
      ubicacionId: z.coerce
        .number()
        .int()
        .positive('La ubicación debe ser válida'),

      observaciones: z
        .string()
        .trim()
        .max(
          500,
          'Las observaciones no pueden superar 500 caracteres',
        )
        .optional(),
    }),
  })

export const updateEstadoOperativoInstrumentoSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),

    body: z.object({
      estadoOperativo: z.nativeEnum(EstadoOperativo),
      
      observaciones: z
      .string()
      .trim()
      .max(500, 'Las observaciones no pueden superar 500 caracteres')
      .optional(),
    }),
})

export const registrarUsoInstrumentoSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido')
    }),

     body: z.object({
        procedimientoId: z.coerce
        .number()
        .int()
        .positive('El procedimiento debe ser válido')
        .optional(),

        servicioId: z.coerce
        .number()
        .int()
        .positive('El servicio debe ser válido')
        .optional(),

        ubicacionId: z.coerce
        .number()
        .int()
        .positive('La ubicación debe ser válida')
        .optional(),

        responsableUso: z
        .string()
        .trim()
        .max(150, 'El responsable no puede superar 150 caracteres')
        .optional(),

        observaciones: z
        .string()
        .trim()
        .max(
            1000, 'Las observaciones no pueden superar 1000 caracteres')
        .optional(),
    }),
})

export const bajaInstrumentoSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido')
    }),

    body: z.object({
        motivoBajaId: z.coerce
        .number()
        .int()
        .positive('El motivo de baja debe ser válido'),

        observaciones: z
        .string()
        .trim()
        .max(1000, 'Las observaciones no pueden superar 1000 caracteres')
        .optional(),
    }),
})

export const idempotencyKeySchema = z.string().uuid('Idempotency-Key debe ser un UUID válido')

export type CreateInstrumentoBody = z.infer<typeof createInstrumentoSchema>['body']
export type UpdateInstrumentoBody = z.infer<typeof updateInstrumentoSchema>['body']
export type UpdateUbicacionInstrumentoBody = z.infer<typeof updateUbicacionInstrumentoSchema>['body']
export type UpdateEstadoOperativoInstrumentoBody = z.infer<typeof updateEstadoOperativoInstrumentoSchema>['body']
export type RegistrarUsoInstrumentoBody = z.infer<typeof registrarUsoInstrumentoSchema>['body']
export type BajaInstrumentoBody = z.infer<typeof bajaInstrumentoSchema>['body']