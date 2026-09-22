import type { Prisma } from '@prisma/client'

import prisma from '../lib/prisma.js'

import {formatFecha, resolverRangoFechas } from '../utils/date-range.js'

import type { ReporteUsosQuery, ReporteInstrumentosQuery, ReporteMovimientosQuery, ReporteBajasQuery } from '../validators/reporte.validator.js'

import { generarCsv } from '../utils/csv.js'

const reporteUsoSelect = {
    id: true,
    numeroUso: true,
    vidasAnteriores: true,
    vidasRestantes: true,
    responsableUso: true,
    observaciones: true,
    fechaHora: true,

    instrumento: {
        select: {
            id: true,
            codigo: true,
            descripcion: true,
            
            tipoInstrumento: {
                select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                },
            },
        },
    },

    usuario: {
        select: {
            id: true,
            nombre: true,
            correo: true,
        },
    },

    servicio: {
        select: {
            id: true,
            nombre: true,
        },
    },

    procedimiento: {
        select: {
            id: true,
            nombre: true,
        },
    },

    ubicacion: {
        select: {
            id: true,
            codigo: true,
            nombre: true,
        },
    },
} satisfies Prisma.UsoInstrumentoSelect

export async function getReporteUsos(query: ReporteUsosQuery) {
    const { desde, hasta, hastaExclusive, dias } = resolverRangoFechas(query)

    const where: Prisma.UsoInstrumentoWhereInput = {
        fechaHora: {
            gte: desde,
            lt: hastaExclusive,
        },
    }

    if (query.instrumentoId) {
        where.instrumentoId = Number(query.instrumentoId)
    }

    if (query.servicioId) {
        where.servicioId = Number(query.servicioId)
    }

    if (query.procedimientoId) {
        where.procedimientoId = Number(query.procedimientoId)
    }

    if (query.usuarioId) {
        where.usuarioId = Number(query.usuarioId)
    }
    
    const usos = await prisma.usoInstrumento.findMany({
        where,
        
        select: reporteUsoSelect,

        orderBy: [
            {
                fechaHora: 'desc',
            },
            {
                id: 'desc',
            },
        ],
    })

    return {
        rango: { 
            desde: formatFecha(desde),
            hasta: formatFecha(hasta),
            dias,
        },
        
        filtros: {
            instrumentoId: query.instrumentoId
                                ? Number(query.instrumentoId)
                                : null,

            servicioId: query.servicioId
                            ? Number(query.servicioId)
                            : null,

            procedimientoId: query.procedimientoId
                                ? Number(query.procedimientoId)
                                : null,

            usuarioId: query.usuarioId
                        ? Number(query.usuarioId)
                        : null,
        },
        
        resumen: {
            totalUsos: usos.length,
        },

        usos,
    }
}

