import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

interface LoginInput {
  correo: string
  password: string
}

export async function login({correo, password,}: LoginInput) {
    const usuario = await prisma.usuario.findUnique({
        where:{
            correo,
        },
        include: {
            rol: {
                include: {
                    permisos: {
                        include: {
                            permiso: true,
                        },
                    },
                },
            },
        },
    })

    if (!usuario) {
        throw new AppError('Correo o contraseña incorrectos', 401, 'INVALID_CREDENTIALS')
    }
    
    if (!usuario.activo) {
        throw new AppError('El usuario se encuentra inactivo', 403, 'USER_INACTIVE')
    }

    const passwordValido = await bcrypt.compare(password, usuario.passwordHash)

    if (!passwordValido) {
        throw new AppError('Correo o contraseña incorrectos', 401, 'INVALID_CREDENTIALS')
    }

    const permisos = usuario.rol.permisos.map((rolPermiso) => rolPermiso.permiso.codigo)

    const token = jwt.sign(
        {
            rolId: usuario.rolId,
            rol: usuario.rol.nombre,
            permisos,
        },
        env.JWT_SECRET,
        {
            subject: usuario.id.toString(),
            expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
        },
    )

    return {
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: {
                id: usuario.rol.id,
                nombre: usuario.rol.nombre
            },
            permisos,
        }
    }
}