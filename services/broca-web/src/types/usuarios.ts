export interface UsuarioRol {
    id: number
    nombre: string
    descripcion: string | null
    activo: boolean
}

export interface Usuario {
    id: number
    nombre: string
    correo: string
    activo: boolean
    rolId: number
    rol: UsuarioRol
    createdAt: string
    updatedAt: string
}

export interface UsuariosApiResponses {
    status: string

    data: {
        usuario: Usuario[]
    }
}

export interface UsuarioApiResponse {
    status: string

    data: {
        usuario: Usuario
    }
}

export interface UsuarioItem {
    id: number
    nombre: string
    correo: string
    activo: boolean
}

export interface UsuariosApiResponse {
    status: string
    data: {
        usuario: UsuarioItem[]
    }
}

export interface UpdateUsuarioPayload {
    nombre?: string
    correo?: string
    rolId?: number
}


export interface UpdateUsuarioData {
    nombre: string
    correo: string
    rolId: string
}

export interface CreateUsuarioPayload {
    nombre: string
    correo: string
    password: string
    rolId: number
}


export interface CreateUsuarioData {
    nombre: string
    correo: string
    rolId: string
    password?: string
}

//ROLES

export interface Rol {
    id: number
    nombre: string
    descripcion: string | null
    activo: boolean
}

export interface RolesApiResponse {
    status: string
    data: {
        roles: Rol[]
    }
}
