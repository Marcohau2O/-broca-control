export interface AuthenticatedUser {
    id: number
    nombre: string
    correo: string
    rolId: number
    rol: string
    permisos: string[]
}