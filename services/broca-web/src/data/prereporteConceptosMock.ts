
export type CategoriaConcepto = 'RENTA' | 'SERVICIO'

export interface ConceptoPrereporte {
    id: string
    codigo: string
    descripcion: string
    categoria: CategoriaConcepto
    cantidad: number
    precio: number
}

type ConceptosPorCirugia = Record<string, ConceptoPrereporte[]>

const STORAGE_KEY = 'broca-control-prereporte-conceptos'

function leerDatos(): ConceptosPorCirugia {
    try {
        const datos = sessionStorage.getItem(STORAGE_KEY)

        if (!datos) return {}

        const resultado: unknown = JSON.parse(datos)

        if (
            typeof resultado !== 'object' ||
            resultado === null ||
            Array.isArray(resultado)
        ) {
            return {}
        }

        return resultado as ConceptosPorCirugia
    } catch {
        return {}
    }
}

export function obtenerConceptosPrereporte(
    cirugiaId: number
): ConceptoPrereporte[] {
    return leerDatos()[String(cirugiaId)] ?? []
}

export function guardarConceptosPrereporte(
    cirugiaId: number,
    conceptos: ConceptoPrereporte[]
): void {
    const datos = leerDatos()

    datos[String(cirugiaId)] = conceptos

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}
