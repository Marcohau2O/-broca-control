<template>
    <form class="space-y-space-md" @submit.prevent="submitForm">
        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                        fingerprint
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Identificación
                        </h2>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Datos de identificación y trazabilidad del instrumento.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="codigo"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Código
                        </label>

                        <div v-if="mode === 'create'" class="h-11 px-3 rounded-lg bg-surface-container-low
                                   flex items-center justify-between gap-3">
                            <span class="font-body-md text-body-md text-on-surface-variant">
                                Se generará automáticamente
                            </span>

                            <span class="material-symbols-outlined text-[18px] text-secondary">
                                auto_awesome
                            </span>
                        </div>

                        <input v-else id="codigo" :value="form.codigo" disabled class="w-full h-11 px-3 rounded-lg
                                   bg-surface-container-high
                                   text-on-surface-variant
                                   font-code-md text-code-md
                                   cursor-not-allowed" />

                        <span class="font-body-sm text-body-sm text-on-surface-variant">
                            El identificador BRC es administrado por el sistema.
                        </span>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="tipoInstrumento"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Tipo de instrumento
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <select id="tipoInstrumento" v-model="form.tipoInstrumentoId" required
                                :disabled="loadingCatalogos || mode === 'edit'" :class="[
                                    selectClass, mode === 'edit' ? 'cursor-not-allowed opacity-70' : '']">
                                <option value="" disabled>
                                    Seleccionar tipo
                                </option>

                                <option v-for="tipo in tiposInstrumento" :key="tipo.id" :value="String(tipo.id)">{{
                                    tipo.nombre }}</option>
                            </select>

                            <SelectArrow />
                            <span v-if="mode === 'edit'" class="font-body-sm text-body-sm text-on-surface-variant">
                                El tipo de instrumento no puede modificarse
                                después del registro.
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="lote"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Lote
                        </label>

                        <input id="lote" v-model.trim="form.lote" type="text" maxlength="100" placeholder="Ej. LT-7711"
                            :class="inputClass" />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="serie"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Número de serie
                        </label>

                        <input id="serie" v-model.trim="form.serie" type="text" maxlength="100"
                            placeholder="Ej. SN-102941" :class="inputClass" />
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                        category
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Clasificación
                        </h2>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Marca, modelo y proveedor asociados al instrumento.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="marca"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Marca
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <select id="marca" v-model="form.marcaId" :disabled="loadingCatalogos" :class="selectClass">
                                <option value="" disabled>
                                    Seleccionar marca
                                </option>

                                <option v-for="modelo in marcas" :key="modelo.id" :value="String(modelo.id)">
                                    {{
                                        modelo.nombre }}</option>
                            </select>

                            <SelectArrow />
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="modelo"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Modelo
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <select id="modelo" v-model="form.modeloId" :disabled="loadingCatalogos"
                                :class="selectClass">
                                <option value="" disabled>
                                    {{ form.marcaId ? 'Seleccionar modelo' : 'Primero selecciona una marca' }}
                                </option>

                                <option v-for="marca in modelosFiltrados" :key="marca.id" :value="String(marca.id)">{{
                                    marca.nombre }}</option>
                            </select>

                            <SelectArrow />
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5 md:col-span-2 xl:col-span-1">
                        <label for="proveedor"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Proveedor
                        </label>

                        <div class="relative">
                            <select id="proveedor" v-model="form.proveedorId" :disabled="loadingCatalogos"
                                :class="selectClass">
                                <option value="">
                                    Sin proveedor asignado
                                </option>

                                <option v-for="proveedor in proveedores" :key="proveedor.id"
                                    :value="String(proveedor.id)">
                                    {{ proveedor.nombre }}
                                </option>
                            </select>

                            <SelectArrow />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                        location_on
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Asignación
                        </h2>

                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Ubicación y responsable actual del instrumento.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="ubicacion"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Ubicación
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <select id="ubicacion" v-model="form.ubicacionId" required
                                :disabled="loadingCatalogos || mode === 'edit'" :class="[
                                    selectClass, mode === 'edit' ? 'cursor-not-allowed opacity-70' : '']">
                                <option value="" disabled>
                                    Seleccionar ubicación
                                </option>

                                <option v-for="ubicacion in ubicaciones" :key="ubicacion.id"
                                    :value="String(ubicacion.id)">{{ ubicacion.nombre }}</option>
                            </select>

                            <SelectArrow />

                            <span v-if="mode === 'edit'" class="font-body-sm text-body-sm text-on-surface-variant">
                                Utiliza la opcion de "Cambiar ubicacion" de la ficha para trasladar el instrumento.
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="responsable"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                            Responsable
                        </label>

                        <div class="relative">
                            <select id="responsable" v-model="form.responsableId" :disabled="loadingCatalogos" :class="selectClass">
                                <option value="">
                                    Sin responsable asignado
                                </option>

                                <option v-for="responsable in responsables" :key="responsable.id" :value="String(responsable.id)">{{ responsable.nombre }}</option>
                            </select>

                            <SelectArrow />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-primary-container rounded-xl overflow-hidden">
            <div class="p-space-md flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-secondary-fixed/10
                           flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[21px] text-secondary-fixed">
                        shield
                    </span>
                </div>

                <div>
                    <h3 class="font-label-md text-label-md font-bold text-on-primary">
                        Control de vida útil
                    </h3>

                    <p class="font-body-sm text-body-sm text-primary-fixed-dim mt-1">
                        El instrumento tendrá un máximo de
                        <strong class="text-on-primary">3 usos</strong>.
                        Los usos realizados y las vidas restantes son
                        administrados por el sistema y no pueden modificarse
                        desde este formulario.
                    </p>
                </div>
            </div>
        </section>

        <div v-if="catalogosError" class="p-space-sm rounded-lg bg-error-container text-on-error-container">
            <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-[19px]">
                    error
                </span>

                <span class="font-body-sm text-body-sm">
                    {{ catalogosError }}
                </span>
            </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row
                   sm:items-center sm:justify-between gap-space-sm
                   pt-space-xs">
            <button type="button" class="h-11 px-5 rounded-lg
                       bg-surface-container-high text-on-surface
                       font-label-md text-label-md font-semibold
                       hover:bg-surface-container-highest
                       transition-colors" @click="emit('cancel')">
                Cancelar
            </button>

            <button :disabled="loadingCatalogos" type="submit" :class="['h-11 px-5 rounded-lg bg-secondary text-on-secondary',
                'font-label-md text-label-md font-bold flex items-center justify-center gap-2',
                'hover:bg-primary hover:text-on-primary transition-colors shadow-sm',
                loadingCatalogos ? 'opacity-60 cursor-not-allowed' : '']">
                <span class="material-symbols-outlined text-[18px]">
                    {{ mode === 'create' ? 'add_circle' : 'save' }}
                </span>

                {{ mode === 'create'
                    ? 'Registrar instrumento'
                    : 'Guardar cambios'
                }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive, h, onMounted, computed, ref, watch } from 'vue'

