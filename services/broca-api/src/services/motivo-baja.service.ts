import { Prisma } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

interface CreateMotivoBajaInput {
    nombre: string
    descripcion?: string
}

interface UpdateMotivoBajaInput {
    nombre: string
    descripcion?: string
}

const motivoBajaSelect = {
    id: true,
    nombre: true,
    descripcion: true,
    activo: true,
    createdAt: true,
    updatedAt: true
} satisfies Prisma.MotivoBajaSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe un motivo de baja con ese nombre', 409, 'MOTIVO_BAJA_NAME_EXISTS')
    }

    throw error
}

export async function getMotivosBaja() {
    return prisma.motivoBaja.findMany({
        orderBy: {
        nombre: 'asc',
        },
        select: motivoBajaSelect,
    })
}

export async function getMotivoBajaById(id: number) {
    const motivoBaja = await prisma.motivoBaja.findUnique({
        where: {
            id,
        },
        select: motivoBajaSelect,
    })

    if (!motivoBaja) {
        throw new AppError('Motivo de baja no encontrado', 404, 'MOTIVO_BAJA_NOT_FOUND')
    }

    return motivoBaja
}

export async function createMotivoBaja(data: CreateMotivoBajaInput) {
    try {
        return await prisma.motivoBaja.create({
            data,
            select: motivoBajaSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateMotivoBaja(id: number, data: UpdateMotivoBajaInput) {
    await getMotivoBajaById(id)

    try {
        return await prisma.motivoBaja.update({
            where: {
                id,
            },
            data,
            select: motivoBajaSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoMotivoBaja(id: number, activo: boolean) {
    await getMotivoBajaById(id)

    return await prisma.motivoBaja.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: motivoBajaSelect
    })
}