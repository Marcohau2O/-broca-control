import { NextFunction, Request, Response } from "express";

import { ResultadoAuditoria } from "@prisma/client";

import * as auditoriaService from '../services/auditoria.service.js'

export async function getAuditorias(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await auditoriaService.getAuditorias({
            usuarioId: req.query.usuarioId
                        ? Number(req.query.usuarioId)
                        : undefined,

            modulo: req.query.modulo
                        ? String(req.query.modulo)
                        : undefined,

            accion: req.query.accion
                        ? String(req.query.accion)
                    : undefined,

            resultado: req.query.resultado as
                        | ResultadoAuditoria
                        | undefined,

            registroId: req.query.registroId
                        ? String(req.query.registroId)
                        : undefined,
        })

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getAuditoriaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)
        
        const resultado = await auditoriaService.getAuditoriaById(id)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}