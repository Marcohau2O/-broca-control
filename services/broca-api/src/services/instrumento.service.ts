import { randomUUID } from "node:crypto";

import { EstadoOperativo, TipoMovimiento, Prisma, TipoAlerta, ResultadoAuditoria } from "@prisma/client";

import { AppError } from "../errors/AppError.js";
import prisma from "../lib/prisma.js";

import { registrarAuditoriaSegura } from "./auditoria.service.js";

interface CreateInstrumentoInput {
    descripcion?: string
    lote?: string
    serie?: string
    facturaRemision?: string

    tipoInstrumentoId: number
    marcaId?: number
    modeloId?: number
    proveedorId?: number
    ubicacionId?: number
    responsableId?: number
}

interface CreateInstrumentosFilters {
    search?: string
    tipoInstrumentoId?: number
    marcaId?: number
    modeloId?: number
    proveedorId?: number
    ubicacionId?: number
    responsableId?: number
    estadoOperativo?: EstadoOperativo
    activo?: boolean
}

interface UpdateInstrumentoInput {
    descripcion?: string | null
    lote?: string | null
    serie?: string | null
    facturaRemision?: string | null
    marcaId?: number | null
    modeloId?: number | null
    proveedorId?: number | null
    responsableId?: number | null
}

interface UpdateUbicacionInstrumentoInput {
    ubicacionId: number
    observaciones?: string
}

interface UpdateEstadoInstrumentoInput {
    estadoOperativo: EstadoOperativo
    observaciones?: string
}

interface RegistrarUsoInstrumentoInput {
    procedimientoId?: number
    servicioId?: number
    ubicacionId?: number
    responsableUso?: string
    observaciones?: string
}

interface BajaInstrumentoInput {
    motivoBajaId: number
    observaciones?: string
}

