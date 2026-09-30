export type TipoMovimiento =
    | 'ALTA'
    | 'USO'
    | 'CAMBIO_UBICACION'
    | 'CAMBIO_ESTADO'
    | 'CAMBIO_URGENTE'
    | 'BAJA'
    | 'INTENTO_USO_BLOQUEADO'

export interface MovimientoApi {
    id: number
    tipo: TipoMovimiento

    estadoAnterior: string | null
    estadoNuevo: string | null

    ubicacionAnterior: string | null
    ubicacionNueva: string | null

    descripcion: string | null
    fechaHora: string

    instrumento: {
        id: number
        codigo: string
        descripcion: string | null

        tipoInstrumento: {
            id: number
            codigo: string
            nombre: string
        }
    }

    usuario: {
        id: number
        nombre: string
        correo: string
    } | null
}

export interface Movimiento {
    id: number

    fecha: string
    hora: string

    instrumentoId: number
    codigo: string
    instrumento: string

    tipo: TipoMovimiento

    detalle: string
    secundario?: string

    usuario: string
}

export interface MovimientosFilters {
    periodo?: '7' | '30'
    desde?: string
    hasta?: string
    instrumentoId?: number
    usuarioId?: number
    tipo?: TipoMovimiento
}

export interface ReporteMovimientosApiResponse {
    status: string

    data: {
        rango: {
            desde: string
            hasta: string
            dias: number
        }

        filtros: {
            instrumentoId: number | null
            usuarioId: number | null
            tipo: TipoMovimiento | null
        }

        resumen: {
            totalMovimientos: number
        }

        movimientos: MovimientoApi[]
    }
}

export interface MovimientosResult {
    total: number
    movimientos: Movimiento[]
}