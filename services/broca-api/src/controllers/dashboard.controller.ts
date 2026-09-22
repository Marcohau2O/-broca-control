import type { NextFunction, Request, Response } from 'express'

import { getDashboardDistribucionUsos as getDashboardDistribucionUsosService, getDashboardResumen as getDashboardResumenService, getDashboardUsos as getDashboardUsosService } from '../services/dashboard.service.js'

import type { DashboardUsosQuery } from '../validators/ashboard.validator.js'

export async function getDashboardResumen(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getDashboardResumenService()
        
        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getDashboardUsos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getDashboardUsosService(req.query as DashboardUsosQuery)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getDashboardDistribucionUsos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getDashboardDistribucionUsosService(req.query as DashboardUsosQuery)
        
        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}