export async function getReporteInstrumentos(query: ReporteInstrumentosQuery) {
    const where: Prisma.InstrumentoWhereInput = {}

    if (query.activo !== undefined) {
        where.activo = query.activo === 'true'
    }

    if (query.estadoOperativo) {
        where.estadoOperativo = query.estadoOperativo
    }

    if (query.tipoInstrumentoId) {
        where.tipoInstrumentoId = Number(query.tipoInstrumentoId)
    }

    if (query.marcaId) {
        where.marcaId = Number(query.marcaId)
    }

    if (query.modeloId) {
        where.modeloId = Number(query.modeloId)
    }

    if (query.proveedorId) {
        where.proveedorId = Number(query.proveedorId)
    }

    if (query.ubicacionId) {
        where.ubicacionId = Number(query.ubicacionId)
    }

    if (query.responsableId) {
        where.responsableId = Number(query.responsableId)
    }

    if (query.search) {
        where.OR = [
            {
                codigo: {
                    contains: query.search,
                mode: 'insensitive',
                },
            },
            {
                descripcion: {
                    contains: query.search,
                    mode: 'insensitive',
                },
            },
            {
                lote: {
                    contains: query.search,
                    mode: 'insensitive',
                },
            },
            {
                serie: {
                    contains: query.search,
                    mode: 'insensitive',
                },
            },
            {
                facturaRemision: {
                    contains: query.search,
                    mode: 'insensitive',
                },
            },
        ]
    }

    const instrumentos = await prisma.instrumento.findMany({
        where,
        select: {
            id: true,
            codigo: true,
            descripcion: true,
            lote: true,
            serie: true,
            facturaRemision: true,

            usosMaximos: true,
            usosRealizados: true,

            estadoOperativo: true,
            activo: true,

            fechaAlta: true,
            fechaBaja: true,

            tipoInstrumento: {
                select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                },
            },
            marca: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            
            modelo: {
                select: {
                    id: true,
                    nombre: true,
                },
            },

            proveedor: {
                select: {
                    id: true,
                    nombre: true,
                },
            },

            ubicacion: {
                select: {
                    id: true,
                    codigo: true,
                    nombre: true,
                },
            },

            responsable: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
        },

        orderBy: {
            codigo: 'asc',
        },
    })

    const resultado = instrumentos.map(
        (instrumento) => ({
            ...instrumento,
            vidasRestantes: Math.max(instrumento.usosMaximos - instrumento.usosRealizados,0),
        }),
    )

    return {
        filtros: {
            search: query.search ?? null,

            activo: query.activo !== undefined
                    ? query.activo === 'true'
                    : null,

            estadoOperativo: query.estadoOperativo ?? null,

            tipoInstrumentoId: query.tipoInstrumentoId
                                ? Number(query.tipoInstrumentoId)
                                : null,

            marcaId: query.marcaId
                        ? Number(query.marcaId)
                        : null,

            modeloId: query.modeloId
                        ? Number(query.modeloId)
                        : null,

            proveedorId: query.proveedorId
                            ? Number(query.proveedorId)
                            : null,

            ubicacionId: query.ubicacionId
                            ? Number(query.ubicacionId)
                            : null,

            responsableId: query.responsableId
                            ? Number(query.responsableId)
                            : null,
        },
        
        resumen: {
            totalInstrumentos: resultado.length,
            
            activos: resultado.filter((instrumento) => instrumento.activo).length,

            inactivos: resultado.filter((instrumento) => !instrumento.activo).length,

            cambioUrgente: resultado.filter((instrumento) => instrumento.estadoOperativo === 'CAMBIO_URGENTE').length,

            baja: resultado.filter((instrumento) => instrumento.estadoOperativo === 'BAJA').length,
        },
        
        instrumentos: resultado,
    }
}

export async function getReporteMovimientos(query: ReporteMovimientosQuery) {
    const { desde, hasta, hastaExclusive, dias } = resolverRangoFechas(query)

    const where: Prisma.MovimientoWhereInput = {
        fechaHora: {
            gte: desde,
            lt: hastaExclusive,
        },
    }

    if (query.instrumentoId) {
        where.instrumentoId = Number(query.instrumentoId)
    }

    if (query.usuarioId) {
        where.usuarioId = Number(query.usuarioId)
    }

    if (query.tipo) {
        where.tipo = query.tipo
    }

    const movimientos = await prisma.movimiento.findMany({
        where,

        select: {
            id: true,
            tipo: true,
            estadoAnterior: true,
            estadoNuevo: true,
            ubicacionAnterior: true,
            ubicacionNueva: true,
            descripcion: true,
            fechaHora: true,

            instrumento: {
                select: {
                    id: true,
                    codigo: true,
                    descripcion: true,

                    tipoInstrumento: {
                        select: {
                            id: true,
                            codigo: true,
                            nombre: true,
                        },
                    },
                },
            },

            usuario: {
                select: {
                    id: true,
                    nombre: true,
                    correo: true,
                },
            },
        },

        orderBy: [
            {
                fechaHora: 'desc',
            },
            {
                id: 'desc',
            },
        ],
    })

    return {
        rango: {
            desde: formatFecha(desde),
            hasta: formatFecha(hasta),
            dias,
        },

        filtros: {
            instrumentoId: query.instrumentoId
                            ? Number(query.instrumentoId)
                            : null,

            usuarioId: query.usuarioId
                        ? Number(query.usuarioId)
                        : null,

            tipo: query.tipo ?? null,
        },
        
        resumen: {
            totalMovimientos: movimientos.length,
        },

        movimientos,
    }
}

