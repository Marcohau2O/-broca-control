export type CatalogKey =
    | 'tipos'
    | 'marcas'
    | 'modelos'
    | 'proveedores'
    | 'ubicaciones'
    | 'servicios'
    | 'procedimientos'
    | 'motivosBaja'

export interface CatalogItem {
    id: number
    nombre: string
    descripcion?: string | null
    activo: boolean
    codigo?: string
    marcaId?: number
    marca?: {
        id: number
        nombre: string
    } | null
    contacto?: string | null
    telefono?: string | null
    correo?: string | null
}

export interface CatalogApiResponse {
    status: 'success'
    data: Record<string, unknown>
}


export interface CatalogBasePayload {
    nombre: string
    descripcion?: string | null
}

export interface CodigoCatalogPayload
    extends CatalogBasePayload {
    codigo: string
}

export interface ModeloPayload
    extends CatalogBasePayload {
    marcaId: number
}

export interface ProveedorPayload {
    nombre: string
    contacto?: string | null
    telefono?: string | null
    correo?: string | null
}

export type CatalogPayload =
    | CatalogBasePayload
    | CodigoCatalogPayload
    | ModeloPayload
    | ProveedorPayload

export interface CatalogMutationResponse {
    status: 'success'
    message?: string
    data: Record<string, unknown>
}