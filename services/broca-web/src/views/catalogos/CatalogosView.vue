<template>
    <div class="w-full">
        <div class="flex flex-col xl:flex-row
                   xl:items-start xl:justify-between
                   gap-space-md">
            <div>
                <div class="flex flex-wrap items-center
                           gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                               tracking-wider text-secondary font-bold">
                        Administración
                    </span>

                    <span class="text-outline-variant">
                        •
                    </span>

                    <span class="font-label-sm text-label-sm
                               text-on-surface-variant font-medium">
                        Configuración operativa
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Catálogos
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Administra los datos utilizados para clasificar
                    instrumentos y registrar sus operaciones.
                </p>
            </div>

            <button type="button" class="h-10 px-4 rounded-lg
                       bg-secondary text-on-secondary
                       font-label-md text-label-md font-bold
                       flex items-center justify-center gap-2
                       hover:bg-primary hover:text-on-primary
                       transition-colors shadow-sm shrink-0" @click="openCreate">
                <span class="material-symbols-outlined text-[18px]">
                    add
                </span>

                Nuevo {{ currentCatalog.singular }}
            </button>
        </div>

        <section class="mt-space-lg bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <!-- Mobile -->
            <div class="lg:hidden">
                <label for="catalogSelector" class="font-label-sm text-label-sm uppercase
                           tracking-wider text-outline
                           font-semibold block mb-1.5">
                    Catálogo
                </label>

                <div class="relative">
                    <select id="catalogSelector" v-model="activeCatalog" :class="selectClass">
                        <option v-for="catalog in catalogs" :key="catalog.key" :value="catalog.key">
                            {{ catalog.label }}
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

            <!-- Desktop tabs -->
            <div class="hidden lg:flex flex-wrap gap-1">
                <button v-for="catalog in catalogs" :key="catalog.key" type="button" class="min-h-10 px-3 rounded-lg
                           font-label-sm text-label-sm
                           font-semibold
                           inline-flex items-center gap-1.5
                           transition-colors" :class="activeCatalog === catalog.key
                            ? 'bg-primary-container text-on-primary'
                            : 'text-on-surface-variant hover:bg-surface-container-high'
                            " @click="activeCatalog = catalog.key">
                    <span class="material-symbols-outlined text-[17px]">
                        {{ catalog.icon }}
                    </span>

                    {{ catalog.label }}
                </button>
            </div>
        </section>

        <section class="mt-space-md
                   bg-primary-container rounded-xl
                   p-space-md">
            <div class="flex flex-col sm:flex-row
                       sm:items-center sm:justify-between
                       gap-space-sm">
                <div class="flex items-start gap-3">
                    <div class="w-11 h-11 rounded-xl
                               bg-secondary-fixed/10
                               text-secondary-fixed
                               flex items-center justify-center
                               shrink-0">
                        <span class="material-symbols-outlined text-[22px]">
                            {{ currentCatalog.icon }}
                        </span>
                    </div>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-primary">
                            {{ currentCatalog.label }}
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-primary-fixed-dim mt-0.5
                                   max-w-2xl">
                            {{ currentCatalog.description }}
                        </p>
                    </div>
                </div>

                <div class="shrink-0">
                    <span class="font-headline-md text-headline-md
                               font-bold text-on-primary">
                        {{ filteredItems.length }}
                    </span>

                    <span class="font-body-sm text-body-sm
                               text-primary-fixed-dim ml-1">
                        registros
                    </span>
                </div>
            </div>
        </section>

        <section class="mt-space-md
                   bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_220px]
                       gap-space-sm">
                <div>
                    <label for="buscarCatalogo" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Buscar
                    </label>

                    <div class="relative">
                        <span class="material-symbols-outlined
                                   absolute left-3 top-1/2
                                   -translate-y-1/2 text-[20px]
                                   text-outline">
                            search
                        </span>

                        <input id="buscarCatalogo" v-model="search" type="search" :placeholder="`Buscar en ${currentCatalog.label.toLowerCase()}...`
                            " class="w-full h-11 pl-10 pr-4
                                   rounded-lg
                                   bg-surface-container-low
                                   text-on-surface
                                   font-body-md text-body-md
                                   placeholder:text-outline
                                   focus:outline-none focus:ring-2
                                   focus:ring-secondary" />
                    </div>
                </div>

                <div>
                    <label for="estadoCatalogo" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Estado
                    </label>

                    <div class="relative">
                        <select id="estadoCatalogo" v-model="statusFilter" :class="selectClass">
                            <option value="">
                                Todos
                            </option>

                            <option value="ACTIVO">
                                Activos
                            </option>

                            <option value="INACTIVO">
                                Inactivos
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
            </div>

            <div class="flex flex-col sm:flex-row
                       sm:items-center sm:justify-between
                       gap-space-xs mt-space-sm pt-space-sm
                       border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm
                           text-on-surface-variant">
                    {{ filteredItems.length }}
                    {{
                        filteredItems.length === 1
                            ? 'registro encontrado'
                            : 'registros encontrados'
                    }}
                </span>

                <button type="button" class="font-label-sm text-label-sm
                           text-secondary font-bold
                           hover:underline self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </section>

        <div v-if="loading"
            class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm py-space-xl px-space-md flex flex-col items-center justify-center text-center">
            <span class="material-symbols-outlined text-[32px] text-secondary animate-spin">
                progress_activity
            </span>

            <p class="mt-3 font-label-md text-label-md font-semibold text-on-surface">
                Cargando {{ currentCatalog?.label.toLowerCase() }}...
            </p>
        </div>

        <div v-else-if="errorMessage" class="mt-space-md
           bg-error-container/30
           rounded-xl
           py-space-lg px-space-md
           text-center">
            <span class="material-symbols-outlined
               text-[32px] text-error">
                error
            </span>

            <p class="mt-2 font-label-md text-label-md
               font-semibold text-on-surface">
                No fue posible cargar el catálogo
            </p>

            <p class="mt-1 font-body-sm text-body-sm
               text-on-surface-variant">
                {{ errorMessage }}
            </p>

            <button type="button" class="mt-4 h-9 px-4 rounded-lg
               bg-primary text-on-primary
               font-label-md text-label-md
               font-semibold" @click="loadCatalog(activeCatalog)">
                Reintentar
            </button>
        </div>

        <section v-if="!loading && !errorMessage && filteredItems.length > 0" class="hidden md:block mt-space-md
                   bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <table class="w-full">
                <thead class="bg-surface-container-low">
                    <tr>
                        <th :class="thClass">
                            Nombre
                        </th>

                        <th :class="thClass">
                            Descripción
                        </th>

                        <th :class="thClass">
                            Estado
                        </th>

                        <th class="px-4 py-3 text-right
                                   font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y
                           divide-surface-container-high">
                    <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-surface-container-low/60
                               transition-colors">
                        <td class="px-4 py-4">
                            <div class="flex items-center gap-2.5">
                                <div class="w-9 h-9 rounded-lg
                                           bg-surface-container-high
                                           flex items-center
                                           justify-center shrink-0">
                                    <span class="material-symbols-outlined
                                               text-[18px] text-secondary">
                                        {{ currentCatalog.icon }}
                                    </span>
                                </div>

                                <span class="font-label-md text-label-md
                                           font-bold text-on-surface">
                                    {{ item.nombre }}
                                </span>
                            </div>
                        </td>

                        <td class="px-4 py-4 max-w-md">
                            <span class="font-body-sm text-body-sm
                                       text-on-surface-variant">
                                {{ item.descripcion || 'Sin descripción' }}
                            </span>
                        </td>

                        <td class="px-4 py-4">
                            <span class="inline-flex items-center
                                       gap-1.5 px-2.5 py-1
                                       rounded-full
                                       font-label-sm text-label-sm
                                       font-bold" :class="item.activo
                                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                                        : 'bg-surface-container-highest text-on-surface-variant'
                                        ">
                                <span class="w-1.5 h-1.5 rounded-full" :class="item.activo
                                    ? 'bg-secondary'
                                    : 'bg-outline'
                                    "></span>

                                {{
                                    item.activo
                                        ? 'ACTIVO'
                                        : 'INACTIVO'
                                }}
                            </span>
                        </td>

                        <td class="px-4 py-4">
                            <div class="flex justify-end gap-1">
                                <button type="button" :class="iconButtonClass" title="Editar" aria-label="Editar"
                                    @click="openEdit(item)">
                                    <span class="material-symbols-outlined
                                               text-[18px]">
                                        edit
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <div v-if="!loading && !errorMessage && filteredItems.length > 0" class="md:hidden mt-space-md
                   space-y-space-sm">
            <article v-for="item in filteredItems" :key="`mobile-${item.id}`" class="bg-surface-container-lowest
                       rounded-xl shadow-sm p-space-sm">
                <div class="flex items-start
                           justify-between gap-3">
                    <div class="flex items-start gap-3
                               min-w-0">
                        <div class="w-10 h-10 rounded-lg
                                   bg-surface-container-high
                                   flex items-center
                                   justify-center shrink-0">
                            <span class="material-symbols-outlined
                                       text-[19px] text-secondary">
                                {{ currentCatalog.icon }}
                            </span>
                        </div>

                        <div class="min-w-0">
                            <h2 class="font-label-md text-label-md
                                       font-bold text-on-surface">
                                {{ item.nombre }}
                            </h2>

                            <p class="font-body-sm text-body-sm
                                       text-on-surface-variant mt-1">
                                {{
                                    item.descripcion ||
                                    'Sin descripción'
                                }}
                            </p>
                        </div>
                    </div>

                    <span class="inline-flex items-center
                               px-2 py-1 rounded-full
                               font-label-sm text-label-sm
                               font-bold shrink-0" :class="item.activo
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : 'bg-surface-container-highest text-on-surface-variant'
                                ">
                        {{
                            item.activo
                                ? 'ACTIVO'
                                : 'INACTIVO'
                        }}
                    </span>
                </div>

                <button type="button" class="w-full h-9 mt-space-sm
                           rounded-lg
                           bg-surface-container-high
                           text-on-surface
                           font-label-sm text-label-sm
                           font-semibold
                           flex items-center justify-center gap-1.5
                           hover:bg-surface-container-highest
                           transition-colors" @click="openEdit(item)">
                    <span class="material-symbols-outlined
                               text-[17px] text-secondary">
                        edit
                    </span>

                    Editar
                </button>
            </article>
        </div>

        <div v-if="!loading && !errorMessage && filteredItems.length === 0" class="mt-space-md
                   bg-surface-container-lowest
                   rounded-xl shadow-sm
                   py-space-xl px-space-md text-center">
            <div class="w-14 h-14 mx-auto rounded-full
                       bg-surface-container-high
                       flex items-center justify-center">
                <span class="material-symbols-outlined
                           text-[27px] text-outline">
                    search_off
                </span>
            </div>

            <h2 class="font-headline-sm text-headline-sm
                       font-bold text-on-surface
                       mt-space-sm">
                No se encontraron registros
            </h2>

            <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-1">
                No existen elementos que coincidan
                con los filtros actuales.
            </p>

            <button type="button" class="mt-space-sm
                       font-label-md text-label-md
                       text-secondary font-bold
                       hover:underline" @click="clearFilters">
                Limpiar filtros
            </button>
        </div>

        <CatalogoModal :open="modalOpen" :mode="modalMode" :catalog-key="activeCatalog"
            :catalog-label="currentCatalog.singular" :item="selectedItem" :marcas="marcasDisponibles" :saving="saving"
            :error-message="modalError" @close="closeModal" @submit="saveItem" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import CatalogoModal from '@/components/catalogos/CatalogoModal.vue'

