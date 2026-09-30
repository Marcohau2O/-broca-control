import api from './api'

import type { Alerta, EstadoAlerta, TipoAlerta } from '@/types/alertas'

export interface AlertasFilters {
    tipo?: TipoAlerta
    estado?: EstadoAlerta
    instrumentoId?: number
}

interface AlertasApiResponse {
    status: string
    data: Alerta[]
}

interface AlertaApiResponse {
    status: string
    message?: string
    data: Alerta
}

const getAll = async (filters: AlertasFilters = {}): Promise<Alerta[]> => {
    const response = await api.get<AlertasApiResponse>('/alertas', { params: filters })

    return response.data.data
}

const getById = async (
    id: number
): Promise<Alerta> => {
    const response =
await api.get<AlertaApiResponse>(`/alertas/${id}`)

    return response.data.data
}

const revisar = async (id: number): Promise<Alerta> => {
    const response = await api.patch<AlertaApiResponse>(`/alertas/${id}/revisar`, {})

    return response.data.data
}

export const alertasService = {
    getAll,
    getById,
    revisar,
}