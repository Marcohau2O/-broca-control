export type EstadoOperativo =
    | 'DISPONIBLE'
    | 'EN_USO'
    | 'EN_LIMPIEZA'
    | 'EN_MANTENIMIENTO'
    | 'NO_DISPONIBLE'
    | 'EXTRAVIADA'
    | 'CAMBIO_URGENTE'
    | 'BAJA'

export type TipoMovimiento =
    | 'ALTA'
    | 'USO'
    | 'CAMBIO_UBICACION'
    | 'CAMBIO_ESTADO'
    | 'CAMBIO_URGENTE'
    | 'BAJA'
    | 'INTENTO_USO_BLOQUEADO'

export interface ReporteInstrumento {
    id: number
    codigo: string
    descripcion: string | null
    lote: string | null
    serie: string | null
    facturaRemision: string | null

    usosMaximos: number
    usosRealizados: number
    vidasRestantes: number

    estadoOperativo: EstadoOperativo
    activo: boolean

    fechaAlta: string
    fechaBaja: string | null

    tipoInstrumento: {
        id: number
        codigo: string
        nombre: string
    }

    marca: {
        id: number
        nombre: string
    } | null

    modelo: {
        id: number
        nombre: string
    } | null

    proveedor: {
        id: number
        nombre: string
    } | null

    ubicacion: {
        id: number
        codigo: string
        nombre: string
    } | null

    responsable: {
        id: number
        nombre: string
    } | null
}

export interface ReporteInstrumentosResumen {
    totalInstrumentos: number
    activos: number
    inactivos: number
    cambioUrgente: number
    baja: number
}

export interface ReporteInstrumentos {
    filtros: {
        search: string | null
        activo: boolean | null
        estadoOperativo: EstadoOperativo | null
        tipoInstrumentoId: number | null
        marcaId: number | null
        modeloId: number | null
        proveedorId: number | null
        ubicacionId: number | null
        responsableId: number | null
    }

    resumen: ReporteInstrumentosResumen

    instrumentos: ReporteInstrumento[]
}

export interface ReporteInstrumentosFilters {
    search?: string
    activo?: 'true' | 'false'
    estadoOperativo?: EstadoOperativo
    tipoInstrumentoId?: number
    marcaId?: number
    modeloId?: number
    proveedorId?: number
    ubicacionId?: number
    responsableId?: number
}

export interface ReporteInstrumentosApiResponse {
    status: string
    data: ReporteInstrumentos
}

export interface ReporteUso {
    id: number
    numeroUso: number
    vidasAnteriores: number
    vidasRestantes: number
    responsableUso: string | null
    observaciones: string | null
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
    }

    servicio: {
        id: number
        nombre: string
    } | null

    procedimiento: {
        id: number
        nombre: string
    } | null

    ubicacion: {
        id: number
        codigo: string
        nombre: string
    } | null
}

export interface ReporteUsos {
    rango: {
        desde: string
        hasta: string
        dias: number
    }

    filtros: {
        instrumentoId: number | null
        servicioId: number | null
        procedimientoId: number | null
        usuarioId: number | null
    }

    resumen: {
        totalUsos: number
    }

    usos: ReporteUso[]
}

export interface ReporteUsosFilters {
    periodo?: '7' | '30'
    desde?: string
    hasta?: string
    instrumentoId?: number
    servicioId?: number
    procedimientoId?: number
    usuarioId?: number
}

export interface ReporteUsosApiResponse {
    status: string
    data: ReporteUsos
}

export interface ReporteMovimientosFilters {
    periodo?: '7' | '30'
    desde?: string
    hasta?: string
    instrumentoId?: number
    usuarioId?: number
    tipo?: TipoMovimiento
}

export interface ReporteMovimientosApiResponse {
    status: string
    data: ReporteMovimientos
}

export interface ReporteMovimiento {
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

export interface ReporteMovimientos {
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

    movimientos: ReporteMovimiento[]
}

export interface ReporteBaja {
    id: number
    observaciones: string | null
    fechaBaja: string

    instrumento: {
        id: number
        codigo: string
        descripcion: string | null
        lote: string | null
        serie: string | null
        facturaRemision: string | null

        usosMaximos: number
        usosRealizados: number
        vidasRestantes: number

        estadoOperativo: EstadoOperativo
        activo: boolean

        fechaAlta: string
        fechaBaja: string | null

        tipoInstrumento: {
            id: number
            codigo: string
            nombre: string
        }

        marca: {
            id: number
            nombre: string
        } | null

        modelo: {
            id: number
            nombre: string
        } | null

        ubicacion: {
            id: number
            codigo: string
            nombre: string
        } | null
    }

    motivoBaja: {
        id: number
        nombre: string
    }

    usuario: {
        id: number
        nombre: string
        correo: string
    }
}

export interface ReporteBajas {
    rango: {
        desde: string
        hasta: string
        dias: number
    }

    filtros: {
        instrumentoId: number | null
        motivoBajaId: number | null
        usuarioId: number | null
    }

    resumen: {
        totalBajas: number
    }

    bajas: ReporteBaja[]
}

export interface ReporteBajasFilters {
    periodo?: '7' | '30'
    desde?: string
    hasta?: string
    instrumentoId?: number
    motivoBajaId?: number
    usuarioId?: number
}

export interface ReporteBajasApiResponse {
    status: string
    data: ReporteBajas
}
