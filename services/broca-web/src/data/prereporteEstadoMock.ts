
export type EstadoPrereporte = 'PREREPORTE_COMPLETADO'

export interface RegistroEstadoPrereporte {
    estado: EstadoPrereporte
    usuarioId: number
    fechaFinalizacion: string
}

type EstadosPorCirugia = Record<string, RegistroEstadoPrereporte>

const STORAGE_KEY = 'broca-control-estados-prereporte'

function leerEstados(): EstadosPorCirugia {
    try {
        const datos = sessionStorage.getItem(STORAGE_KEY)

        if (!datos) return {}

        const resultado: unknown = JSON.parse(datos)

        if (
            !resultado ||
            typeof resultado !== 'object' ||
            Array.isArray(resultado)
        ) {
            return {}
        }

        const estados: EstadosPorCirugia = {}

        for (const [id, valor] of Object.entries(resultado)) {
            if (
                valor &&
                typeof valor === 'object' &&
                'estado' in valor &&
                valor.estado === 'PREREPORTE_COMPLETADO' &&
                'usuarioId' in valor &&
                typeof valor.usuarioId === 'number' &&
                'fechaFinalizacion' in valor &&
                typeof valor.fechaFinalizacion === 'string'
            ) {
                estados[id] = valor as RegistroEstadoPrereporte
            }
        }

        return estados
    } catch {
        return {}
    }
}

export function obtenerEstadoPrereporte(
    cirugiaId: number
): RegistroEstadoPrereporte | null {
    return leerEstados()[String(cirugiaId)] ?? null
}

export function finalizarPrereporte(
    cirugiaId: number,
    usuarioId: number
): RegistroEstadoPrereporte {
    const estados = leerEstados()
    const clave = String(cirugiaId)

    // Evitar modificar un pre-reporte ya finalizado.
    const existente = estados[clave]

    if (existente) {
        return existente
    }

    const registro: RegistroEstadoPrereporte = {
        estado: 'PREREPORTE_COMPLETADO',
        usuarioId,
        fechaFinalizacion: new Date().toISOString(),
    }

    estados[clave] = registro

    sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(estados)
    )

    return registro
}
