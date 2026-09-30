<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="cerrar"></div>
        <div class="relative z-10 w-full max-w-lg
                   bg-surface-container-lowest
                   rounded-xl shadow-xl overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high
                       flex items-start justify-between gap-3">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-[21px] text-secondary mt-0.5">
                        move_item
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Cambiar ubicación
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            {{ instrumento.codigo }}
                        </p>
                    </div>
                </div>

                <button type="button" class="w-9 h-9 rounded-lg
                           flex items-center justify-center
                           text-on-surface-variant
                           hover:bg-surface-container-high" :disabled="saving" @click="cerrar">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>

            <form @submit.prevent="submit">
                <div class="p-space-md space-y-space-md">
                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Ubicación actual
                        </span>

                        <div class="mt-1.5 min-h-11 px-3
                                   rounded-lg bg-surface-container-low
                                   flex items-center gap-2">
                            <span class="material-symbols-outlined
                                       text-[18px] text-secondary">
                                location_on
                            </span>

                            <span class="font-body-md text-body-md
                                       text-on-surface font-semibold">
                                {{
                                    instrumento.ubicacion?.nombre ??
                                    'Sin ubicación asignada'
                                }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="nuevaUbicacion" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Nueva ubicación
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative mt-1.5">
                            <select id="nuevaUbicacion" v-model="ubicacionId" required :disabled="loading || saving"
                                class="w-full h-11 pl-3 pr-9
                                       rounded-lg
                                       bg-surface-container-low
                                       text-on-surface
                                       font-body-md text-body-md
                                       appearance-none
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-secondary">
                                <option value="" disabled>
                                    Seleccionar nueva ubicación
                                </option>

                                <option v-for="ubicacion in ubicacionesDisponibles" :key="ubicacion.id"
                                    :value="String(ubicacion.id)">
                                    {{ ubicacion.nombre }}
                                </option>
                            </select>

                            <span class="material-symbols-outlined
                                       absolute right-3 top-3
                                       text-[18px] text-outline
                                       pointer-events-none">
                                expand_more
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="observacionesUbicacion" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Observaciones
                        </label>

                        <textarea id="observacionesUbicacion" v-model.trim="observaciones" rows="3" maxlength="500"
                            placeholder="Motivo o información adicional del traslado..." :disabled="saving" class="w-full mt-1.5 px-3 py-2.5
                                   rounded-lg
                                   bg-surface-container-low
                                   text-on-surface
                                   font-body-md text-body-md
                                   placeholder:text-outline
                                   resize-none
                                   focus:outline-none
                                   focus:ring-2
                                   focus:ring-secondary"></textarea>
                    </div>

                    <div v-if="errorMessage" class="p-3 rounded-lg
                               bg-error-container
                               text-on-error-container">
                        <div class="flex items-start gap-2">
                            <span class="material-symbols-outlined text-[18px]">
                                error
                            </span>

                            <span class="font-body-sm text-body-sm">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="px-space-md py-space-sm
                           border-t border-surface-container-high
                           flex flex-col-reverse sm:flex-row
                           sm:justify-end gap-space-xs">
                    <button type="button" :disabled="saving" class="h-10 px-4 rounded-lg
                               bg-surface-container-high
                               text-on-surface
                               font-label-md text-label-md
                               font-semibold
                               disabled:opacity-60" @click="cerrar">
                        Cancelar
                    </button>

                    <button type="submit" :disabled="loading ||
                        saving ||
                        !ubicacionId
                        " class="h-10 px-4 rounded-lg
                               bg-secondary text-on-secondary
                               font-label-md text-label-md
                               font-bold
                               flex items-center
                               justify-center gap-2
                               disabled:opacity-60
                               disabled:cursor-not-allowed">
                        <span v-if="saving" class="material-symbols-outlined
                                   text-[18px] animate-spin">
                            progress_activity
                        </span>

                        <span v-else class="material-symbols-outlined text-[18px]">
                            move_item
                        </span>

                        {{
                            saving
                                ? 'Guardando...'
                                : 'Cambiar ubicación'
                        }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { catalogosService } from '@/services/catalogos.service'

import { getApiErrorMessage } from '@/utils/apiError'

import type { CatalogItem } from '@/types/catalogos'

import type { InstrumentoDetalle } from '@/types/instrumentos'

const props = defineProps<{
    instrumento: InstrumentoDetalle
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm',
    data: {
        ubicacionId: number
        observaciones?: string
    }): void
}>()

const ubicaciones = ref<CatalogItem[]>([])

const ubicacionId = ref('')
const observaciones = ref('')

const loading = ref(false)
const saving = ref(false)

const errorMessage = ref('')

const ubicacionesDisponibles = computed(() => {
    return ubicaciones.value.filter(
        (ubicacion) =>
            ubicacion.activo !== false &&
            ubicacion.id !== props.instrumento.ubicacion?.id
    )
})

const loadUbicaciones = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
        ubicaciones.value = await catalogosService.getAll('ubicaciones')
    } catch (error) {
        errorMessage.value =
            getApiErrorMessage(error)
    } finally {
        loading.value = false
    }
}

const submit = () => {
    if (saving.value || !ubicacionId.value) {
        return
    }

    const nuevaUbicacionId = Number(ubicacionId.value)

    if (!Number.isInteger(nuevaUbicacionId) || nuevaUbicacionId <= 0) {
        errorMessage.value = 'Selecciona una ubicación válida.'
        return
    }

    saving.value = true
    errorMessage.value = ''

    emit('confirm', {
        ubicacionId: nuevaUbicacionId,

        observaciones: observaciones.value.trim() || undefined,
    })
}

const cerrar = () => {
    if (saving.value) {
        return
    }

    emit('close')
}

const setSaving = (value: boolean) => {
    saving.value = value
}

const setError = (message: string) => {
    errorMessage.value = message
    saving.value = false
}

defineExpose({
    setSaving,
    setError,
})

onMounted(() => {
    loadUbicaciones()
})
</script>