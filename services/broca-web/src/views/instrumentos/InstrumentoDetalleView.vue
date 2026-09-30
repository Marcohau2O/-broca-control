<template>
    <div class="w-full">
        <div class="mb-space-md">
            <button type="button" @click="goBackInstrumento"
                class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-colors">
                <span class="material-symbols-outlined text-[18px]">
                    arrow_back
                </span>

                <span>Volver a instrumentos</span>
            </button>
        </div>

        <div v-if="loading" class="py-20 flex flex-col items-center justify-center gap-3">
            <span class="material-symbols-outlined text-[36px] text-secondary animate-spin">
                progress_activity
            </span>

            <span class="font-body-md text-body-md text-on-surface-variant">
                Cargando instrumento...
            </span>
        </div>

        <div v-else-if="errorMessage" class="mt-space-lg bg-error-container/30 rounded-xl p-space-lg text-center">
            <span class="material-symbols-outlined text-[38px] text-error">
                error
            </span>

            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface mt-2">
                No fue posible cargar el instrumento
            </h2>

            <p class="font-body-md text-body-md text-on-surface-variant mt-1">
                {{ errorMessage }}
            </p>

            <button type="button" class="mt-4 h-10 px-4 rounded-lg bg-primary text-on-primary font-label-md font-bold"
                @click="loadInstrumento">
                Reintentar
            </button>
        </div>

        <template v-else-if="instrumento">
            <InstrumentoHeader :instrumento="instrumento" :puede-registrar-uso="puedeRegistrarUso" @editar="editarInstrumento"
                @registrar-uso="abrirRegistrarUso" @tramitar-baja="abrirTramitarBaja" @cambiar-ubicacion="showCambiarUbicacion = true" />

            <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-md mt-space-lg">
                <div class="xl:col-span-5">
                    <div class="h-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        <div
                            class="px-space-md py-space-sm border-b border-surface-container-high flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-[20px] text-secondary">
                                    fingerprint
                                </span>

                                <span class="font-label-md text-label-md font-bold text-on-surface">
                                    Identificación
                                </span>
                            </div>

                            <span class="font-code-md text-code-md text-on-surface-variant">
                                BRC-0089
                            </span>
                        </div>
                        <div class="p-space-md">
                            <div class="flex flex-col sm:flex-row gap-space-md sm:items-center">
                                <div
                                    class="w-32 h-32 sm:w-36 sm:h-36 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                                    <div
                                        class="w-24 h-24 sm:w-28 sm:h-28 bg-surface-container-lowest rounded-lg shadow-sm flex items-center justify-center">
                                        <span class="material-symbols-outlined text-[72px] sm:text-[84px] text-primary">
                                            qr_code_2
                                        </span>
                                    </div>
                                </div>

                                <div class="min-w-0 flex-1">
                                    <span
                                        class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                        Código del instrumento
                                    </span>

                                    <div class="font-code-md text-headline-md font-bold text-on-surface mt-1">
                                        BRC-0089
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-md">
                                        <div>
                                            <span
                                                class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                                Lote
                                            </span>

                                            <span class="font-code-md text-code-md text-on-surface font-medium">
                                                LT-7711
                                            </span>
                                        </div>

                                        <div>
                                            <span
                                                class="font-label-sm text-label-sm uppercase text-outline font-semibold block">
                                                Serie
                                            </span>

                                            <span class="font-code-md text-code-md text-on-surface font-medium">
                                                SN-102941
                                            </span>
                                        </div>
                                    </div>

                                    <button type="button"
                                        class="mt-space-md h-9 px-3 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold inline-flex items-center gap-1.5 hover:bg-surface-container-highest transition-colors">
                                        <span class="material-symbols-outlined text-[17px]">
                                            print
                                        </span>

                                        Imprimir QR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="xl:col-span-7">
                    <InstrumentoStatusCard :instrumento="instrumento" />
                </div>
            </div>
            <InstrumentoInfoCard :instrumento="instrumento" class="mt-space-md" />
            <InstrumentoHistory :instrumento="instrumento" class="mt-space-md" />
        </template>
        <RegistrarUsoModal v-if="instrumento" :open="showRegistrarUso" :instrumento="instrumento" :submitting="registrandoUso" :error-message="registroUsoError" @close="showRegistrarUso = false" @submit="handleRegistrarUso" />
        <TramitarBajaModal v-if="instrumento" :open="showTramitarBaja" :instrumento="instrumento" :submitting="tramitandoBaja" :error-message="bajaError" @close="showTramitarBaja = false" @submit="handleTramitarBaja" />
        <CambiarUbicacionModal v-if="showCambiarUbicacion && instrumento" :instrumento="instrumento" @close="showCambiarUbicacion = false" @confirm="handleCambiarUbicacion" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import InstrumentoHeader from '@/components/instrumentos/InstrumentoHeader.vue'