import { catalogosService } from '@/services/catalogos.service'

import { getApiErrorMessage } from '@/utils/apiError'

import type { CatalogItem, CatalogKey, CatalogPayload } from '@/types/catalogos'

interface CatalogDefinition {
    key: CatalogKey
    label: string
    singular: string
    icon: string
    description: string
}

const catalogs: CatalogDefinition[] = [
    {
        key: 'tipos',
        label: 'Tipos de instrumento',
        singular: 'tipo de instrumento',
        icon: 'category',
        description:
            'Clasificación general utilizada para identificar los tipos de instrumental.',
    },
    {
        key: 'marcas',
        label: 'Marcas',
        singular: 'marca',
        icon: 'sell',
        description:
            'Marcas asociadas a los instrumentos registrados en el sistema.',
    },
    {
        key: 'modelos',
        label: 'Modelos',
        singular: 'modelo',
        icon: 'deployed_code',
        description:
            'Modelos de instrumental disponibles para su clasificación.',
    },
    {
        key: 'proveedores',
        label: 'Proveedores',
        singular: 'proveedor',
        icon: 'local_shipping',
        description:
            'Proveedores relacionados con el instrumental registrado.',
    },
    {
        key: 'ubicaciones',
        label: 'Ubicaciones',
        singular: 'ubicación',
        icon: 'location_on',
        description:
            'Áreas donde los instrumentos pueden estar registrados o asignados.',
    },
    {
        key: 'servicios',
        label: 'Servicios',
        singular: 'servicio',
        icon: 'medical_services',
        description:
            'Servicios hospitalarios utilizados durante el registro de uso.',
    },
    {
        key: 'procedimientos',
        label: 'Procedimientos',
        singular: 'procedimiento',
        icon: 'clinical_notes',
        description:
            'Procedimientos asociados a los registros de uso del instrumental.',
    },
    {
        key: 'motivosBaja',
        label: 'Motivos de baja',
        singular: 'motivo de baja',
        icon: 'disabled_by_default',
        description:
            'Motivos disponibles para documentar la baja formal de un instrumento.',
    },
]

