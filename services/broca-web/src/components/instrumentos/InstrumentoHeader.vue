<template>
    <div class="flex flex-col xl:flex-row xl:items-start justify-between gap-space-md">
        <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-space-xs mb-1">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Ficha del instrumento
                </span>

                <span class="text-outline-variant">•</span>

                <span class="font-code-md text-code-md text-on-surface-variant font-semibold">
                    {{ instrumento.codigo }}
                </span>
            </div>

            <div class="flex flex-wrap items-center gap-space-sm">
                <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    {{ instrumento.tipoInstrumento.nombre }}
                </h1>

                <span v-if="instrumento.estadoOperativo !== 'CAMBIO_URGENTE'"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
                    <span class="w-2 h-2 rounded-full" :class="estadoDotClass"></span>
                    {{ formatEstado(instrumento.estadoOperativo) }}
                </span>

                <span v-else class="inline-flex items-center gap-1.5 px-2.5 py-1
                           rounded-full bg-error-container
                           text-on-error-container
                           font-label-sm text-label-sm font-bold">
                    <span class="material-symbols-outlined text-[15px]">
                        warning
                    </span>

                    CAMBIO URGENTE
                </span>
            </div>

            <p class="font-body-md text-body-md text-on-surface-variant mt-1">
                Consulta el estado, vida útil y trazabilidad completa del
                instrumento.
            </p>
        </div>
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-space-xs xl:justify-end shrink-0">
            <button type="button" @click="emit('editar')"
                class="h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm">
                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">
                    edit
                </span>

                <span>Editar</span>
            </button>

            <button type="button" @click="emit('cambiar-ubicacion')"
                class="h-10 px-4 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors">
                <span class="material-symbols-outlined text-[18px] text-secondary">
                    move_item
                </span>

                <span>Cambiar ubicación</span>
            </button>

            <button v-if="puedeRegistrarUso" type="button"
                class="h-10 px-4 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                @click="emit('registrar-uso')">
                <span class="material-symbols-outlined text-[18px]">
                    add_task
                </span>

                <span>Registrar uso</span>
            </button>
            <button v-if="instrumento.estadoOperativo" type="button"
                class="h-10 px-4 rounded-lg bg-error text-on-error font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                @click="emit('tramitar-baja')">
                <span class="material-symbols-outlined text-[18px]">
                    block
                </span>

                <span>Tramitar baja</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { InstrumentoDetalle, EstadoOperativo } from '@/types/instrumentos';

const props = defineProps<{
    instrumento: InstrumentoDetalle
    puedeRegistrarUso: boolean
}>()

const emit = defineEmits<{
    (e: 'editar'): void
    (e: 'cambiar-ubicacion'): void
    (e: 'registrar-uso'): void
    (e: 'tramitar-baja'): void
}>()

const estadoDotClass = computed(() => {
    switch (props.instrumento.estadoOperativo) {
        case 'DISPONIBLE':
            return 'bg-tertiary-fixed-dim'

        case 'EN_USO':
        case 'EN_LIMPIEZA':
        case 'EN_MANTENIMIENTO':
            return 'bg-secondary'

        case 'NO_DISPONIBLE':
        case 'EXTRAVIADA':
        case 'BAJA':
            return 'bg-outline'

        default:
            return 'bg-outline'
    }
})

const formatEstado = (estado: EstadoOperativo) => {
    const estados: Record<EstadoOperativo, string> = {
        DISPONIBLE: 'DISPONIBLE',
        EN_USO: 'EN USO',
        EN_LIMPIEZA: 'EN LIMPIEZA',
        EN_MANTENIMIENTO: 'EN MANTENIMIENTO',
        NO_DISPONIBLE: 'NO DISPONIBLE',
        EXTRAVIADA: 'EXTRAVIADA',
        CAMBIO_URGENTE: 'CAMBIO URGENTE',
        BAJA: 'BAJA',
    }

    return estados[estado]
}
</script>