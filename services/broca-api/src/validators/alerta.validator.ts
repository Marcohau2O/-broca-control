import { EstadoAlerta, TipoAlerta } from "@prisma/client";
import { z } from "zod"; 

export const alertaIdSchema = z.object({
    params: z.object({
        id: z.coerce
        .number()
        .int()
        .positive('El ID debe ser válido'),
    }),
})

export const getAlertasSchema = z.object({
    query: z.object({
        tipo: z.nativeEnum(TipoAlerta).optional(),

        estado: z
        .nativeEnum(EstadoAlerta)
        .optional(),

        instrumentoId: z.coerce
        .number()
        .int()
        .positive('El instrumento debe ser válido')
        .optional(),
    }),
})

