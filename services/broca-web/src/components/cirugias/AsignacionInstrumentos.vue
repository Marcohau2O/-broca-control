<template>
    <div class="min-w-52 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-medium text-gray-600">
                Instrumentos asignados
            </span>

            <span class="rounded-full px-2 py-1 text-xs font-semibold"
                :class="
                cantidadPendiente === 0
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'
                ">
                {{ asignados.length }} / {{ cantidadRequerida }}
            </span>
        </div>

        <div v-if="seleccionados.length" 
            class="flex flex-wrap gap-2">
            <span v-for="instrumento in seleccionados" :key="instrumento.id">
                {{ instrumento.codigo }}

                <button 
                        :disabled="disabled"
                        type="button" 
                        class="font-bold text-blue-600 hover:text-red-600"
                        :aria-label="`Quitar ${instrumento.codigo}`"
                        @click="!disabled && emit('quitar', instrumento.id)">
                    ×
                </button>
            </span>
        </div>

        <select v-if="cantidadPendiente > 0"
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            :disabled="disabled || opciones.length === 0"
            @change="seleccionar">

            <option value="">
                {{ 
                    opciones.length
                        ? 'Seleccionar instrumento'
                        : 'Sin instrumento disponibles'
                }}
            </option>

            <option v-for="instrumento in opciones"
                :key="instrumento.id" :value="instrumento.id">
                {{ instrumento.codigo }} — {{ instrumento.vidasRestantes }} vidas
            </option>
        </select>

        <p v-if="cantidadPendiente > 0"
            class="text-xs text-amber-700">
            Faltan {{ cantidadPendiente }}
            {{ cantidadPendiente === 1 ? 'instrumento' : 'instrumentos' }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Instrumento {
    id: string
    codigo: string
    vidasRestantes: number
}

const props = withDefaults(defineProps<{
    instrumentos: Instrumento[]
    asignados: string[]
    cantidadRequerida: number
    disabled?: boolean
}>(), {
    disabled: false
})

const emit = defineEmits<{
    agregar: [id: string]
    quitar: [id: string]
}>()

const cantidadPendiente = computed(() =>
    Math.max(0, props.cantidadRequerida - props.asignados.length)
)

const opciones = computed(() => props.instrumentos.filter(
    (instrumento) => !props.asignados.includes(instrumento.id)
))

const seleccionados = computed(() => props.asignados.map((id) =>
      props.instrumentos.find(
        (instrumento) => instrumento.id === id
      )
    )
    .filter((instrumento): instrumento is Instrumento =>
        instrumento !== undefined
    )
)

function seleccionar(event: Event) {
    if (props.disabled) return

    const elemento = event.target as HTMLSelectElement
    const id = elemento.value

    if (id) {
        emit('agregar', id)
        elemento.value = ''
    }
}

</script>