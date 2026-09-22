import { NextFunction, Request, Response } from "express";

import * as instrumentoService from '../services/instrumento.service.js'

import { BajaInstrumentoBody, CreateInstrumentoBody, RegistrarUsoInstrumentoBody, UpdateEstadoOperativoInstrumentoBody, UpdateInstrumentoBody, UpdateUbicacionInstrumentoBody, idempotencyKeySchema } from "../validators/instrumento.validator.js";

import { EstadoOperativo } from "@prisma/client";

export async function getInstrumentos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const filters = {
            search:
                typeof req.query.search === 'string'
                ? req.query.search
                : undefined,

            tipoInstrumentoId:
                req.query.tipoInstrumentoId
                ? Number(req.query.tipoInstrumentoId)
                : undefined,

            marcaId: req.query.marcaId
                ? Number(req.query.marcaId)
                : undefined,

            modeloId: req.query.modeloId
                ? Number(req.query.modeloId)
                : undefined,

            proveedorId: req.query.proveedorId
                ? Number(req.query.proveedorId)
                : undefined,

            ubicacionId: req.query.ubicacionId
                ? Number(req.query.ubicacionId)
                : undefined,

            responsableId: req.query.responsableId
                ? Number(req.query.responsableId)
                : undefined,

            estadoOperativo:
                req.query.estadoOperativo as
                | EstadoOperativo
                | undefined,

            activo:
                req.query.activo === 'true'
                ? true
                : req.query.activo === 'false'
                    ? false
                    : undefined,
        }

        const instrumento = await instrumentoService.getInstrumentos(filters)

        res.status(200).json({
            status: 'success',
            data: {
                instrumento
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getInstrumentoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const instrumento = await instrumentoService.getInstrumentoById(id)

        res.status(200).json({
            status: 'success',
            data: {
                instrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getInstrumentoByQrToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const qrToken = String(req.params.qrToken)

        const instrumento = await instrumentoService.getInstrumentoByQrToken(qrToken)

        res.status(200).json({
            status: 'success',
            data: {
                instrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function createInstrumento(req: Request<unknown, unknown, CreateInstrumentoBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        if(!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const instrumento = await instrumentoService.createInstrumento(req.body, req.user.id)

        res.status(201).json({
            status: 'success',
            message: 'Instrumento registrado correctamente',
            data: {
                instrumento
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const id = Number(req.params.id)

        const instrumento = await instrumentoService.updateInstrumento(id, req.body, req.user.id)

        res.status(200).json({
            status: 'success',
            message: 'Instrumento actualizado correctamente',
            data: {
                instrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateUbicacionInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario auteticado no disponible')
        }

        const id = Number(req.params.id)

        const instrumento = await instrumentoService.updateUbicacionInstrumento(id, req.body, req.user.id)

        res.status(200).json({
            status: 'success',
            message: 'Ubicación del instrumento actualizado correctamente',
            data: {
                instrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const id = Number(req.params.id)

        const instrumento = await instrumentoService.updateEstadoInstrumento(id, req.body, req.user.id)

        res.status(200).json({
            status: 'success',
            message: 'Estado del instrumento actualizado correctamente',
            data: {
                instrumento,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function registrarUsoInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const instrumentoId = Number(req.params.id)

        const idempotencyKey = idempotencyKeySchema.parse(req.get('Idempotency-Key'))

        const resultado = await instrumentoService.registrarUsoInstrumento(
            instrumentoId,
            req.body,
            req.user.id,
            idempotencyKey,
        )

        res.status(resultado.reutilizado ? 200 : 201).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getUsosInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const instrumentoId = Number(req.params.id)

        const resultado = await instrumentoService.getUsosInstrumento(instrumentoId)

        res.status(200).json({
            status: 'success',

            data: resultado
        })
    } catch (error){
        next(error)
    }
}

export async function darBajaInstrumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const instrumentoId = Number(req.params.id)

        const resultado = await instrumentoService.darBajaInstrumento(instrumentoId, req.body, req.user.id)

        res.status(201).json({
            status: 'success',
            message: 'Instrumento dado de baja correctamente',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}