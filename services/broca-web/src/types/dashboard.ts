export interface DashboardResumen {
    instrumentos: {
        activos: number
        porVidas: {
            tres: number
            dos: number
            una: number
            cero: number
        }
        cambioUrgente: number
    }

    alertas: {
        pendientes: number
        porTipo: {
            VIDA_PREVENTIVA: number
            CAMBIO_URGENTE: number
            INTENTO_USO_BLOQUEADO: number
            INCONSISTENCIA_INVENTARIO: number
        }
    }

    usos: {
        hoy: number
        ultimos7Dias: number
    }

    estadosOperativos: {
        DISPONIBLE: number
        EN_USO: number
        EN_LIMPIEZA: number
        EN_MANTENIMIENTO: number
        NO_DISPONIBLE: number
        EXTRAVIADA: number
        CAMBIO_URGENTE: number
        BAJA: number
    }
}

export interface DashboardRango {
    desde: string
    hasta: string
    dias: number
}

export interface DashboardUsoSerie {
    fecha: string
    total: number
}

export interface DashboardUsos {
    rango: DashboardRango
    totalUsos: number
    serie: DashboardUsoSerie[]
}

export interface DashboardDistribucionItem {
    id: number
    nombre: string
    total: number
}

export interface DashboardDistribucionUsos {
    rango: DashboardRango
    totalUsos: number
    servicios: DashboardDistribucionItem[]
    procedimientos: DashboardDistribucionItem[]
    sinServicio: number
    sinProcedimiento: number
}

export interface ApiResponse<T> {
    status: 'success'
    data: T
}

export interface DashboardUsosParams {
    periodo?: '7' | '30'
    desde?: string
    hasta?: string
}