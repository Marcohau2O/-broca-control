import { AppError } from '../errors/AppError.js'

export interface DateRangeQuery {
  periodo?: string
  desde?: string
  hasta?: string
}

export interface DateRange {
  desde: Date
  hasta: Date
  hastaExclusive: Date
  dias: number
}

export function formatFecha(fecha: Date): string {
  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0')
  const day = String(fecha.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function crearFechaLocal(valor: string): Date {
  const partes = valor.split('-').map(Number)

  const year = partes[0]
  const month = partes[1]
  const day = partes[2]

  if (
    year === undefined ||
    month === undefined ||
    day === undefined
  ) {
    throw new AppError(
      'Fecha inválida',
      400,
      'INVALID_DATE',
    )
  }

  const fecha = new Date(
    year,
    month - 1,
    day,
    0,
    0,
    0,
    0,
  )

  if (
    fecha.getFullYear() !== year ||
    fecha.getMonth() !== month - 1 ||
    fecha.getDate() !== day
  ) {
    throw new AppError(
      'Fecha inválida',
      400,
      'INVALID_DATE',
    )
  }

  return fecha
}

export function resolverRangoFechas(
  query: DateRangeQuery,
  periodoDefault = 7,
  maxDias = 366,
): DateRange {
  const hoy = new Date()

  hoy.setHours(0, 0, 0, 0)

  let desde: Date
  let hasta: Date

  if (query.desde && query.hasta) {
    desde = crearFechaLocal(query.desde)
    hasta = crearFechaLocal(query.hasta)

    if (desde > hasta) {
      throw new AppError(
        'La fecha desde no puede ser posterior a hasta',
        400,
        'INVALID_DATE_RANGE',
      )
    }
  } else {
    const periodo = Number(
      query.periodo ?? String(periodoDefault),
    )

    if (
      !Number.isInteger(periodo) ||
      periodo <= 0
    ) {
      throw new AppError(
        'El periodo debe ser un número entero positivo',
        400,
        'INVALID_PERIOD',
      )
    }

    hasta = new Date(hoy)
    desde = new Date(hoy)

    desde.setDate(
      desde.getDate() - (periodo - 1),
    )
  }

  let dias = 0
  const cursor = new Date(desde)

  while (cursor <= hasta) {
    dias++

    if (dias > maxDias) {
      throw new AppError(
        `El rango máximo permitido es de ${maxDias} días`,
        400,
        'DATE_RANGE_TOO_LARGE',
      )
    }

    cursor.setDate(cursor.getDate() + 1)
  }

  const hastaExclusive = new Date(hasta)

  hastaExclusive.setDate(
    hastaExclusive.getDate() + 1,
  )

  return {
    desde,
    hasta,
    hastaExclusive,
    dias,
  }
}