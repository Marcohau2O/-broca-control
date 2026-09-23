import type { NextFunction, Request, Response } from "express";

import * as usuarioService from '../services/usuario.service.js'

import type { CreateUsuarioBody, UpdateUsuarioBody, UpdatePasswordUsuarioBody } from "../validators/usuario.validator.js";

export async function getUsuarios(_res: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const usuario = await usuarioService.getUsuarios()

        res.status(200).json({
            status:  'success',
            data: {
                usuario
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function getUsuarioById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const usuario = await usuarioService.getUsuarioById(id)

        res.status(200).json({
            status: 'success',
            data: {
                usuario,
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function createUsuario(req: Request<unknown, unknown, CreateUsuarioBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const usuario = await usuarioService.createUsuario(req.body)

        res.status(201).json({
            status: 'success',
            message: 'Usuario creado correctamente',
            data: {
                usuario,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateUsuario(req: Request<{ id: string }, unknown, UpdateUsuarioBody>, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const usuario = await usuarioService.updateUsuario(
            id,
            req.body,
        )

        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente',
            data: {
                usuario,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updateEstadoUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params.id)

        const usuario = await usuarioService.updateEstadoUsuario(
            id,
            req.body.activo,
        )

        res.status(200).json({
            status: 'success',
            message: req.body.activo
                ? 'Usuario activado correctamente'
                : 'Usuario desactivado correctamente',
            data: {
                usuario,
            },
        })
    } catch (error) {
        next(error)
    }
}

export async function updatePasswordUsuario(
    req: Request<{ id: string }, unknown, UpdatePasswordUsuarioBody>,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = Number(req.params.id)

        await usuarioService.updatePasswordUsuario(
            id,
            req.body.password,
        )

        res.status(200).json({
            status: 'success',
            message: 'Contraseña actualizada correctamente',
        })
    } catch (error) {
        next(error)
    }
}