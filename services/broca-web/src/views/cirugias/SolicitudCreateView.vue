<template>
    <div class="w-full max-w-6xl mx-auto space-y-space-md pb-space-lg">
        <header class="flex flex-col gap-space-sm sm:flex-row sm:items-start sm:justify-between">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        Programación quirúrgica
                    </span>
                    <span class="text-outline-variant">•</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Documentación quirúrgica
                    </span>
                </div>
                <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                    Nueva solicitud
                </h1>
                <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                    Registra los datos de la cirugía y los materiales necesarios para el procedimiento.
                </p>
            </div>
        </header>
        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                    medical_services
                </span>
                <div>
                    <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Datos de la cirugía
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Información general del procedimiento quirúrgico.
                    </p>
                </div>
            </div>
            <div class="p-space-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
                <div class="flex flex-col gap-1.5">
                    <label for="tipo-cirugia" :class="labelClass">Tipo de cirugía</label>
                    <div class="relative">
                        <select id="tipo-cirugia" v-model="tipoCirugia" :class="selectClass" @change="cargarPlantilla">
                            <option value="">
                                Seleccionar procedimiento
                            </option>
                            <option v-for="plantilla in plantillasCirugia" :key="plantilla.id" :value="plantilla.id">
                                {{ plantilla.nombre }}
                            </option>
                        </select>
                        <span
                            class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">expand_more</span>
                    </div>
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="fecha-cirugia" :class="labelClass">Fecha de cirugía</label>
                    <input id="fecha-cirugia" v-model="formulario.fechaCirugia" type="date" :class="inputClass" />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hora-cirugia" :class="labelClass">Hora</label>
                    <input id="hora-cirugia" v-model="formulario.horaCirugia" type="time" :class="inputClass" />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="hospital" :class="labelClass">Hospital / Cliente</label>
                    <input id="hospital" v-model.trim="formulario.hospitalCliente" type="text"
                        placeholder="Nombre del hospital" :class="inputClass" />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="paciente" :class="labelClass">Paciente</label>
                    <input id="paciente" v-model.trim="formulario.paciente" type="text"
                        placeholder="Nombre del paciente" :class="inputClass" />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label for="afiliacion" :class="labelClass">Afiliación</label>
                    <input id="afiliacion" v-model.trim="formulario.afiliacion" type="text"
                        placeholder="Número de afiliación" :class="inputClass" />
                </div>
                <div class="flex flex-col gap-1.5 sm:col-span-2 xl:col-span-1">
                    <label for="cirujano" :class="labelClass">Cirujano</label>
                    <input id="cirujano" v-model.trim="formulario.cirujano" type="text"
                        placeholder="Nombre del cirujano" :class="inputClass" />
                </div>
            </div>
        </section>
        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div
                class="px-space-md py-space-sm border-b border-surface-container-high flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                        inventory_2
                    </span>
                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Material requerido
                        </h2>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Los artículos se cargan según el procedimiento seleccionado.
                        </p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <span
                        class="rounded-lg bg-surface-container-low px-3 py-2 font-label-sm text-label-sm font-semibold text-on-surface-variant">
                        {{ totalSeleccionados }} de {{ materiales.length }} seleccionados
                    </span>
                    <button type="button" @click="agregarExtra" :disabled="!plantillaSeleccionada"
                        class="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 font-label-md text-label-md font-semibold text-on-secondary hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        <span class="material-symbols-outlined text-[18px]">
                            add
                        </span>
                        Agregar extras
                    </button>
                </div>
            </div>
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[760px] text-left">
                    <thead class="bg-surface-container-low border-b border-surface-container-high">
                        <tr class="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                            <th class="p-3 text-center">Incluir</th>
                            <th class="p-3">Referencia</th>
                            <th class="p-3">Catálogo</th>
                            <th class="p-3">Descripción</th>
                            <th class="p-3 text-center">Cantidad</th>
                            <th class="p-3 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-container-high">
                        <tr v-if="materiales.length === 0">
                            <td colspan="6"
                                class="p-space-lg text-center font-body-md text-body-md text-on-surface-variant">
                                Selecciona un tipo de cirugía para visualizar el material correspondiente.
                            </td>
                        </tr>
                        <tr v-for="material in materiales" v-else :key="material.id" class="transition-colors"
                            :class="material.seleccionado ? 'hover:bg-surface-container-low' : 'bg-surface-container-low opacity-60'">
                            <td class="p-3 text-center">
                                <input v-model="material.seleccionado" type="checkbox"
                                    class="h-4 w-4 accent-secondary cursor-pointer"
                                    :aria-label="`Incluir ${material.descripcion || 'material extra'}`" />
                            </td>
                            <td class="p-3 font-body-sm text-body-sm text-on-surface-variant">
                                {{ material.esExtra ? '—' : (material.referencia || '—') }}
                            </td>
                            <td class="p-3 font-body-sm text-body-sm text-on-surface-variant">
                                {{ material.esExtra ? '—' : (material.catalogo || '—') }}
                            </td>
                            <td class="p-3 min-w-[230px]">
                                <div v-if="material.esExtra" class="space-y-2">
                                    <span
                                        class="inline-flex rounded-md bg-tertiary-container px-2 py-1 font-label-sm text-label-sm font-bold text-on-tertiary-container">
                                        EXTRA
                                    </span>
                                    <input v-model.trim="material.descripcion" type="text"
                                        placeholder="Describe el material o equipo adicional" :class="inputClass"
                                        :aria-label="'Descripción del material extra'" />
                                </div>
                                <span v-else class="font-body-md text-body-md text-on-surface">
                                    {{ material.descripcion }}
                                </span>
                            </td>
                            <td class="p-3 text-center">
                                <input v-model.number="material.cantidadSugerida" type="number" min="1" step="1"
                                    :disabled="!material.seleccionado"
                                    class="w-20 h-10 rounded-lg bg-surface-container-low px-2 text-center font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
                                    :aria-label="`Cantidad de ${material.descripcion || 'material extra'}`" />
                            </td>
                            <td class="p-3 text-center">
                                <button v-if="material.esExtra" type="button" @click="eliminarExtra(material.id)"
                                    class="inline-flex items-center gap-1 text-error hover:opacity-75 font-label-md text-label-md font-semibold">
                                    <span class="material-symbols-outlined text-[18px]">
                                        delete
                                    </span>
                                    Eliminar
                                </button>
                                <span v-else class="text-outline">
                                    —
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="md:hidden p-space-md space-y-space-sm">
                <div v-if="materiales.length === 0"
                    class="rounded-xl border border-dashed border-outline-variant p-space-lg text-center text-on-surface-variant font-body-sm text-body-sm">
                    Selecciona un tipo de cirugía para visualizar el material correspondiente.
                </div>
                <article v-for="material in materiales" v-else :key="material.id"
                    class="rounded-xl border border-surface-container-high p-space-sm space-y-3"
                    :class="material.seleccionado ? 'bg-surface-container-lowest' : 'bg-surface-container-low opacity-60'">
                    <div class="flex items-start justify-between gap-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input v-model="material.seleccionado" type="checkbox" class="h-4 w-4 accent-secondary" />
                            <span class="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                                Incluir en solicitud
                            </span>
                        </label>
                        <button v-if="material.esExtra" type="button" @click="eliminarExtra(material.id)"
                            class="inline-flex items-center gap-1 font-label-sm text-label-sm font-semibold text-error">
                            <span class="material-symbols-outlined text-[18px]">
                                delete
                            </span>
                            Eliminar
                        </button>
                    </div>
                    <div v-if="material.esExtra" class="space-y-2">
                        <span
                            class="inline-flex rounded-md bg-tertiary-container px-2 py-1 font-label-sm text-label-sm font-bold text-on-tertiary-container">
                            EXTRA
                        </span>
                        <input v-model.trim="material.descripcion" type="text"
                            placeholder="Describe el material adicional" :class="inputClass" />
                    </div>
                    <div v-else class="space-y-1">
                        <p class="font-body-md text-body-md font-semibold text-on-surface break-words">
                            {{ material.descripcion }}
                        </p>
                        <p class="font-body-sm text-body-sm text-on-surface-variant break-words">
                            Ref: {{ material.referencia || '—' }} · Catálogo: {{ material.catalogo || '—' }}
                        </p>
                    </div>
                    <div class="flex items-center justify-between gap-3 border-t border-surface-container-high pt-3">
                        <label :for="`cantidad-${material.id}`" :class="labelClass">
                            Cantidad
                        </label>
                        <input :id="`cantidad-${material.id}`" v-model.number="material.cantidadSugerida" type="number"
                            min="1" step="1" :disabled="!material.seleccionado"
                            class="w-24 h-10 rounded-lg bg-surface-container-low px-2 text-center font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50" />
                    </div>
                </article>
            </div>
        </section>
        <footer
            class="flex flex-col-reverse sm:flex-row sm:justify-end gap-space-sm border-t border-surface-container-high pt-space-md">
            <button type="button" @click="guardarBorrador" :disabled="estadoActual === 'PENDIENTE_INVENTARIO'"
                class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-surface-container-high px-5 py-3 font-label-md text-label-md font-semibold text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="material-symbols-outlined text-[19px]">
                    save
                </span>
                Guardar borrador
            </button>
            <button type="button" @click="enviarInventario" :disabled="estadoActual === 'PENDIENTE_INVENTARIO'"
                class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 font-label-md text-label-md font-semibold text-on-secondary hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="material-symbols-outlined text-[19px]">
                    send
                </span>
                Enviar a Inventario
            </button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { plantillasCirugia, type MaterialPlantilla } from '@/data/plantillasCirugia';

