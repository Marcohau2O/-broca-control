import api from "./api";

import type { MovimientoApi, Movimiento,MovimientosFilters, MovimientosResult, ReporteMovimientosApiResponse } from "@/types/movimientos";

const formatFecha = (fechaHora: string): string => {
    return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(fechaHora))
}

const formatHora = (fechaHora: string): string => {
    return new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(fechaHora))
}

const getDetalleSecundario = (movimiento: MovimientoApi): string | undefined => {
    if (movimiento.tipo === 'CAMBIO_UBICACION' && (movimiento.ubicacionAnterior || movimiento.ubicacionNueva)) {
        return `${
            movimiento.ubicacionAnterior ?? 'Sin ubicación'
        } → ${
            movimiento.ubicacionNueva ?? 'Sin ubicación'
        }`
    }

    if (movimiento.tipo === 'CAMBIO_ESTADO' && (movimiento.estadoAnterior || movimiento.estadoNuevo)) {
        return `${
            movimiento.estadoAnterior ?? 'Sin estado'
        } → ${
            movimiento.estadoNuevo ?? 'Sin estado'
        }`
    }

    return undefined
}

const mapMovimiento = (movimiento: MovimientoApi): Movimiento => {
    return {
        id: movimiento.id,
        fecha: formatFecha(movimiento.fechaHora),
        hora: formatHora(movimiento.fechaHora),
        instrumentoId: movimiento.instrumento.id,
        codigo: movimiento.instrumento.codigo,
        instrumento: movimiento.instrumento.descripcion ?? movimiento.instrumento.tipoInstrumento.nombre,
        tipo: movimiento.tipo,
        detalle: movimiento.descripcion ?? 'Movimiento registrado.',
        secundario: getDetalleSecundario(movimiento),
        usuario: movimiento.usuario?.nombre ?? 'Sistema',
    }
}

const getAll = async (filters: MovimientosFilters = {}): Promise<MovimientosResult> => {
    const response = await api.get<ReporteMovimientosApiResponse>(
            '/reportes/movimientos',
            {
                params: filters,
            }
        )

    return {
        total: response.data.data.resumen .totalMovimientos,

        movimientos: response.data.data.movimientos.map(mapMovimiento),
    }
}

export const movimientosService = {
    getAll,
}