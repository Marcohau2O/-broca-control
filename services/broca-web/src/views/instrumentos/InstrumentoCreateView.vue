<template>
    <div class="w-full max-w-6xl mx-auto">
        <button type="button" class="inline-flex items-center gap-1.5
                   text-on-surface-variant hover:text-secondary
                   font-label-md text-label-md transition-colors" @click="goBack">
            <span class="material-symbols-outlined text-[18px]">
                arrow_back
            </span>

            Volver a instrumentos
        </button>

        <div class="mt-space-md mb-space-lg">
            <div class="flex items-center gap-space-xs mb-1">
                <span class="font-label-sm text-label-sm uppercase
                           tracking-wider text-secondary font-bold">
                    Instrumentos
                </span>

                <span class="text-outline-variant">•</span>

                <span class="font-label-sm text-label-sm
                           text-on-surface-variant font-medium">
                    Nuevo registro
                </span>
            </div>

            <h1 class="font-headline-lg text-headline-lg
                       text-on-surface font-bold tracking-tight">
                Registrar instrumento
            </h1>

            <p class="font-body-md text-body-md
                       text-on-surface-variant mt-1 max-w-2xl">
                Registra un nuevo instrumento y asigna su clasificación,
                ubicación y responsable inicial.
            </p>
        </div>

        <div v-if="errorMessage" class="mb-space-md rounded-xl bg-error-container text-on-error-container p-space-sm">
            <div class="flex items-start gap-2">
                <span class="material-symbols-outlined
                   text-[19px] shrink-0">
                    error
                </span>

                <div>
                    <span class="font-label-md text-label-md font-bold block">
                        No fue posible registrar el instrumento
                    </span>

                    <p class="font-body-sm text-body-sm mt-0.5">
                        {{ errorMessage }}
                    </p>
                </div>
            </div>
        </div>

        <InstrumentoForm mode="create" @cancel="goBack" @submit="handleSubmit" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import InstrumentoForm from '@/components/instrumentos/InstrumentoForm.vue'

import { instrumentosService } from '@/services/instrumentos.service'

import { getApiErrorMessage } from '@/utils/apiError'

import type { InstrumentoFormData } from '@/components/instrumentos/InstrumentoForm.vue'


const router = useRouter()

const saving = ref(false)
const errorMessage = ref('')

const goBack = () => {
    router.push({
        name: 'instrumentos'
    })
}

const toOptionalId = (value: string): number | undefined => {
    if (!value) {
        return undefined
    }

    const id = Number(value)

    return Number.isInteger(id) && id > 0
        ? id
        : undefined
}

const toOptionalText = (value: string): string | undefined => {
    const normalized = value.trim()

    return normalized || undefined
}

const handleSubmit = async (data: InstrumentoFormData) => {
    if (saving.value) {
        return
    }

    const tipoInstrumentoId = Number(data.tipoInstrumentoId)

    if (!Number.isInteger(tipoInstrumentoId) || tipoInstrumentoId <= 0) {
        errorMessage.value = "Selecciona un tipo de instrumento válido."
        return
    }

    saving.value = true
    errorMessage.value = ''

    try {
        await instrumentosService.create({
            tipoInstrumentoId,
            lote: toOptionalText(data.lote),
            serie: toOptionalText(data.serie),
            marcaId: toOptionalId(data.marcaId),
            modeloId: toOptionalId(data.modeloId),
            proveedorId: toOptionalId(data.proveedorId),
            ubicacionId: toOptionalId(data.ubicacionId),
            responsableId: toOptionalId(data.responsableId),
        })

        router.push({
            name: 'instrumentos',
        })
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)

        console.log('Error creando instrumento:', error)
    } finally {
        saving.value = false
    }
}
</script>