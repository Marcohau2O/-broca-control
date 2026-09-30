export type EstadoOperativo =
    | 'DISPONIBLE'
    | 'EN_USO'
    | 'EN_LIMPIEZA'
    | 'EN_MANTENIMIENTO'
    | 'NO_DISPONIBLE'
    | 'EXTRAVIADA'
    | 'CAMBIO_URGENTE'
    | 'BAJA'

export interface InstrumentoRelacion {
    id: number
    nombre: string
}

export interface Instrumento {
    id: number
    codigo: string
    qrToken: string

    descripcion?: string | null
    lote?: string | null
    serie?: string | null

    usosMaximos: number
    usosRealizados: number
    vidasRestantes: number

    estadoOperativo: EstadoOperativo
    activo: boolean

    creadoEn?: string
    actualizadoEn?: string

    tipoInstrumento?: InstrumentoRelacion | null
    marca?: InstrumentoRelacion | null
    modelo?: InstrumentoRelacion | null
    ubicacion?: InstrumentoRelacion | null

    responsable?: {
        id: number
        nombre: string
        correo?: string
    } | null
}

export interface InstrumentoFilters {
    search?: string
    tipoInstrumentoId?: number
    marcaId?: number
    modeloId?: number
    proveedorId?: number
    ubicacionId?: number
    responsableId?: number
    estadoOperativo?: EstadoOperativo
    activo?: boolean
}

export interface InstrumentosResponse {
    status: 'success'
    data: {
        instrumento: Instrumento[]
    }
}

export interface InstrumentoDetalleResponse {
    status: 'success'
    data: {
        instrumento: InstrumentoDetalle
    }
}

export interface InstrumentoProveedor {
    id: number
    nombre: string
    contacto: string | null
    telefono: string | null
    correo: string | null
}

export interface InstrumentoUsuario {
    id: number
    nombre: string
    correo?: string
}

export interface InstrumentoUso {
    id: number
    instrumentoId: number
    numeroUso: number
    vidasAnteriores: number
    vidasRestantes: number
    responsableUso: string | null
    observaciones: string | null
    fechaHora: string

    usuario: {
        id: number
        nombre: string
    }

    procedimiento: {
        id: number
        nombre: string
    } | null

    servicio: {
        id: number
        nombre: string
    } | null

    ubicacion: {
        id: number
        codigo: string
        nombre: string
    } | null
}

export interface InstrumentoMovimiento {
    id: number
    tipo: string
    estadoAnterior: string | null
    estadoNuevo: string | null
    ubicacionAnterior: string | null
    ubicacionNueva: string | null
    descripcion: string | null
    fechaHora: string

    usuario: {
        id: number
        nombre: string
    }
}

export interface InstrumentoDetalle {
    id: number
    codigo: string
    qrToken: string

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

    proveedor: InstrumentoProveedor | null

    ubicacion: {
        id: number
        codigo: string
        nombre: string
    } | null

    responsable: {
        id: number
        nombre: string
        correo: string
    } | null

    usos: InstrumentoUso[]
    movimientos: InstrumentoMovimiento[]
}

export interface UpdateInstrumentoPayload {
    lote?: string | null
    serie?: string | null
    marcaId?: number | null
    modeloId?: number | null
    proveedorId?: number | null
    responsableId?: number | null
}

export interface UpdateUbicacionInstrumentoPayload {
    ubicacionId: number
    obsevaciones?: string
}

export interface RegistrarUsoPayload {
    servicioId?: number
    procedimientoId?: number
    ubicacionId?: number
    responsableUso?: string
    observaciones?: string
}

export interface RegistrarUsoResponse {
    uso: unknown
    numeroUso: number
    vidasAnteriores: number
    vidasRestantes: number
    estadoOperativo: EstadoOperativo
    reutilizado: boolean
}

export interface DarBajaInstrumentoPayload {
    motivoBajaId: number
    observaciones?: string
}

export interface CreateInstrumentoPayload {
    descripcion?: string
    lote?: string
    serie?: string
    facturaRemision?: string
    tipoInstrumentoId: number
    marcaId?: number
    modeloId?: number
    proveedorId?: number
    ubicacionId?: number
    responsableId?: number
}