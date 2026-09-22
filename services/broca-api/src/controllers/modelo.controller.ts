import type { NextFunction, Response, Request } from "express";

import * as modeloService from '../services/modelo.service.js'

import type { CreateModeloBody, UpdateModeloBody } from "../validators/modelo.validator.js";

export async function getModelos( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const marcaId = req.query.marcaId
            ? Number(req.query.marcaId)
            : undefined

        const modelo = await modeloService.getModelos(marcaId)
        
        res.status(200).json({
            status: 'success',
            data: {
                modelo,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getModeloById(req: Request, res: Response, next: NextFunction): Promise<void>  {
    try {
        const id = Number(req.params.id)

        const modelo = await modeloService.getModeloById(id)

        res.status(200).json({
            status: 'success',
            data: {
                modelo,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createModelo(req: Request<unknown, unknown, CreateModeloBody>,res: Response, next: NextFunction): Promise<void> {
    try {
        const modelo = await modeloService.createModelo(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Modelo creado correctamente',
            data: {
                modelo,
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function updateModelo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const modelo = await modeloService.updateModelo(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Modelo actualizado correctamente',
            data: {
                modelo,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoModelo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const modelo = await modeloService.updateEstadoModelo(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
            ? 'Modelo activado correctamente'
            : 'Modelo desactivado correctamente',
            data: {
                modelo,
            }
        })
    } catch (error) {
        next(error)
    }
}