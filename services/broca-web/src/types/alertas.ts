export type TipoAlerta =
    | 'VIDA_PREVENTIVA'
    | 'CAMBIO_URGENTE'
    | 'INTENTO_USO_BLOQUEADO'
    | 'INCONSISTENCIA_INVENTARIO'

export type EstadoAlerta =
    | 'PENDIENTE'
    | 'REVISADA'

export interface Alerta {
    id: number

    tipo: TipoAlerta
    estado: EstadoAlerta

    mensaje: string

    fechaCreacion: string
    fechaRevision: string | null

    instrumento: {
        id: number
        codigo: string
        descripcion: string | null

        usosMaximos: number
        usosRealizados: number
        vidasRestantes: number

        estadoOperativo: string

        tipoInstrumento: {
            id: number
            codigo: string
            nombre: string
        }

        ubicacion: {
            id: number
            codigo: string
            nombre: string
        } | null
    }
}