export async function getReporteBajas(query: ReporteBajasQuery) {
    const { desde, hasta, hastaExclusive, dias } = resolverRangoFechas(query)

    const where: Prisma.BajaInstrumentoWhereInput = {
        fechaBaja: {
            gte: desde,
            lt: hastaExclusive,
        },
    }

    if (query.instrumentoId) {
        where.instrumentoId = Number(query.instrumentoId)
    }

    if (query.motivoBajaId) {
        where.motivoBajaId = Number(query.motivoBajaId)
    }

    if (query.usuarioId) {
        where.usuarioId = Number(query.usuarioId)
    }

    const bajas = await prisma.bajaInstrumento.findMany({
        where,

        select: {
            id: true,
            observaciones: true,
            fechaBaja: true,

            instrumento: {
                select: {
                    id: true,
                    codigo: true,
                    descripcion: true,
                    lote: true,
                    serie: true,
                    facturaRemision: true,
                    usosMaximos: true,
                    usosRealizados: true,
                    estadoOperativo: true,
                    activo: true,
                    fechaAlta: true,
                    fechaBaja: true,

                    tipoInstrumento: {
                        select: {
                            id: true,
                            codigo: true,
                            nombre: true,
                        },
                    },

                    marca: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },

                    modelo: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },

                    ubicacion: {
                        select: {
                            id: true,
                            codigo: true,
                            nombre: true,
                        },
                    },
                },
            },

            motivoBaja: {
                select: {
                    id: true,
                    nombre: true,
                },
            },

            usuario: {
                select: {
                    id: true,
                    nombre: true,
                    correo: true,
                },
            },
        },
        orderBy: [
            {
                fechaBaja: 'desc',
            },
            {
                id: 'desc',
            },
        ],
    })

    const resultado = bajas.map(
        (baja) => ({...baja,
                instrumento: {
                    ...baja.instrumento,
                    vidasRestantes: Math.max(baja.instrumento.usosMaximos - baja.instrumento.usosRealizados, 0
                ),
            },
        }),
    )

    return {
        rango: {
            desde: formatFecha(desde),
            hasta: formatFecha(hasta),
            dias
        },
        
        filtros: {
            instrumentoId: query.instrumentoId
                            ? Number(query.instrumentoId)
                            : null,

        motivoBajaId: query.motivoBajaId
                        ? Number(query.motivoBajaId)
                        : null,

        usuarioId: query.usuarioId
                    ? Number(query.usuarioId)
                    : null,
        },

        resumen: {
            totalBajas: resultado.length,
        },

        bajas: resultado,
    }
}

export async function exportarReporteUsos(query: ReporteUsosQuery) {
    const reporte = await getReporteUsos(query)

    const encabezados = [
        'ID',
        'Fecha y hora',
        'Código instrumento',
        'Tipo instrumento',
        'Número de uso',
        'Vidas anteriores',
        'Vidas restantes',
        'Usuario registró',
        'Responsable uso',
        'Servicio',
        'Procedimiento',
        'Ubicación',
        'Observaciones',
    ]

    const filas = reporte.usos.map(
        (uso) => [
            uso.id,
            uso.fechaHora,
            uso.instrumento.codigo,
            uso.instrumento.tipoInstrumento.nombre,
            uso.numeroUso,
            uso.vidasAnteriores,
            uso.vidasRestantes,
            uso.usuario.nombre,
            uso.responsableUso ?? '',
            uso.servicio?.nombre ?? '',
            uso.procedimiento?.nombre ?? '',
            uso.ubicacion?.nombre ?? '',
            uso.observaciones ?? '',
        ],
    )

    return generarCsv( encabezados, filas)
}

