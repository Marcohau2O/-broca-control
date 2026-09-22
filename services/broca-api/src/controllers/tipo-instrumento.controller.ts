import type { NextFunction, Request, Response } from 'express'

import * as tipoInstrumentoService from '../services/tipo-instrumento.service.js'

import type { CreateTipoInstrumentoBody, UpdateTipoInstrumentoBody } from '../validators/tipo-instrumento.validator.js'

export async function getTiposInstrumento(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tiposInstrumento = await tipoInstrumentoService.getTiposInstrumento()

        res.status(200).json({
            status: 'success',
            data: {
                tiposInstrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getTipoInstrumentoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const tipoInstrumento =
        await tipoInstrumentoService.getTipoInstrumentoById(id)

        res.status(200).json({
            status: 'success',
            data: {
                tipoInstrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createTipoInstrumento(req: Request<unknown, unknown, CreateTipoInstrumentoBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const tipoInstrumento = await tipoInstrumentoService.createTipoInstrumento(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Tipo de instrumento creado correctamente',
            data: {
                tipoInstrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateTipoInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const tipoInstrumento =
        await tipoInstrumentoService.updateTipoInstrumento(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Tipo de instrumento actualizado correctamente',
            data: {
                tipoInstrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoTipoInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const tipoInstrumento = await tipoInstrumentoService.updateEstadoTipoInstrumento(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
                ? 'Tipo de instrumento activado correctamente'
                : 'Tipo de instrumento desactivado correctamente',
            data: {
                tipoInstrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}