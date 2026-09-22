import { ResultadoAuditoria } from "@prisma/client";

import { z } from "zod";

export const auditoriaIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const getAuditoriasSchema = z.object({
    query: z.object({
        usuarioId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

        modulo: z
        .string()
        .trim()
        .min(1)
        .optional(),

        accion: z
        .string()
        .trim()
        .min(1)
        .optional(),

        resultado: z
        .nativeEnum(ResultadoAuditoria)
        .optional(),

        registroId: z
        .string()
        .trim()
        .min(1)
        .optional(),
    }),
})