const usoInstrumentoSelect = {
    id: true,
    instrumentoId: true,
    numeroUso: true,

    vidasAnteriores: true,
    vidasRestantes: true,

    responsableUso: true,
    observaciones: true,
    fechaHora: true,

    usuario: {
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

    servicio: {
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

const instrumentoDetalleInclude = {
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
            contacto: true,
            telefono: true,
            correo: true,
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
            correo: true,
        },
    },

    usos: {
        orderBy: {
            numeroUso: 'desc' as const,
        },

        select: usoInstrumentoSelect,
    },

    movimientos: {
        orderBy: {
            fechaHora: 'desc' as const,
        },

        select: {
            id: true,
            tipo: true,
            estadoAnterior: true,
            estadoNuevo: true,
            ubicacionAnterior: true,
            ubicacionNueva: true,
            descripcion: true,
            fechaHora: true,

            usuario: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
        },
    },
} satisfies Prisma.InstrumentoInclude

function formatInstrumentoDetalle<T extends { usosMaximos: number, usosRealizados: number}>(instrumento: T) {
    return {
        ...instrumento,

        vidasRestantes: Math.max(instrumento.usosMaximos - instrumento.usosRealizados, 0),
    }
}


async function validateRelations(data: CreateInstrumentoInput) {
    const tipoInstrumento  = await prisma.tipoInstrumento.findUnique({
        where: {
            id: data.tipoInstrumentoId,
        },
        select: {
            id: true,
            codigo: true,
            activo: true
        },
    })

    if (!tipoInstrumento) {
        throw new AppError('Tipo de instrumento no encontrado', 404, 'TIPO_INSTRUMENTO_NOT_FOUND')
    }

    if (!tipoInstrumento.activo) {
        throw new AppError('El tipo de instrumento se encuentra inactivo', 409, 'TIPO_INSTRUMENTO_INACTIVE')
    }
    
    if (data.marcaId !== undefined) {
        const marca = await prisma.marca.findUnique({
            where: {
                id: data.marcaId,
            },
            select: {
                id: true,
                activo: true
            },
        })

        if (!marca) {
            throw new AppError('Marca no encontrada', 404, 'MARCA_NOT_FOUND')
        }

        if (!marca.activo) {
            throw new AppError('La marca se encuentra inactiva', 409, 'MARCA_INACTIVE')
        }
    }

    if (data.modeloId !== undefined) {
        const modelo = await prisma.modelo.findUnique({
            where: {
                id: data.modeloId,
            },
            select: {
                id: true,
                marcaId: true,
                activo: true
            },
        })

        if (!modelo) {
            throw new AppError('Modelo no encontrado', 404, 'MODELO_NOT_FOUND')
        }

        if (!modelo.activo) {
            throw new AppError('El modelo se encuentra inactivo', 409, 'MODELO_INACTIVE')
        }

        if (data.marcaId === undefined) {
        throw new AppError('Debes especificar la marca cuando seleccionas un modelo', 400, 'MARCA_REQUIRED_FOR_MODELO')
        }

        if (modelo.marcaId !== data.marcaId) {
        throw new AppError('El modelo no pertenece a la marca seleccionada', 409, 'MODELO_MARCA_MISMATCH')
        }
    }

    if (data.proveedorId !== undefined) {
        const proveedor = await prisma.proveedor.findUnique({
            where: {
                id: data.proveedorId,
            },
            select: {
                id: true,
                activo: true
            },
        })

        if (!proveedor) {
            throw new AppError('Proveedor no encontrado', 404, 'PROVEEDOR_NOT_FOUND')
        }

        if (!proveedor.activo) {
            throw new AppError('El proveedor se encuentra inactivo', 409, 'PROVEEDOR_INACTIVE')
        }
    }

    if (data.ubicacionId !== undefined) {
        const ubicacion = await prisma.ubicacion.findUnique({
            where: {
                id: data.ubicacionId,
            },
            select: {
                id: true,
                activo: true,
            },
        })

        if (!ubicacion) {
            throw new AppError('Ubicación no encontrada', 404, 'UBICACION_NOT_FOUND')
        }

        if (!ubicacion.activo) {
            throw new AppError('La ubicación se encuentra inactiva', 409, 'UBICACION_INACTIVE')
        }
    }

    if (data.responsableId !== undefined) {
        const responsable = await prisma.usuario.findUnique({
            where: {
                id: data.responsableId,
            },
            select: {
                id: true,
                activo: true
            },
        })

        if (!responsable) {
            throw new AppError('Responsable no encontrado', 404, 'RESPONSABLE_NOT_FOUND')
        }

        if (!responsable.activo) {
            throw new AppError('El responsable se encuentra inactivo', 409, 'RESPONSABLE_INACTIVE')
        }
    }

    return tipoInstrumento
}

async function validateUsoRelations(data: RegistrarUsoInstrumentoInput) {
    if (data.procedimientoId !== undefined) {
        const procedimiento = await prisma.procedimiento.findUnique({
            where: {
                id: data.procedimientoId,
            },
            select: {
                activo: true,
            },
        })

        if (!procedimiento) {
            throw new AppError('Procedimiento no encontrado', 404, 'PROCEDIMIENTO_NOT_FOUND')
        }

        if (!procedimiento.activo) {
            throw new AppError('El procedimiento se encuentra inactivo', 409, 'PROCEDIMIENTO_INACTIVE')
        }
    }

    if (data.servicioId !== undefined) {
        const servicio = await prisma.servicio.findUnique({
            where: {
                id: data.servicioId,
            },
            select: {
                activo: true,
            },
        })

        if (!servicio) {
            throw new AppError('Servicio no encontrado', 404, 'SERVICIO_NOT_FOUND')
        }

        if (!servicio.activo) {
            throw new AppError('El servicio se encuentra inactivo', 409, 'SERVICIO_INACTIVE')
        }
    }

    if (data.ubicacionId !== undefined) {
        const ubicacion = await prisma.ubicacion.findUnique({
            where: {
                id: data.ubicacionId,
            },
            select: {
                activo: true,
            },
        })

        if (!ubicacion) {
            throw new AppError('Ubicación no encontrada', 404, 'UBICACION_NOT_FOUND')
        }
        
        if (!ubicacion.activo) {
            throw new AppError('La ubicación se encuentra inactiva')
        }
    }
}

async function registrarIntentoUsoBloqueado(instrumentoId: number, usuarioId: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id: instrumentoId,
        },
        
        select: {
            id: true,
            codigo: true,
            estadoOperativo: true,
            usosMaximos: true,
            usosRealizados: true
        },
    })

    if (!instrumento) {
        return
    }

    await prisma.$transaction(async (tx) => {
        await tx.movimiento.create({
            data: {
                instrumentoId,
                usuarioId,

                tipo: TipoMovimiento.INTENTO_USO_BLOQUEADO,

                estadoAnterior: instrumento.estadoOperativo,

                estadoNuevo: instrumento.estadoOperativo,

                descripcion: 'Intento de uso bloqueado por agotamiento de vidas',
            }
        })

        await tx.alerta.create({
            data: {
                instrumentoId,

                tipo: TipoAlerta.INTENTO_USO_BLOQUEADO,

                mensaje: `Se intentó utilizar el instrumento ${instrumento.codigo} después de agotar sus vidas.`
            },
        })
    })

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'REGISTRAR_USO',

        modulo: 'INTRUMENTO',

        registroId: instrumentoId,

        resultado: ResultadoAuditoria.RECHAZADO,

        datosAnteriores: {
            usosMaximos: instrumento.usosMaximos,

            usosRealizados: instrumento.usosRealizados,

            vidasRestantes: Math.max(
                instrumento.usosMaximos - instrumento.usosRealizados,
                0,
            ),

            estadoOperativo: instrumento.estadoOperativo,
        },

        descripcion: `Ìntento de uso rechazado para ${instrumento.codigo}: vidas agotadas`
    })
}

