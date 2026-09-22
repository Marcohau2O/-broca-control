import { z } from 'zod'

const fechaRegex =
  /^\d{4}-\d{2}-\d{2}$/

export const dashboardUsosQuerySchema =
  z.object({
    query: z
      .object({
        periodo: z
          .enum(['7', '30'])
          .optional(),

        desde: z
          .string()
          .regex(
            fechaRegex,
            'desde debe tener formato YYYY-MM-DD',
          )
          .optional(),

        hasta: z
          .string()
          .regex(
            fechaRegex,
            'hasta debe tener formato YYYY-MM-DD',
          )
          .optional(),
      })
      .superRefine((data, ctx) => {
        const tieneDesde =
          data.desde !== undefined

        const tieneHasta =
          data.hasta !== undefined

        if (tieneDesde !== tieneHasta) {
          ctx.addIssue({
            code: 'custom',
            message:
              'desde y hasta deben enviarse juntos',
          })
        }

        if (
          data.periodo &&
          (tieneDesde || tieneHasta)
        ) {
          ctx.addIssue({
            code: 'custom',
            message:
              'No puedes combinar periodo con desde/hasta',
          })
        }
    }),
})

export type DashboardUsosQuery = z.infer<typeof dashboardUsosQuerySchema>['query']