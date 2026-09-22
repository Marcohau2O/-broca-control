import type { NextFunction, Request, Response } from 'express'

import type { LoginBody } from '../validators/auth.validator.js'
import * as authService from '../services/auth.service.js'

export async function login(req: Request<unknown, unknown, LoginBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await authService.login(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Inicio se sesión correcto',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export function me(req: Request, res: Response): void {
    res.status(200).json({
        status: 'success',
        data: {
            usuario: req.user,
        }
    })
}