import type { NextFunction, Request, Response } from 'express'

import * as servicioService from '../services/servicio.service.js'
import type { CreateServicioBody, UpdateServicioBody } from '../validators/servicio.validator.js'

export async function getServicios(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const servicios = await servicioService.getServicios()

        res.status(200).json({
            status: 'success',
            data: {
                servicios
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getServicioById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const servicio = await servicioService.getServicioById(Number(req.params.id))

        res.status(200).json({
            status: 'success',
            data: {
                servicio
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function createServicio(req: Request<unknown, unknown, CreateServicioBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const servicio = await servicioService.createServicio(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Servicio creado correctamente',
            data: {
                servicio
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)
        
        const servicio = await servicioService.updateServicio(id, req.body)

        res.status(200).json({
            status: 'success',
            message:'Servicio actualizado correctamente',
            data: {
                servicio,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)
        
        const servicio = await servicioService.updateEstadoServicio(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
            ? 'Servicio activado correctamente'
            : 'Servicio desactivado correctamente',
            data: {
                servicio,
            },
        })
    } catch (error) {
        next(error)
    }
}