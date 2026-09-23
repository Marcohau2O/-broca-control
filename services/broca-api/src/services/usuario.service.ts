import { Prisma } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

import bcrypt from "bcryptjs";

interface CreateUsuarioInput {
    nombre: string
    correo: string
    password: string
    rolId: number
}

interface UpdateUsuarioInput {
    nombre?: string
    correo?: string
    rolId?: number
}

const usuarioSelect = {
    id: true,
    nombre: true,
    correo: true,
    activo: true,
    rolId: true,
    rol: {
        select: {
            id: true,
            nombre: true,
            descripcion: true,
            activo: true,
        },
    },
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.UsuarioSelect

export async function getUsuarios() {
    return prisma.usuario.findMany({
        orderBy: {
            nombre: 'asc',
        },
        select: usuarioSelect,
    })
}

export async function getUsuarioById(id: number) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id,
        },
        select: usuarioSelect,
    })

    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND')
    }

    return usuario
}

export async function createUsuario(data: CreateUsuarioInput) {
    const rol = await prisma.rol.findUnique({
        where: {
            id: data.rolId,
        },
        select: {
            id: true,
            activo: true,
        },
    })

    if (!rol) {
        throw new AppError('Rol no encontrado', 404, 'ROLE_NOT_FOUND')
    }

    if (!rol.activo) {
        throw new AppError('No se puede asignar un rol inactivo', 409, 'ROLE_INACTIVE')
    }

    const correoNormalizado = data.correo.trim().toLowerCase()
    const passwordHash = await bcrypt.hash(data.password, 12)

    try {
        return await prisma.usuario.create({
            data: {
                nombre: data.nombre.trim(),
                correo: correoNormalizado,
                passwordHash,
                rolId: data.rolId,
                activo: true,
            },
            select: usuarioSelect,
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new AppError('Ya existe un usuario con ese correo', 409, 'USER_EMAIL_EXISTS')
        }

        throw error
    }
}

export async function updateUsuario(id: number, data: UpdateUsuarioInput) {
    const usuarioActual = await getUsuarioById(id)

    if (data.rolId !== undefined) {
        const rol = await prisma.rol.findUnique({
            where: {
                id: data.rolId,
            },
            select: {
                id: true,
                nombre: true,
                activo: true,
            },
        })

        if (!rol) {
            throw new AppError('Rol no encontrado', 404, 'ROLE_NOT_FOUND')
        }

        if (!rol.activo) {
            throw new AppError('No se puede asignar un rol inactivo', 409, 'ROLE_INACTIVE')
        }
        
        if (usuarioActual.rol.nombre === 'Administrador' && usuarioActual.activo && rol.nombre !== 'Administrador') {
            const administradoresActivos = await prisma.usuario.count({
                where: {
                    activo: true,
                    rol: {
                        nombre: 'Administrador',
                    },
                },
            })
            
            if (administradoresActivos <= 1) {
                throw new AppError('No se puede cambiar el rol del último administrador activo', 409, 'LAST_ACTIVE_ADMIN')
            }
        }
    }

    const updateData: Prisma.UsuarioUpdateInput = {}

    if (data.nombre !== undefined) {
        updateData.nombre = data.nombre.trim()
    }

    if (data.correo !== undefined) {
        updateData.correo = data.correo.trim().toLowerCase()
    }

    if (data.rolId !== undefined) {
        updateData.rol = {
            connect: {
                id: data.rolId,
            },
        }
    }

    try {
        return await prisma.usuario.update({
            where: {
                id,
            },
            data: updateData,
            select: usuarioSelect,
        })
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new AppError('Ya existe un usuario con ese correo', 409, 'USER_EMAIL_EXISTS')
        }

        throw error
    }
}

export async function updateEstadoUsuario(id: number, activo: boolean) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            activo: true,
            rol: {
                select: {
                    nombre: true,
                },
            },
        },
    })

    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND')
    }

    if (usuario.rol.nombre === 'Administrador' && usuario.activo && !activo) {
        const administradoresActivos = await prisma.usuario.count({
            where: {
                activo: true,
                rol: {
                    nombre: 'Administrador',
                },
            },
        })

        if (administradoresActivos <= 1) {
            throw new AppError('No se puede desactivar al último administrador activo', 409, 'LAST_ACTIVE_ADMIN')
        }
    }

    return prisma.usuario.update({
        where: {
            id,
        },
        data: {
            activo,
        },
        select: usuarioSelect,
    })
}

export async function updatePasswordUsuario(id: number, password: string) {
    await getUsuarioById(id)
    
    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.usuario.update({
        where: {
            id,
        },
        data: {
            passwordHash,
        },
    })
}