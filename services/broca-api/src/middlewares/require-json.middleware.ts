import { NextFunction, Request, Response } from 'express'

import { AppError } from '../errors/AppError.js'

export function requireJson(
    req: Request, res: Response, next: NextFunction): void {
        if (!req.is('application/json')) {
            next(
                new AppError('Content-Type debe ser application/json', 415, 'UNSUPPORTED_MEDIA_TYPE'),
            )
            return
        }
        next()
    }