<template>
    <div v-if="open" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]" @click="closeModal"></div>
        <div class="relative z-10 w-full sm:max-w-xl max-h-[92vh]
                   bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl
                   shadow-xl overflow-hidden flex flex-col">
            <div class="px-space-md py-space-sm border-b border-surface-container-high
                       flex items-start justify-between gap-space-sm">
                <div class="flex items-start gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-error-container
                               text-on-error-container flex items-center
                               justify-center shrink-0">
                        <span class="material-symbols-outlined text-[21px]">
                            block
                        </span>
                    </div>

                    <div class="min-w-0">
                        <span class="font-label-sm text-label-sm uppercase
                                   tracking-wider text-error font-bold">
                            Baja de instrumento
                        </span>

                        <h2 class="font-headline-md text-headline-md
                                   font-bold text-on-surface">
                            Tramitar baja
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            {{ instrumento.codigo }} · {{ instrumento.tipoInstrumento.nombre }}
                        </p>
                    </div>
                </div>

                <button type="button" aria-label="Cerrar" class="w-9 h-9 rounded-lg bg-surface-container-low
                           text-on-surface-variant hover:bg-surface-container-high
                           hover:text-on-surface transition-colors
                           flex items-center justify-center shrink-0" @click="closeModal">
                    <span class="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>
            <div class="overflow-y-auto">
                <div class="p-space-md">
                    <div class="rounded-xl border border-error/20
                               bg-error-container/40 p-space-sm">
                        <div class="flex flex-col sm:flex-row
                                   sm:items-center sm:justify-between gap-space-sm">
                            <div>
                                <span class="font-label-sm text-label-sm uppercase
                                           tracking-wider text-error font-bold">
                                    Estado actual
                                </span>

                                <div class="mt-1">
                                    <span class="inline-flex items-center gap-1.5
                                               px-2.5 py-1 rounded-full
                                               bg-error-container
                                               text-on-error-container
                                               font-label-sm text-label-sm font-bold">
                                        <span class="material-symbols-outlined text-[15px]">
                                            warning
                                        </span>

                                        {{ instrumento.estadoOperativo.replaceAll('_', ' ') }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex gap-space-md">
                                <div class="sm:text-right">
                                    <span class="font-label-sm text-label-sm
                                               uppercase text-outline
                                               font-semibold block">
                                        Usos
                                    </span>

                                    <span class="font-code-md text-code-md
                                               text-on-surface font-bold">
                                        {{ instrumento.usosRealizados }} / {{ instrumento.usosMaximos }}
                                    </span>
                                </div>

                                <div class="sm:text-right">
                                    <span class="font-label-sm text-label-sm
                                               uppercase text-outline
                                               font-semibold block">
                                        Vidas
                                    </span>

                                    <span class="font-code-md text-code-md
                                               text-error font-bold">
                                        {{ instrumento.vidasRestantes }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-space-md flex items-start gap-3
                               p-space-sm rounded-xl bg-surface-container-low">
                        <span class="material-symbols-outlined text-[20px]
                                   text-secondary shrink-0">
                            info
                        </span>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                            La baja retirará formalmente el instrumento del
                            inventario operativo. Su historial y trazabilidad
                            permanecerán disponibles para consulta.
                        </p>
                    </div>
                    <form class="mt-space-md space-y-space-md" @submit.prevent="submitForm">
                        <div class="flex flex-col gap-1.5">
                            <label for="motivoBaja" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline font-semibold">
                                Motivo de baja
                                <span class="text-error">*</span>
                            </label>

                            <div class="relative">
                                <select id="motivoBaja" v-model="form.motivoBajaId" required class="w-full h-11 pl-3 pr-9 rounded-lg
                                           bg-surface-container-low text-on-surface
                                           font-body-md text-body-md appearance-none
                                           focus:outline-none focus:ring-2
                                           focus:ring-secondary">
                                    <option value="" disabled>
                                        Seleccionar motivo
                                    </option>

                                    <option v-for="motivo in motivosBaja" :key="motivo.id" :value="String(motivo.id)">
                                        {{ motivo.nombre }}
                                    </option>
                                </select>

                                <span v-if="loadingMotivos" class="font-body-sm text-body-sm text-on-surface-variant">
                                    Cargando motivos de baja...
                                </span>

                                <span class="material-symbols-outlined absolute
                                           right-3 top-3 text-[18px] text-outline
                                           pointer-events-none">
                                    expand_more
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label for="observacionesBaja" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline font-semibold">
                                Observaciones

                                <span class="normal-case tracking-normal
                                           text-on-surface-variant font-normal">
                                    (opcional)
                                </span>
                            </label>

                            <textarea id="observacionesBaja" v-model="form.observaciones" rows="4" maxlength="500"
                                placeholder="Describe información relevante sobre la baja..." class="w-full px-3 py-2.5 rounded-lg
                                       bg-surface-container-low text-on-surface
                                       font-body-md text-body-md resize-none
                                       placeholder:text-outline focus:outline-none
                                       focus:ring-2 focus:ring-secondary"></textarea>

                            <div class="flex justify-end font-label-sm
                                       text-label-sm text-outline">
                                {{ form.observaciones.length }} / 500
                            </div>
                        </div>
                        <label class="flex items-start gap-3 p-space-sm rounded-xl
                                   border border-surface-container-high cursor-pointer">
                            <input v-model="form.confirmado" type="checkbox"
                                class="mt-1 w-4 h-4 accent-secondary shrink-0" />

                            <span>
                                <span class="font-label-md text-label-md
                                           text-on-surface font-bold block">
                                    Confirmar baja del instrumento
                                </span>

                                <span class="font-body-sm text-body-sm
                                           text-on-surface-variant block mt-0.5">
                                    Confirmo que este instrumento debe ser
                                    retirado del inventario operativo.
                                </span>
                            </span>
                        </label>
                    </form>
                </div>
            </div>

            <div v-if="motivosError" class="rounded-lg bg-error-container text-on-error-container p-3">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[18px]">
                        error
                    </span>

                    <span class="font-body-sm text-body-sm">
                        {{ motivosError }}
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
                            No fue posible tramitar la baja
                        </span>

                        <p class="font-body-sm text-body-sm mt-0.5">
                            {{ errorMessage }}
                        </p>
                    </div>
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

                <button type="button" :disabled="!canSubmit" class="h-10 px-4 rounded-lg bg-error text-on-error
                           font-label-md text-label-md font-bold
                           flex items-center justify-center gap-2
                           transition-opacity
                           disabled:opacity-40 disabled:cursor-not-allowed" @click="submitForm">
                    <span class="material-symbols-outlined text-[18px]"
                    :class="{ 'animate-spin': submitting }">
                        {{ submitting ? 'progress_activity' : 'block' }}
                    </span>

                    {{ 
                        submitting ? 'Tramitando...' : 'Confirmar baja'
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
    (e: 'submit',
        data: {
            motivoBajaId: number
            observaciones?: string
        }
    ): void
}>()

const form = reactive({
    motivoBajaId: '',
    observaciones: '',
    confirmado: false,
})

const motivosBaja = ref<CatalogItem[]>([])

const loadingMotivos = ref(false)
const motivosError = ref('')

const canSubmit = computed(() => {
    return Boolean(
        form.motivoBajaId &&
        form.confirmado &&
        !loadingMotivos.value &&
        !motivosError.value &&
        !props.submitting
    )
})

const closeModal = () => {
    if (props.submitting) {
        return
    }

    emit('close')
}

const resetForm = () => {
    form.motivoBajaId = ''
    form.observaciones = ''
    form.confirmado = false
}

const loadMotivosBaja = async () => {
    loadingMotivos.value = true
    motivosError.value = ''

    try {
        const data = await catalogosService.getAll('motivosBaja')

        motivosBaja.value = data.filter(
            (item) => item.activo !== false
        )
    } catch (error) {
        motivosError.value = getApiErrorMessage(error)
    } finally {
        loadingMotivos.value = false
    }
}

const submitForm = () => {
    if (!canSubmit.value) {
        return
    }

    emit('submit', {
        motivoBajaId: Number(form.motivoBajaId),
        observaciones: form.observaciones.trim() || undefined
    })
}

watch(
    () => props.open,
    async (open) => {
        if (!open) {
            return
        }

        resetForm()

        if (motivosBaja.value.length === 0) {
            await loadMotivosBaja()
        }
    },
    {
        immediate: true
    }
)
</script>