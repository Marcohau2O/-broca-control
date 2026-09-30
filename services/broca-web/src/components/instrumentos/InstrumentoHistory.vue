<template>
    <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div class="px-space-md py-space-sm border-b border-surface-container-high">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-sm">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[21px] text-secondary mt-0.5">
                        history
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Historial y trazabilidad
                        </h2>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Registro cronológico de usos y movimientos del
                            instrumento.
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low overflow-x-auto">
                    <button type="button" :class="tabClass('todos')" @click="filtro = 'todos'">
                        Todos
                    </button>

                    <button type="button" :class="tabClass('usos')" @click="filtro = 'usos'">
                        Usos
                    </button>

                    <button type="button" :class="tabClass('movimientos')" @click="filtro = 'movimientos'">
                        Movimientos
                    </button>
                </div>
            </div>
        </div>

        <div v-if="eventosFiltrados.length === 0" class="p-space-lg text-center">
            <span class="material-symbols-outlined text-[38px] text-outline">
                history
            </span>
            <p class="font-label-md text-label-md font-bold text-on-surface mt-2">
                No hay registrado
            </p>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                No existen eventos para el filtro seleccionado.
            </p>
        </div>

        <div v-else class="p-space-md">
            <div class="relative">
                <div class="absolute left-[19px] top-5 bottom-5 w-px bg-surface-container-high"></div>

                <div class="space-y-space-md">
                    <div v-for="evento in eventosFiltrados" :key="evento.key" class="relative flex gap-space-sm">
                        <div :class="['relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                            evento.claseIcono
                        ]">
                            <span class="material-symbols-outlined text-[19px]">
                                {{ evento.icono }}
                            </span>
                        </div>
                        <div class="flex-1 min-w-0 rounded-xl border border-surface-container-high p-space-sm">
                            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div>
                                    <div class="flex flex-wrap items-center gap-2">
                                        <span class="font-label-md text-label-md font-bold text-on-surface">
                                            {{ evento.titulo }}
                                        </span>

                                        <span :class="['px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold',
                                            evento.claseBadge
                                        ]">
                                            {{ evento.badge }}
                                        </span>
                                    </div>

                                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                        {{ evento.descripcion }}
                                    </p>
                                </div>

                                <span class="font-code-md text-code-md text-on-surface-variant whitespace-nowrap">
                                    {{ formatFecha(evento.fechaHora) }}
                                </span>
                            </div>

                            <div v-if="evento.tipo === 'uso'"
                                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm mt-space-sm">
                                <div class="p-2.5 rounded-lg bg-surface-container-low">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                        Servicio
                                    </span>

                                    <span
                                        class="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                                        {{ evento.servicio }}
                                    </span>
                                </div>

                                <div class="p-2.5 rounded-lg bg-surface-container-low">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                        Procedimiento
                                    </span>

                                    <span
                                        class="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                                        {{ evento.procedimiento }}
                                    </span>
                                </div>

                                <div class="p-2.5 rounded-lg bg-surface-container-low">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                        Ubicación
                                    </span>

                                    <span
                                        class="font-label-md text-label-md text-on-surface font-semibold block mt-0.5">
                                        {{ evento.ubicacion }}
                                    </span>
                                </div>

                                <div class="p-2.5 rounded-lg bg-surface-container-low">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                        Vidas después
                                    </span>

                                    <span :class="['font-code-md text-code-md text-secondary font-bold block mt-0.5',
                                        evento.vidasRestantes === 0
                                    ]">
                                        {{ evento.vidasRestantes }}
                                    </span>
                                </div>
                            </div>

                            <div v-if="evento.tipo === 'movimiento' && evento.tipoMovimiento === 'CAMBIO_UBICACION'"
                                class="mt-space-sm flex flex-col sm:flex-row sm:items-center gap-space-sm">
                                <div class="flex-1 p-3 rounded-lg bg-surface-container-low">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                        Ubicación anterior
                                    </span>
                                    <span class="font-label-md text-label-md text-on-surface font-bold block mt-0.5">
                                        {{ evento.ubicacionAnterior || 'Sin ubicación' }}
                                    </span>
                                </div>

                                <span
                                    class="material-symbols-outlined text-[20px] text-secondary self-center rotate-90 sm:rotate-0">
                                    arrow_forward
                                </span>

                                <div class="flex-1 p-3 rounded-lg bg-secondary-fixed">
                                    <span
                                        class="font-label-sm text-label-sm uppercase text-on-secondary-fixed-variant font-semibold block">
                                        Nueva ubicación
                                    </span>

                                    <span
                                        class="font-label-md text-label-md text-on-secondary-fixed font-bold block mt-0.5">
                                        {{
                                            evento.ubicacionNueva ||
                                            'Sin ubicación'
                                        }}
                                    </span>
                                </div>
                            </div>

                            <div v-if="
                                evento.tipo === 'movimiento' &&
                                evento.estadoAnterior &&
                                evento.estadoNuevo
                            " class="flex flex-wrap items-center gap-2 mt-space-sm">
                                <span
                                    class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">
                                    {{
                                        formatEstado(
                                            evento.estadoAnterior
                                        )
                                    }}
                                </span>

                                <span class="material-symbols-outlined text-[17px] text-outline">
                                    arrow_forward
                                </span>

                                <span
                                    class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
                                    {{
                                        formatEstado(
                                            evento.estadoNuevo
                                        )
                                    }}
                                </span>
                            </div>

                            <div
                                class="flex items-center gap-2 mt-space-sm pt-space-sm border-t border-surface-container-high">
                                <div
                                    class="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center">
                                    <span class="material-symbols-outlined text-[15px] text-on-surface-variant">
                                        person
                                    </span>
                                </div>

                                <div>
                                    <span class="font-label-sm text-label-sm text-on-surface-variant">
                                        Registrado por
                                    </span>

                                    <span class="font-label-sm text-label-sm text-on-surface font-bold ml-1">
                                        {{ evento.usuario }}
                                    </span>
                                </div>
                            </div>

                            <div v-if="evento.observaciones"
                                class="mt-space-sm px-3 py-2 rounded-lg bg-surface-container-low">
                                <span class="font-label-sm text-label-sm text-outline font-semibold">
                                    Observaciones:
                                </span>

                                <span class="font-body-sm text-body-sm text-on-surface-variant ml-1">
                                    {{ evento.observaciones }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="px-space-md py-space-sm bg-surface-container-low border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-xs">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
                {{ eventosFiltrados.length === 1
                    ? '1 registro de trazabilidad.'
                    : `${eventosFiltrados.length} registros de trazabilidad.`
                }}
            </span>

            <span class="font-label-sm text-label-sm text-secondary font-bold">
                {{
                    instrumento.usos.length
                }}
                {{
                    instrumento.usos.length === 1
                        ? 'uso'
                        : 'usos'
                }}
                ·
                {{
                    instrumento.movimientos.length
                }}
                {{
                    instrumento.movimientos.length === 1
                        ? 'movimiento'
                        : 'movimientos'
                }}
            </span>

            <!-- <button type="button"
                class="font-label-sm text-label-sm text-secondary font-bold hover:underline inline-flex items-center gap-1">
                Ver historial completo

                <span class="material-symbols-outlined text-[15px]">
                    arrow_forward
                </span>
            </button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { InstrumentoDetalle, InstrumentoMovimiento, InstrumentoUso } from '@/types/instrumentos';

const props = defineProps<{
    instrumento: InstrumentoDetalle
}>()

type FiltroHistorial = 
    | 'todos'
    | 'usos'
    | 'movimientos'

interface EventoHistorial {
    key: string
    tipo: 'uso' | 'movimiento'
    fechaHora: string

    titulo: string
    descripcion: string
    badge: string

    icono: string
    claseIcono: string
    claseBadge: string

    usuario: string
    observaciones: string | null

    tipoMovimiento?: string

    numeroUso?: number
    vidasRestantes?: number

    servicio?: string
    procedimiento?: string
    ubicacion?: string

    estadoAnterior?: string | null
    estadoNuevo?: string | null

    ubicacionAnterior?: string | null
    ubicacionNueva?: string | null
}

const filtro = ref<FiltroHistorial>('todos')

const convetirUso = (uso: InstrumentoUso): EventoHistorial => {
    return {
        key: `uso-${uso.id}`,
        tipo: 'uso',
        fechaHora: uso.fechaHora,

        titulo: 'Uso registrado',

        descripcion: uso.responsableUso
                ? `Uso clínico registrado. Responsable: ${uso.responsableUso}.`
                : 'Se registró un nuevo uso del instrumento.',

        badge: `USO ${uso.numeroUso} DE ${props.instrumento.usosMaximos}`,

        icono: 'add_task',

        claseIcono: uso.vidasRestantes === 0
                ? 'bg-error text-on-error'
                : 'bg-secondary text-on-secondary',

        claseBadge: uso.vidasRestantes === 0
                ? 'bg-error-container text-on-error-container'
                : 'bg-secondary-fixed text-on-secondary-fixed',

        usuario: uso.usuario?.nombre ??
            'Usuario no disponible',

        observaciones: uso.observaciones ?? null,

        numeroUso: uso.numeroUso,

        vidasRestantes: uso.vidasRestantes,

        servicio: uso.servicio?.nombre ??
            'Sin servicio',

        procedimiento: uso.procedimiento?.nombre ??
            'Sin procedimiento',

        ubicacion: uso.ubicacion?.nombre ??
            'Sin ubicación',
    }
}

const convetirMovimiento = (movimiento: InstrumentoMovimiento): EventoHistorial => {
    let titulo = 'Movimiento registrado'
    let icono = 'history'
    let claseIcono =
        'bg-surface-container-high text-secondary'

    switch (movimiento.tipo) {
        case 'ALTA':
            titulo = 'Instrumento registrado'
            icono = 'inventory_2'
            claseIcono =
                'bg-primary-container text-on-primary'
            break

        case 'CAMBIO_UBICACION':
            titulo = 'Cambio de ubicación'
            icono = 'move_item'
            break

        case 'CAMBIO_ESTADO':
            titulo = 'Cambio de estado'
            icono = 'swap_horiz'
            break

        case 'CAMBIO_URGENTE':
            titulo = 'Cambio urgente'
            icono = 'warning'
            claseIcono =
                'bg-error-container text-on-error-container'
            break

        case 'BAJA':
            titulo = 'Instrumento dado de baja'
            icono = 'block'
            claseIcono =
                'bg-error-container text-on-error-container'
            break

        case 'USO':
            titulo = 'Movimiento por uso'
            icono = 'repeat'
            break

        case 'INTENTO_USO_BLOQUEADO':
            titulo = 'Intento de uso bloqueado'
            icono = 'lock'
            claseIcono =
                'bg-error-container text-on-error-container'
            break
    }

    return {
        key: `movimiento-${movimiento.id}`,
        tipo: 'movimiento',
        fechaHora: movimiento.fechaHora,

        titulo,

        descripcion: movimiento.descripcion || descripcionMovimiento(movimiento.tipo),

        badge: formatEstado(movimiento.tipo),

        icono,
        claseIcono,

        claseBadge:
            movimiento.tipo === 'CAMBIO_URGENTE' ||
            movimiento.tipo === 'BAJA' ||
            movimiento.tipo === 'INTENTO_USO_BLOQUEADO'
                ? 'bg-error-container text-on-error-container'
                : 'bg-surface-container-high text-on-surface-variant',

        usuario: movimiento.usuario?.nombre ??
            'Usuario no disponible',

        observaciones: null,

        tipoMovimiento: movimiento.tipo,

        estadoAnterior: movimiento.estadoAnterior,

        estadoNuevo: movimiento.estadoNuevo,

        ubicacionAnterior: movimiento.ubicacionAnterior,

        ubicacionNueva: movimiento.ubicacionNueva,
    }
}

const eventos = computed<EventoHistorial[]>(() => {
    const usos = props.instrumento.usos.map(convetirUso)

    const movimientos = props.instrumento.movimientos.map(convetirMovimiento)

    return [
        ...usos,
        ...movimientos
    ].sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime())
})