export async function exportarReporteInstrumentos(query: ReporteInstrumentosQuery) {
    const reporte = await getReporteInstrumentos(query)

    const encabezados = [
        'ID',
        'Código',
        'Descripción',
        'Tipo instrumento',
        'Marca',
        'Modelo',
        'Proveedor',
        'Lote',
        'Serie',
        'Factura / Remisión',
        'Ubicación',
        'Responsable',
        'Usos máximos',
        'Usos realizados',
        'Vidas restantes',
        'Estado operativo',
        'Activo',
        'Fecha alta',
        'Fecha baja',
    ]

    const filas = reporte.instrumentos.map(
        (instrumento) => [
            instrumento.id,
            instrumento.codigo,
            instrumento.descripcion,
            instrumento.tipoInstrumento.nombre,
            instrumento.marca?.nombre ?? '',
            instrumento.modelo?.nombre ?? '',
            instrumento.proveedor?.nombre ?? '',
            instrumento.lote ?? '',
            instrumento.serie ?? '',
            instrumento.facturaRemision ?? '',
            instrumento.ubicacion?.nombre ?? '',
            instrumento.responsable?.nombre ?? '',
            instrumento.usosMaximos,
            instrumento.usosRealizados,
            instrumento.vidasRestantes,
            instrumento.estadoOperativo,
            instrumento.activo ? 'Sí': 'No',
            instrumento.fechaAlta,
            instrumento.fechaBaja ?? '',
        ],
    )

    return generarCsv(encabezados, filas)
}

export async function exportarReporteMovimientos(query: ReporteMovimientosQuery) {
    const reporte = await getReporteMovimientos(query)

    const encabezados = [
        'ID',
        'Fecha y hora',
        'Tipo movimiento',
        'Código instrumento',
        'Tipo instrumento',
        'Estado anterior',
        'Estado nuevo',
        'Ubicación anterior',
        'Ubicación nueva',
        'Usuario',
        'Descripción',
    ]

    const filas = reporte.movimientos.map(
        (movimiento) => [
            movimiento.id,
            movimiento.fechaHora,
            movimiento.tipo,
            movimiento.instrumento.codigo,
            movimiento.instrumento.tipoInstrumento.nombre,
            movimiento.estadoAnterior ?? '',
            movimiento.estadoNuevo ?? '',
            movimiento.ubicacionAnterior ?? '',
            movimiento.ubicacionNueva ?? '',
            movimiento.usuario?.nombre,
            movimiento.descripcion ?? '',
        ],
    )

    return generarCsv(encabezados, filas)
}

export async function exportarReporteBajas(query: ReporteBajasQuery) {
    const reporte = await getReporteBajas(query)

    const encabezados = [
        'ID baja',
        'Fecha baja',
        'Código instrumento',
        'Descripción',
        'Tipo instrumento',
        'Marca',
        'Modelo',
        'Lote',
        'Serie',
        'Usos máximos',
        'Usos realizados',
        'Vidas restantes',
        'Motivo de baja',
        'Usuario',
        'Observaciones',
    ]

    const filas = reporte.bajas.map(
        (baja) => [
            baja.id,
            baja.fechaBaja,
            baja.instrumento.codigo,
            baja.instrumento.descripcion,
            baja.instrumento.tipoInstrumento.nombre,
            baja.instrumento.marca?.nombre ?? '',
            baja.instrumento.modelo?.nombre ?? '',
            baja.instrumento.lote ?? '',
            baja.instrumento.serie ?? '',
            baja.instrumento.usosMaximos,
            baja.instrumento.usosRealizados,
            baja.instrumento.vidasRestantes,
            baja.motivoBaja.nombre,
            baja.usuario.nombre,
            baja.observaciones ?? '',
        ],
    )

    return generarCsv(encabezados, filas)
}