export async function getInstrumentos(filters: CreateInstrumentosFilters = {}) {
    const where: Prisma.InstrumentoWhereInput = {}

    if(filters.search) {
        where.OR = [
            {
                codigo: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            },
            {
                descripcion: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            },
            {
                lote: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            },
            {
                serie: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            },
            {
                facturaRemision: {
                    contains: filters.search,
                    mode: 'insensitive',
                },
            },
        ]
    }

    if (filters.tipoInstrumentoId !== undefined) {
        where.tipoInstrumentoId = filters.tipoInstrumentoId
    }

    if (filters.marcaId !== undefined) {
        where.marcaId = filters.marcaId
    }

    if (filters.modeloId !== undefined) {
        where.modeloId = filters.modeloId
    }

    if (filters.proveedorId !== undefined) {
        where.proveedorId = filters.proveedorId
    }

    if (filters.ubicacionId !== undefined) {
        where.ubicacionId = filters.ubicacionId
    }

    if (filters.responsableId !== undefined) {
        where.responsableId = filters.responsableId
    }

    if (filters.estadoOperativo !== undefined) {
        where.estadoOperativo =
        filters.estadoOperativo
    }

    if (filters.activo !== undefined) {
        where.activo = filters.activo
    }

    const instrumento = await prisma.instrumento.findMany({
        where,

        orderBy: {
            createdAt: 'desc',
        },

        select: {
            id: true,
            codigo: true,
            qrToken: true,
            descripcion: true,
            lote: true,
            serie: true,

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
                    nombre: true
                },
            },

            modelo: {
                select: {
                    id: true,
                    nombre: true
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
                    nombre: true
                },
            },
        },
    })

    return instrumento.map((instrumento) => ({
        ...instrumento,

        vidasRestantes: Math.max(instrumento.usosMaximos - instrumento.usosRealizados, 0),
    }))
}

export async function getInstrumentoById(id: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id,
        },

        include: instrumentoDetalleInclude,
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }

    return formatInstrumentoDetalle(instrumento)
}

export async function getInstrumentoByQrToken(qrToken: string) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            qrToken,
        },

        include: instrumentoDetalleInclude,
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }
    
    return formatInstrumentoDetalle(instrumento)
}

export async function getUsosInstrumento(instrumentoId: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id: instrumentoId,
        },

        select: {
            id: true,
            codigo: true,
            usosMaximos: true,
            usosRealizados: true,
            estadoOperativo: true,
        },
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }

    const usos = await prisma.usoInstrumento.findMany({
        where: {
            instrumentoId,
        },

        orderBy: {
            numeroUso: 'desc',
        },

        select: usoInstrumentoSelect,
    })

    return {
        instrumento: {
            id: instrumento.id,
            codigo: instrumento.codigo,

            usosMaximo: instrumento.usosMaximos,

            usosRealizados: instrumento.usosRealizados,

            vidasRestantes: Math.max(instrumento.usosMaximos - instrumento.usosRealizados, 0),

            estadoOperatico: instrumento.estadoOperativo,
        },

        usos,
    }
}

