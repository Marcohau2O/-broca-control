import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
    throw new Error('La variable VITE_API_URL no está configurada.')
}

const api = axios.create({
    baseURL: API_URL,

    headers: {
        Accept: 'application/json',
    },

    timeout: 150000
})

api.interceptors.request.use(
    (
        config: InternalAxiosRequestConfig
    ) => {
        const token = localStorage.getItem('broca_token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default api