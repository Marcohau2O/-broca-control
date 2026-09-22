import { Prisma } from '@prisma/client'

import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface CreateProveedorInput {
  nombre: string
  contacto?: string
  telefono?: string
  correo?: string
}

interface UpdateProveedorInput {
  nombre?: string
  contacto?: string | null
  telefono?: string | null
  correo?: string | null
}

const proveedorSelect = {
  id: true,
  nombre: true,
  contacto: true,
  telefono: true,
  correo: true,
  activo: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProveedorSelect

function handleUniqueError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ya existe un proveedor con ese nombre', 409, 'PROVEEDOR_NAME_EXISTS')
    }

    throw error
}

export async function getProveedores() {
    return prisma.proveedor.findMany({
        orderBy: {
            nombre: 'asc'
        },
        select: proveedorSelect,
    })
}

export async function getProveedorById(id: number) {
    const proveedor = await prisma.proveedor.findUnique({
        where: {
            id,
        },
        select: proveedorSelect,
    })

    if(!proveedor) {
        throw new AppError('Proveedor no encontrado', 404, 'PROVEEDOR_NOT_FOUND')
    }

    return proveedor
}

export async function createProveedor(data: CreateProveedorInput) {
    try {
        return await prisma.proveedor.create({
            data,
            select: proveedorSelect
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateProveedor(id: number, data: UpdateProveedorInput) {
    await getProveedorById(id)

    try {
        return await prisma.proveedor.update({
            where: {
                id,
            },
            data,
            select: proveedorSelect,
        })
    } catch (error) {
        handleUniqueError(error)
    }
}

export async function updateEstadoProveedor(id: number, activo: boolean){
    await getProveedorById(id)

    return prisma.proveedor.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: proveedorSelect
    })
}