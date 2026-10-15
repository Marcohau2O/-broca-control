<template>
    <div class="min-h-full bg-surface">
        <div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div class="flex flex-wrap items-center gap-space-xs">
                        <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                            Programación quirúrgica
                        </span>
                        <span class="text-outline-variant">•</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Documentación quirúrgica
                        </span>
                    </div>
                    <h1 class="mt-1 font-headline-lg text-headline-lg font-bold text-on-surface">
                        Revisión de Inventario
                    </h1>
                    <p class="mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
                        Verifica la disponibilidad del material solicitado para la cirugía.
                    </p>
                    <div v-if="solicitudSeleccionada"
                        class="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
                        <span class="text-xs font-medium text-blue-600">
                            Cirugía seleccionada:
                        </span>
                        <span class="text-sm font-bold text-blue-800">
                            #{{ solicitudSeleccionada.id }}
                        </span>
                    </div>
                    <div v-else class="mb-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                        No se encontró la cirugía seleccionada.
                    </div>
                </div>
                <div>
                    <span
                        class="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        {{ estadoSolicitudTexto }}
                    </span>
                </div>
            </div>
            <div v-if="solicitudSeleccionada" class="space-y-6">
                <section class="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
                    <div class="border-b border-surface-container-high px-5 py-4 sm:px-6">
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                            <span class="material-symbols-outlined text-[20px] text-secondary" aria-hidden="true">
                                clinical_notes
                            </span>
                            Datos de la cirugía
                        </h2>
                        <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                            Información registrada por el Técnico.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                        <div v-for="dato in datosCirugia" :key="dato.label">
                            <p class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                {{ dato.label }}
                            </p>
                            <p class="mt-1 font-body-md text-body-md font-medium text-on-surface">
                                {{ dato.valor || '—' }}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
                    <div
                        class="flex flex-col gap-3 border-b border-surface-container-high px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2
                                class="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                                <span class="material-symbols-outlined text-[20px] text-secondary" aria-hidden="true">
                                    inventory_2
                                </span>
                                Material solicitado
                            </h2>
                            <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                                Revisa los materiales solicitados por el Técnico y registra su estado de preparación.
                            </p>
                        </div>
                        <span
                            class="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {{ materiales.length }} artículos
                        </span>
                    </div>
                    <div class="border-b border-surface-container-high p-5 sm:p-6">
                        <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            <div class="rounded-xl bg-surface-container-low p-4">
                                <p class="text-xs font-medium text-gray-500">
                                    Materiales
                                </p>
                                <p class="mt-1 text-2xl font-bold text-gray-900">
                                    {{ resumenInventario.total }}
                                </p>
                            </div>
                            <div class="rounded-xl bg-emerald-50 p-4">
                                <p class="text-xs font-medium text-green-700">
                                    Disponibles
                                </p>
                                <p class="mt-1 text-2xl font-bold text-green-700">
                                    {{ resumenInventario.disponibles }}
                                </p>
                            </div>
                            <div class="rounded-xl bg-amber-50 p-4">
                                <p class="text-xs font-medium text-amber-700">
                                    En CEYE
                                </p>
                                <p class="mt-1 text-2xl font-bold text-amber-700">
                                    {{ resumenInventario.ceye }}
                                </p>
                            </div>
                            <div class="rounded-xl bg-rose-50 p-4">
                                <p class="text-xs font-medium text-red-700">
                                    Pendientes
                                </p>
                                <p class="mt-1 text-2xl font-bold text-red-700">
                                    {{ resumenInventario.pendientes }}
                                </p>
                            </div>
                        </div>
                        <div v-if="asignacionesPendientes > 0"
                            class="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                            <p>
                                Hay {{ asignacionesPendientes }}
                                {{
                                    asignacionesPendientes === 1
                                        ? 'material controlado con asignación pendiente'
                                        : 'materiales controlados con asignaciones pendientes'
                                }}
                            </p>
                        </div>
                        <div v-if="preparacionesPendientes > 0"
                            class="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                            <p class="text-sm font-medium text-amber-800">
                                Hay {{ preparacionesPendientes }}
                                {{
                                    preparacionesPendientes === 1
                                        ? 'material sin estado de preparación.'
                                        : 'materiales sin estado de preparación.'
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="hidden overflow-x-auto md:block">
                        <table class="min-w-full divide-y divide-surface-container-high">
                            <thead class="bg-surface-container-low">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Referencia
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Catálogo
                                    </th>

                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Descripción
                                    </th>
                                    <th
                                        class="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Solicitado
                                    </th>

                                    <th
                                        class="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Instrumento controlado
                                    </th>
                                    <th
                                        class="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Preparación
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-surface-container-high bg-surface-container-lowest">
                                <tr v-for="material in materiales" :key="material.id"
                                    class="transition hover:bg-surface-container-low">
                                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                        {{ material.referencia || '—' }}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                        {{ material.catalogo || '—' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                                        {{ material.descripcion }}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <span
                                            class="inline-flex min-w-9 justify-center rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-700">
                                            {{ material.cantidadSolicitada }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <AsignacionInstrumentos v-if="material.requiereInstrumentoControlado"
                                            :instrumentos="instrumentosElegibles(material)"
                                            :asignados="material.instrumentosAsignados"
                                            :cantidad-requerida="cantidadAsignable(material)"
                                            :disabled="revisionCompletada"
                                            @agregar="agregarInstrumento(material, $event)"
                                            @quitar="quitarInstrumento(material, $event)" />
                                        <span v-else class="text-sm text-gray-400">
                                            No aplica
                                        </span>
                                        <p v-if="obtenerErrorAsignacion(material)"
                                            class="mt-2 text-xs font-medium text-red-600">
                                            {{ obtenerErrorAsignacion(material) }}
                                        </p>
                                    </td>
                                    <td class="px-6 py-4">
                                        <select v-model="material.estadoPreparacion" :disabled="revisionCompletada"
                                            class="w-36 rounded-lg bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-secondary disabled:cursor-not-allowed disabled:opacity-60">
                                            <option :value="null">Seleccionar</option>
                                            <option value="CEYE">CEYE</option>
                                            <option value="PENDIENTE">Pendiente</option>
                                            <option value="DISPONIBLE">Disponible</option>
                                        </select>
                                        <span v-if="material.estadoPreparacion"
                                            class="mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                                            :class="{
                                                'bg-purple-50 text-purple-700': material.estadoPreparacion === 'CEYE',
                                                'bg-amber-50 text-amber-700': material.estadoPreparacion === 'PENDIENTE',
                                                'bg-green-50 text-green-700': material.estadoPreparacion === 'DISPONIBLE',
                                            }">
                                            {{ material.estadoPreparacion }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="space-y-3 p-5 md:hidden">
                        <article v-for="material in materiales" :key="material.id"
                            class="rounded-xl border border-gray-200 bg-white p-4">
                            <p class="font-medium text-gray-900">
                                {{ material.descripcion }}
                            </p>
                            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span>
                                    Ref:
                                    <strong class="font-medium text-gray-700">
                                        {{ material.referencia || '—' }}
                                    </strong>
                                </span>
                                <span>
                                    Catálogo:
                                    <strong class="font-medium text-gray-700">
                                        {{ material.catalogo || '—' }}
                                    </strong>
                                </span>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                                <div>
                                    <p class="text-xs font-medium text-gray-500">
                                        Solicitado
                                    </p>
                                    <p class="mt-1 text-sm font-semibold text-gray-900">
                                        {{ material.cantidadSolicitada }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="material.requiereInstrumentoControlado"
                                class="mt-4 border-t border-gray-100 pt-4">
                                <AsignacionInstrumentos :instrumentos="instrumentosElegibles(material)"
                                    :asignados="material.instrumentosAsignados"
                                    :cantidad-requerida="cantidadAsignable(material)" :disabled="revisionCompletada"
                                    @agregar="agregarInstrumento(material, $event)"
                                    @quitar="quitarInstrumento(material, $event)" />
                            </div>
                            <p v-if="obtenerErrorAsignacion(material)" class="mt-2 text-xs font-medium text-red-600">
                                {{ obtenerErrorAsignacion(material) }}
                            </p>
                            <div class="mt-4 border-t border-gray-100 pt-4">
                                <label :for="`preparacion-${material.id}`"
                                    class="mb-2 block text-xs font-medium text-gray-600">
                                    Estado de preparación
                                </label>
                                <select :id="`preparacion-${material.id}`" v-model="material.estadoPreparacion"
                                    :disabled="revisionCompletada"
                                    class="w-full rounded-lg bg-surface-container-low px-3 py-2.5 font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-secondary disabled:opacity-60">
                                    <option :value="null">Seleccionar</option>
                                    <option value="CEYE">CEYE</option>
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="DISPONIBLE">Disponible</option>
                                </select>
                                <span v-if="material.estadoPreparacion"
                                    class="mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="{
                                        'bg-purple-50 text-purple-700': material.estadoPreparacion === 'CEYE',
                                        'bg-amber-50 text-amber-700': material.estadoPreparacion === 'PENDIENTE',
                                        'bg-green-50 text-green-700': material.estadoPreparacion === 'DISPONIBLE',
                                    }">
                                    {{ material.estadoPreparacion }}
                                </span>
                            </div>
                        </article>
                    </div>
                </section>
                <section class="rounded-xl bg-surface-container-lowest shadow-sm p-5 sm:p-6">
                    <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                        <span class="material-symbols-outlined text-[20px] text-secondary"
                            aria-hidden="true">fact_check</span>
                        Resumen de la revisión
                    </h2>
                    <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                        Comprueba los datos registrados antes de completar la revisión.
                    </p>
                    <div class="mt-5 grid gap-3 sm:grid-cols-2">
                        <div class="rounded-xl border border-gray-200 p-4">
                            <p class="text-sm text-gray-500">
                                Asignaciones pendientes
                            </p>
                            <p class="mt-2 text-2xl font-bold text-gray-900">
                                {{ resumenValidacion.asignacionesPendientes }}
                            </p>
                        </div>
                        <div class="rounded-xl border border-gray-200 p-4">
                            <p class="text-sm text-gray-500">
                                Preparaciones pendientes
                            </p>
                            <p class="mt-2 text-2xl font-bold text-gray-900">
                                {{ resumenValidacion.preparacionesPendientes }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-4 rounded-xl border px-4 py-3" :class="resumenValidacion.sinObservaciones
                        ? 'border-green-200 bg-green-50 text-green-800'
                        : 'border-amber-200 bg-amber-50 text-amber-800'">
                        <p>
                            {{
                                resumenValidacion.sinObservaciones
                                    ? 'No hay observaciones pendientes de registro.'
                                    : 'Existen observaciones que deben revisarse.'
                            }}
                        </p>
                    </div>
                </section>
                <div class="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                    <button type="button" @click="guardarRevision" :disabled="revisionCompletada"
                        class="w-full rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-surface-container-low sm:w-auto">
                        Guardar revisión
                    </button>
                    <button type="button" @click="completarRevision" :disabled="revisionCompletada"
                        class="w-full rounded-lg bg-secondary px-5 py-2.5 font-label-md text-label-md font-semibold text-on-secondary transition hover:bg-primary hover:text-on-primary sm:w-auto disabled:cursor-not-allowed disabled:opacity-50">
                        {{
                            revisionCompletada
                                ? 'Revisión completada'
                                : 'Completar revisión'
                        }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import AsignacionInstrumentos from '@/components/cirugias/AsignacionInstrumentos.vue'

import { obtenerSolicitudCirugiaMock } from '@/data/solicitudesCirugiaMock'

import { obtenerSolicitudesTecnico, type SolicitudTecnico, type MaterialSolicitado } from '@/data/solicitudesTecnicoMock'

import { plantillasCirugia, type MaterialPlantilla } from '@/data/plantillasCirugia'

import { guardarRevisionInventario, obtenerRevisionInventario, guardarEstadoRevision, obtenerEstadoRevision } from '@/data/revisionesInventarioMock'

const route = useRoute()

interface MaterialInventario {
    id: string
    referencia: string
    catalogo: string
    descripcion: string
    cantidadSolicitada: number
    esExtra: boolean

    requiereInstrumentoControlado: boolean
    instrumentosAsignados: string[]

    estadoPreparacion: EstadoPreparacion | null
}

interface InstrumentoDisponible {
    id: string
    codigo: string
    vidasRestantes: number
    estado: string
}

const instrumentosDisponibles: InstrumentoDisponible[] = [
    {
        id: 'demo-1',
        codigo: 'BRC-0001',
        vidasRestantes: 3,
        estado: 'DISPONIBLE',
    },
    {
        id: 'demo-2',
        codigo: 'BRC-0002',
        vidasRestantes: 2,
        estado: 'DISPONIBLE',
    },
    {
        id: 'demo-3',
        codigo: 'BRC-0003',
        vidasRestantes: 1,
        estado: 'DISPONIBLE',
    },
]

type EstadoPreparacion =
    | 'CEYE'
    | 'PENDIENTE'
    | 'DISPONIBLE'

const estadoSolicitudTexto = computed(() => {
    const estado = revisionCompletada.value
        ? 'MATERIAL_REVISADO'
        : solicitudSeleccionada.value?.estado

    const textos = {
        BORRADOR: 'Borrador',
        PENDIENTE_INVENTARIO: 'Pendiente de Inventario',
        EN_REVISION_INVENTARIO: 'En revisión de Inventario',
        MATERIAL_REVISADO: 'Material revisado',
        PENDIENTE_PREREPORTE: 'Pendiente de pre-reporte',
        PREREPORTE_COMPLETADO: 'Pre-reporte completado',
    }

    return estado ? textos[estado] : 'Sin cirugía seleccionada'
})

const resumenInventario = computed(() => {
    let disponibles = 0
    let ceye = 0
    let pendientes = 0

    materiales.value.forEach((material) => {
        if (material.estadoPreparacion === 'DISPONIBLE') {
            disponibles++
        } else if (material.estadoPreparacion === 'CEYE') {
            ceye++
        } else {
            pendientes++
        }
    })

    return {
        total: materiales.value.length,
        disponibles,
        ceye,
        pendientes,
    }
})

function instrumentosElegibles(material: MaterialInventario) {
    return instrumentosDisponibles.filter((instrumento) => {
        if (instrumento.estado !== 'DISPONIBLE' || instrumento.vidasRestantes <= 0) {
            return false
        }

        const asignadaEnOtroMaterial = materiales.value.some(
            (otroMaterial) =>
                otroMaterial.id !== material.id &&
                otroMaterial.instrumentosAsignados.includes(instrumento.id)
        )

        return !asignadaEnOtroMaterial
    })
}

function agregarInstrumento(material: MaterialInventario, instrumentoId: string) {
    if (revisionCompletada.value) return

    if (!instrumentoId) return

    const instrumento = instrumentosElegibles(material).find(
        (item) => item.id === instrumentoId
    )

    if (!instrumento) return

    if (material.instrumentosAsignados.includes(instrumentoId)) {
        return
    }

    const cantidadPermitida = cantidadAsignable(material)

    if (material.instrumentosAsignados.length >= cantidadPermitida) {
        return
    }

    material.instrumentosAsignados.push(instrumentoId)
}

function quitarInstrumento(material: MaterialInventario, instrumentoId: string) {
    if (revisionCompletada.value) return

    material.instrumentosAsignados = material.instrumentosAsignados.filter(
        (id) => id !== instrumentoId
    )
}

function asignacionCompleta(material: MaterialInventario): boolean {

    if (!material.requiereInstrumentoControlado) {
        return true
    }

    return (
        material.instrumentosAsignados.length === cantidadAsignable(material)
    )
}

const asignacionesPendientes = computed(() =>
    materiales.value.filter(
        (material) =>
            material.requiereInstrumentoControlado &&
            !asignacionCompleta(material)
    ).length
)

const preparacionesPendientes = computed(() =>
    materiales.value.filter(
        (material) => material.estadoPreparacion === null
    ).length
)

const resumenValidacion = computed(() => ({
    asignacionesPendientes: asignacionesPendientes.value,
    preparacionesPendientes: preparacionesPendientes.value,

    sinObservaciones:
        asignacionesPendientes.value === 0 &&
        preparacionesPendientes.value === 0
}))


function cantidadAsignable(material: MaterialInventario): number {
    return material.cantidadSolicitada
}

function obtenerErrorAsignacion(material: MaterialInventario): string | null {

    if (!material.requiereInstrumentoControlado) {
        return null
    }

    const asignados = material.instrumentosAsignados.length
    const requeridos = cantidadAsignable(material)

    if (asignados > requeridos) {
        return `Hay ${asignados} instrumentos asignados, pero solamente se solicitaron ${requeridos}.`
    }

    if (asignados < requeridos) {
        return `Faltan ${requeridos - asignados} instrumentos por asignar`
    }

    return null
}

const cirugiaId = computed(() => {
    const id = route.query.cirugiaId

    return typeof id === 'string' && id.trim()
        ? id
        : null
})

const solicitudSeleccionada = computed(() => {
    if (!cirugiaId.value) return null

    const id = Number(cirugiaId.value)

    if (!Number.isSafeInteger(id) || id <= 0) {
        return null
    }

    const solicitudTecnico = obtenerSolicitudesTecnico().find(
        solicitud => solicitud.id === id
    )

    if (solicitudTecnico) {
        return solicitudTecnico
    }

    return obtenerSolicitudCirugiaMock(id) ?? null
})

function esSolicitudTecnico(solicitud: NonNullable<typeof solicitudSeleccionada.value>): solicitud is SolicitudTecnico {
    return 'materiales' in solicitud
}

function convertirMaterialSolicitado(material: MaterialSolicitado): MaterialInventario {
    return {
        id: material.id,
        referencia: material.referencia,
        catalogo: material.catalogo,
        descripcion: material.descripcion,
        cantidadSolicitada: material.cantidadSolicitada,
        requiereInstrumentoControlado: material.requiereInstrumentoControlado,
        instrumentosAsignados: [],
        estadoPreparacion: null,
        esExtra: false
    }
}

function convertirMaterial(material: MaterialPlantilla): MaterialInventario {
    return {
        id: material.id,
        referencia: material.referencia,
        catalogo: material.catalogo,
        descripcion: material.descripcion,
        cantidadSolicitada: material.cantidadSugerida,

        requiereInstrumentoControlado:
            material.requiereInstrumentoControlado === true,

        instrumentosAsignados: [],
        estadoPreparacion: null,
        esExtra: material.esExtra,
    }
}

function guardarRevision(): void {
    if (revisionCompletada.value) {
        alert('Esta revisión ya fue completada.')
        return
    }

    const solicitud = solicitudSeleccionada.value

    if (!solicitud) return

    guardarRevisionInventario(
        solicitud.id,
        materiales.value.map((material) => ({
            id: material.id,
            estadoPreparacion: material.estadoPreparacion,
            instrumentosAsignados: [...material.instrumentosAsignados],
        }))
    )

    alert('Revisión guardada correctamente.')
}

const materiales = ref<MaterialInventario[]>([])

const revisionCompletada = ref(false)

const datosCirugia = computed(() => {
    const cirugia = solicitudSeleccionada.value

    if (!cirugia) return []

    return [
        {
            label: 'Tipo de cirugía',
            valor: cirugia.tipo,
        },
        {
            label: 'Fecha de cirugía',
            valor: cirugia.fecha,
        },
        {
            label: 'Hora',
            valor: cirugia.hora,
        },
        {
            label: 'Hospital / Cliente',
            valor: cirugia.hospital,
        },
        {
            label: 'Paciente',
            valor: cirugia.paciente,
        },
        {
            label: 'Afiliación',
            valor: cirugia.afiliacion,
        },
        {
            label: 'Cirujano',
            valor: cirugia.cirujano,
        },
    ]
})

watch(
    solicitudSeleccionada,
    (solicitud) => {
        revisionCompletada.value = solicitud
            ? obtenerEstadoRevision(solicitud.id) === 'MATERIAL_REVISADO'
            : false
    },
    { immediate: true }
)

function completarRevision(): void {
    const solicitud = solicitudSeleccionada.value

    if (!solicitud || revisionCompletada.value) return

    if (materiales.value.length === 0) {
        alert('No hay materiales para revisar.')
        return
    }

    if (!resumenValidacion.value.sinObservaciones) {
        alert(
            'No es posible completar la revisión. ' +
            'Existen asignaciones o preparaciones pendientes.'
        )
        return
    }

    guardarRevisionInventario(
        solicitud.id,
        materiales.value.map((material) => ({
            id: material.id,
            estadoPreparacion: material.estadoPreparacion,
            instrumentosAsignados: [...material.instrumentosAsignados],
        }))
    )

    guardarEstadoRevision(
        solicitud.id,
        'MATERIAL_REVISADO'
    )

    revisionCompletada.value = true

    alert('Revisión completada correctamente.')
}

watch(
    solicitudSeleccionada,
    (solicitud) => {
        if (!solicitud) {
            materiales.value = []
            return
        }

        let materialesBase: MaterialInventario[] = []

        if (esSolicitudTecnico(solicitud)) {
            materialesBase = solicitud.materiales.map(
                convertirMaterialSolicitado
            )
        } else {
            const plantilla = plantillasCirugia.find(
                item =>
                    item.nombre.trim().toLocaleUpperCase('es-MX') ===
                    solicitud.tipo.trim().toLocaleUpperCase('es-MX')
            )

            if (!plantilla) {
                materiales.value = []
                return
            }

            materialesBase = plantilla.materiales
                .filter(material => material.seleccionado !== false)
                .map(convertirMaterial)
        }

        const revisionGuardada =
            obtenerRevisionInventario(solicitud.id)

        materiales.value = materialesBase.map(material => {
            const guardado = revisionGuardada?.find(
                item => item.id === material.id
            )

            if (!guardado) {
                return material
            }

            return {
                ...material,
                estadoPreparacion:
                    guardado.estadoPreparacion,
                instrumentosAsignados: [
                    ...guardado.instrumentosAsignados,
                ],
            }
        })
    },
    { immediate: true }
)
</script>