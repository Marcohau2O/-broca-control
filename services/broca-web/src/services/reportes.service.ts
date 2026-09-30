import api from "./api";

import type { EstadoOperativo,
    ReporteInstrumentos,
    ReporteInstrumentosFilters,
    ReporteInstrumentosApiResponse,
    ReporteUsos,
    ReporteUsosFilters,
    ReporteUsosApiResponse,
    ReporteMovimientosFilters,
    ReporteMovimientos,
    ReporteMovimientosApiResponse,
    ReporteBajasFilters,
    ReporteBajas,
    ReporteBajasApiResponse } from "@/types/reportes";


const downloadCsv = (data: BlobPart, filename: string) => {
    const blob = new Blob(
        [data],
        {
            type: 'text/csv;charset=utf-8;',
        }
    )

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
}

const getInstrumentos = async (filters: ReporteInstrumentosFilters = {}): Promise<ReporteInstrumentos> => {
    const response = await api.get<ReporteInstrumentosApiResponse>('/reportes/instrumentos',
            {
                params: filters,
            }
        )

    return response.data.data
}

const getUsos = async (filters: ReporteUsosFilters = {}): Promise<ReporteUsos> => {
    const response = await api.get<ReporteUsosApiResponse>(
            '/reportes/usos',
            {
                params: filters,
            }
        )

    return response.data.data
}

const getMovimientos = async (filters: ReporteMovimientosFilters = {}): Promise<ReporteMovimientos> => {
    const response = await api.get<ReporteMovimientosApiResponse>('/reportes/movimientos',
            {
                params: filters,
            }
        )

    return response.data.data
}

const getBajas = async (filters: ReporteBajasFilters = {}): Promise<ReporteBajas> => {
    const response =
        await api.get<ReporteBajasApiResponse>( '/reportes/bajas',
            {
                params: filters,
            }
        )

    return response.data.data
}

const exportInstrumentos = async (filters: ReporteInstrumentosFilters = {}): Promise<void> => {
    const response = await api.get('/reportes/instrumentos/exportar',
        {
            params: filters,
            responseType: 'blob',
        }
    )

    downloadCsv(response.data, 'reporte-instrumentos.csv')
}

const exportUsos = async (filters: ReporteUsosFilters = {}): Promise<void> => {
    const response = await api.get('/reportes/usos/exportar',
        {
            params: filters,
            responseType: 'blob',
        }
    )

    downloadCsv(response.data, 'reporte-usos.csv')
}

const exportMovimientos = async (filters: ReporteMovimientosFilters = {}): Promise<void> => {
    const response = await api.get('/reportes/movimientos/exportar',
        {
            params: filters,
            responseType: 'blob',
        }
    )

    downloadCsv(response.data, 'reporte-movimientos.csv')
}

const exportBajas = async (filters: ReporteBajasFilters = {}): Promise<void> => {
    const response = await api.get('/reportes/bajas/exportar',
        {
            params: filters,
            responseType: 'blob',
        }
    )

    downloadCsv(response.data, 'reporte-bajas.csv')
}


export const reportesService = {
    getInstrumentos,
    getUsos,
    getMovimientos,
    getBajas,

    exportInstrumentos,
    exportUsos,
    exportMovimientos,
    exportBajas,
}