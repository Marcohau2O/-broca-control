<template>
    <div class="w-full max-w-6xl mx-auto space-y-space-md pb-space-lg">
        <header class="flex flex-col gap-space-sm sm:flex-row sm:items-start sm:justify-between">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        Programación quirúrgica
                    </span>
                    <span class="text-outline-variant">•</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Documentación quirúrgica
                    </span>
                </div>
                <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                    Calendario de cirugías
                </h1>
                <p class="font-body-md text-body-md text-on-surface-variant mt-1">
                    Consulta las cirugías programadas y su estado actual.
                </p>
            </div>
            <RouterLink to="/dashboard/cirugias/nueva"
                class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-on-secondary font-label-md text-label-md font-semibold transition hover:bg-primary hover:text-on-primary">
                <span class="material-symbols-outlined text-[20px]">
                    add_circle
                </span>
                Nueva solicitud
            </RouterLink>
        </header>
        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="flex items-start gap-2 border-b border-surface-container-high px-space-md py-space-sm">
                <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                    filter_alt
                </span>
                <div>
                    <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Filtros de búsqueda
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Encuentra cirugías por estado y procedimiento.
                    </p>
                </div>
            </div>
            <div class="p-space-md">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-end">
                    <div class="grid flex-1 grid-cols-1 gap-space-md sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <label for="filtro-estado" :class="labelClass">Estado de la cirugía</label>
                            <select id="filtro-estado" v-model="filtroEstado" :class="selectClass">
                                <option value="">
                                    Todos los estados
                                </option>
                                <option v-for="estado in opcionesEstado" :key="estado" :value="estado">
                                    {{ textoEstado(estado) }}
                                </option>
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label for="filtro-tipo" :class="labelClass">
                                Tipo de cirugía
                            </label>
                            <select id="filtro-tipo" v-model="filtroTipo" :class="selectClass">
                                <option value="">
                                    Todos los tipos
                                </option>
                                <option v-for="tipo in opcionesTipo" :key="tipo" :value="tipo">
                                    {{ tipo }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <button type="button" :disabled="!filtrosActivos"
                        class="inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 h-11 text-on-surface font-label-md text-label-md font-semibold transition hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed"
                        @click="limpiarFiltros">
                        <span class="material-symbols-outlined text-[18px]">
                            filter_alt_off
                        </span>
                        Limpiar filtros
                    </button>
                </div>
                <p
                    class="mt-4 border-t border-surface-container-high pt-3 font-body-sm text-body-sm text-on-surface-variant">
                    <span class="font-semibold text-on-surface">
                        {{ cirugiasDelMes.length }}
                    </span>
                    {{
                        cirugiasDelMes.length === 1
                            ? 'cirugía encontrada'
                            : 'cirugías encontradas'
                    }} en {{ tituloMes }}
                </p>
            </div>
        </section>
        <div class="grid grid-cols-1 gap-space-md xl:grid-cols-[minmax(0,1fr)_340px] items-start">
            <section class="min-w-0 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div
                    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-surface-container-high px-space-md py-space-sm">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="material-symbols-outlined text-[22px] text-secondary">
                            calendar_month
                        </span>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface capitalize">
                            {{ tituloMes }}
                        </h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button"
                            class="h-10 rounded-lg border border-outline-variant px-4 font-label-md text-label-md font-semibold text-on-surface hover:bg-surface-container-low"
                            @click="volverHoy">
                            Hoy
                        </button>
                        <button type="button" aria-label="Mes anterior"
                            class="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                            @click="cambiarMes(-1)">
                            <span class="material-symbols-outlined">
                                chevron_left
                            </span>
                        </button>
                        <button type="button" aria-label="Mes siguiente"
                            class="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                            @click="cambiarMes(1)">
                            <span class="material-symbols-outlined">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>
                <div class="hidden sm:block">
                    <div class="grid grid-cols-7 border-b border-surface-container-high bg-surface-container-low">
                        <div v-for="dia in diasSemana" :key="dia"
                            class="py-3 text-center font-label-sm text-label-sm uppercase tracking-wider font-semibold text-on-surface-variant">
                            {{ dia }}
                        </div>
                    </div>
                    <div class="grid grid-cols-7">
                        <div v-for="(dia, indice) in diasCalendario" :key="dia?.fecha ?? `vacio-${indice}`"
                            class="min-w-0 min-h-28 border-b border-r border-surface-container-high p-1 sm:p-1.5 lg:p-2"
                            :class="{ 'bg-primary-container/40': dia && fechaSeleccionada === dia.fecha }">
                            <button v-if="dia" type="button"
                                class="mb-1 flex h-8 w-8 items-center justify-center rounded-full font-body-sm text-body-sm font-semibold text-on-surface hover:bg-surface-container-high"
                                :class="{ 'bg-secondary !text-on-secondary hover:bg-primary': fechaSeleccionada === dia.fecha, 'ring-1 ring-secondary': dia.fecha === fechaHoy && fechaSeleccionada !== dia.fecha }"
                                @click="seleccionarFecha(dia.fecha)">
                                {{ dia.numero }}
                            </button>
                            <template v-if="dia">
                                <button v-for="cirugia in cirugiasPorFecha(dia.fecha)" :key="cirugia.id" type="button"
                                    class="mb-1 block w-full truncate rounded-md px-1.5 py-1 text-left text-[11px] font-semibold transition hover:brightness-95"
                                    :class="claseEstado(cirugia.estado)" :title="`${cirugia.hora} - ${cirugia.tipo}`"
                                    @click="fechaSeleccionada = dia.fecha">
                                    {{ cirugia.hora }}
                                    <span class="hidden lg:inline">
                                        · {{ cirugia.tipo }}
                                    </span>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="space-y-3 p-space-md sm:hidden">
                    <div v-if="cirugiasDelMes.length === 0"
                        class="rounded-xl border border-dashed border-outline-variant p-6 text-center font-body-sm text-body-sm text-on-surface-variant">
                        {{
                            filtrosActivos
                                ? 'No se encontraron cirugías con los filtros seleccionados.'
                                : 'No hay cirugías programadas este mes.'
                        }}
                    </div>
                    <button v-for="cirugia in cirugiasDelMes" :key="cirugia.id" type="button"
                        class="w-full rounded-xl border border-surface-container-high p-4 text-left transition hover:bg-surface-container-low"
                        :class="{ 'bg-primary-container/40 !border-secondary': fechaSeleccionada === cirugia.fecha }"
                        @click="seleccionarFecha(cirugia.fecha)">
                        <div class="flex items-center gap-2 font-label-md text-label-md font-semibold text-on-surface">
                            <span class="material-symbols-outlined text-[18px] text-secondary">
                                event
                            </span>
                            {{ fechaLegible(cirugia.fecha) }}
                        </div>
                        <p class="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                            {{ cirugia.hora }} · {{ cirugia.tipo }}
                        </p>
                        <span class="mt-3 inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold"
                            :class="claseEstado(cirugia.estado)">
                            {{ textoEstado(cirugia.estado) }}
                        </span>
                    </button>
                </div>
            </section>
            <aside class="min-w-0 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div
                    class="flex items-start justify-between gap-3 border-b border-surface-container-high px-space-md py-space-sm">
                    <div class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                            event_note
                        </span>
                        <div>
                            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                                {{
                                    fechaSeleccionada
                                        ? 'Cirugías del día'
                                        : 'Cirugías del mes'
                                }}
                            </h2>
                            <p v-if="fechaSeleccionada" class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                                {{ fechaLegible(fechaSeleccionada) }}
                            </p>
                        </div>
                    </div>
                    <button v-if="fechaSeleccionada" type="button"
                        class="shrink-0 font-label-sm text-label-sm font-semibold text-secondary hover:underline"
                        @click="fechaSeleccionada = null">
                        Ver todas
                    </button>
                </div>
                <div class="p-space-md">
                    <div v-if="cirugiasSeleccionadas.length === 0"
                        class="rounded-xl border border-dashed border-outline-variant p-6 text-center font-body-sm text-body-sm text-on-surface-variant">
                        <span class="material-symbols-outlined mb-2 block text-[32px] text-outline">
                            event_busy
                        </span>
                        {{
                            filtrosActivos
                                ? 'No se encontraron cirugías con los filtros seleccionados.'
                                : 'No hay cirugías programadas para esta selección.'
                        }}
                    </div>
                    <div v-else class="space-y-3">
                        <article v-for="cirugia in cirugiasSeleccionadas" :key="cirugia.id"
                            class="rounded-xl border border-surface-container-high bg-surface-container-lowest p-4">
                            <p class="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                                <span class="material-symbols-outlined text-[16px]">
                                    schedule
                                </span>
                                {{ fechaLegible(cirugia.fecha) }} · {{ cirugia.hora }}
                            </p>
                            <h3 class="mt-2 font-label-lg text-label-lg font-bold text-on-surface">
                                {{ cirugia.tipo }}
                            </h3>
                            <p class="mt-2 flex items-start gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                                <span class="material-symbols-outlined text-[17px]">
                                    local_hospital
                                </span>
                                <span>
                                    {{ cirugia.hospital }}
                                </span>
                            </p>
                            <p class="mt-1 flex items-start gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                                <span class="material-symbols-outlined text-[17px]">
                                    stethoscope
                                </span>
                                <span>
                                    {{ cirugia.cirujano }}
                                </span>
                            </p>
                            <span class="mt-3 inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold"
                                :class="claseEstado(cirugia.estado)">
                                {{ textoEstado(cirugia.estado) }}
                            </span>
                            <div v-if="['PENDIENTE_INVENTARIO', 'EN_REVISION_INVENTARIO', 'MATERIAL_REVISADO', 'PENDIENTE_PREREPORTE', 'PREREPORTE_COMPLETADO'].includes(cirugia.estado)"
                                class="mt-4 space-y-2 border-t border-surface-container-high pt-4">
                                <RouterLink
                                    v-if="['PENDIENTE_INVENTARIO', 'EN_REVISION_INVENTARIO', 'MATERIAL_REVISADO'].includes(cirugia.estado)"
                                    :to="{ name: 'cirugia-inventario', query: { cirugiaId: String(cirugia.id) } }"
                                    class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2.5 font-label-sm text-label-sm font-semibold text-on-secondary transition hover:bg-primary hover:text-on-primary">
                                    <span class="material-symbols-outlined text-[18px]">
                                        inventory_2
                                    </span>
                                    Ver revisión de Inventario
                                </RouterLink>
                                <RouterLink
                                    v-if="['PENDIENTE_PREREPORTE', 'PREREPORTE_COMPLETADO'].includes(cirugia.estado)"
                                    :to="{ path: '/dashboard/cirugias/prereporte', query: { cirugiaId: String(cirugia.id) } }"
                                    class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2.5 font-label-sm text-label-sm font-semibold text-on-secondary transition hover:bg-primary hover:text-on-primary">
                                    <span class="material-symbols-outlined text-[18px]">
                                        description
                                    </span>
                                    Ver pre-reporte
                                </RouterLink>
                            </div>
                            <p v-else class="mt-3 font-body-sm text-body-sm text-on-surface-variant">
                                No hay acciones disponibles para este estado.
                            </p>
                        </article>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { type SolicitudCirugiaMock as Cirugia, solicitudesCirugiaMock, type EstadoSolicitud } from '@/data/solicitudesCirugiaMock';

import { obtenerEstadoRevision } from '@/data/revisionesInventarioMock'

import { obtenerEstadoPrereporte } from '@/data/prereporteEstadoMock';

import { obtenerSolicitudesTecnico } from '@/data/solicitudesTecnicoMock'

const labelClass = 'block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold'
const selectClass = 'w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary'

const cirugias = computed<Cirugia[]>(() => {
    const solicitudesTecnico = obtenerSolicitudesTecnico()

    const todasLasSolicitudes: Cirugia[] = [
        ...solicitudesCirugiaMock,
        ...solicitudesTecnico.map((solicitud) => ({
            id: solicitud.id,
            fecha: solicitud.fecha,
            hora: solicitud.hora,
            tipo: solicitud.tipo,
            hospital: solicitud.hospital,
            paciente: solicitud.paciente,
            afiliacion: solicitud.afiliacion,
            cirujano: solicitud.cirujano,
            estado: solicitud.estado,
        }))
    ]

    return todasLasSolicitudes.map((solicitud) => ({
        ...solicitud,
        estado: obtenerEstadoActual(solicitud)
    }))
})

const opcionesEstado: EstadoSolicitud[] = [
    'BORRADOR',
    'PENDIENTE_INVENTARIO',
    'EN_REVISION_INVENTARIO',
    'MATERIAL_REVISADO',
    'PENDIENTE_PREREPORTE',
    'PREREPORTE_COMPLETADO',
]

const filtroEstado = ref<EstadoSolicitud | ''>('')
const filtroTipo = ref('')

const fechaActual = new Date()
const mesVisible = ref(new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1))