import { generarIdSolicitudTecnico, guardarSolicitudTecnico, type EstadoSolicitudTecnico, type SolicitudTecnico } from '@/data/solicitudesTecnicoMock';

const labelClass = 'font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold'
const inputClass = 'w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50'
const selectClass = `${inputClass} appearance-none pr-10`

interface MaterialSolicitudFormulario extends MaterialPlantilla {
    esExtra: boolean
}

const solicitudId = ref<number | null>(null)
const estadoActual = ref<EstadoSolicitudTecnico>('BORRADOR')

const tipoCirugia = ref('')

const materiales = ref<MaterialSolicitudFormulario[]>([])

const formulario = ref({
    fechaCirugia: '',
    horaCirugia: '',
    hospitalCliente: '',
    paciente: '',
    afiliacion: '',
    cirujano: '',
})

const plantillaSeleccionada = computed(() =>
    plantillasCirugia.find((plantilla) => plantilla.id === tipoCirugia.value)
)

const materialesSeleccionados = computed(() =>
    materiales.value.filter((material) => material.seleccionado)
)

const totalSeleccionados = computed(
    () => materialesSeleccionados.value.length
)

function cargarPlantilla() {
    if (!plantillaSeleccionada.value) {
        materiales.value = []
        return
    }

    materiales.value = plantillaSeleccionada.value.materiales.map((material) => ({
        ...material,
        cantidadSugerida: Math.max(1, material.cantidadSugerida),
        seleccionado: true,
        esExtra: false,
    }))
}

