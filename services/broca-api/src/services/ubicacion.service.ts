import { Prisma } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";
import { allowedNodeEnvironmentFlags } from "process";

interface CreateUbicacionInput {
    codigo: string
    nombre: string
    descripcion?: string
}

export async function getUbicaciones() {
    return prisma.ubicacion.findMany({
        orderBy: {
            nombre: 'asc'
        },
        select: {
            id: true,
            codigo: true,
            nombre: true,
            descripcion: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}

export async function getUbicacionById(id: number) {
    const ubicacion = await prisma.ubicacion.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            codigo: true,
            nombre: true,
            descripcion: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    if (!ubicacion) {
        throw new AppError('Ubicación no encontrada', 404, 'UBICACION_NOT_FOUND')
    }

    return ubicacion
}

export async function createUbicacion(data: CreateUbicacionInput) {
    try {
        return await prisma.ubicacion.create({
            data: {
                codigo: data.codigo,
                nombre: data.nombre,
                descripcion: data.descripcion
            },
            select: {
                id: true,
                codigo: true,
                nombre: true,
                descripcion: true,
                activo: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new AppError('Ya existe una ubicación con ese código', 409, 'UBICACION_CODE_EXISTS')
        }

        throw error
    }
}

export async function updateUbicacion(
    id: number,
    data: {
        codigo?: string
        nombre?: string
        descripcion?: string | null
    },
) {
    await getUbicacionById(id)

    try {
        return await prisma.ubicacion.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                codigo: true,
                nombre: true,
                descripcion: true,
                activo: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new AppError('Ya existe una ubicación con ese código', 409, 'UBICACION_CODE_EXISTS')
        }

        throw error
    }
}

export async function updateEstadoUbicacion(
    id: number,
    activo: boolean
) {
    await getUbicacionById(id)

    return prisma.ubicacion.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: {
            id: true,
            codigo: true,
            nombre: true,
            descripcion: true,
            activo: true,
            createdAt: true,
            updatedAt: true,
        }
    })
}