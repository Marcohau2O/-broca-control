import axios from "axios";

interface ApiErrorMessage {
    message?: string
    error?: string
}

export const getApiErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError<ApiErrorMessage>(error)) {
        if (error.response?.data?.message) {
            return error.response.data.message
        }

        if (error.response?.data?.error) {
            return error.response.data.error
        }

        if (error.code === 'ECONNABORTED') {
            return 'La solicitud tardó demasiado en responder.'
        }

        if (!error.response) {
            return 'No fue posible conectar con el servidor.'
        }

        switch (error.response.status) {
            case 400:
                return 'La solicitud contiene datos inválidos.'

            case 401:
                return 'La sesión no es válida o ha expirado.'

            case 403:
                return 'No tienes permiso para realizar esta operación.'

            case 404:
                return 'El recurso solicitado no fue encontrado.'

            case 409:
                return 'La operación genera un conflicto con los datos existentes.'

            case 413:
                return 'La información enviada supera el tamaño permitido.'

            case 415:
                return 'El formato de la solicitud no es compatible.'

            case 500:
                return 'Ocurrió un error interno en el servidor.'
        }
    }

    return 'Ocurrió un error inesperado.'
}