function construirSolicitud(estado: EstadoSolicitudTecnico): SolicitudTecnico | null {
    const plantilla = plantillaSeleccionada.value

    if (!plantilla) {
        alert('Selecciona un tipo de cirugía.')
        return null
    }

    const seleccionados = materialesSeleccionados.value

    if (estado === 'PENDIENTE_INVENTARIO') {
        if (
            !formulario.value.fechaCirugia ||
            !formulario.value.horaCirugia ||
            !formulario.value.hospitalCliente.trim() ||
            !formulario.value.paciente.trim() ||
            !formulario.value.afiliacion.trim() ||
            !formulario.value.cirujano.trim()
        ) {
            alert('Completa todos los datos de la cirugía.')
            return null
        }

        if (seleccionados.length === 0) {
            alert('Selecciona al menos un material.')
            return null
        }

        const extrasInvalidos = seleccionados.some(
            material =>
                material.esExtra && !material.descripcion.trim()
        )

        if (extrasInvalidos) {
            alert('Describe todos los extras agregados')
            return null
        }

        const cantidadesInvalidas = seleccionados.some(
            material =>
                !Number.isInteger(material.cantidadSugerida) ||
                material.cantidadSugerida <= 0
        )

        if (cantidadesInvalidas) {
            alert('Los materiales seleccionados deben tener cantidades enteras mayores que cero.')
            return null
        }
    }

    return {
        id: solicitudId.value ?? generarIdSolicitudTecnico(),
        tipo: plantilla.nombre,
        fecha: formulario.value.fechaCirugia,
        hora: formulario.value.horaCirugia,
        hospital: formulario.value.hospitalCliente,
        paciente: formulario.value.paciente,
        afiliacion: formulario.value.afiliacion,
        cirujano: formulario.value.cirujano,
        estado,
        materiales: seleccionados.map(material => ({
            id: material.id,
            referencia: material.referencia,
            catalogo: material.catalogo,
            descripcion: material.descripcion,
            cantidadSolicitada: material.cantidadSugerida,
            requiereInstrumentoControlado:
                material.requiereInstrumentoControlado === true,
            esExtra: material.esExtra,
        }))
    }
}

function guardar(estado: EstadoSolicitudTecnico): void {
    if (estadoActual.value === 'PENDIENTE_INVENTARIO') {
        alert('Esta solicitud ya fue enviada a Inventario.')
        return
    }

    const solicitud = construirSolicitud(estado)

    if (!solicitud) return

    try {
        guardarSolicitudTecnico(solicitud)

        solicitudId.value = solicitud.id
        estadoActual.value = estado

        alert(
            estado === 'BORRADOR'
                ? 'Borrador guardado correctamente.'
                : `Solicitud #${solicitud.id} enviada a Inventario.`
        )
    } catch {
        alert('No fue posible guardar la solicitud.')
    }
}

function guardarBorrador(): void {
    guardar('BORRADOR')
}

function enviarInventario(): void {
    guardar('PENDIENTE_INVENTARIO')
}

function agregarExtra(): void {
    materiales.value.push({
        id: `extra-${Date.now()}`,
        referencia: '',
        catalogo: '',
        descripcion: '',
        cantidadSugerida: 1,
        seleccionado: true,
        requiereInstrumentoControlado: false,
        esExtra: true,
    })
}

function eliminarExtra(id: string): void {
    materiales.value = materiales.value.filter(
        materiales => materiales.id !== id
    )
}

</script>