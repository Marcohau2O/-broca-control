import { EstadoAlerta, ResultadoAuditoria, type Prisma, type TipoAlerta } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

import { registrarAuditoriaSegura } from "./auditoria.service.js";

interface GetAlertasFilters {
    tipo?: TipoAlerta
    estado?: EstadoAlerta
    instrumentoId?: number
}

const alertaSelect = {
    id: true,
    tipo: true,
    estado: true,
    mensaje: true,
    fechaCreacion: true,
    fechaRevision: true,

    instrumento: {
        select: {
            id: true,
            codigo: true,
            descripcion: true,
            usosMaximos: true,
            usosRealizados: true,
            estadoOperativo: true,
            tipoInstrumento: {
                select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                },
            },
            ubicacion: {
                select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                },
            },
        },
    },
} satisfies Prisma.AlertaSelect

export async function getAlertas(filters: GetAlertasFilters) {
    const where: Prisma.AlertaWhereInput = {}

    if (filters.tipo !== undefined) {
        where.tipo = filters.tipo
    }

    if (filters.estado !== undefined) {
        where.estado = filters.estado
    }

    if (filters.instrumentoId !== undefined) {
        where.instrumentoId = filters.instrumentoId
    }

    const alertas = await prisma.alerta.findMany({
        where,

        orderBy: {
            fechaCreacion: 'desc',
        },

        select: alertaSelect,
    })

    return alertas.map((alertas) => ({
        ...alertas,

        instrumento: {
            ...alertas.instrumento,

            vidasRestantes: Math.max(
                alertas.instrumento.usosMaximos - alertas.instrumento.usosRealizados,
                0,
            ),
        },
    }))
}

export async function getAlertaById(id: number) {
    const alerta = await prisma.alerta.findUnique({
        where: {
            id,
        },

        select: alertaSelect,
    })

    if (!alerta) {
        throw new AppError('Alerta no encontrada', 404, 'ALERTA NOT_FOUND')
    }

    return {
        ...alerta,

        instrumento: {
            ...alerta.instrumento,

            vidasRestantes: Math.max(
                alerta.instrumento.usosMaximos - alerta.instrumento.usosRealizados,
                0,
            ),
        }
    }
}

export async function revisarAlerta(id: number, usuarioId: number) {
    const alerta = await prisma.alerta.findUnique({
        where: {
            id,
        },

        select: {
            id: true,
            estado: true,
        },
    })

    if (!alerta) {
        throw new AppError('Alerta no encontrada', 404, 'ALERTA_NOT_FOUND')
    }

    if (alerta.estado === EstadoAlerta.REVISADA) {
        throw new AppError('La alerta ya fue revisada', 409, 'ALERTA_ALREADY_REVIEWED')
    }

    await prisma.alerta.update({
        where: {
            id,
        },

        data: {
            estado: EstadoAlerta.REVISADA,

            fechaRevision: new Date(),
        },
    })

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'REVISAR_ALERTA',

        modulo: 'ALERTA',

        registroId: id,

        resultado: ResultadoAuditoria.EXITOSO,

        datosAnteriores: {
            estado: EstadoAlerta.PENDIENTE
        },

        datosNuevos: {
            estado: EstadoAlerta.REVISADA,
        },

        descripcion: `Alerta marcada como revisada`,
    })

    return getAlertaById(id)
}