const fechaSeleccionada = ref<string | null>(null)

const diasSemana = [
    'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom',
]

const formatoFecha = (fecha: Date): string => {
    const anio = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const dia = String(fecha.getDate()).padStart(2, '0')

    return `${anio}-${mes}-${dia}`
}

const fechaHoy = formatoFecha(new Date())

const tituloMes = computed(() =>
    new Intl.DateTimeFormat('es-MX', {
        month: 'long',
        year: 'numeric',
    }).format(mesVisible.value)
)

const diasCalendario = computed(() => {
    const anio = mesVisible.value.getFullYear()
    const mes = mesVisible.value.getMonth()

    const primerDia = new Date(anio, mes, 1)
    const ultimoDia = new Date(anio, mes + 1, 0)

    const espaciosIniciales = (primerDia.getDay() + 6) % 7

    const dias: Array<{
        fecha: string
        numero: number
        mesActual: boolean
    } | null> = []

    for (let i = 0; i < espaciosIniciales; i++) {
        dias.push(null)
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const fecha = new Date(anio, mes, dia)

        dias.push({
            fecha: formatoFecha(fecha),
            numero: dia,
            mesActual: true,
        })
    }

    while (dias.length % 7 !== 0) {
        dias.push(null)
    }

    return dias
})

const cirugiasDelMes = computed(() => {
    const prefijo = formatoFecha(mesVisible.value).slice(0, 7)

    return cirugias.value.filter((cirugia) => {
        const coincideMes = cirugia.fecha.startsWith(prefijo)

        const coincideEstado = !filtroEstado.value || cirugia.estado === filtroEstado.value

        const coincideTipo = !filtroTipo.value || cirugia.tipo === filtroTipo.value

        return coincideMes && coincideEstado && coincideTipo
    })
        .sort((a, b) =>
            `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
        )
})

const opcionesTipo = computed(() =>
    [...new Set(cirugias.value.map((cirugia) => cirugia.tipo))]
        .sort((a, b) => a.localeCompare(b, 'es'))
)

const filtrosActivos = computed(
    () => filtroEstado.value !== '' || filtroTipo.value !== ''
)

function limpiarFiltros() {
    filtroEstado.value = ''
    filtroTipo.value = ''
}

const cirugiasSeleccionadas = computed(() => {
    if (!fechaSeleccionada.value) {
        return cirugiasDelMes.value
    }

    return cirugiasDelMes.value.filter(
        (cirugia) => cirugia.fecha === fechaSeleccionada.value
    )
})

function cirugiasPorFecha(fecha: string): Cirugia[] {
    return cirugiasDelMes.value.filter(
        (cirugia) => cirugia.fecha === fecha
    )
}

function cambiarMes(cantidad: number) {
    mesVisible.value = new Date(
        mesVisible.value.getFullYear(),
        mesVisible.value.getMonth() + cantidad,
        1
    )

    fechaSeleccionada.value = null
}

function volverHoy() {
    const hoy = new Date()

    mesVisible.value = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        1
    )

    fechaSeleccionada.value = formatoFecha(hoy)
}

function seleccionarFecha(fecha: string) {
    fechaSeleccionada.value = fechaSeleccionada.value === fecha ? null : fecha
}

function textoEstado(estado: EstadoSolicitud): string {
    const etiquetas: Record<EstadoSolicitud, string> = {
        BORRADOR: 'Borrador',
        PENDIENTE_INVENTARIO: 'Pendiente de Inventario',
        EN_REVISION_INVENTARIO: 'En revisión de Inventario',
        MATERIAL_REVISADO: 'Material revisado',
        PENDIENTE_PREREPORTE: 'Pendiente de pre-reporte',
        PREREPORTE_COMPLETADO: 'Pre-reporte completado',
    }

    return etiquetas[estado]
}

function claseEstado(estado: EstadoSolicitud): string {
    const clases: Record<EstadoSolicitud, string> = {
        BORRADOR: 'bg-gray-100 text-gray-700',
        PENDIENTE_INVENTARIO: 'bg-amber-100 text-amber-800',
        EN_REVISION_INVENTARIO: 'bg-blue-100 text-blue-800',
        MATERIAL_REVISADO: 'bg-emerald-100 text-emerald-800',
        PENDIENTE_PREREPORTE: 'bg-purple-100 text-purple-800',
        PREREPORTE_COMPLETADO: 'bg-teal-100 text-teal-800',
    }

    return clases[estado]
}

function fechaLegible(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-').map(Number)

    return new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(anio, mes - 1, dia))
}

function obtenerEstadoActual(solicitud: Cirugia): EstadoSolicitud {
    const prereporte = obtenerEstadoPrereporte(solicitud.id)

    if (prereporte?.estado === 'PREREPORTE_COMPLETADO') {
        return 'PREREPORTE_COMPLETADO'
    }

    return obtenerEstadoRevision(solicitud.id) ?? solicitud.estado
}

</script>