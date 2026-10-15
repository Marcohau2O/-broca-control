
export interface EncabezadoPrereporte {
    numeroPrereporte: string
    fecha: string
    remision: string
    folioReporteCx: string
    plaza: string
    comentarios: string
}

type EncabezadosPorCirugia = Record<string, EncabezadoPrereporte>

const STORAGE_KEY = 'broca-control-prereporte-encabezados'

function leerEncabezados(): EncabezadosPorCirugia {
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

        return resultado as EncabezadosPorCirugia
    } catch {
        return {}
    }
}

export function obtenerEncabezadoPrereporte(
    cirugiaId: number
): EncabezadoPrereporte | null {
    return leerEncabezados()[String(cirugiaId)] ?? null
}

export function guardarEncabezadoPrereporte(
    cirugiaId: number,
    encabezado: EncabezadoPrereporte
): void {
    const datos = leerEncabezados()

    datos[String(cirugiaId)] = { ...encabezado }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}

export function generarNumeroPrereporte(
    fecha: string,
    usuarioId: number,
    cirugiaId: number
): string {
    const fechaCompacta = fecha.replace(/-/g, '')

    return `${fechaCompacta}-${usuarioId}-${cirugiaId}`
}
