import api from './api'

import type {ApiResponse, DashboardDistribucionUsos, DashboardResumen, DashboardUsos, DashboardUsosParams } from '@/types/dashboard'

const getResumen = async (): Promise<DashboardResumen> => {
        const response =await api.get<ApiResponse<DashboardResumen>>('/dashboard/resumen')
        
        return response.data.data
}

const getUsos = async (params?: DashboardUsosParams): Promise<DashboardUsos> => {
        const response = await api.get<ApiResponse<DashboardUsos>>('/dashboard/usos', {params})

        return response.data.data
}

const getDistribucionUsos = async (params?: DashboardUsosParams): Promise<DashboardDistribucionUsos> => {
        const response = await api.get<ApiResponse<DashboardDistribucionUsos>>('/dashboard/distribucion-usos', {params})

        return response.data.data
}

export const dashboardService = {
    getResumen, getUsos, getDistribucionUsos,
}