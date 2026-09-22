-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EstadoOperativo" AS ENUM ('DISPONIBLE', 'EN_USO', 'EN_LIMPIEZA', 'EN_MANTENIMIENTO', 'NO_DISPONIBLE', 'EXTRAVIADA', 'CAMBIO_URGENTE', 'BAJA');

-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('ALTA', 'USO', 'CAMBIO_UBICACION', 'CAMBIO_ESTADO', 'CAMBIO_URGENTE', 'BAJA', 'INTENTO_USO_BLOQUEADO');

-- CreateEnum
CREATE TYPE "TipoAlerta" AS ENUM ('VIDA_PREVENTIVA', 'CAMBIO_URGENTE', 'INTENTO_USO_BLOQUEADO', 'INCONSISTENCIA_INVENTARIO');

-- CreateEnum
CREATE TYPE "EstadoAlerta" AS ENUM ('PENDIENTE', 'REVISADA');

-- CreateEnum
CREATE TYPE "ResultadoAuditoria" AS ENUM ('EXITOSO', 'RECHAZADO', 'ERROR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permiso" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolPermiso" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "permisoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RolPermiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoInstrumento" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoInstrumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "marcaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedimiento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Procedimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivoBaja" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotivoBaja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrumento" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "qrToken" TEXT NOT NULL,
    "descripcion" TEXT,
    "lote" TEXT,
    "serie" TEXT,
    "facturaRemision" TEXT,
    "usosMaximos" INTEGER NOT NULL DEFAULT 3,
    "usosRealizados" INTEGER NOT NULL DEFAULT 0,
    "estadoOperativo" "EstadoOperativo" NOT NULL DEFAULT 'DISPONIBLE',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaAlta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaBaja" TIMESTAMP(3),
    "tipoInstrumentoId" INTEGER NOT NULL,
    "marcaId" INTEGER,
    "modeloId" INTEGER,
    "proveedorId" INTEGER,
    "ubicacionId" INTEGER,
    "responsableId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instrumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsoInstrumento" (
    "id" SERIAL NOT NULL,
    "instrumentoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "procedimientoId" INTEGER,
    "servicioId" INTEGER,
    "ubicacionId" INTEGER,
    "numeroUso" INTEGER NOT NULL,
    "vidasAnteriores" INTEGER NOT NULL,
    "vidasRestantes" INTEGER NOT NULL,
    "responsableUso" TEXT,
    "observaciones" TEXT,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsoInstrumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento" (
    "id" SERIAL NOT NULL,
    "instrumentoId" INTEGER NOT NULL,
    "usuarioId" INTEGER,
    "tipo" "TipoMovimiento" NOT NULL,
    "estadoAnterior" "EstadoOperativo",
    "estadoNuevo" "EstadoOperativo",
    "ubicacionAnterior" TEXT,
    "ubicacionNueva" TEXT,
    "descripcion" TEXT,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" SERIAL NOT NULL,
    "instrumentoId" INTEGER NOT NULL,
    "tipo" "TipoAlerta" NOT NULL,
    "estado" "EstadoAlerta" NOT NULL DEFAULT 'PENDIENTE',
    "mensaje" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaRevision" TIMESTAMP(3),

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "accion" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "registroId" TEXT,
    "datosAnteriores" JSONB,
    "datosNuevos" JSONB,
    "resultado" "ResultadoAuditoria" NOT NULL DEFAULT 'EXITOSO',
    "descripcion" TEXT,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BajaInstrumento" (
    "id" SERIAL NOT NULL,
    "instrumentoId" INTEGER NOT NULL,
    "motivoBajaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "observaciones" TEXT,
    "fechaBaja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BajaInstrumento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE INDEX "Usuario_rolId_idx" ON "Usuario"("rolId");

-- CreateIndex
CREATE INDEX "Usuario_activo_idx" ON "Usuario"("activo");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_codigo_key" ON "Permiso"("codigo");

-- CreateIndex
CREATE INDEX "RolPermiso_rolId_idx" ON "RolPermiso"("rolId");

-- CreateIndex
CREATE INDEX "RolPermiso_permisoId_idx" ON "RolPermiso"("permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "RolPermiso_rolId_permisoId_key" ON "RolPermiso"("rolId", "permisoId");

-- CreateIndex
CREATE UNIQUE INDEX "TipoInstrumento_codigo_key" ON "TipoInstrumento"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "TipoInstrumento_nombre_key" ON "TipoInstrumento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- CreateIndex
CREATE INDEX "Modelo_marcaId_idx" ON "Modelo"("marcaId");

-- CreateIndex
CREATE UNIQUE INDEX "Modelo_marcaId_nombre_key" ON "Modelo"("marcaId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_nombre_key" ON "Proveedor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Ubicacion_codigo_key" ON "Ubicacion"("codigo");

-- CreateIndex
CREATE INDEX "Ubicacion_activo_idx" ON "Ubicacion"("activo");

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_nombre_key" ON "Servicio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Procedimiento_nombre_key" ON "Procedimiento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "MotivoBaja_nombre_key" ON "MotivoBaja"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Instrumento_codigo_key" ON "Instrumento"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Instrumento_qrToken_key" ON "Instrumento"("qrToken");

-- CreateIndex
CREATE INDEX "Instrumento_estadoOperativo_idx" ON "Instrumento"("estadoOperativo");

-- CreateIndex
CREATE INDEX "Instrumento_tipoInstrumentoId_idx" ON "Instrumento"("tipoInstrumentoId");

-- CreateIndex
CREATE INDEX "Instrumento_marcaId_idx" ON "Instrumento"("marcaId");

-- CreateIndex
CREATE INDEX "Instrumento_modeloId_idx" ON "Instrumento"("modeloId");

-- CreateIndex
CREATE INDEX "Instrumento_proveedorId_idx" ON "Instrumento"("proveedorId");

-- CreateIndex
CREATE INDEX "Instrumento_ubicacionId_idx" ON "Instrumento"("ubicacionId");

-- CreateIndex
CREATE INDEX "Instrumento_responsableId_idx" ON "Instrumento"("responsableId");

-- CreateIndex
CREATE INDEX "Instrumento_usosRealizados_idx" ON "Instrumento"("usosRealizados");

-- CreateIndex
CREATE INDEX "Instrumento_activo_idx" ON "Instrumento"("activo");

-- CreateIndex
CREATE INDEX "UsoInstrumento_instrumentoId_fechaHora_idx" ON "UsoInstrumento"("instrumentoId", "fechaHora");

-- CreateIndex
CREATE INDEX "UsoInstrumento_usuarioId_idx" ON "UsoInstrumento"("usuarioId");

-- CreateIndex
CREATE INDEX "UsoInstrumento_servicioId_idx" ON "UsoInstrumento"("servicioId");

-- CreateIndex
CREATE INDEX "UsoInstrumento_procedimientoId_idx" ON "UsoInstrumento"("procedimientoId");

-- CreateIndex
CREATE INDEX "UsoInstrumento_ubicacionId_idx" ON "UsoInstrumento"("ubicacionId");

-- CreateIndex
CREATE UNIQUE INDEX "UsoInstrumento_instrumentoId_numeroUso_key" ON "UsoInstrumento"("instrumentoId", "numeroUso");

-- CreateIndex
CREATE INDEX "Movimiento_instrumentoId_fechaHora_idx" ON "Movimiento"("instrumentoId", "fechaHora");

-- CreateIndex
CREATE INDEX "Movimiento_tipo_idx" ON "Movimiento"("tipo");

-- CreateIndex
CREATE INDEX "Movimiento_usuarioId_idx" ON "Movimiento"("usuarioId");

-- CreateIndex
CREATE INDEX "Alerta_instrumentoId_idx" ON "Alerta"("instrumentoId");

-- CreateIndex
CREATE INDEX "Alerta_tipo_estado_idx" ON "Alerta"("tipo", "estado");

-- CreateIndex
CREATE INDEX "Alerta_fechaCreacion_idx" ON "Alerta"("fechaCreacion");

-- CreateIndex
CREATE INDEX "Auditoria_usuarioId_idx" ON "Auditoria"("usuarioId");

-- CreateIndex
CREATE INDEX "Auditoria_modulo_registroId_idx" ON "Auditoria"("modulo", "registroId");

-- CreateIndex
CREATE INDEX "Auditoria_fechaHora_idx" ON "Auditoria"("fechaHora");

-- CreateIndex
CREATE INDEX "Auditoria_resultado_idx" ON "Auditoria"("resultado");

-- CreateIndex
CREATE UNIQUE INDEX "BajaInstrumento_instrumentoId_key" ON "BajaInstrumento"("instrumentoId");

-- CreateIndex
CREATE INDEX "BajaInstrumento_usuarioId_idx" ON "BajaInstrumento"("usuarioId");

-- CreateIndex
CREATE INDEX "BajaInstrumento_motivoBajaId_idx" ON "BajaInstrumento"("motivoBajaId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "Permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_tipoInstrumentoId_fkey" FOREIGN KEY ("tipoInstrumentoId") REFERENCES "TipoInstrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrumento" ADD CONSTRAINT "Instrumento_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsoInstrumento" ADD CONSTRAINT "UsoInstrumento_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsoInstrumento" ADD CONSTRAINT "UsoInstrumento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsoInstrumento" ADD CONSTRAINT "UsoInstrumento_procedimientoId_fkey" FOREIGN KEY ("procedimientoId") REFERENCES "Procedimiento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsoInstrumento" ADD CONSTRAINT "UsoInstrumento_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsoInstrumento" ADD CONSTRAINT "UsoInstrumento_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditoria" ADD CONSTRAINT "Auditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BajaInstrumento" ADD CONSTRAINT "BajaInstrumento_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BajaInstrumento" ADD CONSTRAINT "BajaInstrumento_motivoBajaId_fkey" FOREIGN KEY ("motivoBajaId") REFERENCES "MotivoBaja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BajaInstrumento" ADD CONSTRAINT "BajaInstrumento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

