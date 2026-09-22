import { Prisma } from '@prisma/client'

import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface CreateServicioInput {
    nombre: string
    descripcion?: string
}

interface UpdateServicioInput {
    nombre?: string
    descripcion?: string | null
}

const servicioSelect = {
    id: true,
    nombre: true,
    descripcion: true,
    activo: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.ServicioSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe un servicio con ese nombre', 409, 'SERVICIO_NAME_EXISTS')
    }

    throw error
}

export async function getServicios() {
    return prisma.servicio.findMany({
        orderBy: {
            nombre: 'asc',
            },
        select: servicioSelect,
    })
}

export async function getServicioById(id: number) {
    const servicio = await prisma.servicio.findUnique({
        where: {
            id,
        },
        select: servicioSelect,
    })

    if (!servicio) {
        throw new AppError('Servicio no encontrado', 404, 'SERVICIO_NOT_FOUND')
    }

    return servicio
}

export async function createServicio(data: CreateServicioInput) {
    try {
        return await prisma.servicio.create({
            data,
            select: servicioSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateServicio(id: number, data: UpdateServicioInput) {
    await getServicioById(id)

    try {
        return await prisma.servicio.update({
            where: {
                id,
            },
            data,
            select: servicioSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoServicio(id: number, activo: boolean) {
    await getServicioById(id)

    return prisma.servicio.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: servicioSelect,
    })
}