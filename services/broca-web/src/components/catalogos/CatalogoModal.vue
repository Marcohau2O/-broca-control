<template>
    <div v-if="open" class="fixed inset-0 z-[100]
               flex items-end sm:items-center
               justify-center sm:p-4">
        <button type="button" class="absolute inset-0 bg-black/40 backdrop-blur-[1px]" aria-label="Cerrar"
            @click="close"></button>

        <div class="relative z-10 w-full sm:max-w-lg
                   max-h-[95vh] overflow-y-auto
                   bg-surface-container-lowest
                   rounded-t-2xl sm:rounded-2xl
                   shadow-xl">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high
                       flex items-start justify-between gap-3">
                <div class="flex items-start gap-2">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            {{ mode === 'create' ? 'add' : 'edit' }}
                        </span>
                    </div>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            {{
                                mode === 'create'
                                    ? `Nuevo ${catalogLabel}`
                                    : `Editar ${catalogLabel}`
                            }}
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            {{
                                mode === 'create'
                                    ? 'Registra un nuevo elemento en el catálogo.'
                                    : 'Actualiza la información del elemento seleccionado.'
                            }}
                        </p>
                    </div>
                </div>

                <button type="button" class="w-9 h-9 rounded-lg
                           text-on-surface-variant
                           hover:bg-surface-container-high
                           flex items-center justify-center shrink-0" aria-label="Cerrar" :disabled="saving"
                    @click="close">
                    <span class="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            <form class="p-space-md" @submit.prevent="submitForm">
                <div v-if="errorMessage" class="mb-space-sm px-3 py-3
                           rounded-lg bg-error-container/30
                           flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-error text-[20px] shrink-0">
                        error
                    </span>

                    <p class="font-body-sm text-body-sm
                               text-on-surface">
                        {{ errorMessage }}
                    </p>
                </div>

                <div v-if="requiresCode">
                    <label for="catalogoCodigo" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Código
                        <span class="text-error">*</span>
                    </label>

                    <input id="catalogoCodigo" v-model.trim="form.codigo" type="text" required maxlength="50"
                        autocomplete="off" placeholder="Código" class="w-full h-11 px-3 rounded-lg
                               bg-surface-container-low
                               text-on-surface
                               font-body-md text-body-md
                               placeholder:text-outline
                               uppercase
                               focus:outline-none focus:ring-2
                               focus:ring-secondary" />
                </div>

                <div v-if="isModelo" :class="{ 'mt-space-sm': requiresCode }">
                    <label for="catalogoMarca" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Marca
                        <span class="text-error">*</span>
                    </label>

                    <div class="relative">
                        <select id="catalogoMarca" v-model="form.marcaId" required class="w-full h-11 pl-3 pr-9 rounded-lg
                                   bg-surface-container-low
                                   text-on-surface
                                   font-body-md text-body-md
                                   appearance-none
                                   focus:outline-none focus:ring-2
                                   focus:ring-secondary">
                            <option :value="null" disabled>
                                Selecciona una marca
                            </option>

                            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
                                {{ marca.nombre }}
                            </option>
                        </select>

                        <span class="material-symbols-outlined
                                   absolute right-3 top-3
                                   text-[18px] text-outline
                                   pointer-events-none">
                            expand_more
                        </span>
                    </div>

                    <p v-if="marcas.length === 0" class="mt-1 font-body-sm text-body-sm
                               text-error">
                        No hay marcas disponibles.
                    </p>
                </div>

                <div :class="{
                    'mt-space-sm':
                        requiresCode || isModelo
                }">
                    <label for="catalogoNombre" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Nombre
                        <span class="text-error">*</span>
                    </label>

                    <input id="catalogoNombre" v-model.trim="form.nombre" type="text" required maxlength="150"
                        autocomplete="off" :placeholder="`Nombre de ${catalogLabel}`" class="w-full h-11 px-3 rounded-lg
                               bg-surface-container-low
                               text-on-surface
                               font-body-md text-body-md
                               placeholder:text-outline
                               focus:outline-none focus:ring-2
                               focus:ring-secondary" />
                </div>

                <template v-if="isProveedor">
                    <div class="mt-space-sm">
                        <label for="catalogoContacto" class="font-label-sm text-label-sm uppercase
                                   tracking-wider text-outline
                                   font-semibold block mb-1.5">
                            Contacto
                        </label>

                        <input id="catalogoContacto" v-model.trim="form.contacto" type="text" maxlength="150"
                            autocomplete="off" placeholder="Nombre del contacto" class="w-full h-11 px-3 rounded-lg
                                   bg-surface-container-low
                                   text-on-surface
                                   font-body-md text-body-md
                                   placeholder:text-outline
                                   focus:outline-none focus:ring-2
                                   focus:ring-secondary" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2
                               gap-space-sm mt-space-sm">
                        <div>
                            <label for="catalogoTelefono" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline
                                       font-semibold block mb-1.5">
                                Teléfono
                            </label>

                            <input id="catalogoTelefono" v-model.trim="form.telefono" type="tel" maxlength="30"
                                autocomplete="tel" placeholder="Teléfono" class="w-full h-11 px-3 rounded-lg
                                       bg-surface-container-low
                                       text-on-surface
                                       font-body-md text-body-md
                                       placeholder:text-outline
                                       focus:outline-none focus:ring-2
                                       focus:ring-secondary" />
                        </div>

                        <div>
                            <label for="catalogoCorreo" class="font-label-sm text-label-sm uppercase
                                       tracking-wider text-outline
                                       font-semibold block mb-1.5">
                                Correo
                            </label>

                            <input id="catalogoCorreo" v-model.trim="form.correo" type="email" autocomplete="email"
                                placeholder="correo@ejemplo.com" class="w-full h-11 px-3 rounded-lg
                                       bg-surface-container-low
                                       text-on-surface
                                       font-body-md text-body-md
                                       placeholder:text-outline
                                       focus:outline-none focus:ring-2
                                       focus:ring-secondary" />
                        </div>
                    </div>
                </template>

                <div v-else class="mt-space-sm">
                    <label for="catalogoDescripcion" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Descripción
                    </label>

                    <textarea id="catalogoDescripcion" v-model.trim="form.descripcion" rows="3" maxlength="500"
                        placeholder="Descripción opcional" class="w-full px-3 py-2.5 rounded-lg
                               bg-surface-container-low
                               text-on-surface
                               font-body-md text-body-md
                               placeholder:text-outline
                               resize-none
                               focus:outline-none focus:ring-2
                               focus:ring-secondary"></textarea>

                    <div class="flex justify-end mt-1">
                        <span class="font-code-md text-code-md
                                   text-outline">
                            {{ form.descripcion.length }}/500
                        </span>
                    </div>
                </div>

                <div v-if="mode === 'edit'" class="mt-space-sm">
                    <span class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Estado
                    </span>

                    <div class="rounded-lg
                               bg-surface-container-low
                               px-3 py-3
                               flex items-center
                               justify-between gap-3">
                        <div>
                            <span class="font-label-md text-label-md
                                       font-semibold text-on-surface
                                       block">
                                Elemento activo
                            </span>

                            <span class="font-body-sm text-body-sm
                                       text-on-surface-variant block mt-0.5">
                                Los elementos inactivos no estarán
                                disponibles para nuevas operaciones.
                            </span>
                        </div>

                        <button type="button" role="switch" :aria-checked="form.activo" class="relative w-11 h-6 rounded-full
                                   transition-colors shrink-0" :class="form.activo
                                    ? 'bg-secondary'
                                    : 'bg-surface-container-highest'
                                    " @click="form.activo = !form.activo">
                            <span class="absolute top-1
                                       w-4 h-4 rounded-full
                                       bg-white shadow-sm
                                       transition-transform" :class="form.activo
                                        ? 'translate-x-5'
                                        : 'translate-x-1'
                                        "></span>
                        </button>
                    </div>
                </div>

                <div class="flex flex-col-reverse sm:flex-row
                           sm:justify-end gap-space-xs
                           mt-space-md pt-space-sm
                           border-t border-surface-container-high">
                    <button type="button" :disabled="saving" class="h-10 px-4 rounded-lg
                               bg-surface-container-high
                               text-on-surface
                               font-label-md text-label-md
                               font-semibold
                               hover:bg-surface-container-highest
                               transition-colors
                               disabled:opacity-50" @click="close">
                        Cancelar
                    </button>

                    <button type="submit" :disabled="!canSubmit || saving" class="h-10 px-4 rounded-lg
                               bg-secondary text-on-secondary
                               font-label-md text-label-md font-bold
                               flex items-center justify-center gap-2
                               hover:bg-primary hover:text-on-primary
                               transition-colors
                               disabled:opacity-50
                               disabled:cursor-not-allowed">
                        <span v-if="saving" class="material-symbols-outlined
                                   text-[18px] animate-spin">
                            progress_activity
                        </span>

                        <span v-else class="material-symbols-outlined text-[18px]">
                            {{ mode === 'create' ? 'add' : 'save' }}
                        </span>

                        {{
                            saving
                                ? 'Guardando...'
                                : mode === 'create'
                                    ? 'Registrar'
                                    : 'Guardar cambios'
                        }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import type { CatalogItem, CatalogKey, CatalogPayload } from '@/types/catalogos'

const props = withDefaults(
    defineProps<{
        open: boolean
        mode: 'create' | 'edit'
        catalogKey: CatalogKey
        catalogLabel: string
        item?: CatalogItem | null
        marcas?: CatalogItem[]
        saving?: boolean
        errorMessage?: string
    }>(),
    {
        item: null,
        marcas: () => [],
        saving: false,
        errorMessage: '',
    }
)

const emit = defineEmits<{
    (e: 'close'): void

    (
        e: 'submit',
        data: {
            id?: number
            payload: CatalogPayload
            activo: boolean
        }
    ): void
}>()

const form = reactive({
    id: undefined as number | undefined,

    codigo: '',
    nombre: '',
    descripcion: '',

    marcaId: null as number | null,

    contacto: '',
    telefono: '',
    correo: '',

    activo: true,
})

const requiresCode = computed(() => {
    return (props.catalogKey === 'tipos' || props.catalogKey === 'ubicaciones')
})

const isModelo = computed(() => {
    return props.catalogKey === 'modelos'
})

const isProveedor = computed(() => {
    return props.catalogKey === 'proveedores'
})

const canSubmit = computed(() => {
    if (!form.nombre.trim()) {
        return false
    }

    if (requiresCode.value && !form.codigo.trim()) {
        return false
    }

    if (isModelo.value && !form.marcaId) {
        return false
    }

    return true
})

const resetForm = () => {
    form.id = props.item?.id
    form.codigo = props.item?.codigo ?? ''
    form.nombre = props.item?.nombre ?? ''
    form.descripcion = props.item?.descripcion ?? ''
    form.marcaId = props.item?.marcaId ?? props.item?.marca?.id ??null
    form.contacto = props.item?.contacto ?? ''
    form.telefono = props.item?.telefono ?? ''
    form.correo =props.item?.correo ?? ''
    form.activo = props.item?.activo ?? true
}

watch(
    () => [
        props.open,
        props.item,
        props.mode,
        props.catalogKey,
    ],
    () => {
        if (props.open) {
            resetForm()
        }
    },
    {
        deep: true,
    }
)

const close = () => {
    if (props.saving) {
        return
    }

    emit('close')
}

const emptyToUndefined = (value: string): string | undefined => {
    const normalized = value.trim()

    return normalized || undefined
}

const submitForm = () => {
    if (!canSubmit.value) {
        return
    }

    let payload: CatalogPayload

    switch (props.catalogKey) {
        case 'tipos':
        case 'ubicaciones':
            payload = {
                codigo: form.codigo
                    .trim()
                    .toUpperCase(),

                nombre: form.nombre.trim(),

                descripcion:
                    emptyToUndefined(form.descripcion)
            }
            break

        case 'modelos':
            payload = {
                nombre: form.nombre.trim(),

                descripcion:
                    emptyToUndefined(form.descripcion),

                marcaId: form.marcaId as number,
            }
            break

        case 'proveedores':
            payload = {
                nombre: form.nombre.trim(),
                contacto: emptyToUndefined(form.contacto),
                telefono: emptyToUndefined(form.telefono),
                correo: emptyToUndefined(form.correo),
            }
            break

        default:
            payload = {
                nombre: form.nombre.trim(),
                descripcion: emptyToUndefined(form.descripcion),
            }
            break
    }

    emit('submit', {
        id: form.id,
        payload,
        activo: form.activo,
    })
}
</script>