const activeCatalog = ref<CatalogKey>('tipos')

const search = ref('')
const statusFilter = ref('')

const modalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const selectedItem = ref<CatalogItem | null>(null)
const saving = ref(false)
const modalError = ref('')

const marcasDisponibles = computed(() => {
    return data.value.marcas.filter((marca) => marca.activo)
})

const data = ref<Record<CatalogKey, CatalogItem[]>>({
    tipos: [], marcas: [], modelos: [],
    proveedores: [], ubicaciones: [], servicios: [],
    procedimientos: [], motivosBaja: [],
})

const loading = ref(false)

const errorMessage = ref('')

const currentCatalog = computed(() => {
    return (
        catalogs.find(
            (catalog) =>
                catalog.key === activeCatalog.value
        ) ?? catalogs[0]
    )
})

const currentItems = computed(() => {
    return data.value[activeCatalog.value]
})

const filteredItems = computed(() => {
    const term = search.value
        .trim()
        .toLowerCase()

    return currentItems.value.filter((item) => {
        const searchableText = [
            item.nombre,
            item.descripcion,
            item.codigo,
            item.contacto,
            item.telefono,
            item.correo,
            item.marca?.nombre,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

        const matchesSearch = !term || searchableText.includes(term)

        const matchesStatus = !statusFilter.value ||
            (statusFilter.value === 'ACTIVO' && item.activo) ||
            (statusFilter.value === 'INACTIVO' && !item.activo)

        return matchesSearch && matchesStatus
    })
})

const loadCatalog = async (catalog: CatalogKey) => {
    loading.value = true
    errorMessage.value = ''

    try {
        data.value[catalog] = await catalogosService.getAll(catalog)
    } catch (error) {
        data.value[catalog] = []

        errorMessage.value = getApiErrorMessage(error)
    } finally {
        loading.value = false
    }
}

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left ' +
    'font-label-sm text-label-sm uppercase ' +
    'tracking-wider text-outline font-semibold'

const iconButtonClass =
    'w-9 h-9 rounded-lg ' +
    'bg-surface-container-low ' +
    'text-on-surface-variant ' +
    'hover:bg-surface-container-high ' +
    'hover:text-secondary transition-colors ' +
    'flex items-center justify-center'

watch(activeCatalog, async (catalog) => {
    clearFilters()
    closeModal()

    await loadCatalog(catalog)
})

const clearFilters = () => {
    search.value = ''
    statusFilter.value = ''
}

const openCreate = async () => {
    modalMode.value = 'create'
    selectedItem.value = null
    modalError.value = ''

    if (activeCatalog.value === 'modelos') {
        try {
            data.value.marcas = await catalogosService.getAll('marcas')
        } catch (error) {
            modalError.value = getApiErrorMessage(error)
        }
    }

    modalOpen.value = true
}

const openEdit = async (item: CatalogItem) => {
    modalMode.value = 'edit'

    selectedItem.value = {
        ...item,
    }

    modalError.value = ''

    if (activeCatalog.value === 'modelos') {
        try {
            data.value.marcas = await catalogosService.getAll('marcas')
        } catch (error) {
            modalError.value = getApiErrorMessage(error)
        }
    }

    modalOpen.value = true
}

const closeModal = () => {
    if (saving.value) {
        return
    }

    modalOpen.value = false
    selectedItem.value = null
    modalError.value = ''
}

const saveItem = async (
    data: {
        id?: number
        payload: CatalogPayload
        activo: boolean
    }) => {
    saving.value = true
    modalError.value = ''

    try {
        if (modalMode.value === 'create') {
            await catalogosService.create(activeCatalog.value, data.payload)
        } else {
            if (!data.id) {
                modalError.value = 'No se encontró el identificador del registro'
                return
            }

            await catalogosService.update(activeCatalog.value, data.id, data.payload)

            const estadoOriginal = selectedItem.value?.activo ?? true


            if (data.activo !== estadoOriginal) {
                await catalogosService.updateEstado(activeCatalog.value, data.id, data.activo)
            }
        }

        await loadCatalog(activeCatalog.value)

        modalOpen.value = false
        selectedItem.value = null
    } catch (error) {
        modalError.value = getApiErrorMessage(error)
    } finally {
        saving.value = false
    }
}

onMounted(async () => {
    await loadCatalog(activeCatalog.value)
})
</script>