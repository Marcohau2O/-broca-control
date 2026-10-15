<template>
    <div class="w-full max-w-6xl mx-auto space-y-space-md pb-space-lg">
        <RouterLink :to="{ name: 'cirugias-prereportes' }"
            class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-colors">
            <span class="material-symbols-outlined text-[18px]">
                arrow_back
            </span>
            Volver a pre-reportes
        </RouterLink>
        <header class="space-y-1">
            <div class="flex flex-wrap items-center gap-space-xs">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Gestión de cirugías • Documentación quirúrgica
                </span>
                <span v-if="solicitud" class="text-outline-variant">•</span>
                <span v-if="solicitud" class="font-code-md text-code-md text-on-surface-variant font-semibold">Solicitud
                    #{{ solicitud.id }}</span>
            </div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Pre-reporte de cirugía
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Consulta la cirugía, registra los conceptos y prepara su documentación.
            </p>
        </header>
        <section v-if="!cirugiaIdValido"
            class="bg-error-container text-on-error-container rounded-xl p-space-md flex items-start gap-3">
            <span class="material-symbols-outlined">error</span>
            <div>
                <h2 class="font-label-md text-label-md font-bold">
                    Cirugía no especificada
                </h2>
                <p class="font-body-sm text-body-sm mt-1">
                    No se recibió un identificador de cirugía válido.
                </p>
            </div>
        </section>
        <section v-else-if="!solicitud"
            class="bg-error-container text-on-error-container rounded-xl p-space-md flex items-start gap-3">
            <span class="material-symbols-outlined">error</span>
            <div>
                <h2 class="font-label-md text-label-md font-bold">
                    Solicitud no encontrada
                </h2>
                <p class="font-body-sm text-body-sm mt-1">
                    No fue posible encontrar la solicitud seleccionada.
                </p>
            </div>
        </section>

        <template v-else>
            <section
                class="bg-primary-container rounded-xl p-space-md flex flex-wrap items-center justify-between gap-space-sm">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-secondary-fixed">assignment</span>
                    <div>
                        <p class="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim">
                            Estado de la cirugía
                        </p>
                        <p class="font-label-md text-label-md font-bold text-on-primary">
                            {{ etiquetaEstado(estadoActual) }}
                        </p>
                    </div>
                </div>
                <span class="font-code-md text-code-md font-semibold text-on-primary">
                    #{{ solicitud.id }}
                </span>
            </section>
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
                            Información registrada en la solicitud quirúrgica.
                        </p>
                    </div>
                </div>
                <div class="p-space-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
                    <div v-for="dato in datosCirugia" :key="dato.label" class="min-w-0 flex flex-col gap-1.5">
                        <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            {{ dato.label }}
                        </span>
                        <div
                            class="min-h-11 flex items-center px-3 py-2 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface break-words">
                            {{ dato.valor || '—' }}
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                    <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                        description
                    </span>
                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Identificación del pre-reporte
                        </h2>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Información administrativa del documento. Los cambios se guardan automáticamente.
                        </p>
                    </div>
                </div>
                <div v-if="!encabezadoCargando"
                    class="p-space-md flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span class="material-symbols-outlined animate-spin">
                        progress_activity
                    </span>
                </div>
                <div v-else class="p-space-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="numero-prereporte" :class="labelClass">No. pre-reporte</label>
                        <input id="numero-prereporte" :value="encabezado.numeroPrereporte" readonly
                            :disabled="prereporteFinalizado" :class="readonlyClass" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="fecha-prereporte" :class="labelClass">Fecha</label>
                        <input id="fecha-prereporte" v-model="encabezado.fecha" type="date"
                            :disabled="prereporteFinalizado" :class="inputClass" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="remision-prereporte" :class="labelClass">Remisión</label>
                        <input id="remision-prereporte" v-model.trim="encabezado.remision" type="text"
                            :disabled="prereporteFinalizado" :class="inputClass" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="folio-prereporte" :class="labelClass">Folio reporte Cx</label>
                        <input id="folio-prereporte" v-model.trim="encabezado.folioReporteCx" type="text"
                            :disabled="prereporteFinalizado" placeholder="Capturar folio" :class="inputClass" />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="plaza-prereporte" :class="labelClass">Plaza</label>
                        <input id="plaza-prereporte" v-model.trim="encabezado.plaza" type="text"
                            :disabled="prereporteFinalizado" placeholder="Capturar plaza" :class="inputClass" />
                    </div>
                </div>
            </section>
            <section v-if="materiales.length === 0"
                class="bg-surface-container-low rounded-xl p-space-md flex items-start gap-3 text-on-surface-variant">
                <span class="material-symbols-outlined text-secondary">
                    info
                </span>
                <div>
                    <p class="font-label-md text-label-md font-bold text-on-surface">
                        Sin materiales disponibles
                    </p>
                    <p class="font-body-sm text-body-sm mt-1">
                        Esta cirugía no tiene materiales disponibles para mostrar en el pre-reporte.
                    </p>
                </div>
            </section>
            <template v-else>
                <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                    <div class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                        <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                            playlist_add
                        </span>
                        <div>
                            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                                Conceptos del pre-reporte
                            </h2>
                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                Busca un servicio o renta mediante su Código P.
                            </p>
                        </div>
                    </div>
                    <div class="p-space-md space-y-space-md">
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
                            <div class="flex flex-col gap-1.5">
                                <label for="codigo-concepto" :class="labelClass">Código P</label>
                                <input id="codigo-concepto" v-model.trim="codigoBusqueda" type="text" autocomplete="off"
                                    placeholder="Ej. ORT-0007" :class="inputClass" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <label for="cantidad-concepto" :class="labelClass">Cantidad</label>
                                <input id="cantidad-concepto" v-model.number="cantidadConcepto" type="number" min="1"
                                    step="1" :class="inputClass" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <label for="precio-concepto" :class="labelClass">Precio unitario</label>
                                <input id="precio-concepto" v-model.number="precioConcepto" type="number" min="0"
                                    step="0.01" :class="inputClass" />
                            </div>
                            <div class="flex flex-col justify-end">
                                <button type="button" :disabled="!conceptoEncontrado ||
                                    !Number.isInteger(cantidadConcepto) ||
                                    cantidadConcepto < 1 ||
                                    !Number.isFinite(precioConcepto) ||
                                    precioConcepto < 0" @click="agregarConcepto"
                                    class="h-11 px-4 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary 
                                    hover:text-on-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span class="material-symbols-outlined text-[18px]">
                                        add_circle
                                    </span>
                                    Agregar concepto
                                </button>
                            </div>
                        </div>
                        <div v-if="conceptoEncontrado" class="rounded-lg bg-surface-container-low p-space-sm space-y-1">
                            <p class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                                {{ conceptoEncontrado.categoria }} · {{ conceptoEncontrado.codigo }}
                            </p>
                            <p class="font-body-md text-body-md font-semibold text-on-surface">
                                {{ conceptoEncontrado.descripcion }}
                            </p>
                            <p class="font-body-sm text-body-sm text-on-surface-variant">
                                Importe: {{ formatearMoneda(importeConcepto) }}
                            </p>
                        </div>
                        <div v-else-if="codigoBusqueda"
                            class="rounded-lg bg-error-container text-on-error-container p-space-sm font-body-sm text-body-sm">
                            No se encontró un concepto con este código.
                        </div>
                        <template v-if="conceptos.length > 0">
                            <div
                                class="hidden lg:block overflow-x-auto rounded-lg border border-surface-container-high">
                                <table class="w-full min-w-[780px] text-left">
                                    <thead class="bg-surface-container-low">
                                        <tr>
                                            <th v-for="columna in ['Código P', 'Descripción', 'Cantidad', 'Precio', 'Importe', 'Acción']"
                                                :key="columna"
                                                class="px-4 py-3 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                                {{ columna }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-surface-container-high">
                                        <tr v-for="concepto in conceptos" :key="concepto.id" class="align-top">
                                            <td class="px-4 py-3 font-code-md text-code-md text-on-surface">
                                                {{ concepto.codigo }}
                                            </td>
                                            <td class="px-4 py-3">
                                                <p class="font-body-md text-body-md text-on-surface font-semibold">
                                                    {{ concepto.descripcion }}
                                                </p>
                                                <p class="font-body-sm text-body-sm text-on-surface-variant">
                                                    {{ concepto.categoria }}
                                                </p>
                                            </td>
                                            <td class="px-4 py-3 font-body-md text-body-md text-on-surface">
                                                {{ concepto.cantidad }}
                                            </td>
                                            <td class="px-4 py-3 font-body-md text-body-md text-on-surface">
                                                {{ formatearMoneda(concepto.precio) }}
                                            </td>
                                            <td class="px-4 py-3 font-label-md text-label-md font-bold text-on-surface">
                                                {{ formatearMoneda(concepto.cantidad * concepto.precio) }}
                                            </td>
                                            <td class="px-4 py-3">
                                                <button type="button" @click="eliminarConcepto(concepto.id)"
                                                    class="inline-flex items-center gap-1 text-error hover:underline font-label-sm text-label-sm">
                                                    <span class="material-symbols-outlined text-[18px]">
                                                        delete
                                                    </span>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="lg:hidden space-y-space-sm">
                                <article v-for="concepto in conceptos" :key="concepto.id"
                                    class="rounded-lg bg-surface-container-low p-space-sm space-y-space-sm">
                                    <div class="flex justify-between items-start gap-2">
                                        <div class="min-w-0">
                                            <p class="font-code-md text-code-md text-secondary font-bold">
                                                {{ concepto.codigo }}
                                            </p>
                                            <h3
                                                class="font-label-md text-label-md text-on-surface font-bold break-words">
                                                {{ concepto.descripcion }}
                                            </h3>
                                            <p class="font-body-sm text-body-sm text-on-surface-variant">
                                                {{ concepto.categoria }}
                                            </p>
                                        </div>
                                        <button type="button" @click="eliminarConcepto(concepto.id)"
                                            class="text-error p-1" :aria-label="`Eliminar ${concepto.codigo}`">
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                    <div class="grid grid-cols-3 gap-2">
                                        <div>
                                            <p :class="labelClass">Cantidad</p>
                                            <p class="font-body-md text-body-md">{{ concepto.cantidad }}</p>
                                        </div>
                                        <div>
                                            <p :class="labelClass">Precio</p>
                                            <p class="font-body-md text-body-md">{{ formatearMoneda(concepto.precio) }}
                                            </p>
                                        </div>
                                        <div>
                                            <p :class="labelClass">Importe</p>
                                            <p class="font-label-md text-label-md font-bold break-words">{{
                                                formatearMoneda(concepto.cantidad * concepto.precio) }}</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </template>
                        <div v-else
                            class="rounded-lg border border-dashed border-surface-container-high p-space-md text-center font-body-sm text-body-sm text-on-surface-variant">
                            Todavía no se han agregado servicios o rentas.
                        </div>
                    </div>
                </section>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
                    <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        <div
                            class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                            <span class="material-symbols-outlined text-secondary">
                                edit_note
                            </span>
                            <div>
                                <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Comentarios
                                </h2>
                                <p class="font-body-sm text-body-sm text-on-surface-variant">
                                    Observaciones adicionales del pre-reporte.
                                </p>
                            </div>
                        </div>
                        <div class="p-space-md">
                            <label for="comentarios-prereporte" :class="labelClass">Observaciones</label>
                            <textarea id="comentarios-prereporte" v-model="encabezado.comentarios" rows="5"
                                placeholder="Escribe observaciones o comentarios..." :class="textareaClass">
            </textarea>
                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-2">Los comentarios se guardan
                                automáticamente.
                            </p>
                        </div>
                    </section>
                    <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        <div
                            class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                            <span class="material-symbols-outlined text-secondary">
                                calculate
                            </span>
                            <div>
                                <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    Resumen económico
                                </h2>
                                <p class="font-body-sm text-body-sm text-on-surface-variant">
                                    Importes calculados automáticamente.
                                </p>
                            </div>
                        </div>
                        <div class="p-space-md space-y-space-sm">
                            <div class="flex justify-between gap-3 font-body-md text-body-md">
                                <span class="text-on-surface-variant">
                                    Subtotal
                                </span>
                                <span class="text-on-surface font-semibold">
                                    {{ formatearMoneda(subtotalConcepto) }}
                                </span>
                            </div>
                            <div class="flex justify-between gap-3 font-body-md text-body-md">
                                <span class="text-on-surface-variant">
                                    IVA (16 %)
                                </span>
                                <span class="text-on-surface font-semibold">
                                    {{ formatearMoneda(ivaConceptos) }}
                                </span>
                            </div>
                            <div
                                class="border-t border-surface-container-high pt-space-sm flex flex-wrap items-center justify-between gap-2">
                                <span class="font-label-md text-label-md font-bold text-on-surface">
                                    Total general
                                </span>
                                <span class="font-headline-sm text-headline-sm font-bold text-secondary">
                                    {{ formatearMoneda(totalGeneral) }}
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
                <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                    <div class="px-space-md py-space-sm border-b border-surface-container-high flex items-start gap-2">
                        <span class="material-symbols-outlined text-secondary">
                            task_alt
                        </span>
                        <div>
                            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                                Finalización del pre-reporte
                            </h2>
                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                {{
                                    prereporteFinalizado
                                        ? 'Pre-reporte completado. Los cambios posteriores se guardan automáticamente.'
                                        : 'Verifica toda la información antes de finalizar.'
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="p-space-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm">
                        <span v-if="prereporteFinalizado"
                            class="inline-flex items-center gap-2 text-secondary font-label-md text-label-md font-bold">
                            <span class="material-symbols-outlined">
                                verified
                            </span>
                            Pre-reporte finalizado
                        </span>
                        <button v-else type="button" :disabled="!puedeFinalizar" @click="confirmarFinalizacion"
                            class="h-11 px-5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="material-symbols-outlined text-[18px]">
                                check_circle
                            </span>
                            Finalizar pre-reporte
                        </button>
                        <button type="button" :disabled="!encabezadoCargando || conceptos.length === 0"
                            @click="descargarPrereportePdf"
                            class="h-11 px-5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-2 hover:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="material-symbols-outlined text-[18px]">
                                picture_as_pdf
                            </span>
                            Generar PDF
                        </button>
                    </div>
                    <p v-if="errorFinalizacion" role="alert"
                        class="mx-space-md mb-space-md rounded-lg bg-error-container text-on-error-container p-space-sm font-body-sm text-body-sm">
                        {{ errorFinalizacion }}
                    </p>
                </section>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { obtenerSolicitudCirugiaMock, type EstadoSolicitud, type SolicitudCirugiaMock } from '@/data/solicitudesCirugiaMock'

import { obtenerSolicitudesTecnico, type SolicitudTecnico } from '@/data/solicitudesTecnicoMock'

import { obtenerEstadoRevision, obtenerRevisionInventario } from '@/data/revisionesInventarioMock'

import { buscarConceptoPorCodigo, buscarConceptos } from '@/data/buscarConceptos'

import { obtenerConceptosPrereporte, guardarConceptosPrereporte, type ConceptoPrereporte } from '@/data/prereporteConceptosMock'

import { obtenerEncabezadoPrereporte, guardarEncabezadoPrereporte, generarNumeroPrereporte, type EncabezadoPrereporte } from '@/data/prereporteEncabezadoMock'

import { obtenerEstadoPrereporte, finalizarPrereporte, type RegistroEstadoPrereporte, } from '@/data/prereporteEstadoMock'

import { plantillasCirugia } from '@/data/plantillasCirugia'

import { useAuthStore } from '@/stores/auth.store'

import { generarPrereportePdf } from '@/utils/generarPrereportePdf'

type EstadoPreparacion = 'CEYE' | 'PENDIENTE' | 'DISPONIBLE' | null

interface MaterialPrereporte {
    id: string
    referencia: string
    catalogo: string
    descripcion: string
    cantidadSolicitada: number
    esExtra: boolean
    estadoPreparacion: EstadoPreparacion
    instrumentosAsignados: string[]
}

const route = useRoute()

const labelClass = 'font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold'
const inputClass = 'w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary'
const readonlyClass = 'w-full h-11 px-3 rounded-lg bg-surface-container-high text-on-surface-variant font-code-md text-code-md cursor-not-allowed'
const textareaClass = 'mt-1.5 w-full px-3 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary resize-y'

const codigoBusqueda = ref('')
const cantidadConcepto = ref(1)
const precioConcepto = ref(0)
const auth = useAuthStore()

const encabezado = reactive<EncabezadoPrereporte>({
    numeroPrereporte: '',
    fecha: '',
    remision: '',
    folioReporteCx: '',
    plaza: '',
    comentarios: '',
})

const encabezadoCargando = ref(false)

const conceptos = ref<ConceptoPrereporte[]>([])
const errorFinalizacion = ref('')

const estadoFinalizacionLocal = ref<RegistroEstadoPrereporte | null>(null)

const prereporteFinalizado = computed(() => {
    return estadoFinalizacionLocal.value?.estado === 'PREREPORTE_COMPLETADO'
})


const conceptoEncontrado = computed(() => {
    const codigo = codigoBusqueda.value.trim()

    if (!codigo) return null

    return buscarConceptoPorCodigo(codigo)
})

const importeConcepto = computed(() => {
    return cantidadConcepto.value * precioConcepto.value
})

const subtotalConcepto = computed(() => {
    return conceptos.value.reduce(
        (total, concepto) => total + concepto.cantidad * concepto.precio,
        0
    )
})

const TASA_IVA = 0.16

const ivaConceptos = computed(() => {
    return Math.round(
        subtotalConcepto.value * TASA_IVA * 100
    ) / 100
})

const totalGeneral = computed(() => {
    return Math.round(
        (subtotalConcepto.value + ivaConceptos.value) * 100
    ) / 100
})

function agregarConcepto(): void {
    // if (prereporteFinalizado.value) return

    const encontrado = conceptoEncontrado.value

    if (!encontrado) return

    const cantidad = Number(cantidadConcepto.value)
    const precio = Number(precioConcepto.value)

    if (!Number.isInteger(cantidad) || cantidad < 1) return
    if (!Number.isFinite(precio) || precio < 0) return

    conceptos.value.push({
        id: crypto.randomUUID(),
        codigo: encontrado.codigo,
        descripcion: encontrado.descripcion,
        categoria: encontrado.categoria,
        cantidad,
        precio,
    })

    codigoBusqueda.value = ''
    cantidadConcepto.value = 1
    precioConcepto.value = 0
}

function eliminarConcepto(id: string): void {
    // if (prereporteFinalizado.value) return

    conceptos.value = conceptos.value.filter(
        concepto => concepto.id !== id
    )
}

function formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(valor)
}

function descargarPrereportePdf(): void {
    if (!solicitud.value || cirugiaId.value === null) {
        return
    }

    generarPrereportePdf({
        numeroPrereporte: encabezado.numeroPrereporte,
        fecha: encabezado.fecha,
        remision: encabezado.remision,
        folioReporteCx: encabezado.folioReporteCx,
        plaza: encabezado.plaza,
        comentarios: encabezado.comentarios,
        estado: etiquetaEstado(estadoActual.value),

        cirugia: {
            id: solicitud.value.id,
            tipo: solicitud.value.tipo,
            fecha: solicitud.value.fecha,
            hora: solicitud.value.hora,
            hospital: solicitud.value.hospital,
            paciente: solicitud.value.paciente,
            afiliacion: solicitud.value.afiliacion,
            cirujano: solicitud.value.cirujano,
        },

        conceptos: conceptos.value.map((concepto) => ({
            codigo: concepto.codigo,
            descripcion: concepto.descripcion,
            categoria: concepto.categoria,
            cantidad: concepto.cantidad,
            precio: concepto.precio,
        })),

        subtotal: subtotalConcepto.value,
        iva: ivaConceptos.value,
        total: totalGeneral.value,
    })
}

const cirugiaId = computed(() => {
    const valor = Array.isArray(route.query.cirugiaId)
        ? route.query.cirugiaId[0]
        : route.query.cirugiaId

    if (!valor) return null

    const id = Number(valor)

    return Number.isSafeInteger(id) && id > 0
        ? id
        : null
})

const cirugiaIdValido = computed(() => cirugiaId.value !== null)

watch(
    cirugiaId,
    (id) => {
        conceptos.value = id !== null
            ? obtenerConceptosPrereporte(id)
            : []
    },
    { immediate: true }
)

watch(
    conceptos,
    (nuevoConceptos) => {
        if (cirugiaId.value === null) return

        guardarConceptosPrereporte(
            cirugiaId.value,
            nuevoConceptos
        )
    },
    { deep: true }
)

watch(
    [cirugiaId, () => auth.user?.id],
    ([id, usuarioId]) => {
        encabezadoCargando.value = false

        Object.assign(encabezado, {
            numeroPrereporte: '',
            fecha: '',
            remision: '',
            folioReporteCx: '',
            plaza: '',
            comentarios: '',
        })
        if (id === null) return

        const guardado = obtenerEncabezadoPrereporte(id)

        if (guardado) {
            Object.assign(encabezado, {
                ...guardado,
                comentarios: guardado.comentarios ?? ''
            })

            encabezadoCargando.value = true
            return
        }

        if (usuarioId === undefined) return

        const hoy = new Date()
        const anio = hoy.getFullYear()
        const mes = String(hoy.getMonth() + 1).padStart(2, '0')
        const dia = String(hoy.getDate()).padStart(2, '0')

        const fecha = `${anio}-${mes}-${dia}`

        Object.assign(encabezado, {
            numeroPrereporte: generarNumeroPrereporte(fecha, usuarioId, id),
            fecha,
            remision: '',
            folioReporteCx: '',
            plaza: '',
            comentarios: '',
        })

        encabezadoCargando.value = true
    },
    { immediate: true }
)

watch(
    encabezado,
    () => {
        if (!encabezadoCargando.value || cirugiaId.value === null) {
            return
        }

        guardarEncabezadoPrereporte(
            cirugiaId.value,
            { ...encabezado }
        )
    },
    { deep: true }
)

const solicitud = computed<SolicitudTecnico | SolicitudCirugiaMock | null>(() => {
    if (!cirugiaId.value) return null

    const solicitudTecnico = obtenerSolicitudesTecnico().find(
        (item) => item.id === cirugiaId.value
    )

    if (solicitudTecnico) {
        return solicitudTecnico
    }

    return obtenerSolicitudCirugiaMock(cirugiaId.value) ?? null
})

const esSolicitudTecnico = (valor: SolicitudTecnico | SolicitudCirugiaMock): valor is SolicitudTecnico => {
    return 'materiales' in valor
}

const datosCirugia = computed(() => {
    if (!solicitud.value) return []
    const item = solicitud.value
    return [
        { label: 'Procedimiento', valor: item.tipo },
        { label: 'Fecha', valor: formatearFecha(item.fecha) },
        { label: 'Hora', valor: item.hora },
        { label: 'Hospital', valor: item.hospital },
        { label: 'Paciente', valor: item.paciente },
        { label: 'Afiliación', valor: item.afiliacion },
        { label: 'Cirujano', valor: item.cirujano },
    ]
})

watch(
    cirugiaId,
    (id) => {
        estadoFinalizacionLocal.value =
            id !== null ? obtenerEstadoPrereporte(id) : null

        errorFinalizacion.value = ''
    },
    { immediate: true }
)

const estadoActual = computed<EstadoSolicitud>(() => {
    if (prereporteFinalizado.value) {
        return 'PREREPORTE_COMPLETADO'
    }

    if (!solicitud.value || cirugiaId.value === null) {
        return 'BORRADOR'
    }

    return obtenerEstadoRevision(cirugiaId.value) ?? solicitud.value.estado
})

const puedeFinalizar = computed(() => {
    if (cirugiaId.value === null || !solicitud.value) return false
    if (!auth.user?.id) return false
    if (!encabezadoCargando.value) return false
    if (prereporteFinalizado.value) return false

    if (!encabezado.numeroPrereporte.trim()) return false
    if (!encabezado.fecha.trim()) return false
    if (!encabezado.remision.trim()) return false
    if (!encabezado.folioReporteCx.trim()) return false
    if (!encabezado.plaza.trim()) return false

    if (conceptos.value.length === 0) return false

    return conceptos.value.every((concepto) => {
        return (
            concepto.codigo.trim().length > 0 &&
            Number.isInteger(concepto.cantidad) &&
            concepto.cantidad >= 1 &&
            Number.isFinite(concepto.precio) &&
            concepto.precio >= 0
        )
    })
})

function confirmarFinalizacion(): void {
    errorFinalizacion.value = ''

    if (!puedeFinalizar.value) {
        errorFinalizacion.value =
            'Completa los campos obligatorios y agrega al menos un concepto válido.'
        return
    }

    const id = cirugiaId.value
    const usuarioId = auth.user?.id

    if (id === null || usuarioId === undefined) return

    const confirmado = window.confirm(
        '¿Deseas finalizar este pre-reporte? Podrás continuar editando su información posteriormente.'
    )

    if (!confirmado) return

    try {
        guardarEncabezadoPrereporte(id, { ...encabezado })

        guardarConceptosPrereporte(
            id,
            conceptos.value.map((concepto) => ({ ...concepto }))
        )

        estadoFinalizacionLocal.value =
            finalizarPrereporte(id, usuarioId)
    } catch (error) {
        console.error('Error al finalizar:', error)

        errorFinalizacion.value =
            'No fue posible finalizar el pre-reporte.'
    }
}

const materiales = computed<MaterialPrereporte[]>(() => {
    if (!solicitud.value || !cirugiaId.value) {
        return []
    }

    const revision = obtenerRevisionInventario(cirugiaId.value)

    const revisionesPorId = new Map(
        (revision ?? []).map((item) => [item.id, item])
    )

    if (esSolicitudTecnico(solicitud.value)) {
        return solicitud.value.materiales.map((material) => {
            const revisionMaterial = revisionesPorId.get(material.id)

            return {
                id: material.id,
                referencia: material.referencia,
                catalogo: material.catalogo,
                descripcion: material.descripcion,
                cantidadSolicitada: material.cantidadSolicitada,
                esExtra: material.esExtra,
                estadoPreparacion:
                    revisionMaterial?.estadoPreparacion ?? null,
                instrumentosAsignados: [
                    ...(revisionMaterial?.instrumentosAsignados ?? []),
                ],
            }
        })
    }

    const plantilla = plantillasCirugia.find(
        (item) => item.nombre === solicitud.value?.tipo
    )

    if (!plantilla) {
        return []
    }

    return plantilla.materiales
        .filter((material) => material.seleccionado !== false)
        .map((material) => {
            const revisionMaterial = revisionesPorId.get(material.id)

            return {
                id: material.id,
                referencia: material.referencia,
                catalogo: material.catalogo,
                descripcion: material.descripcion,
                cantidadSolicitada: Math.max(1, material.cantidadSugerida),
                esExtra: false,
                estadoPreparacion:
                    revisionMaterial?.estadoPreparacion ?? null,
                instrumentosAsignados: [
                    ...(revisionMaterial?.instrumentosAsignados ?? []),
                ],
            }
        })
})

function formatearFecha(fecha: string): string {
    const partes = fecha.split('-')

    if (partes.length !== 3) {
        return fecha
    }

    const [anio, mes, dia] = partes

    return `${dia}/${mes}/${anio}`
}

function etiquetaEstado(estado: EstadoSolicitud): string {
    const etiquetas: Record<EstadoSolicitud, string> = {
        BORRADOR: 'Borrador',
        PENDIENTE_INVENTARIO: 'Pendiente de inventario',
        EN_REVISION_INVENTARIO: 'En revisión de inventario',
        MATERIAL_REVISADO: 'Material revisado',
        PENDIENTE_PREREPORTE: 'Pendiente de pre-reporte',
        PREREPORTE_COMPLETADO: 'Pre-reporte completado',
    }

    return etiquetas[estado]
}

</script>