import InstrumentoStatusCard from '@/components/instrumentos/InstrumentoStatusCard.vue'
import InstrumentoInfoCard from '@/components/instrumentos/InstrumentoInfoCard.vue';
import InstrumentoHistory from '@/components/instrumentos/InstrumentoHistory.vue';

import RegistrarUsoModal from '@/components/instrumentos/RegistrarUsoModal.vue';
import TramitarBajaModal from '@/components/instrumentos/TramitarBajaModal.vue';
import CambiarUbicacionModal from '@/components/instrumentos/CambiarUbicacionModal.vue';

import { instrumentosService } from '@/services/instrumentos.service'
import { getApiErrorMessage } from '@/utils/apiError'

import type { InstrumentoDetalle } from '@/types/instrumentos'

const route = useRoute()
const router = useRouter()

const instrumento = ref<InstrumentoDetalle | null>(null)

const loading = ref(true)
const errorMessage = ref('')

const showRegistrarUso = ref(false)
const showTramitarBaja = ref(false)
const showCambiarUbicacion = ref(false)

const cambiandoUbicacion = ref(false)
const ubicacionError = ref('')

const registrandoUso = ref(false)
const registroUsoError = ref('')

const tramitandoBaja = ref(false)
const bajaError = ref('')

const abrirRegistrarUso = () => {
    registroUsoError.value = ''
    showRegistrarUso.value = true
}

const abrirTramitarBaja = () => {
    bajaError.value = ''
    showTramitarBaja.value = true
}

const loadInstrumento = async () => {
    loading.value = true
    errorMessage.value = ''

    const id = Number(route.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        errorMessage.value = 'El identificador del instrumento no es válido.'

        loading.value = false
        return
    }

    try {
        instrumento.value = await instrumentosService.getById(id)
    } catch (error) {
        instrumento.value = null

        errorMessage.value = getApiErrorMessage(error)
    } finally {
        loading.value = false
    }
}

const puedeRegistrarUso = computed(() => {
    if (!instrumento.value) {
        return false
    }

    const estadosBloqueados: InstrumentoDetalle['estadoOperativo'][] = [
        'EN_LIMPIEZA',
        'EN_MANTENIMIENTO',
        'NO_DISPONIBLE',
        'EXTRAVIADA',
        'CAMBIO_URGENTE',
        'BAJA',
    ]

    return (
        instrumento.value.activo &&
        !estadosBloqueados.includes(
            instrumento.value.estadoOperativo) &&
        instrumento.value.vidasRestantes > 0 &&
        instrumento.value.usosRealizados <instrumento.value.usosMaximos
    )
})

const goBackInstrumento = () => {
    router.push({ name: 'instrumentos' })
}

const editarInstrumento = () => {

    const id = Number(route.params.id)

    router.push({
        name: 'instrumento-edit',
        params: {
            id,
        },
    })
}

const handleCambiarUbicacion = async (
    data: {
        ubicacionId: number
        observaciones?: string
    }
) => {
    if (cambiandoUbicacion.value) {
        return
    }

    cambiandoUbicacion.value = true
    ubicacionError.value = ''

    const id = Number(route.params.id)

    try {
        await instrumentosService.updateUbicacion(
            id,
            data
        )

        showCambiarUbicacion.value = false

        await loadInstrumento()
    } catch (error) {
        ubicacionError.value =
            getApiErrorMessage(error)

        console.error(
            'Error cambiando ubicación:',
            error
        )
    } finally {
        cambiandoUbicacion.value = false
    }
}

const handleRegistrarUso = async (
    data: {
        servicioId: number
        procedimientoId: number
        ubicacionId: number
        observaciones?: string
    }
) => {
    if (registrandoUso.value) {
        return
    }

    const id = Number(route.params.id)

    if (!Number.isInteger(id) || id <= 0){
        registroUsoError.value = 'El identificador del instrumento no es válido'
        return
    }

    registrandoUso.value = true
    registroUsoError.value = ''

    const idempotencyKey = crypto.randomUUID()

    try {
        await instrumentosService.registrarUso(id, data, idempotencyKey)

        showRegistrarUso.value = false

        await loadInstrumento()
    } catch (error) {
        registroUsoError.value = getApiErrorMessage(error)
    } finally {
        registrandoUso.value = false
    }
}

const handleTramitarBaja = async (
    data : {
        motivoBajaId: number
        observaciones?: string
    }
) => {
    if (tramitandoBaja.value) {
        return
    }

    const id = Number(route.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        bajaError.value = 'El identificador del instrumento no es válido'

        return
    }

    tramitandoBaja.value = true
    bajaError.value = ''

    try {
        await instrumentosService.darBaja(id, data)

        showTramitarBaja.value = false

        await loadInstrumento()
    } catch (error) {
        bajaError.value = getApiErrorMessage(error)

        console.error('Error tramitando baja:', error)
    } finally {
        tramitandoBaja.value = false
    }
}

onMounted(loadInstrumento)
</script>