const eventosFiltrados = computed(() => {
    if (filtro.value === 'usos') {
        return eventos.value.filter(
            (evento) => evento.tipo === 'uso'
        )
    }

    if (filtro.value === 'movimientos') {
        return eventos.value.filter(
            (evento) => evento.tipo === 'movimiento'
        )
    }

    return eventos.value
})

const descripcionMovimiento = (tipo: string) => {
    switch (tipo) {
        case 'ALTA':
            return 'El instrumento fue incorporado al inventario.'

        case 'USO':
            return 'Se registró un movimiento asociado al uso del instrumento.'

        case 'CAMBIO_UBICACION':
            return 'El instrumento fue trasladado a una nueva ubicación.'

        case 'CAMBIO_ESTADO':
            return 'Se actualizó el estado operativo del instrumento.'

        case 'CAMBIO_URGENTE':
            return 'El instrumento alcanzó una condición de cambio urgente.'

        case 'BAJA':
            return 'El instrumento fue dado de baja.'

        case 'INTENTO_USO_BLOQUEADO':
            return 'Se bloqueó un intento de registrar un nuevo uso.'

        default:
            return 'Se registró un movimiento del instrumento.'
    }
}

const formatEstado = (value: string) => {
    return value.replaceAll('_', ' ')
}

const formatFecha = (fecha: string) => {
    const date = new Date(fecha)
    
    if (Number.isNaN(date.getTime())) {
        return 'Fecha no disponible'
    }

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            dateStyle: 'medium',
            timeStyle: 'short'
        }
    ).format(date)
}

const tabClass = (tab: FiltroHistorial) => {
    const base =
        'h-8 px-3 rounded-md font-label-sm text-label-sm font-bold whitespace-nowrap transition-colors'

    if (filtro.value === tab) {
        return `${base} bg-primary-container text-on-primary`
    }

    return `${base} text-on-surface-variant hover:bg-surface-container-high`
}
</script>