import { catalogosService } from '@/services/catalogos.service'
import { usuariosService } from '@/services/usuarios.service'

import type { CatalogItem } from '@/types/catalogos'
import type { UsuarioItem } from '@/services/usuarios.service'

export interface InstrumentoFormData {
    codigo: string
    tipoInstrumentoId: string
    lote: string
    serie: string
    marcaId: string
    modeloId: string
    proveedorId: string
    ubicacionId: string
    responsableId: string
}

const props = withDefaults(
    defineProps<{
        mode: 'create' | 'edit'
        initialData?: Partial<InstrumentoFormData>
    }>(),
    {
        initialData: () => ({}),
    }
)

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'submit', data: InstrumentoFormData): void
}>()

const form = reactive<InstrumentoFormData>({
    codigo: props.initialData.codigo ?? '',
    tipoInstrumentoId: props.initialData.tipoInstrumentoId ?? '',
    lote: props.initialData.lote ?? '',
    serie: props.initialData.serie ?? '',
    marcaId: props.initialData.marcaId ?? '',
    modeloId: props.initialData.modeloId ?? '',
    proveedorId: props.initialData.proveedorId ?? '',
    ubicacionId: props.initialData.ubicacionId ?? '',
    responsableId: props.initialData.responsableId ?? '',
})

const tiposInstrumento = ref<CatalogItem[]>([])
const marcas = ref<CatalogItem[]>([])
const modelos = ref<CatalogItem[]>([])
const proveedores = ref<CatalogItem[]>([])
const ubicaciones = ref<CatalogItem[]>([])
const responsables = ref<UsuarioItem[]>([])

const loadingCatalogos = ref(false)
const catalogosError = ref('')

const modelosFiltrados = computed(() => {
    if (!form.marcaId) {
        return modelos.value
    }

    return modelos.value.filter(
        (modelo) => String(modelo.marcaId) === String(form.marcaId)
    )
})

const inputClass =
    'w-full h-11 px-3 rounded-lg bg-surface-container-low ' +
    'text-on-surface font-body-md text-body-md ' +
    'placeholder:text-outline focus:outline-none ' +
    'focus:ring-2 focus:ring-secondary'

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg bg-surface-container-low ' +
    'text-on-surface font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const SelectArrow = () =>
    h(
        'span',
        {
            class:
                'material-symbols-outlined absolute right-3 top-3 ' +
                'text-[18px] text-outline pointer-events-none',
        },
        'expand_more'
    )

const submitForm = () => {
    emit('submit', {
        ...form,
    })
}

const loadCatalogos = async () => {
    loadingCatalogos.value = true
    catalogosError.value = ''

    try {
        const [
            tiposData,
            marcasData,
            modelosData,
            proveedoresData,
            ubicacionesData,
            usuariosData,
        ] = await Promise.all([
            catalogosService.getAll('tipos'),
            catalogosService.getAll('marcas'),
            catalogosService.getAll('modelos'),
            catalogosService.getAll('proveedores'),
            catalogosService.getAll('ubicaciones'),
            usuariosService.getAll(),
        ])

        tiposInstrumento.value = tiposData
        marcas.value = marcasData
        modelos.value = modelosData
        proveedores.value = proveedoresData
        ubicaciones.value = ubicacionesData

        responsables.value = usuariosData.filter((usuario) => usuario.activo)
    } catch (error) {
        console.error('Error cargando datos del formulario:',error)

        catalogosError.value = 'No fue posible cargar los datos del formulario'
    } finally {
        loadingCatalogos.value = false
    }
}

onMounted(() => {
    loadCatalogos()
})

watch(
    () => form.marcaId,
    (nuevaMarca, marcaAnterior) => {
        if (marcaAnterior && nuevaMarca !== marcaAnterior) {
            const modeloPertenece = modelosFiltrados.value.some(
                (modelo) => String(modelo.id) === form.modeloId
            )

            if (!modeloPertenece) {
                form.modeloId = ''
            }
        }
    }
)
</script>