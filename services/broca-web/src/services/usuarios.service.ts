import api from './api'

import type { UsuarioItem, UsuariosApiResponse, Usuario, UsuariosApiResponses, UsuarioApiResponse, UpdateUsuarioPayload, CreateUsuarioPayload, Rol, RolesApiResponse } from '@/types/usuarios'

const getAll = async (): Promise<UsuarioItem[]> => {
    const response = await api.get<UsuariosApiResponse>('/usuarios')
    return response.data.data.usuario
}

const getAlls = async (): Promise<Usuario[]> => {
    const response = await api.get<UsuariosApiResponses>('/usuarios')

    return response.data.data.usuario
}

const getById = async (id: number): Promise<Usuario> => {
    const response = await api.get<UsuarioApiResponse>(`/usuarios/${id}`)

    return response.data.data.usuario
}

const create = async (payload: CreateUsuarioPayload): Promise<Usuario> => {
    const response = await api.post<UsuarioApiResponse>('/usuarios',
            payload
    )

    return response.data.data.usuario
}

const update = async (id: number, payload: UpdateUsuarioPayload): Promise<Usuario> => {
    const response =await api.patch<UsuarioApiResponse>(
            `/usuarios/${id}`,
            payload
        )

    return response.data.data.usuario
}

const updateEstado = async (id: number, activo: boolean): Promise<Usuario> => {
    const response = await api.patch<UsuarioApiResponse>(`/usuarios/${id}/estado`,
            {
                activo,
            }
        )

    return response.data.data.usuario
}

const updatePassword = async (id: number, password: string): Promise<void> => {
    await api.patch(`/usuarios/${id}/password`,
        {
            password,
        }
    )
}

//ROLES

const getAllRoles = async (): Promise<Rol[]> => {
    const response = await api.get<RolesApiResponse>('/roles')

    return response.data.data.roles
}

export const usuariosService = {
    // formulario instrumento
    getAll,
    
    // usuario
    getAlls,
    getById,
    update,
    create,
    updateEstado,
    updatePassword,

    //Roles
    getAllRoles,
}