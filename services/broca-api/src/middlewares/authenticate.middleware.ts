import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'
import { AppError } from '../errors/AppError.js'
import prisma from '../lib/prisma.js'

interface TokenPayload extends jwt.JwtPayload {
    rolId: number
    rol: string
    permisos: string[]
}

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            throw new AppError('Token de autenticación requerido', 401, 'AUTH_TOKEN_REQUIRED')
        }

        const [schema, token] = authorization.split(' ')

        if (schema?.toLowerCase() !== 'bearer' || !token) {
            throw new AppError('Formato de token inválido', 401, 'INVALID_AUTH_FORMAT')
        }

        let payload: TokenPayload

        try {
            payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload
        } catch (error) {
            throw new AppError('Token inválido o expirado', 401,'INVALID_TOKEN')
        }

        const usuarioId = Number(payload.sub)

        if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
            throw new AppError('Token inválido', 401, 'INVALID_TOKEN')
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId,
            },
            include: {
                rol: {
                    include: {
                        permisos: {
                            include: {
                                permiso: true
                            },
                        },
                    },
                },
            },
        })

        if (!usuario) {
            throw new AppError('Usuario no encontrado', 401, 'USER_NOT_FOUND')
        }

        if (!usuario.activo) {
            throw new AppError('El usuario se encuentra inactivo', 403, 'USER_INACTIVE')
        }

        const permisos = usuario.rol.permisos.map(
            (rolPermiso) => rolPermiso.permiso.codigo
        )

        req.user = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rolId: usuario.rolId,
            rol: usuario.rol.nombre,
            permisos,
        }

        next()
    } catch (error) {
        next(error)
    }
}