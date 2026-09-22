import type { NextFunction, Request, Response } from 'express'

import * as marcaService from '../services/marca.service.js'

import type { CreateMarcaBody, UpdateMarcaBody } from '../validators/marca.validator.js'

export async function getMarcas(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const marca = await marcaService.getMarcas()

        res.status(200).json({
            status: 'success',
            data: {
                marca,
            },
        })
    } catch (error){
        next(error)
    }
}

export async function getMarcaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const marca = await marcaService.getMarcaById(id)

        res.status(200).json({
            status: 'success',
            data: {
                marca
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function createMarca(req: Request<unknown, unknown, CreateMarcaBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const marca = await marcaService.createMarca(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Marca creada correctamente',
            data: {
                marca,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateMarca(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const marca = await marcaService.updateMarca(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Marca actualizada correctamente',
            data: {
                marca
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoMarca(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const marca = await marcaService.updateEstadoMarca(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
            ? 'Marca activada correctamente'
            : 'Marca desactivada correctamente',
            data: {
                marca,
            }
        })
    } catch (error) {
        next(error)
    }
}