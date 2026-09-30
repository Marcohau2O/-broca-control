export type ResultadoAuditoria =
    | 'EXITOSO'
    | 'RECHAZADO'

export interface AuditoriaUsuarioRol {
    id: number
    nombre: string
}

export interface AuditoriaUsuario {
    id: number
    nombre: string
    correo: string
    rol: AuditoriaUsuarioRol
}

export interface Auditoria {
    id: number
    accion: string
    modulo: string
    registroId: string | null
    datosAnteriores: unknown | null
    datosNuevos: unknown | null
    resultado: ResultadoAuditoria
    descripcion: string | null
    fechaHora: string
    usuario: AuditoriaUsuario | null
}

export interface AuditoriasApiResponse {
    status: string
    data: Auditoria[]
}

export interface AuditoriaApiResponse {
    status: string
    data: Auditoria
}

export interface AuditoriaFilters {
    usuarioId?: number
    modulo?: string
    accion?: string
    resultado?: 'EXITOSO' | 'RECHAZADO'
    registroId?: string
}