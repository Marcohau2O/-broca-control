import api from './api'

import type { Auditoria, AuditoriasApiResponse, AuditoriaApiResponse, AuditoriaFilters } from '@/types/auditoria'

const getAll = async (filters: AuditoriaFilters = {}): Promise<Auditoria[]> => {
    const response = await api.get<AuditoriasApiResponse>('/auditoria', {
        params: filters,
    })

    return response.data.data
}

const getById = async (id: number): Promise<Auditoria> => {
    const response = await api.get<AuditoriaApiResponse>(`/auditoria/${id}`)

    return response.data.data
}

export const auditoriaService = {
    getAll,
    getById,
}