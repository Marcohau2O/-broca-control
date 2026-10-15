export type EstadoSolicitudTecnico =
    | 'BORRADOR'
    | 'PENDIENTE_INVENTARIO'

export interface MaterialSolicitado {
    id: string
    referencia: string
    catalogo: string
    descripcion: string
    cantidadSolicitada: number
    requiereInstrumentoControlado: boolean
    esExtra: boolean
}

export interface SolicitudTecnico {
    id: number
    tipo: string
    fecha: string
    hora: string
    hospital: string
    paciente: string
    afiliacion: string
    cirujano: string
    estado: EstadoSolicitudTecnico
    materiales: MaterialSolicitado[]
}

const CLAVE = 'broca-control-solicitudes-tecnico'

export function obtenerSolicitudesTecnico(): SolicitudTecnico[] {
    try {
        const contenido = sessionStorage.getItem(CLAVE)

        return contenido
            ? JSON.parse(contenido) as SolicitudTecnico[]
            : []
    } catch {
        return []
    }
}

export function guardarSolicitudTecnico(
    solicitud: SolicitudTecnico
): void {
    const solicitudes = obtenerSolicitudesTecnico()

    const indice = solicitudes.findIndex(
        item => item.id === solicitud.id
    )

    if (indice >= 0) {
        solicitudes[indice] = solicitud
    } else {
        solicitudes.push(solicitud)
    }

    sessionStorage.setItem(
        CLAVE,
        JSON.stringify(solicitudes)
    )
}

export function generarIdSolicitudTecnico(): number {
    const solicitudes = obtenerSolicitudesTecnico()

    // Las cirugías de prueba existentes utilizan los ID del 1 al 4.
    return Math.max(
        4,
        ...solicitudes.map(item => item.id)
    ) + 1
}