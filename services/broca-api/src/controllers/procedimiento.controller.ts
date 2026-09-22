import type { NextFunction, Request, Response } from 'express'

import * as procedimientoService from '../services/procedimiento.service.js'

import type { CreateProcedimientoBody, UpdateProcedimientoBody } from '../validators/procedimiento.validator.js'

export async function getProcedimientos(_req: Request, res:Response, next: NextFunction): Promise<void> {
    try{
        const procedimiento = await procedimientoService.getProcedimientos()

        res.status(200).json({
            status: 'success',
            data: {
                procedimiento
            },
        })
    } catch (error) {
        next()
    }
}

export async function getProcedimientoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const procedimiento = await procedimientoService.getProcedimientoById(id)

        res.status(200).json({
            status: 'success',
            data: {
                procedimiento
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createProcedimiento(req: Request<unknown, unknown, CreateProcedimientoBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const procedimiento = await procedimientoService.createProcedimiento(req.body)
        
        res.status(201).json({
            status: 'success',
            message: 'Procedimiento creando correctmente',
            data: {
                procedimiento
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateProcedimiento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const procedimiento = await procedimientoService.updateProcedimiento(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Procedimiento actualizado correctamente',
            data: {
                procedimiento
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoProcedimiento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const procedimiento = await procedimientoService.updateEstadoProcedimiento(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
                ? 'Procedimiento activado correctamente'
                : 'Procedimiento desactivado correctamente',
            data: {
                procedimiento,
            },
        })
    } catch (error) {
        next(error)
    }
}