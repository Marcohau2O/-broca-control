import type { NextFunction, Request, Response } from 'express'

import * as motivoBajaService from '../services/motivo-baja.service.js'

import type { CreateMotivoBajaBody, UpdateMotivoBajaBody } from '../validators/motivo-baja.validator.js'

export async function getMotivosBaja(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const motivosBaja = await motivoBajaService.getMotivosBaja()
        
        res.status(200).json({
            status: 'success',
            data: {
                motivosBaja,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getMotivoBajaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const motivoBaja = await motivoBajaService.getMotivoBajaById(id)

        res.status(200).json({
            status: 'success',
            data: {
                motivoBaja,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createMotivoBaja(req: Request<unknown, unknown, CreateMotivoBajaBody>,res: Response, next: NextFunction): Promise<void> {
    try {
        const motivoBaja = await motivoBajaService.createMotivoBaja(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Motivo de baja creado correctamente',
            data: {
                motivoBaja
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateMotivoBaja(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const motivoBaja = await motivoBajaService.updateMotivoBaja(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Motivo de baja actualizado correctamente',
            data: {
                motivoBaja,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoMotivoBaja(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const motivoBaja = await motivoBajaService.updateEstadoMotivoBaja(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
            ?'Motivo de baja activado correctamente'
            : 'Motivo de baja desactivado correctamente',
            data: {
                motivoBaja
            },
        })
    } catch (error) {
        next(error)
    }
}