export async function createInstrumento(data: CreateInstrumentoInput, usuarioId: number) {
    const tipoInstrumento = await validateRelations(data)

    if (tipoInstrumento.codigo !== 'BROCA') {
        throw new AppError('Por el momento solo se permite registrar instrumento de tipo BROCA', 400, 'UNSUPPORTED_INSTRUMENT_TYPE')
    }

    const instrumentoCreado =
    await prisma.$transaction(async (tx) => {

        const qrToken = randomUUID()

        const codigoTemporal = `TMP-${randomUUID()}`

        const instrumentoInicial = await tx.instrumento.create({
            data: {
                codigo: codigoTemporal,
                qrToken,

                descripcion: data.descripcion,
                lote: data.lote,
                serie: data.serie,
                facturaRemision: data.facturaRemision,

                usosMaximos: 3,
                usosRealizados: 0,

                estadoOperativo: EstadoOperativo.DISPONIBLE,

                activo: true,

                tipoInstrumentoId: data.tipoInstrumentoId,

                marcaId: data.marcaId,
                modeloId: data.modeloId,
                proveedorId: data.proveedorId,
                ubicacionId: data.ubicacionId,
                responsableId: data.responsableId,
            },
            select: {
                id: true,
            },
        })

        const codigo = `BRC-${String(instrumentoInicial.id,).padStart(4, '0')}`

        const instrumento = await tx.instrumento.update({
            where: {
                id: instrumentoInicial.id,
            },

            data: {
                codigo,
            },

            select: {
                id: true,
                ubicacionId: true
            },
        })

        let ubicacionNueva:
            | string
            | undefined

        if (data.ubicacionId ! == undefined) {
            const ubicacion = await tx.ubicacion.findUnique({
                where: {
                    id: data.ubicacionId,
                },
                select: {
                    nombre: true,
                },
            })

            ubicacionNueva = ubicacion?.nombre
        }

        await tx.movimiento.create({
            data: {
                instrumentoId: instrumento.id,
                usuarioId,
                
                tipo: TipoMovimiento.ALTA,

                estadoNuevo: EstadoOperativo.DISPONIBLE,

                ubicacionNueva,

                descripcion: 'Alta inicial del instrumento'
            },
        })

        return instrumento
    })

    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id: instrumentoCreado.id,
        },

        include: {
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
                select:{
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
    })

    if (!instrumento) {
        throw new AppError('No fue posible recuperar el instrumento creado', 500, 'INSTRUMENT_CREATE_READ_ERROR')
    }

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'CREAR_INSTRUMENTO',

        modulo: 'INSTRUMENTO',

        registroId: instrumento.id,

        resultado: ResultadoAuditoria.EXITOSO,

        datosNuevos: {
            codigo: instrumento.codigo,

            tipoInstrumentoId: instrumento.tipoInstrumentoId,

            marcaId: instrumento.marcaId,

            modeloId: instrumento.modeloId,

            proveedorId: instrumento.proveedorId,

            ubicacionId: instrumento.ubicacionId,

            responsableId: instrumento.responsableId,

            usosMaximos: instrumento.usosMaximos,

            usosRealizados: instrumento.usosRealizados,

            estadoOperativo: instrumento.estadoOperativo,

            activo: instrumento.activo,
        },

        descripcion: `Instrumento ${instrumento.codigo} creado correctamente`
    })

    return instrumento
}

export async function updateInstrumento(id: number, data: UpdateInstrumentoInput, usuarioId: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id,
        },

        select: {
            id: true,
            codigo: true,
            activo: true,
            estadoOperativo: true,

            descripcion: true,
            lote: true,
            serie: true,
            facturaRemision: true,

            marcaId: true,
            modeloId: true,
            proveedorId: true,
            responsableId: true,
        },
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }

    if (!instrumento.activo || instrumento.estadoOperativo === EstadoOperativo.BAJA) {
        throw new AppError('No se puede modificar un instrumento dado de baja', 409, 'INSTRUMENTO_BAJA')
    }

    const finalMarcaId = data.marcaId !== undefined
                            ? data.marcaId
                            : instrumento.marcaId
    const finalModeloId = data.modeloId !== undefined
                            ? data.modeloId
                            : instrumento.modeloId

    if (finalMarcaId !==  null) {
        const marca = await prisma.marca.findUnique({
            where: {
                id: finalMarcaId,
            },
            select: {
                id: true,
                activo: true,
            },
        })

        if (!marca) {
            throw new AppError('Marca no encontrada', 404, 'MARCA_NOT_FOUND')
        }

        if (!marca.activo) {
            throw new AppError('La marca se encuentra inactiva', 409, 'MARCA_INACTIVE')
        }
    }

    if (finalModeloId !== null) {
        const modelo = await prisma.modelo.findUnique({
            where: {
                id: finalModeloId,
            },
            select: {
                id: true,
                marcaId: true,
                activo: true,
            },
        })

        if (!modelo) {
            throw new AppError('Modelo no encontrado', 404, 'MODELO_NOT_FOUND')
        }

        if (!modelo.activo) {
            throw new AppError('El modelo se encuentra inactivo', 409, 'MODELO_INACTIVE')
        }

        if (finalMarcaId === null) {
            throw new AppError('Debes especificar una marca cuando existe un modelo', 400, 'MARCA_REQUIRED_FOR_MODELO')
        }

        if(modelo.marcaId !== finalMarcaId) {
            throw new AppError('El modelo no pertenece a la marca seleccionada', 409, 'MODELO_MARCA_MISMATCH')
        }
    }

    if (data.proveedorId !== undefined && data.proveedorId !== null) {
        const proveedor = await prisma.proveedor.findUnique({
            where: {
                id: data.proveedorId,
            },
            select: {
                activo: true,
            },
        })

        if (!proveedor) {
            throw new AppError('Proveedor no encontrado', 404, 'PROVEEDOR_NOT_FOUND')
        }

        if (!proveedor.activo) {
            throw new AppError('El proveedor se encuentra inactivo', 409, 'PROVEEDOR_INACTIVE')
        }
    }

    if (data.responsableId !== undefined && data.responsableId !== null) {
        const responsable =  await prisma.usuario.findUnique({
            where: {
                id: data.responsableId,
            },
            select: {
                activo: true,
            },
        })

        if (!responsable) {
            throw new AppError('Responsable no encontrado', 404, 'RESPONSABLE_NOT_FOUND')
        }

        if (!responsable.activo) {
            throw new AppError('El responsable se encuentra inactivo', 404, 'RESPONSABLE_INACTIVE')
        }
    }

    const actualizado = await prisma.instrumento.update({
        where: {
            id,
        },
        data,
        select: {
            id: true,
            codigo: true,

            descripcion: true,
            lote: true,
            serie: true,
            facturaRemision: true,

            marcaId: true,
            modeloId: true,
            proveedorId: true,
            responsableId: true,
        },
    })

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'EDITAR_INSTRUMENTO',

        modulo: 'INSTRUMENTO',

        registroId: id,

        resultado: ResultadoAuditoria.EXITOSO,

        datosAnteriores: {
            descripcion: instrumento.descripcion,

            lote: instrumento.lote,

            serie: instrumento.serie,

            facturaRemision: instrumento.facturaRemision,

            marcaId: instrumento.marcaId,

            modeloId: instrumento.modeloId,

            proveedorId: instrumento.proveedorId,

            responsableId: instrumento.responsableId,
        },

        datosNuevos: {
            descripcion: actualizado.descripcion,

            lote: actualizado.lote,

            serie: actualizado.serie,

            facturaRemision: actualizado.facturaRemision,

            marcaId: actualizado.marcaId,

            modeloId: actualizado.modeloId,

            proveedorId: actualizado.proveedorId,

            responsableId: actualizado.responsableId,
        },

        descripcion: `Datos administrativos del instrumento ${actualizado.codigo} actualizados`,
  })

    return getInstrumentoById(id)
}

