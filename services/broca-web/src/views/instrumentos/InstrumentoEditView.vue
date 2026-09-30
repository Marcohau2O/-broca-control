<template>
    <div class="w-full max-w-6xl mx-auto">
        <button type="button" class="inline-flex items-center gap-1.5
                   text-on-surface-variant hover:text-secondary
                   font-label-md text-label-md transition-colors" @click="goBack">
            <span class="material-symbols-outlined text-[18px]">
                arrow_back
            </span>

            Volver a la ficha
        </button>

        <div v-if="loading" class="mt-space-lg bg-surface-container-lowest
                   rounded-xl p-space-lg shadow-sm">
            <div class="flex items-center justify-center gap-3
                       text-on-surface-variant">
                <span class="material-symbols-outlined animate-spin">
                    progress_activity
                </span>

                <span class="font-body-md text-body-md">
                    Cargando instrumento...
                </span>
            </div>
        </div>

        <div v-else-if="errorMessage" class="mt-space-lg bg-error-container
                   text-on-error-container rounded-xl
                   p-space-md">
            <div class="flex items-start gap-3">
                <span class="material-symbols-outlined">
                    error
                </span>

                <div class="flex-1">
                    <p class="font-label-md text-label-md font-bold">
                        No fue posible cargar el instrumento
                    </p>

                    <p class="font-body-sm text-body-sm mt-1">
                        {{ errorMessage }}
                    </p>
                </div>
            </div>
        </div>

        <template v-else-if="instrumento && initialData">
            <div class="mt-space-md mb-space-lg">
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                           tracking-wider text-secondary font-bold">
                        Editar instrumento
                    </span>

                    <span class="text-outline-variant">•</span>

                    <span class="font-code-md text-code-md
                           text-on-surface-variant font-semibold">
                        {{ instrumento.codigo }}
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                       text-on-surface font-bold tracking-tight">
                    {{ nombreInstrumento }}
                </h1>

                <p class="font-body-md text-body-md
                       text-on-surface-variant mt-1 max-w-2xl">
                    Actualiza la información administrativa del instrumento.
                    Su historial de usos y trazabilidad no será modificado.
                </p>
            </div>

            <div v-if="saveError" class="mb-space-md p-space-sm rounded-lg
                       bg-error-container text-on-error-container">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[19px]">
                        error
                    </span>

                    <span class="font-body-sm text-body-sm">
                        {{ saveError }}
                    </span>
                </div>
            </div>

            <InstrumentoForm mode="edit" :initial-data="instrumento" @cancel="goBack" @submit="handleSubmit" />

            <div v-if="saving" class="fixed inset-0 z-50
                       bg-black/20 flex items-center
                       justify-center">
                <div class="bg-surface-container-lowest
                           rounded-xl shadow-lg px-6 py-4
                           flex items-center gap-3">
                    <span class="material-symbols-outlined
                               animate-spin text-secondary">
                        progress_activity
                    </span>

                    <span class="font-label-md text-label-md
                               font-semibold text-on-surface">
                        Guardando cambios...
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useRoute,  useRouter } from 'vue-router'

import InstrumentoForm from '@/components/instrumentos/InstrumentoForm.vue'

import type { InstrumentoFormData } from '@/components/instrumentos/InstrumentoForm.vue'

import { instrumentosService } from '@/services/instrumentos.service'

import { getApiErrorMessage } from '@/utils/apiError'

import type { InstrumentoDetalle } from '@/types/instrumentos'

const route = useRoute()
const router = useRouter()

const instrumento = ref<InstrumentoDetalle | null>(null)

const loading = ref(true)
const saving = ref(false)

const errorMessage = ref('')
const saveError = ref('')

const instrumentoId = computed(() => {
    return Number(route.params.id)
})

const initialData = computed<Partial<InstrumentoFormData> | null>(
    () => { 
        if (!instrumento.value) {
                return null
            }
            
            return {
                codigo: instrumento.value.codigo,
                tipoInstrumentoId: String(instrumento.value.tipoInstrumento.id),
                lote: instrumento.value.lote ?? '',
                serie: instrumento.value.serie ?? '',
                marcaId: instrumento.value.marca ? String(instrumento.value.marca.id) : '',
                modeloId: instrumento.value.modelo ? String(instrumento.value.modelo.id): '',
                proveedorId: instrumento.value.proveedor ? String(instrumento.value.proveedor.id): '',
                ubicacionId: instrumento.value.ubicacion ? String(instrumento.value.ubicacion.id): '',
                responsableId: instrumento.value.responsable ? String(instrumento.value.responsable.id): '',
        }
    }
)

const nombreInstrumento = computed(() => {
    if (!instrumento.value) {
        return ''
    }

    const tipo = instrumento.value.tipoInstrumento.nombre
    const modelo = instrumento.value.modelo?.nombre
    return modelo ? `${tipo} ${modelo}` : tipo
})

const loadInstrumento = async () => {
    if (!Number.isInteger(instrumentoId.value) || instrumentoId.value <= 0) {
        errorMessage.value = 'El identificador del instrumento no es válido.'

        loading.value = false
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        instrumento.value = await instrumentosService.getById(instrumentoId.value)
    } catch (error) {
        errorMessage.value =
            getApiErrorMessage(error)
    } finally {
        loading.value = false
    }
}

const toNullableId = (value: string): number | null => {
    if (!value) {
        return null
    }

    const id = Number(value)

    return Number.isInteger(id) ? id : null
}

const toNullableText = (value: string): string | null => {
    const text = value.trim()

    return text || null
}

const handleSubmit = async (data: InstrumentoFormData) => {
    if (saving.value) {
        return
    }

    saving.value = true
    saveError.value = ''

    try {
        await instrumentosService.update(instrumentoId.value,
            {
                lote: toNullableText(data.lote),

                serie:toNullableText(data.serie),

                marcaId: toNullableId(data.marcaId),

                modeloId: toNullableId(data.modeloId),

                proveedorId: toNullableId(data.proveedorId),

                responsableId: toNullableId(data.responsableId),
            }
        )

        await router.push({
            name: 'instrumento-detail',
            params: {
                id: instrumentoId.value,
            },
        })
    } catch (error) {
        saveError.value =
            getApiErrorMessage(error)
    } finally {
        saving.value = false
    }
}

const goBack = () => {
    if (Number.isInteger(instrumentoId.value) && instrumentoId.value > 0) {
        router.push({
            name: 'instrumento-detail',
            params: {
                id: instrumentoId.value,
            },
        })

        return
    }

    router.push({
        name: 'instrumentos',
    })
}

onMounted(() => {
    loadInstrumento()
})
</script>