import api from "./api";

import type { AuthUser, LoginApiResponse, LoginCredentials, LoginData, MeApiResponse } from "@/types/auth";

const login = async (credentials: LoginCredentials): Promise<LoginData> => {
    const response = await api.post<LoginApiResponse>('/auth/login', credentials)

    return response.data.data
}

const me = async (): Promise<AuthUser> => {
    const response = await api.get<MeApiResponse>('/auth/me')

    return response.data.data.usuario
}

export const authService = {
    login, me
}