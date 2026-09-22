import { Prisma } from '@prisma/client'

import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface CreateMarcaInput {
    nombre: string
    descripcion?: string
}

interface UpdateMarcaInput {
    nombre?: string
    descripcion?: string | null
}

const marcaSelect = {
    id: true,
    nombre: true,
    descripcion: true,
    activo: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.MarcaSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe una marca con ese nombre', 409, 'MARCA_NAME_EXISTS')
    }

    throw error
}

export async function getMarcas() {
    return prisma.marca.findMany({
        orderBy: {
            nombre: 'asc'
        },
        select: marcaSelect
    })
}

export async function getMarcaById(id: number) {
    const marca = await prisma.marca.findUnique({
        where: {
            id,
        },
        select: marcaSelect,
    })

    if (!marca) {
        throw new AppError('Marca no encontrada', 404, 'MARCA_NOT_FOUND')
    }

    return marca
}

export async function createMarca(data: CreateMarcaInput) {
    try {
        return await prisma.marca.create({
            data,
            select: marcaSelect
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateMarca(id: number, data: UpdateMarcaInput) {
    await getMarcaById(id)

    try {
        return await prisma.marca.update({
            where: {
                id,
            },
            data,
            select: marcaSelect
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoMarca(id: number, activo: boolean) {
    await getMarcaById(id)

    return prisma.marca.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: marcaSelect
    })
}