export async function updateUbicacionInstrumento(id: number, data: UpdateUbicacionInstrumentoInput, usuarioId: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id,
        },
        include: {
            ubicacion: {
                select:{
                    id: true,
                    nombre: true,
                },
            },
        },
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }

    if (!instrumento.activo || instrumento.estadoOperativo === EstadoOperativo.BAJA) {
        throw new AppError('No se puede mover un instrumento dado de baja', 409, 'INSTRUMENTO_BAJA')
    }

    if (instrumento.ubicacionId === data.ubicacionId) {
        throw new AppError('El instrumento ya se encuentra en esta ubicación', 409, 'INSTRUMENTO_SAME_LOCATION')
    }

    const nuevaUbicacion = await prisma.ubicacion.findUnique({
        where: {
            id: data.ubicacionId,
        },
        select: {
            id: true,
            nombre: true,
            activo: true,
        },
    })

    if (!nuevaUbicacion) {
        throw new AppError('Ubicación no encontrada', 404, 'UBICACION_NOT_FOUND')
    }
    
    if (!nuevaUbicacion.activo) {
        throw new AppError('La ubicación se encuentra inactiva', 409, 'UBICACION_INACTIVE')
    }

    await prisma.$transaction(async (tx) => {
        await tx.instrumento.update({
            where: {
                id,
            },
            data: {
                ubicacionId: nuevaUbicacion.id,
            },
        })

        await tx.movimiento.create({
            data: {
                instrumentoId: id,
                usuarioId,

                tipo: TipoMovimiento.CAMBIO_UBICACION,

                estadoAnterior: instrumento.estadoOperativo,

                estadoNuevo: instrumento.estadoOperativo,

                ubicacionAnterior: instrumento.ubicacion?.nombre,

                ubicacionNueva: nuevaUbicacion.nombre,

                descripcion: data.observaciones ?? 'Cambio de ubicación del instrumento',
            },
        })
    })

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'CAMBIAR_UBICACION',

        modulo: 'INSTRUMENTO',

        registroId: id,

        resultado:
        ResultadoAuditoria.EXITOSO,

        datosAnteriores: {
        ubicacionId: instrumento.ubicacionId,

        ubicacion: instrumento.ubicacion?.nombre ?? null,
        },

        datosNuevos: {
        ubicacionId: nuevaUbicacion.id,

        ubicacion: nuevaUbicacion.nombre,
        },

        descripcion: `Ubicación del instrumento ${instrumento.codigo} actualizada`,
    })

    return getInstrumentoById(id)
}

