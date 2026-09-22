import { Prisma } from '@prisma/client'

import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface CreateModeloInput {
    nombre: string
    descripcion?: string
    marcaId: number
}

interface UpdateModeloInput {
    nombre?: string
    descripcion?: string | null
    marcaId?: number
}

const modeloSelect = {
    id: true,
    nombre: true,
    descripcion: true,
    activo: true,

    marcaId: true,

    marca: {
        select: {
            id: true,
            nombre: true,
            activo: true,
        },
    },

    createdAt: true,
    updatedAt: true,
} satisfies Prisma.ModeloSelect

async function validateMarca(marcaId: number) {
    const marca = await prisma.marca.findUnique({
        where: {
            id: marcaId,
        },
        select: {
            id: true,
            activo: true,
        },
    })

    if (!marca) {
        throw new AppError('Marca no encontrada', 404, 'MARCA_NOT_FOUND')
    }

    if (!marca.activo) {
        throw new AppError('No se puede utilizar una marca inactiva', 409, 'MARCA_INACTIVE')
    }

    return marca
}

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe un modelo con ese nombre para la marca seleccionada', 409, 'MODELO_NAME_EXISTS_FOR_MARCA')
    }

    throw error
}

export async function getModelos(marcaId?: number) {
    return prisma.modelo.findMany({
        where: marcaId
        ? {
            marcaId,
        }
        : undefined,

        orderBy: [
            {
                marca: {
                    nombre: 'asc',
                },
            },
            {
                nombre: 'asc',
            },
        ],
        select: modeloSelect,
    })
}

export async function getModeloById(id: number) {
    const modelo = await prisma.modelo.findUnique({
        where: {
            id,
        },
        select: modeloSelect,
    })

    if (!modelo) {
        throw new AppError('Modelo no encontrado', 404, 'MODELO_NOT_FOUND')
    }

    return modelo
}

export async function createModelo(data: CreateModeloInput) {
    await validateMarca(data.marcaId)

    try {
        return await prisma.modelo.create({
            data,
            select: modeloSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateModelo(id: number, data: UpdateModeloInput) {
    await getModeloById(id)

    if (data.marcaId !== undefined) {
        await validateMarca(data.marcaId)
    }

    try {
        return await prisma.modelo.update({
            where: {
                id,
            },
            data,
            select: modeloSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoModelo(id: number, activo: boolean) {
    const modelo = await getModeloById(id)

    if (activo) {
        await validateMarca(modelo.marcaId)
    }

    return prisma.modelo.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: modeloSelect,
    })
}