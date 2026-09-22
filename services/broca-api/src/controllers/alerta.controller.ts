import { NextFunction, Request, Response } from "express";

import { EstadoAlerta, TipoAlerta } from "@prisma/client";

import * as alertaService from '../services/alerta.service.js'

export async function getAlertas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await alertaService.getAlertas({
            tipo: req.query.tipo as
                    | TipoAlerta
                    | undefined,

            estado: req.query.estado as
                      | EstadoAlerta
                      | undefined,

            instrumentoId: req.query.instrumentoId
                            ? Number(req.query.instrumentoId)
                            : undefined
        })

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getAlertaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const resultado = await alertaService.getAlertaById(id)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function revisarAlerta(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            throw new Error('Usuario autenticado no disponible')
        }

        const id = Number(req.params.id)

        const resultado = await alertaService.revisarAlerta(id, req.user.id)

        res.status(200).json({
            status: 'success',
            message: 'Alerta marcada como revisada correctamente',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}