export async function updateEstadoInstrumento(id: number, data: UpdateEstadoInstrumentoInput, usuarioId: number) {
    const instrumento = await prisma.instrumento.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            codigo: true,
            activo: true,
            estadoOperativo: true,
            usosMaximos: true,
            usosRealizados: true,
        },
    })

    if (!instrumento) {
        throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
    }

    if (!instrumento.activo || instrumento.estadoOperativo === EstadoOperativo.BAJA) {
        throw new AppError('La baja debe realizarse mediante el proceso de baja del instrumento', 404, 'USE_BAJA_PROCESS')
    }

    if (data.estadoOperativo === EstadoOperativo.BAJA) {
        throw new AppError('La baja debe realizarse mediante el proceso de baja del instrumento', 400, 'USE_BAJA_PROCESS')
    }

    if (data.estadoOperativo === EstadoOperativo.CAMBIO_URGENTE) {
        throw new AppError('El estado CAMBIO_URGENTE es administrado por el ciclo de vida del instrumento', 400, 'CAMBIO_URGENTE_AUTOMATIC')
    }

    if (instrumento.usosRealizados >= instrumento.usosMaximos){
        throw new AppError('El instrumento agotó sus vidas y requiere cambio', 409, 'INSTRUMENTO_LIFE_EXHAUSTED')
    }

    if (instrumento.estadoOperativo === data.estadoOperativo) {
        throw new AppError('El instrumento ya tiene este estado operativo', 409, 'INSTRUMENTO_SAME_STATE')
    }
    
    await prisma.$transaction(async (tx) => {
        await tx.instrumento.update({
            where: {
                id,
            },
            data: {
                estadoOperativo: data.estadoOperativo,
            },
        })

        await tx.movimiento.create({
            data: {
                instrumentoId: id,
                usuarioId,

                tipo: TipoMovimiento.CAMBIO_ESTADO,

                estadoAnterior: instrumento.estadoOperativo,

                estadoNuevo: data.estadoOperativo,

                descripcion: data.observaciones ?? 'Cambio de estado operativo del instrumento'
            },
        })
    })

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'CAMBIAR_ESTADO',

        modulo: 'INSTRUMENTO',

        registroId: id,

        resultado: ResultadoAuditoria.EXITOSO,

        datosAnteriores: {
            estadoOperativo: instrumento.estadoOperativo,
        },

        datosNuevos: {
            estadoOperativo:data.estadoOperativo,
        },

        descripcion: `Estado operativo del instrumento ${instrumento.codigo} actualizado de ${instrumento.estadoOperativo} a ${data.estadoOperativo}`,
    })

    return getInstrumentoById(id)
}


function esConflictoIdempotencia(error: unknown): boolean {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') {
        return false
    }

    const target = error.meta?.target

    if (Array.isArray(target)) {
        return target.some(
            (campo) => String(campo).includes(
                'idempotencyKey',
            ),
        )
    }

    if (typeof target === 'string' && target.includes('idempotencyKey')) {
        return true
    }

    return error.message.includes(
        'UsoInstrumento_idempotencyKey_key',
    )
}

