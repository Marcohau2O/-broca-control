import { EstadoAlerta, EstadoOperativo, TipoAlerta } from "@prisma/client";

import prisma from "../lib/prisma.js";

import { DashboardUsosQuery } from "../validators/ashboard.validator.js";

import { formatFecha, resolverRangoFechas } from "../utils/date-range.js";

export async function getDashboardResumen() {
    const inicioHoy = new Date()

    inicioHoy.setHours(0, 0, 0, 0)

    const inicioUltimos7Dias = new Date(inicioHoy)

    inicioUltimos7Dias.setDate(inicioUltimos7Dias.getDate() - 6)

    const [
        instrumentosActivos,
        alertasPendientes,
        usosHoy,
        usosUltimos7Dias,
        estadosAgrupados,
        alertasAgrupadas
    ] = await Promise.all([
        prisma.instrumento.findMany({
            where: {
                activo: true,
            },

            select: {
                id: true,
                usosMaximos: true,
                usosRealizados: true,
                estadoOperativo: true
            },
        }),

        prisma.alerta.count({
            where: {
                estado: EstadoAlerta.PENDIENTE,
            },
        }),

        prisma.usoInstrumento.count({
            where: {
                fechaHora: {
                    gte: inicioHoy,
                },
            },
        }),

        prisma.usoInstrumento.count({
            where: {
                fechaHora: {
                    gte: inicioUltimos7Dias,
                },
            },
        }),

        prisma.instrumento.groupBy({
            by: [
                'estadoOperativo',
            ],

            _count: {
                _all: true,
            },
        }),

        prisma.alerta.groupBy({
            by: [
                'tipo',
            ],

            where: {
                estado: EstadoAlerta.PENDIENTE,
            },

            _count: {
                _all: true,
            },
        }),
    ])

    let tresVidas = 0
    let dosVidas = 0
    let unaVida = 0
    let ceroVidas = 0

    for (const instrumento of instrumentosActivos) {
        const vidasRestantes = Math.max(
            instrumento.usosMaximos - instrumento.usosRealizados, 0
        )

        if (vidasRestantes === 3) {
            tresVidas++
        } else if (
            vidasRestantes === 2
        ) {
            dosVidas++
        } else if (
            vidasRestantes === 1
        ) {
            unaVida++
        } else if (
            vidasRestantes === 0
        ) {
            ceroVidas++
        }
    }

    const estadosOperativos = {
        [EstadoOperativo.DISPONIBLE]: 0,
        [EstadoOperativo.EN_USO]: 0,
        [EstadoOperativo.EN_LIMPIEZA]: 0,
        [EstadoOperativo.EN_MANTENIMIENTO]: 0,
        [EstadoOperativo.NO_DISPONIBLE]: 0,
        [EstadoOperativo.EXTRAVIADA]: 0,
        [EstadoOperativo.CAMBIO_URGENTE]: 0,
        [EstadoOperativo.BAJA]: 0,
    }

    for (const estado of estadosAgrupados) {
        estadosOperativos[
            estado.estadoOperativo
        ] = estado._count._all
    }

    const alertasPorTipo = {
        [TipoAlerta.VIDA_PREVENTIVA]: 0,
        [TipoAlerta.CAMBIO_URGENTE]: 0,
        [TipoAlerta.INTENTO_USO_BLOQUEADO]: 0,
        [TipoAlerta.INCONSISTENCIA_INVENTARIO]: 0,
    }

    for (const alerta of alertasAgrupadas) {
        alertasPorTipo[
            alerta.tipo
        ] = alerta._count._all
    }

    return {
        instrumentos: {
            activos: instrumentosActivos.length,

            porVidas: {
                tres: tresVidas,

                dos: dosVidas,

                una: unaVida,

                cero: ceroVidas,
            },
            
            cambioUrgente: ceroVidas,
        },

        alertas: {
            pendientes: alertasPendientes,
            
            porTipo: alertasPorTipo,
        },

        usos: {
            hoy: usosHoy,
            
            ultimos7Dias: usosUltimos7Dias,
        },
        
        estadosOperativos,
    }
}

export async function getDashboardUsos(query: DashboardUsosQuery) {
    const { desde, hasta, hastaExclusive, dias } = resolverRangoFechas(query)

    const usos = await prisma.usoInstrumento.findMany({
        where: {
            fechaHora: {
                gte: desde,
                lt: hastaExclusive,
            },
        },

        select: {
            fechaHora: true,
        },

        orderBy: {
            fechaHora: 'asc',
        },
    })

    const conteo = new Map<string, number>()

    const cursor = new Date(desde)

    while (cursor <= hasta) {
        conteo.set(formatFecha(cursor), 0)

        cursor.setDate(cursor.getDate() + 1)
    }

    for (const uso of usos) {
        const fecha = formatFecha(uso.fechaHora)

        conteo.set(fecha, (conteo.get(fecha) ?? 0) + 1)
    }

    const serie = Array.from(conteo.entries()).map(
        ([fecha, total]) => ({
            fecha,
            total,
        }),
    )

    return {
        rango: {
            desde:formatFecha(desde),

            hasta: formatFecha(hasta),
            
            dias,
        },
        
        totalUsos:usos.length,

        serie,
    }
}

export async function getDashboardDistribucionUsos(query: DashboardUsosQuery) {
    const { desde, hasta, hastaExclusive, dias } = resolverRangoFechas(query)

    const usos = await prisma.usoInstrumento.findMany({
        where: {
            fechaHora: {
                gte: desde,
                lt: hastaExclusive,
            },
        },

        select: {
            servicioId: true,

            servicio: {
                select: {
                    id: true,
                    nombre: true,
                },
            },

            procedimientoId: true,

            procedimiento: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
        },
    })

    const servicios = new Map<number,
    {
        id: number
        nombre: string
        total: number
    }>()

    const procedimientos = new Map<number,
    {
        id: number
        nombre: string
        total: number
    }>()

    let sinServicio = 0
    let sinProcedimiento = 0
    
    for (const uso of usos) {
        if (uso.servicioId === null || uso.servicio === null) {
            sinServicio++
        } else {

            const existente = servicios.get(uso.servicio.id)
            
            if (existente) {
                
                existente.total++
            
            } else {
                servicios.set(uso.servicio.id,
                    {
                        id: uso.servicio.id,

                        nombre: uso.servicio.nombre,

                        total: 1,
                    },
                )
            }
        }
        if (uso.procedimientoId === null || uso.procedimiento === null) {
            sinProcedimiento++
        } else {
            
            const existente = procedimientos.get(uso.procedimiento.id)
            
            if (existente) {
                
                existente.total++
            
            } else {
                procedimientos.set(uso.procedimiento.id,
                    {
                        id: uso.procedimiento.id,

                        nombre: uso.procedimiento.nombre,

                        total: 1,
                    }
                )
            }
        }
    }
    
    const serviciosOrdenados = Array.from(servicios.values()).sort(
        (a, b) =>
            b.total - a.total ||
            a.nombre.localeCompare(
            b.nombre,
            ),
        )
        
    const procedimientosOrdenados = Array.from(procedimientos.values()).sort(
    (a, b) =>
        b.total - a.total ||
        a.nombre.localeCompare(
        b.nombre,
        ),
    )
    return {
        rango: {
            desde: formatFecha(desde),

            hasta: formatFecha(hasta),

            dias,
        },
            
        totalUsos: usos.length,

        servicios: serviciosOrdenados,

        procedimientos: procedimientosOrdenados,

        sinServicio,

        sinProcedimiento,
    }
}