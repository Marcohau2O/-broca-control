import { z } from 'zod'

import { EstadoOperativo, TipoMovimiento } from '@prisma/client'

const fechaRegex = /^\d{4}-\d{2}-\d{2}$/

const idQuerySchema = z.string().regex(/^\d+$/, 'Debe ser un ID numérico').refine((value) => Number(value) > 0, 'El ID debe ser mayor que 0')

export const reporteUsosQuerySchema = z.object({
    query: z
        .object({
            periodo: z
                .enum(['7', '30'])
                .optional(),

            desde: z
                .string()
                .regex(fechaRegex, 'desde debe tener formato YYYY-MM-DD')
                .optional(),

            hasta: z
                .string()
                .regex(fechaRegex, 'hasta debe tener formato YYYY-MM-DD')
                .optional(),
            
            instrumentoId: idQuerySchema.optional(),

            servicioId: idQuerySchema.optional(),

            procedimientoId: idQuerySchema.optional(),

            usuarioId: idQuerySchema.optional(),
        })
        .superRefine((data, ctx) => {
        const tieneDesde = data.desde !== undefined
        const tieneHasta = data.hasta !== undefined

        if (tieneDesde !== tieneHasta) {
            ctx.addIssue({
                code: 'custom',
                message:
                    'desde y hasta deben enviarse juntos',
            })
        }

        if (
            data.periodo && (tieneDesde || tieneHasta)
        ) {
            ctx.addIssue({
                code: 'custom',
                message:
                    'No puedes combinar periodo con desde/hasta',
                })
        }
    }),
})

export const reporteInstrumentosQuerySchema =
    z.object({
        query: z.object({
            search: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional(),

            activo: z
            .enum(['true', 'false'])
            .optional(),

            estadoOperativo: z
            .nativeEnum(EstadoOperativo)
            .optional(),

            tipoInstrumentoId: idQuerySchema.optional(),

            marcaId: idQuerySchema.optional(),

            modeloId: idQuerySchema.optional(),

            proveedorId: idQuerySchema.optional(),

            ubicacionId: idQuerySchema.optional(),

            responsableId: idQuerySchema.optional(),
        }),
})


export const reporteMovimientosQuerySchema = z.object({
    query: z.object({
        periodo: z
        .enum(['7', '30'])
        .optional(),
        
        desde: z
        .string()
        .regex(fechaRegex, 'desde debe tener formato YYYY-MM-DD')
        .optional(),

        hasta: z
        .string()
        .regex(fechaRegex, 'hasta debe tener formato YYYY-MM-DD')
        .optional(),

        instrumentoId: idQuerySchema.optional(),

        usuarioId: idQuerySchema.optional(),

        tipo: z
        .nativeEnum(TipoMovimiento)
        .optional(),
    })
    .superRefine((data, ctx) => {
        const tieneDesde = data.desde !== undefined

        const tieneHasta = data.hasta !== undefined

        if (tieneDesde !== tieneHasta) {
            ctx.addIssue({
                code: 'custom',
                message: 'desde y hasta deben enviarse juntos',
            })
        }

        if (data.periodo && (tieneDesde || tieneHasta)) {
            ctx.addIssue({
                code: 'custom',
                message: 'No puedes combinar periodo con desde/hasta',
            })
        }
    }),
})

export const reporteBajasQuerySchema = z.object({
    query: z
    .object({
        periodo: z
        .enum(['7', '30'])
        .optional(),
        
        desde: z
        .string()
        .regex(fechaRegex, 'desde debe tener formato YYYY-MM-DD')
        .optional(),
        
        hasta: z
        .string()
        .regex(fechaRegex, 'hasta debe tener formato YYYY-MM-DD')
        .optional(),

        instrumentoId: idQuerySchema.optional(),

        motivoBajaId: idQuerySchema.optional(),

        usuarioId: idQuerySchema.optional(),
    })
    .superRefine((data, ctx) => {
        const tieneDesde = data.desde !== undefined

        const tieneHasta = data.hasta !== undefined

        if (tieneDesde !== tieneHasta) {
            ctx.addIssue({
                code: 'custom',
                message: 'desde y hasta deben enviarse juntos',
            })
        }

        if (data.periodo && (tieneDesde || tieneHasta)) {
            ctx.addIssue({
                code: 'custom',
                message: 'No puedes combinar periodo con desde/hasta',
          })
        }
    }),
})

export type ReporteBajasQuery = z.infer<typeof reporteBajasQuerySchema>['query']
export type ReporteMovimientosQuery = z.infer<typeof reporteMovimientosQuerySchema>['query']
export type ReporteInstrumentosQuery = z.infer<typeof reporteInstrumentosQuerySchema>['query']
export type ReporteUsosQuery = z.infer<typeof reporteUsosQuerySchema>['query']