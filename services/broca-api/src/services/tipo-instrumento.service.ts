import { Prisma } from '@prisma/client'

import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface CreateTipoInstrumentoInput {
    codigo: string
    nombre: string
    descripcion?: string
}

interface UpdateTipoInstrumentoInput {
    codigo?: string
    nombre?: string
    descripcion?: string | null
}

const tipoInstrumentoSelect = {
    id: true,
    codigo: true,
    nombre: true,
    descripcion: true,
    activo: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.TipoInstrumentoSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {

        const target = error.meta?.target

        const targetText = Array.isArray(target) ? target.join(',') : String(target ?? '')

        if (targetText.includes('codigo')) {
            throw new AppError('Ya existe un tipo de instrumento con ese código', 409, 'TIPO_INSTRUMENTO_CODE_EXISTS')
        }

        if (targetText.includes('nombre')) {
            throw new AppError('Ya existe un tipo de instrumento con ese nombre', 409, 'TIPO_INSTRUMENTO_NAME_EXISTS')
        }
        
        throw new AppError('Ya existe un tipo de instrumento con esos datos', 409, 'TIPO_INSTRUMENTO_EXISTS')
    }

    throw error
}

export async function getTiposInstrumento() {
    return prisma.tipoInstrumento.findMany({
        orderBy: {
            nombre: 'asc',
        },
        select: tipoInstrumentoSelect,
    })
}

export async function getTipoInstrumentoById(id: number) {
    const tipoInstrumento = await prisma.tipoInstrumento.findUnique({
        where: {
            id,
        },
        select: tipoInstrumentoSelect,
    })

    if (!tipoInstrumento) {
        throw new AppError('Tipo de instrumento no encontrado', 404, 'TIPO_INSTRUMENTO_NOT_FOUND')
    }

    return tipoInstrumento
}

export async function createTipoInstrumento(data: CreateTipoInstrumentoInput) {
    try {
        return await prisma.tipoInstrumento.create({
            data,
            select: tipoInstrumentoSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateTipoInstrumento(id: number, data: UpdateTipoInstrumentoInput,) {
    await getTipoInstrumentoById(id)

    try {
        return await prisma.tipoInstrumento.update({
            where: {
                id,
            },
            data,
            select: tipoInstrumentoSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoTipoInstrumento(id: number, activo: boolean) {
    await getTipoInstrumentoById(id)

    return prisma.tipoInstrumento.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: tipoInstrumentoSelect,
    })
}