<template>
    <div class="h-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div
            class="px-space-md py-space-sm border-b border-surface-container-high flex flex-wrap items-center justify-between gap-space-xs">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-secondary">
                    monitoring
                </span>

                <span class="font-label-md text-label-md font-bold text-on-surface">
                    Estado del instrumento
                </span>
            </div>

            <span v-if="!isUrgente"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
                <span class="w-2 h-2 rounded-full" :class="estadoDotClass"></span>
                {{ formatEstado(instrumento.estadoOperativo) }}
            </span>

            <span v-else class="inline-flex items-center gap-1.5
                       px-2.5 py-1 rounded-full
                       bg-error-container text-on-error-container
                       font-label-sm text-label-sm font-bold">
                <span class="material-symbols-outlined text-[15px]">
                    warning
                </span>

                CAMBIO URGENTE
            </span>
        </div>

        <div class="p-space-md">
            <div v-if="isUrgente" class="mb-space-sm p-space-sm rounded-xl
                       bg-error-container/50 border border-error/20">
                <div class="flex items-start gap-3">
                    <span class="material-symbols-outlined
                               text-[22px] text-error shrink-0">
                        warning
                    </span>

                    <div>
                        <span class="font-label-md text-label-md
                                   font-bold text-on-error-container block">
                            Máximo de usos alcanzado
                        </span>

                        <p class="font-body-sm text-body-sm
                                   text-on-error-container mt-0.5">
                            Este instrumento alcanzó sus
                            {{ instrumento.usosMaximos }} usos permitidos.
                            El registro de nuevos usos está bloqueado.
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div class="bg-surface-container-low rounded-xl p-space-md">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                Usos realizados
                            </span>

                            <div class="flex items-end gap-1 mt-1">
                                <span class="font-headline-lg text-headline-lg font-bold text-on-surface">
                                    {{ instrumento.usosRealizados }}
                                </span>

                                <span class="font-label-md text-label-md text-on-surface-variant mb-1">
                                    / {{ instrumento.usosMaximos }}
                                </span>
                            </div>
                        </div>

                        <span class="material-symbols-outlined text-[26px] text-secondary">
                            repeat
                        </span>
                    </div>

                    <div class="mt-space-md">
                        <div class="flex gap-1.5">
                            <div class="h-2.5 flex-1 rounded-full" v-for="index in instrumento.usosMaximos" :key="index"
                                :class="index <= instrumento.usosRealizados ? isUrgente ? 'bg-error' : 'bg-secondary' : 'bg-surface-container-highest'">
                            </div>
                        </div>

                        <div class="flex items-center justify-between mt-2 font-label-sm text-label-sm">
                            <span class="text-on-surface-variant">
                                {{ instrumento.usosRealizados }}
                                {{ instrumento.usosRealizados === 1 ? 'uso registrado' : 'usos registrados' }}
                            </span>

                            <span class="font-bold" :class="isUrgente ? 'text-error' : 'text-secondary'">
                                {{ porcentajeUso }}%
                            </span>
                        </div>
                    </div>
                </div>

                <div class="bg-surface-container-low rounded-xl p-space-md">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                Vidas restantes
                            </span>

                            <div class="font-headline-lg text-headline-lg font-bold mt-1"
                                :class="isUrgente ? 'text-error' : 'text-secondary'">
                                {{ instrumento.vidasRestantes }}
                            </div>
                        </div>

                        <span class="material-symbols-outlined text-[26px]"
                            :class="isUrgente ? 'text-error' : 'text-secondary'">
                            favorite
                        </span>
                    </div>

                    <div class="mt-space-md">
                        <span v-if="instrumento.vidasRestantes > 0"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                            <span class="material-symbols-outlined text-[15px]">
                                verified
                            </span>

                            {{ instrumento.vidasRestantes }}
                            {{
                                instrumento.vidasRestantes === 1
                                    ? 'vida disponible'
                                    : 'vidas disponibles'
                            }}
                        </span>
                        <span v-else class="inline-flex items-center gap-1.5
                                   px-2.5 py-1 rounded-full
                                   bg-error-container
                                   text-on-error-container
                                   font-label-sm text-label-sm font-bold">
                            <span class="material-symbols-outlined text-[15px]">
                                block
                            </span>

                            Sin vidas disponibles
                        </span>
                    </div>
                </div>
            </div>
            <div
                class="mt-space-sm p-space-sm rounded-xl border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div class="flex items-center gap-3 min-w-0">
                    <div
                        class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-[21px] text-secondary">
                            location_on
                        </span>
                    </div>

                    <div class="min-w-0">
                        <span class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                            Ubicación actual
                        </span>

                        <span class="font-label-md text-label-md font-bold text-on-surface block truncate">
                            {{ instrumento.ubicacion?.nombre }}
                        </span>
                    </div>
                </div>

                <span class="font-body-sm text-body-sm text-on-surface-variant sm:text-right">
                    Último cambio: {{ ultimoCambioUbicacion }}
                </span>
            </div>

            <div v-if="!isUrgente"
                class="mt-space-sm px-space-sm py-2.5 rounded-lg bg-primary-container text-on-primary flex items-start gap-2">
                <span class="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0 mt-0.5">
                    shield
                </span>

                <p class="font-body-sm text-body-sm text-primary-fixed-dim">
                    Al registrar el tercer uso, el instrumento pasará
                    automáticamente a
                    <strong class="text-on-primary">
                        CAMBIO URGENTE
                    </strong>
                    y se bloquearán nuevos usos.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { EstadoOperativo, InstrumentoDetalle } from '@/types/instrumentos'

const props = defineProps<{
    instrumento: InstrumentoDetalle
}>()

const isUrgente = computed(() => {
    return (props.instrumento.estadoOperativo === 'CAMBIO_URGENTE')
})

const porcentajeUso = computed(() => {
    if (props.instrumento.usosMaximos <= 0) {
        return 0
    }

    return Math.min(
        100,
        Math.round(
            (
                props.instrumento.usosRealizados /
                props.instrumento.usosMaximos
            ) * 100
        )
    )
})

const estadoDotClass = computed(() => {
    switch (
        props.instrumento.estadoOperativo
    ) {
        case 'DISPONIBLE':
            return 'bg-tertiary-fixed-dim'

        case 'EN_USO':
        case 'EN_LIMPIEZA':
        case 'EN_MANTENIMIENTO':
            return 'bg-secondary'

        default:
            return 'bg-outline'
    }
})

const formatEstado = (
    estado: EstadoOperativo
) => {
    return estado.replaceAll('_', ' ')
}

const ultimoCambioUbicacion =
    computed(() => {
        const movimiento =
            props.instrumento.movimientos.find(
                (item) =>
                    item.tipo ===
                    'CAMBIO_UBICACION'
            )

        if (!movimiento) {
            return 'Sin cambios registrados'
        }

        return new Intl.DateTimeFormat(
            'es-MX',
            {
                dateStyle: 'medium',
                timeStyle: 'short',
            }
        ).format(
            new Date(movimiento.fechaHora)
        )
    })
</script>