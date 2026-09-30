<template>
    <div v-if="open" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]" @click="closeModal"></div>

        <div class="relative z-10 w-full sm:max-w-2xl max-h-[92vh] bg-surface-container-lowest
                   rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div class="px-space-md py-space-sm border-b border-surface-container-high
                       flex items-start justify-between gap-space-sm">
                <div class="flex items-start gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-secondary text-on-secondary
                               flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-[21px]">
                            add_task
                        </span>
                    </div>

                    <div class="min-w-0">
                        <span class="font-label-sm text-label-sm uppercase tracking-wider
                                   text-secondary font-bold">
                            Registro de uso
                        </span>

                        <h2 class="font-headline-md text-headline-md font-bold
                                   text-on-surface">
                            Registrar uso del instrumento
                        </h2>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {{ instrumento.codigo }} · {{ instrumento.tipoInstrumento.nombre }}
                        </p>
                    </div>
                </div>

                <button type="button" class="w-9 h-9 rounded-lg bg-surface-container-low
                           text-on-surface-variant hover:bg-surface-container-high
                           hover:text-on-surface transition-colors flex items-center
                           justify-center shrink-0" aria-label="Cerrar" @click="closeModal">
                    <span class="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            <div class="overflow-y-auto">
                <div class="p-space-md">
                    <div class="rounded-xl bg-surface-container-low p-space-sm mb-space-md">
                        <div class="flex flex-col sm:flex-row sm:items-center
                                   sm:justify-between gap-space-sm">
                            <div>
                                <span class="font-label-sm text-label-sm uppercase
                                           tracking-wider text-outline font-semibold">
                                    Estado actual
                                </span>

                                <div class="flex flex-wrap items-center gap-2 mt-1">
                                    <span class="px-2.5 py-1 rounded-full
                                               bg-surface-container text-on-surface
                                               font-label-sm text-label-sm font-bold">
                                        {{ instrumento.estadoOperativo.replaceAll('_', ' ') }}
                                    </span>

                                    <span class="font-body-sm text-body-sm
                                               text-on-surface-variant">
                                        {{ instrumento.usosRealizados }}
                                        {{ instrumento.usosRealizados === 1 ? 'uso realizado' : 'usos realizados' }}
                                    </span>
                                </div>
                            </div>

                            <div class="sm:text-right">
                                <span class="font-label-sm text-label-sm uppercase
                                           tracking-wider text-outline font-semibold block">
                                    Vidas restantes
                                </span>

                                <span class="font-headline-md text-headline-md
                                           font-bold text-secondary">
                                    {{ instrumento.vidasRestantes }}
                                </span>
                            </div>
                        </div>
                        <div class="mt-space-sm">
                            <div class="flex gap-1.5">
                                <div v-for="numero in instrumento.usosMaximos" :key="numero"
                                    class="h-2.5 flex-1 rounded-full"
                                    :class="numero <= instrumento.usosRealizados ? 'bg-secondary' : 'bg-surface-container-highest'">
                                </div>
                            </div>

                            <div class="flex justify-between mt-1.5
                                       font-label-sm text-label-sm">
                                <span class="text-on-surface-variant">
                                    {{ instrumento.usosRealizados }} de {{ instrumento.usosMaximos }} usos
                                </span>

                                <span class="text-secondary font-bold">
                                    Después de este registro: {{ usosDespues }} de {{ instrumento.usosMaximos }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <form class="space-y-space-md" @submit.prevent="submitForm">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                            <div class="flex flex-col gap-1.5">
                                <label for="servicio" class="font-label-sm text-label-sm uppercase
                                           tracking-wider text-outline font-semibold">
                                    Servicio
                                    <span class="text-error">*</span>
                                </label>

                                <div class="relative">
                                    <select id="servicio" v-model="form.servicioId" required class="w-full h-11 pl-3 pr-9 rounded-lg
                                               bg-surface-container-low text-on-surface
                                               font-body-md text-body-md appearance-none
                                               focus:outline-none focus:ring-2
                                               focus:ring-secondary">
                                        <option value="" disabled>
                                            Seleccionar servicio
                                        </option>

                                        <option v-for="servicio in servicios" :key="servicio.id"
                                            :value="String(servicio.id)">
                                            {{ servicio.nombre }}
                                        </option>
                                    </select>

                                    <span class="material-symbols-outlined absolute
                                               right-3 top-3 text-[18px] text-outline
                                               pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-col gap-1.5">
                                <label for="procedimiento" class="font-label-sm text-label-sm uppercase
                                           tracking-wider text-outline font-semibold">
                                    Procedimiento
                                    <span class="text-error">*</span>
                                </label>

                                <div class="relative">
                                    <select id="procedimiento" v-model="form.procedimientoId" required class="w-full h-11 pl-3 pr-9 rounded-lg
                                               bg-surface-container-low text-on-surface
                                               font-body-md text-body-md appearance-none
                                               focus:outline-none focus:ring-2
                                               focus:ring-secondary">
                                        <option value="" disabled>
                                            Seleccionar procedimiento
                                        </option>

                                        <option v-for="procedimiento in procedimientos" :key="procedimiento.id"
                                            :value="String(procedimiento.id)">
                                            {{ procedimiento.nombre }}
                                        </option>
                                    </select>

                                    <span class="material-symbols-outlined absolute
                                               right-3 top-3 text-[18px] text-outline
                                               pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label for="ubicacion" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline font-semibold">
                                Ubicación
                                <span class="text-error">*</span>
                            </label>

                            <div class="relative">
                                <select id="ubicacion" v-model="form.ubicacionId" required class="w-full h-11 pl-3 pr-9 rounded-lg
                                           bg-surface-container-low text-on-surface
                                           font-body-md text-body-md appearance-none
                                           focus:outline-none focus:ring-2
                                           focus:ring-secondary">
                                    <option value="" disabled>
                                        Seleccionar ubicación
                                    </option>

                                    <option v-for="ubicacion in ubicaciones" :key="ubicacion.id"
                                        :value="String(ubicacion.id)">
                                        {{ ubicacion.nombre }}
                                    </option>
                                </select>

                                <span class="material-symbols-outlined absolute
                                           right-3 top-3 text-[18px] text-outline
                                           pointer-events-none">
                                    expand_more
                                </span>
                            </div>

                            <span class="font-body-sm text-body-sm
                                       text-on-surface-variant">
                                Indica dónde se realizó el uso del instrumento.
                            </span>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label for="observaciones" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline font-semibold">
                                Observaciones
                                <span class="normal-case tracking-normal
                                           text-on-surface-variant font-normal">
                                    (opcional)
                                </span>
                            </label>

                            <textarea id="observaciones" v-model="form.observaciones" rows="3" maxlength="500"
                                placeholder="Agregar observaciones sobre el uso..." class="w-full px-3 py-2.5 rounded-lg
                                       bg-surface-container-low text-on-surface
                                       font-body-md text-body-md resize-none
                                       placeholder:text-outline focus:outline-none
                                       focus:ring-2 focus:ring-secondary"></textarea>

                            <div class="flex justify-end font-label-sm
                                       text-label-sm text-outline">
                                {{ form.observaciones.length }} / 500
                            </div>
                        </div>

                        <div v-if="catalogosError" class="rounded-lg bg-error-container text-on-error-container p-3">
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-[18px]">
                                    error
                                </span>

                                <span class="font-body-sm text-body-sm">
                                    {{ catalogosError }}
                                </span>
                            </div>
                        </div>

                        <div v-if="errorMessage" class="rounded-lg bg-error-container text-on-error-container p-3">
                            <div class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-[18px] shrink-0">
                                    error
                                </span>

                                <div>
                                    <span class="font-label-md text-label-md font-bold block">
                                        No fue posible registrar el uso
                                    </span>

                                    <p class="font-body-sm text-body-sm mt-0.5">
                                        {{ errorMessage }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="rounded-xl bg-primary-container
                                   text-on-primary p-space-sm">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-[20px]
                                           text-secondary-fixed shrink-0">
                                    shield
                                </span>

                                <div>
                                    <span class="font-label-md text-label-md font-bold block">
                                        Regla de control
                                    </span>

                                    <p class="font-body-sm text-body-sm
                                               text-primary-fixed-dim mt-0.5">
                                        Cada registro consume una vida del
                                        instrumento. Al alcanzar el tercer uso,
                                        pasará automáticamente a
                                        <strong class="text-on-primary">
                                            CAMBIO URGENTE
                                        </strong>
                                        y no podrá registrar usos adicionales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="px-space-md py-space-sm border-t
                       border-surface-container-high
                       bg-surface-container-lowest
                       flex flex-col-reverse sm:flex-row
                       sm:items-center sm:justify-end gap-space-xs">
                <button type="button" class="h-10 px-4 rounded-lg bg-surface-container-high
                           text-on-surface font-label-md text-label-md
                           font-semibold hover:bg-surface-container-highest
                           transition-colors" @click="closeModal">
                    Cancelar
                </button>

                <button :disabled="loadingCatalogos || !!catalogosError || submitting" type="button" :class="['h-10 px-4 rounded-lg bg-secondary text-on-secondary',
                    'font-label-md text-label-md font-bold flex items-center justify-center gap-2',
                    'hover:bg-primary hover:text-on-primary transition-colors shadow-sm',
                    loadingCatalogos ? 'disabled:opacity-60 disabled:cursor-not-allowed' : '']" @click="submitForm">
                    <span class="material-symbols-outlined text-[18px]" :class="{ 'animate-spin ': submitting }">
                        {{
                            submitting ? 'progress_activity' : 'add_task'
                        }}
                    </span>

                    {{
                        submitting ? 'Registrando...' : 'Registrar uso'
                    }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { catalogosService } from '@/services/catalogos.service';

import { getApiErrorMessage } from '@/utils/apiError';

import type { CatalogItem } from '@/types/catalogos';

import type { InstrumentoDetalle } from '@/types/instrumentos';

const props = defineProps<{
    open: boolean
    instrumento: InstrumentoDetalle
    submitting?: boolean
    errorMessage?: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (
        e: 'submit',
        data: {
            servicioId: number
            procedimientoId: number
            ubicacionId: number
            observaciones?: string
        }
    ): void
}>()

const form = reactive({
    servicioId: '',
    procedimientoId: '',
    ubicacionId: '',
    observaciones: '',
})

const servicios = ref<CatalogItem[]>([])
const procedimientos = ref<CatalogItem[]>([])
const ubicaciones = ref<CatalogItem[]>([])

const loadingCatalogos = ref(false)
const catalogosError = ref('')

const usosDespues = computed(() => {
    return props.instrumento.usosRealizados + 1
})

const closeModal = () => {
    if (props.submitting) {
        return
    }

    emit('close')
}

const loadCatalogos = async () => {
    loadingCatalogos.value = true
    catalogosError.value = ''

    try {
        const [
            serviciosData,
            procedimientosData,
            ubicacionesData,
        ] = await Promise.all([
            catalogosService.getAll('servicios'),
            catalogosService.getAll('procedimientos'),
            catalogosService.getAll('ubicaciones'),
        ])

        servicios.value = serviciosData.filter(
            (item) =>
                item.activo !== false
        )

        procedimientos.value = procedimientosData.filter(
            (item) =>
                item.activo !== false
        )

        ubicaciones.value = ubicacionesData.filter(
            (item) =>
                item.activo !== false
        )

    } catch (error) {
        catalogosError.value =
            getApiErrorMessage(error)
    } finally {
        loadingCatalogos.value = false
    }
}

const resetForm = () => {
    form.servicioId = ''
    form.procedimientoId = ''
    form.ubicacionId = props.instrumento.ubicacion
        ? String(props.instrumento.ubicacion.id)
        : ''

    form.observaciones = ''
}

const submitForm = () => {
    if (!form.servicioId || !form.procedimientoId || !form.ubicacionId) {
        return
    }

    emit('submit', {
        servicioId: Number(form.servicioId),
        procedimientoId: Number(form.procedimientoId),
        ubicacionId: Number(form.ubicacionId),
        observaciones: form.observaciones.trim() || undefined,
    })
}

watch(
    () => props.open, async (open) => {
        if (!open) {
            return
        }

        resetForm()

        if (servicios.value.length === 0 || procedimientos.value.length === 0 || ubicaciones.value.length === 0) {
            await loadCatalogos()
        }
    },
    {
        immediate: true,
    }
)
</script>