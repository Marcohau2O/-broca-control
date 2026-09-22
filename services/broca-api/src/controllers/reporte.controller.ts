import type { NextFunction, Request, Response } from 'express'

import { 
    getReporteUsos as getReporteUsosService,
    getReporteInstrumentos as getReporteInstrumentosService,
    getReporteMovimientos as getReporteMovimientosService,
    getReporteBajas as getReporteBajasService,
    exportarReporteUsos as exportarReporteUsosService,
    exportarReporteBajas as exportarReporteBajasService,
    exportarReporteInstrumentos as exportarReporteInstrumentosService,
    exportarReporteMovimientos as exportarReporteMovimientosService,
} from '../services/reporte.service.js'

import type { ReporteUsosQuery, ReporteInstrumentosQuery, ReporteMovimientosQuery, ReporteBajasQuery } from '../validators/reporte.validator.js'


function enviarCsv(res: Response, csv: string, nombre: string): void {
    const fecha = new Date().toISOString().slice(0, 10)

    res.setHeader(
        'Content-Type',
        'text/csv; charset=utf-8',
    )

    res.setHeader(
        'Content-Disposition',
        `attachment; filename="${nombre}-${fecha}.csv"`,
    )

    res.status(200).send(csv)
}

export async function getReporteUsos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getReporteUsosService(req.query as ReporteUsosQuery)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getReporteInstrumentos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getReporteInstrumentosService(req.query as ReporteInstrumentosQuery)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getReporteMovimientos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getReporteMovimientosService(req.query as ReporteMovimientosQuery)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function getReporteBajas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const resultado = await getReporteBajasService(req.query as ReporteBajasQuery)

        res.status(200).json({
            status: 'success',
            data: resultado,
        })
    } catch (error) {
        next(error)
    }
}

export async function exportarReporteUsos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const csv = await exportarReporteUsosService(req.query as ReporteUsosQuery)

        const fecha = new Date().toISOString().slice(0, 10)

        res.setHeader(
            'Content-Type',
            'text/csv; charset=utf-8',
        )

        res.setHeader(
            'Content-Disposition',
            `attachment; filename="reporte-usos-${fecha}.csv"`,
        )

        res.status(200).send(csv)
    } catch (error) {
        next(error)
    }
}

export async function exportarReporteInstrumentos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const csv = await exportarReporteInstrumentosService(
            req.query as ReporteInstrumentosQuery,
        )
        
        enviarCsv(res, csv, 'reporte-instrumentos')
    } catch (error) {
        next(error)
    }
}

export async function exportarReporteMovimientos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const csv = await exportarReporteMovimientosService(
            req.query as ReporteMovimientosQuery,
        )

        enviarCsv(res, csv, 'reporte-movimientos')
    } catch (error) {
        next(error)
    }
}

export async function exportarReporteBajas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const csv = await exportarReporteBajasService(
            req.query as ReporteBajasQuery,
        )

        enviarCsv(res, csv, 'reporte-bajas')
    } catch (error) {
        next(error)
    }
}