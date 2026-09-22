import { Prisma, ResultadoAuditoria } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

export interface RegistrarAuditoriaInput {
    usuarioId?: number | null
    accion: string
    modulo: string
    registroId?: string | number | null
    datosAnteriores?: Prisma.InputJsonValue
    datosNuevos?: Prisma.InputJsonValue
    resultado?: ResultadoAuditoria
    descripcion?: string
}

interface GetAuditoriasFilters {
    usuarioId?: number
    modulo?: string
    accion?: string
    resultado?: ResultadoAuditoria
    registroId?: string
}

const auditoriaSelect = {
    id: true,
    accion: true,
    modulo: true,
    registroId: true,
    datosAnteriores: true,
    datosNuevos: true,
    resultado: true,
    descripcion: true,
    fechaHora: true,

    usuario: {
        select: {
            id: true,
            nombre: true,
            correo: true,
            rol: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
        },
    },
} satisfies Prisma.AuditoriaSelect

export async function registrarAuditoria(data: RegistrarAuditoriaInput) {
    return prisma.auditoria.create({
        data: {
            usuarioId: data.usuarioId ?? null,

            accion: data.accion,
            modulo: data.modulo,

            registroId: data.registroId !== undefined && data.registroId !== null ? String(data.registroId) : null,

            datosAnteriores: data.datosAnteriores,

            datosNuevos: data.datosNuevos,

            resultado: data.resultado ?? ResultadoAuditoria.EXITOSO,

            descripcion: data.descripcion,
        },
    })
}

export async function registrarAuditoriaSegura(data: RegistrarAuditoriaInput): Promise<void> {
    try {
        await registrarAuditoria(data)
    } catch (error) {
        console.error(
            '[AUDITORIA] No fue posible registrar la auditoría',
            {
                accion: data.accion,
                modulo: data.modulo,
                registroId: data.registroId,
                usuarioId: data.usuarioId,
                resultado: data.resultado,
                error,  
            },
        )
    }
}

export async function getAuditorias(filters: GetAuditoriasFilters) {
    const where: Prisma.AuditoriaWhereInput = {}

    if (filters.usuarioId !== undefined) {
        where.usuarioId = filters.usuarioId
    }

    if (filters.modulo !== undefined) {
        where.modulo = {
            contains: filters.modulo,
            mode: 'insensitive'
        }
    }

    if (filters.accion !== undefined) {
        where.accion = {
            contains:filters.accion,
            mode: 'insensitive',
        }
    }

    if (filters.resultado !== undefined) {
        where.resultado = filters.resultado
    }

    if (filters.registroId !== undefined) {
        where.registroId = filters.registroId
    }

    return prisma.auditoria.findMany({
        where,

        orderBy: {
            fechaHora: 'desc',
        },

        select: auditoriaSelect,
    })
}

export async function getAuditoriaById(id: number) {
    const auditoria = await prisma.auditoria.findUnique({
        where: {
            id,
        },

        select: auditoriaSelect,
    })

    if (!auditoria) {
        throw new AppError('Registro de auditoria no encontrado', 404, 'AUDITORIA_NOT_FOUND')
    }

    return auditoria
}