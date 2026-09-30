import api from '@/services/api'

import type { Instrumento, InstrumentoFilters, InstrumentosResponse, InstrumentoDetalle, InstrumentoDetalleResponse, UpdateInstrumentoPayload, UpdateUbicacionInstrumentoPayload, RegistrarUsoPayload, RegistrarUsoResponse, DarBajaInstrumentoPayload, CreateInstrumentoPayload } from '@/types/instrumentos'

const getAll = async (filters: InstrumentoFilters = {}): Promise<Instrumento[]> => {
    
    const params: Record<string, string | number | boolean> = {}

    if (filters.search?.trim()) {
        params.search = filters.search.trim()
    }

    if (filters.tipoInstrumentoId) {
        params.tipoInstrumentoId = filters.tipoInstrumentoId
    }

    if (filters.marcaId) {
        params.marcaId = filters.marcaId
    }

    if (filters.modeloId) {
        params.modeloId = filters.modeloId
    }

    if (filters.proveedorId) {
        params.proveedorId = filters.proveedorId
    }

    if (filters.ubicacionId) {
        params.ubicacionId = filters.ubicacionId
    }

    if (filters.responsableId) {
        params.responsableId = filters.responsableId
    }

    if (filters.estadoOperativo) {
        params.estadoOperativo = filters.estadoOperativo
    }

    if (filters.activo !== undefined) {
        params.activo = filters.activo
    }

    const response = await api.get<InstrumentosResponse>('/instrumentos', { params })

    return response.data.data.instrumento
}

const getById = async (id: number): Promise<InstrumentoDetalle> => {

    const response = await api.get<InstrumentoDetalleResponse>(`/instrumentos/${id}`)

    return response.data.data.instrumento
}

const getByQrToken = async (qrToken: string): Promise<InstrumentoDetalle> => {

    const response = await api.get<InstrumentoDetalleResponse>(`/instrumentos/qr/${qrToken}`)

    return response.data.data.instrumento
}

const create = async (payload: CreateInstrumentoPayload): Promise<void> => {
    await api.post( '/instrumentos', payload)
}
const update = async (id: number, payload: UpdateInstrumentoPayload): Promise<void> => {
    await api.patch(`/instrumentos/${id}`, payload)
}

const updateUbicacion = async(id: number, payload: UpdateUbicacionInstrumentoPayload): Promise<void> => {
    await api.patch(`/instrumentos/${id}/ubicacion`, payload)
}

const registrarUso = async(id: number, payload: RegistrarUsoPayload, idempotencyKey: string): Promise<RegistrarUsoResponse> => {
    const response = await api.post(
        `/instrumentos/${id}/usos`, payload,
        {
            headers: {
                'Idempotency-Key': idempotencyKey
            }
        }
    )

    return response.data.data
}

const darBaja = async (id: number, payload: DarBajaInstrumentoPayload): Promise<void> => {
    await api.post(`/instrumentos/${id}/baja`, payload)
}

export const instrumentosService = {
    getAll,
    getById,
    getByQrToken,
    create,
    update,
    updateUbicacion,
    registrarUso,
    darBaja,
}