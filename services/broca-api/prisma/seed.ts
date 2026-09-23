import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada')
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const prisma = new PrismaClient({
  adapter,
})

const permisos = [
  {
    codigo: 'instrumento.ver',
    descripcion: 'Consultar instrumentos',
  },
  {
    codigo: 'instrumento.crear',
    descripcion: 'Registrar nuevos instrumentos',
  },
  {
    codigo: 'instrumento.editar',
    descripcion: 'Modificar información de instrumentos',
  },
  {
    codigo: 'uso.registrar',
    descripcion: 'Registrar el uso de un instrumento',
  },
  {
    codigo: 'baja.gestionar',
    descripcion: 'Gestionar la baja de instrumentos',
  },
  {
    codigo: 'movimiento.ver',
    descripcion: 'Consultar movimientos de instrumentos',
  },
  {
    codigo: 'reporte.ver',
    descripcion: 'Consultar reportes',
  },
  {
    codigo: 'reporte.exportar',
    descripcion: 'Exportar reportes',
  },
  {
    codigo: 'auditoria.ver',
    descripcion: 'Consultar registros de auditoría',
  },
  {
    codigo: 'usuario.crear',
    descripcion: 'Crear usuarios',
  },
  {
    codigo: 'usuario.editar',
    descripcion: 'Modificar usuarios',
  },
  {
    codigo: 'rol.administrar',
    descripcion: 'Administrar roles y permisos',
  },
  {
    codigo: 'catalogo.administrar',
    descripcion: 'Administrar catálogos del sistema',
  },
  {
    codigo: 'usuario.ver',
    descripcion: 'Consultar usuarios',
  },
  {
    codigo: 'usuario.crear',
    descripcion: 'Crear usuarios',
  },
] as const

const roles = [
  {
    nombre: 'Administrador',
    descripcion: 'Acceso completo a la administración del sistema',
  },
  {
    nombre: 'Inventarios / Almacén',
    descripcion: 'Administración y control del inventario de instrumentos',
  },
  {
    nombre: 'Usuario Operativo',
    descripcion: 'Registro y consulta de usos de instrumentos',
  },
  {
    nombre: 'Supervisor',
    descripcion: 'Supervisión, consulta de reportes y auditoría',
  },
] as const

const permisosPorRol: Record<string, string[]> = {
  Administrador: permisos.map((permiso) => permiso.codigo),

  'Inventarios / Almacén': [
    'instrumento.ver',
    'instrumento.crear',
    'instrumento.editar',
    'baja.gestionar',
    'movimiento.ver',
    'reporte.ver',
    'catalogo.administrar',
  ],

  'Usuario Operativo': [
    'instrumento.ver',
    'uso.registrar',
    'movimiento.ver',
  ],

  Supervisor: [
    'instrumento.ver',
    'movimiento.ver',
    'reporte.ver',
    'reporte.exportar',
    'auditoria.ver',
    'usuario.ver',
  ],
}

const motivosBaja = [
  {
    nombre: 'Fin de vida útil',
    descripcion:
      'El instrumento alcanzó el límite máximo permitido de usos.',
  },
  {
    nombre: 'Daño físico',
    descripcion:
      'El instrumento presenta daños físicos que impiden su utilización segura.',
  },
  {
    nombre: 'Pérdida / extravío',
    descripcion:
      'El instrumento fue reportado como perdido o extraviado.',
  },
  {
    nombre: 'Falla de funcionamiento',
    descripcion:
      'El instrumento presenta una falla que impide su funcionamiento adecuado.',
  },
  {
    nombre: 'Otro',
    descripcion: 'Motivo de baja diferente a los establecidos.',
  },
] as const

async function main() {
  console.log('Iniciando seed de BROCA CONTROL...')

  for (const permiso of permisos) {
    await prisma.permiso.upsert({
      where: {
        codigo: permiso.codigo,
      },
      update: {
        descripcion: permiso.descripcion,
      },
      create: {
        codigo: permiso.codigo,
        descripcion: permiso.descripcion,
      },
    })
  }

  console.log('Permisos creados/actualizados.')

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: {
        nombre: rol.nombre,
      },
      update: {
        descripcion: rol.descripcion,
        activo: true,
      },
      create: {
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        activo: true,
      },
    })
  }

  console.log('Roles creados/actualizados.')

  for (const [nombreRol, codigosPermisos] of Object.entries(
    permisosPorRol,
  )) {
    const rol = await prisma.rol.findUniqueOrThrow({
      where: {
        nombre: nombreRol,
      },
    })

    for (const codigoPermiso of codigosPermisos) {
      const permiso = await prisma.permiso.findUniqueOrThrow({
        where: {
          codigo: codigoPermiso,
        },
      })

      await prisma.rolPermiso.upsert({
        where: {
          rolId_permisoId: {
            rolId: rol.id,
            permisoId: permiso.id,
          },
        },
        update: {},
        create: {
          rolId: rol.id,
          permisoId: permiso.id,
        },
      })
    }
  }

  console.log('Permisos asignados a roles.')

  await prisma.tipoInstrumento.upsert({
    where: {
      codigo: 'BROCA',
    },
    update: {
      nombre: 'Broca',
      descripcion: 'Broca quirúrgica reutilizable',
      activo: true,
    },
    create: {
      codigo: 'BROCA',
      nombre: 'Broca',
      descripcion: 'Broca quirúrgica reutilizable',
      activo: true,
    },
  })

  console.log('Tipo de instrumento BROCA creado/actualizado.')

  // -------------------------------------------------------
  // 5. Motivos de baja
  // -------------------------------------------------------

  for (const motivo of motivosBaja) {
    await prisma.motivoBaja.upsert({
      where: {
        nombre: motivo.nombre,
      },
      update: {
        descripcion: motivo.descripcion,
        activo: true,
      },
      create: {
        nombre: motivo.nombre,
        descripcion: motivo.descripcion,
        activo: true,
      },
    })
  }

  console.log('Motivos de baja creados/actualizados.')

  console.log('Seed de BROCA CONTROL finalizado correctamente.')
}

main()
  .catch((error) => {
    console.error('Error ejecutando el seed:')
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })