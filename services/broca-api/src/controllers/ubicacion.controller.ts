import type { NextFunction, Request, Response } from 'express'

import * as ubicacionService from '../services/ubicacion.service.js'
import type { CreateUbicacionBody } from '../validators/ubicacion.validator.js'

export async function getUbicaciones(_req: Request, res: Response, next: NextFunction): Promise<void>  {
    try {
        const ubicacion = await ubicacionService.getUbicaciones()

        res.status(200).json({
            status: 'success',
            data: {
                ubicacion
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getUbicacionById(req: Request, res: Response, next: NextFunction): Promise<void>  {
    try {
        const id = Number(req.params.id)

        const ubicacion =
        await ubicacionService.getUbicacionById(id)

        res.status(200).json({
            status: 'success',
            data: {
                ubicacion,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createUbicacion(req: Request<unknown, unknown, CreateUbicacionBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const ubicacion = await ubicacionService.createUbicacion(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Ubicación creada correctamente',
            data: {
                ubicacion
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateUbicacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const ubicacion =
        await ubicacionService.updateUbicacion(
            id,
            req.body,
        )

        res.status(200).json({
            status: 'success',
            message: 'Ubicación actualizada correctamente',
            data: {
                ubicacion,
            },
        })
    } catch (error){
        next(error)
    }
}

export async function updateEstadoUbicacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const ubicacion =
        await ubicacionService.updateEstadoUbicacion(
            id,
            req.body.activo,
        )

        res.status(200).json({
            status: 'success',
            message: req.body.activo
                ? 'Ubicación activada correctamente'
                : 'Ubicación desactivada correctamente',
            data: {
                ubicacion,
            },
        })
    } catch (error){
        next(error)
    }
}