export type EstadoSolicitud =
  | 'BORRADOR'
  | 'PENDIENTE_INVENTARIO'
  | 'EN_REVISION_INVENTARIO'
  | 'MATERIAL_REVISADO'
  | 'PENDIENTE_PREREPORTE'
  | 'PREREPORTE_COMPLETADO'

export interface SolicitudCirugiaMock {
  id: number
  fecha: string
  hora: string
  tipo: string
  hospital: string
  paciente: string
  afiliacion: string
  cirujano: string
  estado: EstadoSolicitud
}

export const solicitudesCirugiaMock: SolicitudCirugiaMock[] = [
  {
    id: 1,
    fecha: '2026-10-08',
    hora: '09:00',
    tipo: 'RTC',
    hospital: 'Hospital de prueba A',
    paciente: 'Paciente de prueba 1',
    afiliacion: 'Afiliación de prueba 1',
    cirujano: 'Cirujano de prueba A',
    estado: 'PENDIENTE_INVENTARIO',
  },
  {
    id: 2,
    fecha: '2026-10-15',
    hora: '11:30',
    tipo: 'CCM TRIGEN',
    hospital: 'Hospital de prueba B',
    paciente: 'Paciente de prueba 2',
    afiliacion: 'Afiliación de prueba 2',
    cirujano: 'Cirujano de prueba B',
    estado: 'EN_REVISION_INVENTARIO',
  },
  {
    id: 3,
    fecha: '2026-10-15',
    hora: '16:00',
    tipo: 'PRÓTESIS HOMBRO',
    hospital: 'Hospital de prueba C',
    paciente: 'Paciente de prueba 3',
    afiliacion: 'Afiliación de prueba 3',
    cirujano: 'Cirujano de prueba C',
    estado: 'MATERIAL_REVISADO',
  },
  {
    id: 4,
    fecha: '2026-10-22',
    hora: '08:00',
    tipo: 'RTC',
    hospital: 'Hospital de prueba D',
    paciente: 'Paciente de prueba 4',
    afiliacion: 'Afiliación de prueba 4',
    cirujano: 'Cirujano de prueba D',
    estado: 'PENDIENTE_PREREPORTE',
  },
]

export function obtenerSolicitudCirugiaMock(id: number): SolicitudCirugiaMock | undefined {
  return solicitudesCirugiaMock.find(
    (solicitud) => solicitud.id === id
  )
}