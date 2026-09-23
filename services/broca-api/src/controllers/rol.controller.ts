import type { NextFunction, Request, Response } from "express";

import * as rolService from '../services/rol.service.js'

export async function getRoles(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const roles = await rolService.getRoles()

        res.status(200).json({
            status: 'success',
            data: {
                roles
            },
        })
    } catch (error) {
        next(error)
    }
}