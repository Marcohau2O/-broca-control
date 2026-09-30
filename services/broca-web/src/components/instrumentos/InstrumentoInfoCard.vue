<template>
    <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div
            class="px-space-md py-space-sm border-b border-surface-container-high flex flex-wrap items-center justify-between gap-space-xs">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-secondary">
                    info
                </span>

                <div>
                    <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Información del instrumento
                    </h2>

                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Datos generales y clasificación del instrumento.
                    </p>
                </div>
            </div>

            <span :class="[
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold',
                instrumento.activo
                    ? 'bg-surface-container text-on-surface-variant'
                    : 'bg-error-container text-on-error-container',
            ]">
                <span :class="['material-symbols-outlined text-[15px]',
                    instrumento.activo
                        ? 'text-secondary'
                        : 'text-error'
                ]">
                    {{ instrumento.activo ? 'verified' : 'block' }}
                </span>

                {{ instrumento.activo ? 'Registro activo' : 'Registro dado de baja' }}
            </span>
        </div>
        <div class="p-space-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm">
                <div class="p-space-sm rounded-xl bg-surface-container-low">
                    <div class="flex items-start gap-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[19px] text-secondary">
                                precision_manufacturing
                            </span>
                        </div>

                        <div class="min-w-0">
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Tipo
                            </span>

                            <span class="font-label-md text-label-md text-on-surface font-bold block mt-0.5">
                                {{ instrumento.tipoInstrumento.nombre }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="p-space-sm rounded-xl bg-surface-container-low">
                    <div class="flex items-start gap-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[19px] text-secondary">
                                factory
                            </span>
                        </div>

                        <div class="min-w-0">
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Marca
                            </span>

                            <span class="font-label-md text-label-md text-on-surface font-bold block mt-0.5">
                                {{ instrumento.marca?.nombre ?? 'Sin marca' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="p-space-sm rounded-xl bg-surface-container-low">
                    <div class="flex items-start gap-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[19px] text-secondary">
                                category
                            </span>
                        </div>

                        <div class="min-w-0">
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Modelo
                            </span>

                            <span class="font-code-md text-code-md text-on-surface font-bold block mt-0.5">
                                {{ instrumento.modelo?.nombre ?? 'Sin modelo' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="p-space-sm rounded-xl bg-surface-container-low">
                    <div class="flex items-start gap-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[19px] text-secondary">
                                local_shipping
                            </span>
                        </div>

                        <div class="min-w-0">
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Proveedor
                            </span>

                            <span class="font-label-md text-label-md text-on-surface font-bold block mt-0.5">
                                {{ instrumento.proveedor?.nombre ?? 'Sin proveedor' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-sm mt-space-sm">
                <div class="p-space-sm rounded-xl border border-surface-container-high">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-[17px] text-secondary">
                            location_on
                        </span>

                        <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Ubicación actual
                        </span>
                    </div>

                    <span class="font-label-md text-label-md text-on-surface font-bold">
                        {{ instrumento.ubicacion?.nombre ?? 'Sin ubicación asignada' }}
                    </span>
                </div>
                <div class="p-space-sm rounded-xl border border-surface-container-high">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-[17px] text-secondary">
                            person
                        </span>

                        <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Responsable
                        </span>
                    </div>

                    <span class="font-label-md text-label-md text-on-surface font-bold">
                        {{ instrumento.responsable?.nombre ?? 'Sin responsable asignado' }}
                    </span>
                </div>
                <div class="p-space-sm rounded-xl border border-surface-container-high md:col-span-2 xl:col-span-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-[17px] text-secondary">
                            calendar_today
                        </span>

                        <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Fecha de registro
                        </span>
                    </div>

                    <span class="font-label-md text-label-md text-on-surface font-bold">
                        {{ fechaRegistro }}
                    </span>
                </div>
            </div>
            <div class="mt-space-sm p-space-sm rounded-xl bg-surface-container-low/60">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm">
                    <div class="flex flex-wrap gap-x-space-lg gap-y-space-sm">
                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Lote
                            </span>

                            <span class="font-code-md text-code-md text-on-surface font-bold">
                                {{ instrumento.lote || 'Sin lote' }}
                            </span>
                        </div>

                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                Número de serie
                            </span>

                            <span class="font-code-md text-code-md text-on-surface font-bold">
                                {{ instrumento.serie || 'Sin número de serie' }}
                            </span>
                        </div>
                    </div>

                    <span class="inline-flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                        <span class="material-symbols-outlined text-[16px] text-secondary">
                            history
                        </span>

                        Datos sujetos a trazabilidad
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { InstrumentoDetalle } from '@/types/instrumentos'

const props = defineProps<{
    instrumento: InstrumentoDetalle
}>()

const fechaRegistro = computed(() => {
    if (!props.instrumento.fechaAlta) {
        return 'Sin fecha'
    }

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            dateStyle: 'medium',
        }
    ).format(
        new Date(props.instrumento.fechaAlta)
    )
})
</script>