import api from "./api";

import type { CatalogApiResponse,
    CatalogItem,
    CatalogKey,
    CatalogMutationResponse,
    CatalogPayload
 } from "@/types/catalogos";

const endpoints: Record<CatalogKey, string> = {
    tipos: '/tipos-instrumento',
    marcas: '/marca',
    modelos: '/modelos',
    proveedores: '/proveedores',
    ubicaciones: '/ubicaciones',
    servicios: '/servicios',
    procedimientos: '/procedimientos',
    motivosBaja: '/motivos-baja',
}

const extractItems = (response: CatalogApiResponse): CatalogItem[] => {
    const values = Object.values(response.data)

    const items = values.find((value) => Array.isArray(value))

    return Array.isArray(items)
    ? (items as CatalogItem[])
    : []
}

const getAll = async (catalog: CatalogKey): Promise<CatalogItem[]> => {
    const response = await api.get<CatalogApiResponse>(endpoints[catalog])

    return extractItems(response.data)
}

const create = async (catalog: CatalogKey, payload: CatalogPayload): Promise<void> => {
    await api.post<CatalogMutationResponse>(endpoints[catalog], payload)
}

const update = async (catalog: CatalogKey, id: number, payload: CatalogPayload): Promise<void> => {
    await api.patch<CatalogMutationResponse>(`${endpoints[catalog]}/${id}`, payload)
}

const updateEstado = async (catalog: CatalogKey, id: number, activo: boolean): Promise<void> => {
    await api.patch<CatalogApiResponse>(`${endpoints[catalog]}/${id}/estado`, { activo })
}


export const catalogosService = {
    getAll, create, update, updateEstado
}