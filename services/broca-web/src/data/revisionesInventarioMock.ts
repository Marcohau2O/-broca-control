export interface RevisionMaterialMock {
  id: string
  estadoPreparacion: 'CEYE' | 'PENDIENTE' | 'DISPONIBLE' | null
  instrumentosAsignados: string[]
}

const CLAVE = 'broca-control-revisiones-inventario'

type RevisionesGuardadas = Record<string, RevisionMaterialMock[]>

function leerRevisiones(): RevisionesGuardadas {
  try {
    const contenido = sessionStorage.getItem(CLAVE)

    if (!contenido) return {}

    return JSON.parse(contenido) as RevisionesGuardadas
  } catch {
    return {}
  }
}

export function guardarRevisionInventario(
  cirugiaId: number,
  materiales: RevisionMaterialMock[]
): void {
  const revisiones = leerRevisiones()

  revisiones[String(cirugiaId)] = materiales.map((material) => ({
    ...material,
    instrumentosAsignados: [...material.instrumentosAsignados],
  }))

  sessionStorage.setItem(CLAVE, JSON.stringify(revisiones))
}

export function obtenerRevisionInventario(
  cirugiaId: number
): RevisionMaterialMock[] | null {
  return leerRevisiones()[String(cirugiaId)] ?? null
}

export type EstadoRevisionMock =
  | 'EN_REVISION_INVENTARIO'
  | 'MATERIAL_REVISADO'

const CLAVE_ESTADOS = 'broca-control-estados-revision'

export function obtenerEstadoRevision(
  cirugiaId: number
): EstadoRevisionMock | null {
  try {
    const contenido = sessionStorage.getItem(CLAVE_ESTADOS)

    if (!contenido) return null

    const estados = JSON.parse(contenido) as Record<
      string,
      EstadoRevisionMock
    >

    return estados[String(cirugiaId)] ?? null
  } catch {
    return null
  }
}

export function guardarEstadoRevision(
  cirugiaId: number,
  estado: EstadoRevisionMock
): void {
  const contenido = sessionStorage.getItem(CLAVE_ESTADOS)

  let estados: Record<string, EstadoRevisionMock> = {}

  try {
    estados = contenido ? JSON.parse(contenido) : {}
  } catch {
    estados = {}
  }

  estados[String(cirugiaId)] = estado

  sessionStorage.setItem(
    CLAVE_ESTADOS,
    JSON.stringify(estados)
  )
}