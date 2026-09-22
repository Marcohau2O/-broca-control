import type { NextFunction, Request, Response } from 'express'

import * as proveedorService from '../services/proveedor.service.js'

import type { CreateProveedorBody, UpdateProveedorBody } from '../validators/proveedor.validator.js'

export async function getProveedores(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const proveedores = await proveedorService.getProveedores()

        res.status(200).json({
            status: 'success',
            data: {
                proveedores,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getProveedorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const proveedor = await proveedorService.getProveedorById(id)

        res.status(200).json({
            status: 'success',
            data: {
                proveedor,
            },
        })
    } catch (error) { 
        next(error)
    }
}

export async function createProveedor(req: Request<unknown, unknown, CreateProveedorBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const proveedor = await proveedorService.createProveedor(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Proveedor creado correctamente',
            data: {
                proveedor
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateProveedor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const proveedor = await proveedorService.updateProveedor(id, req.body)

        res.status(200).json({
            status: 'success',
            message: 'Proveedor acrtualizado correctamente',
            data: {
                proveedor
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoProveedor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const proveedor = await proveedorService.updateEstadoProveedor(id, req.body.activo)

        res.status(200).json({
            status: 'success',
            message: req.body.activo
            ? 'Proveedor activado correctamente'
            : 'Proveedor desactivado correctamente',
            data: {
                proveedor
            },
        })
    } catch (error) {
        next(error)
    }
}