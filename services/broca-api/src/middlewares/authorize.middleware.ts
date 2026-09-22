import type { NextFunction, Request, Response } from 'express'

import { AppError } from '../errors/AppError.js'

export function authorize(...requiredPermissions: string[]) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                throw new AppError('Usuario no autenticado', 401, 'UNAUTHENTICATED')
            }

            const hasPermission = requiredPermissions.every((permission) => req.user?.permisos.includes(permission))

            if (!hasPermission) {
                throw new AppError('No tienes permisos para realizar esta acción', 403, 'FORBIDDEN')
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}