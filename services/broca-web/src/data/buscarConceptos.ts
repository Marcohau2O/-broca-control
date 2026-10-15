import { conceptosCatalogo, type ConceptoCatalogo } from './catalogoRentasServicios'

/** Búsqueda exacta por código; ignora espacios exteriores y mayúsculas. */
export function buscarConceptoPorCodigo(codigo: string): ConceptoCatalogo | undefined {
  const clave = codigo.trim().toUpperCase()
  if (!clave) return undefined
  return conceptosCatalogo.find(item => item.codigo.toUpperCase() === clave)
}

/** Busca por fragmento de código o descripción; máximo 20 coincidencias. */
export function buscarConceptos(texto: string, limite = 20): ConceptoCatalogo[] {
  const termino = texto.trim().toLocaleUpperCase('es-MX')
  if (!termino) return []
  return conceptosCatalogo.filter(item =>
    item.codigo.toUpperCase().includes(termino) ||
    item.descripcion.toLocaleUpperCase('es-MX').includes(termino)
  ).slice(0, Math.max(0, limite))
}
