export interface AuthRole {
    id: number
    nombre: string
}

export interface AuthUser {
    id: number
    nombre: string
    correo: string
    rolId?: number
    rol: AuthRole
    permisos: string[]
}

export interface LoginCredentials {
    correo: string
    password: string
}

export interface LoginData {
    token: string
    usuario: AuthUser
}

export interface LoginApiResponse {
    status: 'success'
    message: string
    data: LoginData
}

export interface MeApiResponse {
    status: 'success'
    data: {
        usuario: AuthUser
    }
}