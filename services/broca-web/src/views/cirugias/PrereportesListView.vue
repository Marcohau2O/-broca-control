<template>
    <div class="w-full">
        <div class="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-space-md">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        Gestión de Cirugías
                    </span>
                    <span class="text-outline-variant">•</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Documentación quirúrgica
                    </span>
                </div>
                <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    Pre-reportes de Cirugías
                </h1>
                <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                    Consulta las solicitudes quirúrgicas registradas,
                    revisa su información y accede a los pre-reportes
                    correspondientes.
                </p>
            </div>
            <button type="button" @click="cargarSolicitudes" class="h-10 px-4 rounded-lg
                bg-surface-container-lowest text-on-surface
                font-label-md text-label-md font-semibold
                flex items-center justify-center gap-2
                hover:bg-surface-container-high
                transition-colors shadow-sm shrink-0">
                <span class="material-symbols-outlined text-[20px]">refresh</span>
                Actualizar
            </button>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-space-sm mt-space-lg">
            <div class="col-span-2 lg:col-span-1 bg-primary-container rounded-xl p-space-md">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span
                            class="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim font-semibold">
                            Total solicitudes
                        </span>
                        <div class="font-headline-lg text-headline-lg font-bold text-on-primary mt-1">
                            {{ solicitudes.length }}
                        </div>
                    </div>
                    <span class="material-symbols-outlined text-[25px] text-secondary-fixed">
                        description
                    </span>
                </div>
            </div>
            <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span
                            class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                            Pendientes Inventario
                        </span>

                        <div class="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                            {{ totalPendientes }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px] text-secondary">
                        pending_actions
                    </span>
                </div>
            </div>
            <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span
                            class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                            Borradores
                        </span>

                        <div class="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                            {{ totalBorradores }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px] text-secondary">
                        edit_document
                    </span>
                </div>
            </div>
            <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span
                            class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                            Resultados
                        </span>

                        <div class="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                            {{ solicitudesFiltradas.length }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px] text-secondary">
                        filter_alt
                    </span>
                </div>
            </div>
        </div>

        <section class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm p-space-sm">
            <div class="relative">
                <span
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline pointer-events-none">
                    search
                </span>
                <input id="buscar-cirugia" v-model="busqueda" type="search"
                    placeholder="Buscar por paciente, hospital, cirujano, tipo o ID..." class="w-full h-11 pl-10 pr-4 rounded-lg
                    bg-surface-container-low text-on-surface
                    font-body-md text-body-md
                    placeholder:text-outline
                    focus:outline-none focus:ring-2
                    focus:ring-secondary" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-sm mt-space-sm">
                <div>
                    <label for="estadoPrereporte"
                        class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block mb-1.5">Estado
                        de solicitud</label>
                    <div class="relative">
                        <select id="filtro-estado" v-model="filtroEstado" :class="selectClass">
                            <option value="TODOS">Todos</option>
                            <option value="BORRADOR">Borrador</option>
                            <option value="PENDIENTE_INVENTARIO">
                                Pendiente de Inventario
                            </option>
                        </select>
                        <span
                            class="material-symbols-outlined absolute right-3 top-3 text-[18px] text-outline pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-xs mt-space-sm pt-space-sm">
                    <span class="font-body-sm text-body-sm text-on-surface-variant">
                        {{ solicitudesFiltradas.length }} solicitudes encontradas
                    </span>
                </div>
            </div>
        </section>

        <section v-if="solicitudesFiltradas.length === 0"
            class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col items-center justify-center  min-h-[220px] text-center">
            <span class="material-symbols-outlined text-[42px] text-outline">
                folder_off
            </span>
            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface mt-3">
                No se encontraron solicitudes
            </h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-md">
                {{
                    solicitudes.length === 0
                        ? 'Todavía no hay solicitudes guardadas en esta sesión.'
                        : 'Intenta cambiar los filtros de búsqueda.'
                }}
            </p>
        </section>

        <template v-else>
            <section
                class="hidden lg:block mt-space-md bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[1050px]">
                        <thead class="bg-surface-container-low">
                            <tr>
                                <th :class="thClass">Fecha y hora</th>
                                <th :class="thClass">Solicitud</th>
                                <th :class="thClass">Paciente</th>
                                <th :class="thClass">Hospital</th>
                                <th :class="thClass">Estado</th>
                                <th
                                    class="px-4 py-3 text-right font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-container-high">
                            <tr v-for="solicitud in solicitudesFiltradas" :key="solicitud.id"
                                class="hover:bg-surface-container-low/60 transition-colors">
                                <td class="px-4 py-4 align-top">
                                    <span
                                        class="font-code-md text-code-md text-on-surface font-medium  whitespace-nowrap">
                                        {{ solicitud.fecha }}
                                    </span>
                                    <span class="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                                        {{ solicitud.hora }}
                                    </span>
                                </td>
                                <td class="px-4 py-4 align-top">
                                    <button type="button"
                                        class="font-code-md text-code-md font-bold text-secondary hover:underline"
                                        @click="abrirPrereporte(solicitud.id)">
                                        #{{ solicitud.id }}
                                    </button>

                                    <span class="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                                        {{ solicitud.tipo }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span class="font-body-sm text-body-sm text-on-surface font-medium">
                                        {{ solicitud.paciente }}
                                    </span>

                                    <span v-if="solicitud.afiliacion"
                                        class="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                                        {{ solicitud.afiliacion }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span class="font-body-sm text-body-sm text-on-surface">
                                        {{ solicitud.hospital }}
                                    </span>

                                    <span class="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                                        {{ solicitud.cirujano }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span
                                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm  font-bold whitespace-nowrap"
                                        :class="getEstadoClass(solicitud.estado)">
                                        <span class="material-symbols-outlined text-[15px]">
                                            {{ getEstadoIcon(solicitud.estado) }}
                                        </span>

                                        {{ formatEstado(solicitud.estado) }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top text-right">
                                    <button type="button"
                                        class="w-9 h-9 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors  inline-flex items-center justify-center"
                                        :aria-label="`Ver pre-reporte de cirugía ${solicitud.id}`"
                                        :title="`Ver pre-reporte #${solicitud.id}`"
                                        @click="abrirPrereporte(solicitud.id)">
                                        <span class="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div class="lg:hidden mt-space-md space-y-space-sm">
                <article v-for="solicitud in solicitudesFiltradas" :key="solicitud.id"
                    class="bg-surface-container-lowest rounded-xl shadow-sm p-space-sm">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-space-sm">
                        <div class="min-w-0">
                            <button type="button"
                                class="font-code-md text-code-md font-bold text-secondary hover:underline"
                                @click="abrirPrereporte(solicitud.id)">
                                Solicitud #{{ solicitud.id }}
                            </button>
                            <span class="font-body-sm text-body-s text-on-surface-variant block mt-0.5 break-words">
                                {{ solicitud.tipo }}
                            </span>
                        </div>
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-sm text-label-sm font-bold self-start max-w-full"
                            :class="getEstadoClass(solicitud.estado)">
                            <span class="material-symbols-outlined text-[14px]">
                                {{ getEstadoIcon(solicitud.estado) }}
                            </span>
                            {{ formatEstado(solicitud.estado) }}
                        </span>
                    </div>
                    <div class="mt-space-sm">
                        <p class="font-body-md text-body-md font-semibold text-on-surface break-words">
                            {{ solicitud.paciente }}
                        </p>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 break-words">
                            {{ solicitud.hospital }}
                        </p>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 break-words">
                            Cirujano: {{ solicitud.cirujano }}
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-2 gap-space-sm mt-space-sm pt-space-sm border-t border-surface-container-high">
                        <div>
                            <span class="font-label-sm text-label-sm uppercase text-outline block">
                                Fecha
                            </span>

                            <span class="font-code-md text-code-md text-on-surface">
                                {{ solicitud.fecha }}
                            </span>
                        </div>

                        <div>
                            <span class="font-label-sm text-label-sm uppercase text-outline block">
                                Hora
                            </span>

                            <span class="font-code-md text-code-md text-on-surface">
                                {{ solicitud.hora }}
                            </span>
                        </div>
                    </div>

                    <button type="button" class="w-full h-9 mt-space-sm rounded-lg bg-surface-container-high
                    text-on-surface font-label-sm text-label-sm font-semibold  flex items-center justify-center gap-1.5 hover:bg-surface-container-highest
                    transition-colors" @click="abrirPrereporte(solicitud.id)">
                        <span class="material-symbols-outlined text-[17px] text-secondary">
                            visibility
                        </span>

                        Ver pre-reporte
                    </button>
                </article>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { obtenerSolicitudesTecnico, type EstadoSolicitudTecnico, type SolicitudTecnico } from '@/data/solicitudesTecnicoMock'


const router = useRouter()

const solicitudes = ref<SolicitudTecnico[]>([])
const busqueda = ref('')
const filtroEstado = ref<EstadoSolicitudTecnico | 'TODOS'>('TODOS')

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left font-label-sm text-label-sm ' +
    'uppercase tracking-wider text-outline font-semibold'

const cargarSolicitudes = () => {
    solicitudes.value = obtenerSolicitudesTecnico()
}

onMounted(cargarSolicitudes)

const totalPendientes = computed(() =>
    solicitudes.value.filter(
        (solicitud) => solicitud.estado === 'PENDIENTE_INVENTARIO'
    ).length
)

const totalBorradores = computed(() =>
    solicitudes.value.filter(
        (solicitud) => solicitud.estado === 'BORRADOR'
    ).length
)

const solicitudesFiltradas = computed(() => {
    const texto = busqueda.value.trim().toLocaleLowerCase()

    return solicitudes.value
        .filter((solicitud) => {
            const coicideEstado = filtroEstado.value === 'TODOS' || solicitud.estado === filtroEstado.value

            const contenido = [
                solicitud.id,
                solicitud.tipo,
                solicitud.hospital,
                solicitud.paciente,
                solicitud.afiliacion,
                solicitud.cirujano,
            ]
                .join(' ')
                .toLocaleLowerCase()

            const coicideBusqueda = !texto || contenido.includes(texto)

            return coicideEstado && coicideBusqueda
        })
        .sort((a, b) => {
            const fechaA = `${a.fecha}T${a.hora}`
            const fechaB = `${b.fecha}T${b.hora}`

            return fechaB.localeCompare(fechaA)
        })
})

const etiquetaEstado = (estado: EstadoSolicitudTecnico) => {
    const etiquetas: Record<EstadoSolicitudTecnico, string> = {
        BORRADOR: 'Borrador',
        PENDIENTE_INVENTARIO: 'Pendiente Inventario',
    }

    return etiquetas[estado]
}

const formatEstado = (estado: EstadoSolicitudTecnico) => {
    const labels: Record<EstadoSolicitudTecnico, string> = {
        BORRADOR: 'Borrador',
        PENDIENTE_INVENTARIO: 'Pendiente Inventario',
    }

    return labels[estado]
}

const getEstadoIcon = (estado: EstadoSolicitudTecnico) => {
    const icons: Record<EstadoSolicitudTecnico, string> = {
        BORRADOR: 'edit_document',
        PENDIENTE_INVENTARIO: 'pending_actions',
    }

    return icons[estado]
}

const getEstadoClass = (estado: EstadoSolicitudTecnico) => {
    if (estado === 'PENDIENTE_INVENTARIO') {
        return 'bg-secondary-fixed text-on-secondary-fixed'
    }

    return 'bg-surface-container-high text-on-surface-variant'
}

const claseEstado = (estado: EstadoSolicitudTecnico) => {
    return estado === 'BORRADOR'
        ? 'bg-surface-container-high text-on-surface'
        : 'bg-secondary-container text-on-secondary-container'
}

const abrirPrereporte = (cirugiaId: number) => {
    router.push({
        name: 'cirugias-prereporte',
        query: {
            cirugiaId: String(cirugiaId)
        }
    })
}

</script>