export async function registrarUsoInstrumento(instrumentoId: number, data: RegistrarUsoInstrumentoInput, usuarioId: number, idempotencyKey: string) {
    await validateUsoRelations(data)

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            
            const instrumentos = await tx.$queryRaw<Array<{
                id: number,
                codigo: string
                usosMaximos: number
                usosRealizados: number
                estadoOperativo: EstadoOperativo
                activo: boolean
            }>
            >(Prisma.sql`
                SELECT
                "id",
                "codigo",
                "usosMaximos",
                "usosRealizados",
                "estadoOperativo",
                "activo"
                FROM "Instrumento"
                WHERE "id" = ${instrumentoId}
                FOR UPDATE
            `)

            const instrumento = instrumentos[0]

            if (!instrumento) {
                throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
            }

            const usoExistente = await tx.usoInstrumento.findUnique({
                where: {
                    idempotencyKey,
                },
                select: {
                    id: true,
                    instrumentoId: true,
                    numeroUso: true,
                    vidasAnteriores: true,
                    vidasRestantes: true,
                },
            })

            if (usoExistente) {
                if (usoExistente.instrumentoId !== instrumentoId) {
                    throw new AppError('La clave de idempotencia ya fue utilizada para otro instrumento', 409, 'IDEMPOTENCY_KEY_CONFLICT')
                }

                return {
                    usoId: usoExistente.id,

                    numeroUso: usoExistente.numeroUso,

                    vidasAnteriores: usoExistente.vidasAnteriores,

                    vidasRestantes: usoExistente.vidasRestantes,

                    estadoOperativo: instrumento.estadoOperativo,

                    reutilizado: true,
                }
            }

            if (!instrumento.activo || instrumento.estadoOperativo === EstadoOperativo.BAJA) {
                throw new AppError('El instrumento se encuentra dado de baja', 409, 'INSTRUMENTO_BAJA')
            }

            if (instrumento.usosRealizados >= instrumento.usosMaximos) {
                throw new AppError('El instrumento agotó sus vidas y requiere cambio', 409, 'INSTRUMENTO_LIFE_EXHAUSTED')
            }

            const estadoBloqueados: EstadoOperativo[] = [
                EstadoOperativo.EN_LIMPIEZA,
                EstadoOperativo.EN_MANTENIMIENTO,
                EstadoOperativo.NO_DISPONIBLE,
                EstadoOperativo.EXTRAVIADA,
                EstadoOperativo.CAMBIO_URGENTE,
                EstadoOperativo.BAJA,
            ]

            if (estadoBloqueados.includes(instrumento.estadoOperativo)) {
                throw new AppError(`El instrumento no puede utilizarse mientras se encuentre en estado ${instrumento.estadoOperativo}`, 409, 'INSTRUMENTO_NOT_AVAILABLE')
            }

            const numeroUso = instrumento.usosRealizados + 1

            const vidasAnteriores = instrumento.usosMaximos - instrumento.usosRealizados

            const vidasRestantes = instrumento.usosMaximos - numeroUso

            const esUltimoUso = vidasRestantes === 0

            const nuevoEstado = esUltimoUso ? EstadoOperativo.CAMBIO_URGENTE : EstadoOperativo.DISPONIBLE

            const usoCreado = await tx.usoInstrumento.create({
                data: {
                    instrumentoId,
                    usuarioId,

                    procedimientoId: data.procedimientoId,

                    servicioId: data.servicioId,

                    ubicacionId: data.ubicacionId,

                    numeroUso,
                    vidasAnteriores,
                    vidasRestantes,

                    responsableUso: data.responsableUso,
                    observaciones: data.observaciones,

                    idempotencyKey,
                },

                select: {
                    id: true,
                }
            })

            await tx.instrumento.update({
                where: {
                    id: instrumentoId,
                },
                data: {
                    usosRealizados: numeroUso,
                    estadoOperativo: nuevoEstado,
                },
            })

            await tx.movimiento.create({
                data: {
                    instrumentoId,
                    usuarioId,

                    tipo: TipoMovimiento.USO,

                    estadoAnterior: instrumento.estadoOperativo,

                    estadoNuevo: nuevoEstado,

                    descripcion: `Uso #${numeroUso} registrado. Vidas restantes: ${vidasRestantes}`,
                },
            })

            if (vidasRestantes === 1) {
                await tx.alerta.create({
                    data: {
                        instrumentoId,

                        tipo: TipoAlerta.VIDA_PREVENTIVA,

                        mensaje: `El instrumento ${instrumento.codigo} tiene 1 vida restante.`,
                    },
                })
            }

            if (esUltimoUso) {
                await tx.alerta.create({
                    data: {
                        instrumentoId,

                        tipo: TipoAlerta.CAMBIO_URGENTE,

                        mensaje: `El instrumento ${instrumento.codigo} agotó sus vidas y requiere cambio urgente.`,
                    },
                })

                await tx.movimiento.create({
                    data: {
                        instrumentoId,
                        usuarioId,

                        tipo: TipoMovimiento.CAMBIO_URGENTE,

                        estadoAnterior: instrumento.estadoOperativo,

                        estadoNuevo: EstadoOperativo.CAMBIO_URGENTE,

                        descripcion: 'El instrumento agotó sus vidas disponibles',
                    },
                })
            }

            return { 
                usoId: usoCreado.id, 
                numeroUso,
                vidasAnteriores,
                vidasRestantes,
                estadoOperativo: nuevoEstado,
                reutilizado: false
            }
        },
        {
            timeout: 10000,
        }
    )

    const uso = await prisma.usoInstrumento.findUnique({
        where: {
            id: resultado.usoId,
        },

        include: {
            usuario: {
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

            servicio: {
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
    })

    if (!uso) {
        throw new AppError('No fue posible recuperar el uso registrado', 500, 'USO_CREATE_ READ_ERROR')
    }

    if (!resultado.reutilizado) {
        await registrarAuditoriaSegura({
            usuarioId,

            accion: 'REGISTRAR_USO',

            modulo: 'INSTRUMENTO',

            registroId: instrumentoId,

            resultado: ResultadoAuditoria.EXITOSO,

            datosAnteriores: {
                usosRealizados: resultado.numeroUso - 1,

                vidasRestantes: resultado.vidasAnteriores,
            },

            datosNuevos: {
                usoId: uso.id,

                numeroUso: resultado.numeroUso,

                usosRealizados: resultado.numeroUso,

                vidasRestantes: resultado.vidasRestantes,

                estadoOperativo: resultado.estadoOperativo,

                procedimientoId: uso.procedimientoId,

                servicioId: uso.servicioId,

                ubicacionId: uso.ubicacionId,
            },

            descripcion: `Uso #${resultado.numeroUso} registrado correctamente`,
        })
    }

    return {
        uso, numeroUso: resultado.numeroUso, vidasAnteriores: resultado.vidasAnteriores, vidasRestantes: resultado.vidasRestantes, estadoOperativo: resultado.estadoOperativo, reutilizado: resultado.reutilizado
    }

    } catch (error) {
        if (error instanceof AppError && error.code === 'INSTRUMENTO_LIFE_EXHAUSTED') {
            await registrarIntentoUsoBloqueado(
                instrumentoId,
                usuarioId,
            )
        }

        if (esConflictoIdempotencia(error)) {
            throw new AppError('La clave de idempotencia ya fue utilizada', 409, 'IDEMPOTENCY_KEY_CONFLICT')
        }

        throw error
    }
}

export async function darBajaInstrumento(instrumentoId: number, data: BajaInstrumentoInput, usuarioId: number) {
    const motivoBaja = await prisma.motivoBaja.findUnique({
        where: {
            id: data.motivoBajaId,
        },
        
        select: {
            id: true,
            nombre: true,
            activo: true,
        },
    })

    if (!motivoBaja) {
        throw new AppError('Motivo de baja no encontrado', 404, 'MOTIVO_BAJA_NOT_FOUND')
    }

    if (!motivoBaja.activo) {
        throw new AppError('El motivo de baja se encuentra inactivo', 409, 'MOTIVO_BAJA_INACTIVE')
    }

    const resultado = await prisma.$transaction(async (tx) => {
        const instrumentos = await tx.$queryRaw<Array<{
            id: number
            codigo: string
            activo: boolean
            estadoOperativo: EstadoOperativo
            ubicacionId: number | null
        }>
        >(Prisma.sql`
            SELECT
              "id",
              "codigo",
              "activo",
              "estadoOperativo",
              "ubicacionId"
            FROM "Instrumento"
            WHERE "id" = ${instrumentoId}
            FOR UPDATE
        `)

        const instrumento = instrumentos[0]

        if (!instrumento) {
            throw new AppError('Instrumento no encontrado', 404, 'INSTRUMENTO_NOT_FOUND')
        }

        if (!instrumento.activo || instrumento.estadoOperativo === EstadoOperativo.BAJA) {
            throw new AppError('El instrumento ya se encuentra dado de baja', 409, 'INSTRUMENTO_ALREADY_BAJA')
        }

        const fechaBaja = new Date()

        const baja = await tx.bajaInstrumento.create({
            data: {
                instrumentoId,
                motivoBajaId: data.motivoBajaId,

                usuarioId,

                observaciones: data.observaciones,

                fechaBaja,
            },

            select: {
                id: true
            },
        })

        await tx.instrumento.update({
            where: {
                id: instrumentoId,
            },

            data: {
                activo: false,

                estadoOperativo: EstadoOperativo.BAJA,

                fechaBaja,
            },
        })

        await tx.movimiento.create({
            data: {
                instrumentoId,
                usuarioId,

                tipo: TipoMovimiento.BAJA,
                
                estadoAnterior: instrumento.estadoOperativo,

                estadoNuevo: EstadoOperativo.BAJA,

                descripcion: `Instrumento dado de baja. Motivo: ${motivoBaja.nombre}`,
            },
        })

        return {
            bajaId: baja.id,
        }
    }, 
    {
        timeout: 10000,
    }
    )
    
    const baja = await prisma.bajaInstrumento.findUnique({
        where: {
            id: resultado.bajaId,
        },

        include: {
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
                },
            },

            instrumento: {
                select: {
                    id: true,
                    codigo: true,
                    activo: true,
                    estadoOperativo: true,
                    fechaBaja: true,
                },
            },
        },
    })

    if (!baja) {
        throw new AppError('No fue posible recuperar la baja registrada', 500, 'BAJA_CREATE_READ_ERROR')
    }

    await registrarAuditoriaSegura({
        usuarioId,

        accion: 'DAR_BAJA',

        modulo: 'INSTRUMENTO',

        registroId: instrumentoId,

        resultado: ResultadoAuditoria.EXITOSO,

        datosNuevos: {
            estadoOperativo: EstadoOperativo.BAJA,

            activo: false,

            motivoBajaId: data.motivoBajaId,

            bajaId: baja.usuario,
        },

        descripcion: `Instrumento ${baja.instrumento.codigo} dado de baja`,
    })

    return baja
}