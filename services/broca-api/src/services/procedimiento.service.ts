import { Prisma } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

interface CreateProcedimientoInput {
    nombre: string
    descripcion?: string
}

interface UpdateProcedimientoInput {
    nombre?: string
    descripcion?: string | null
}

const procedimientoSelect = {
    id: true,
    nombre: true,
    descripcion: true,
    activo: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.ProcedimientoSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe un procedimiento con este nombre', 409, 'PROCEDIMIENTO_NAME_EXISTS')
    }

    throw error
}

export async function getProcedimientos() {
    return prisma.procedimiento.findMany({
        orderBy: {
            nombre: 'asc'
        },
        select: procedimientoSelect
    })
}

export async function getProcedimientoById(id: number) {
    const procedimiento = await prisma.procedimiento.findUnique({
        where: {
            id,
        },
        select: procedimientoSelect,
    })

    if (!procedimiento) {
        throw new AppError('Procedimiento no encontrado', 404, 'PROCEDIMIENTO_NOT_FOUND')
    }

    return procedimiento
}

export async function createProcedimiento(data: CreateProcedimientoInput) {
    try {
        return await prisma.procedimiento.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion
            },
            select: procedimientoSelect
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateProcedimiento(id: number, data: UpdateProcedimientoInput) {
    await getProcedimientoById(id)
    try {
        return await prisma.procedimiento.update({
            where: {
                id,
            },
            data,
            select: procedimientoSelect
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoProcedimiento(id: number, activo: boolean) {
    await getProcedimientoById(id)
    return prisma.procedimiento.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: procedimientoSelect
    })
}