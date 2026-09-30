<template>
    <div class="w-full">
        <div class="flex flex-col xl:flex-row xl:items-start
                   xl:justify-between gap-space-md">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                               tracking-wider text-secondary font-bold">
                        Operación
                    </span>

                    <span class="text-outline-variant">•</span>

                    <span class="font-label-sm text-label-sm
                               text-on-surface-variant font-medium">
                        Trazabilidad global
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Movimientos
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Consulta el historial operativo de los instrumentos,
                    incluyendo altas, usos, cambios de ubicación, cambios de
                    estado, bloqueos y bajas.
                </p>
            </div>

            <button type="button" :disabled="loading" class="h-10 px-4 rounded-lg
                       bg-surface-container-lowest text-on-surface
                       font-label-md text-label-md font-semibold
                       flex items-center justify-center gap-2
                       hover:bg-surface-container-high
                       transition-colors shadow-sm shrink-0" @click="loadMovimientos">
                <span class="material-symbols-outlined text-[18px] text-secondary" :class="{ 'animate-spin': loading }">
                    refresh
                </span>

                {{ loading ? 'Actualizando...' : 'Actualizar' }}
            </button>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4
                   gap-space-sm mt-space-lg">
            <div class="col-span-2 lg:col-span-1
                       bg-primary-container rounded-xl p-space-md">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase
                                   tracking-wider text-primary-fixed-dim
                                   font-semibold">
                            Movimientos
                        </span>

                        <div class="font-headline-lg text-headline-lg
                                   font-bold text-on-primary mt-1">
                            {{ totalMovimientos }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px]
                               text-secondary-fixed">
                        history
                    </span>
                </div>
            </div>

            <MetricCard label="Usos registrados" :value="String(totalUsos)" icon="add_task" />

            <MetricCard label="Cambios de ubicación" :value="String(totalCambiosUbicacion)" icon="move_item" />

            <MetricCard label="Intentos bloqueados" :value="String(totalIntentosBloqueados)" icon="block" danger />
        </div>

        <section class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <div class="relative">
                <span v-if="!searching"
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">
                    search
                </span>

                <span v-else
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-secondary animate-spin">
                    progress_activity
                </span>

                <input v-model="filters.search" type="search" placeholder="Buscar por código de instrumento..."
                    :disabled="searching || loading" class="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md
                    placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary
                    disabled:opacity-60 disabled:cursor-wait" @keyup.enter="buscarPorCodigo" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2
                       xl:grid-cols-4 gap-space-sm mt-space-sm">
                <div>
                    <label for="tipoMovimiento" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Tipo de movimiento
                    </label>

                    <div class="relative">
                        <select id="tipoMovimiento" v-model="filters.tipo" :class="selectClass">
                            <option value="">
                                Todos los movimientos
                            </option>

                            <option value="ALTA">
                                Alta
                            </option>

                            <option value="USO">
                                Uso
                            </option>

                            <option value="CAMBIO_UBICACION">
                                Cambio de ubicación
                            </option>

                            <option value="CAMBIO_ESTADO">
                                Cambio de estado
                            </option>

                            <option value="CAMBIO_URGENTE">
                                Cambio urgente
                            </option>

                            <option value="BAJA">
                                Baja
                            </option>

                            <option value="INTENTO_USO_BLOQUEADO">
                                Intento de uso bloqueado
                            </option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <div>
                    <label for="usuario" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Usuario
                    </label>

                    <div class="relative">
                        <select id="usuario" v-model="filters.usuarioId" :class="selectClass">
                            <option value="">
                                Todos los usuarios
                            </option>

                            <option v-for="usuario in usuarios" :key="usuario.id" :value="String(usuario.id)">
                                {{ usuario.nombre }}
                            </option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <div>
                    <label for="fechaDesdeMovimiento" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Desde
                    </label>

                    <input id="fechaDesdeMovimiento" v-model="filters.desde" type="date" :class="inputClass" />
                </div>

                <div>
                    <label for="fechaHastaMovimiento" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Hasta
                    </label>

                    <input id="fechaHastaMovimiento" v-model="filters.hasta" type="date" :class="inputClass" />
                </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center
                       sm:justify-between gap-space-xs mt-space-sm
                       pt-space-sm border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                    {{ totalMovimientos }} movimientos encontrados
                </span>

                <button type="button" class="font-label-sm text-label-sm text-secondary
                           font-bold hover:underline self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </section>

        <div v-if="loading" class="mt-space-md bg-surface-container-lowest
           rounded-xl shadow-sm p-space-lg
           flex flex-col items-center justify-center
           min-h-[220px]">
            <span class="material-symbols-outlined
               text-[36px] text-secondary animate-spin">
                progress_activity
            </span>

            <span class="font-body-md text-body-md
               text-on-surface-variant mt-3">
                Cargando movimientos...
            </span>
        </div>

        <section v-else
            class="hidden lg:block mt-space-md bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <div v-if="errorMessage"
                    class="mt-space-md p-space-sm rounded-lg bg-error-container text-on-error-container">
                    <div class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-[19px]">
                            error
                        </span>

                        <span class="font-body-sm text-body-sm">
                            {{ errorMessage }}
                        </span>
                    </div>
                </div>
                <table class="w-full min-w-[1050px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Fecha y hora
                            </th>

                            <th :class="thClass">
                                Instrumento
                            </th>

                            <th :class="thClass">
                                Movimiento
                            </th>

                            <th :class="thClass">
                                Detalle
                            </th>

                            <th :class="thClass">
                                Usuario
                            </th>

                            <th class="px-4 py-3 text-right
                                       font-label-sm text-label-sm
                                       uppercase tracking-wider
                                       text-outline font-semibold">
                                Acción
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-surface-container-high">
                        <tr v-for="movimiento in movimientos" :key="movimiento.id" class="hover:bg-surface-container-low/60
                                   transition-colors">
                            <td class="px-4 py-4 align-top">
                                <span class="font-code-md text-code-md
                                           text-on-surface font-medium
                                           whitespace-nowrap">
                                    {{ movimiento.fecha }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                           text-on-surface-variant block mt-0.5">
                                    {{ movimiento.hora }}
                                </span>
                            </td>

                            <td class="px-4 py-4 align-top">
                                <button type="button" class="font-code-md text-code-md
                                           font-bold text-secondary
                                           hover:underline">
                                    {{ movimiento.codigo }}
                                </button>

                                <span class="font-body-sm text-body-sm
                                           text-on-surface-variant
                                           block mt-0.5">
                                    {{ movimiento.instrumento }}
                                </span>
                            </td>

                            <td class="px-4 py-4 align-top">
                                <span class="inline-flex items-center gap-1.5
                                           px-2.5 py-1 rounded-full
                                           font-label-sm text-label-sm
                                           font-bold whitespace-nowrap" :class="getTipoClass(movimiento.tipo)">
                                    <span class="material-symbols-outlined
                                               text-[15px]">
                                        {{ getTipoIcon(movimiento.tipo) }}
                                    </span>

                                    {{ formatTipo(movimiento.tipo) }}
                                </span>
                            </td>

                            <td class="px-4 py-4 align-top
                                       max-w-[330px]">
                                <span class="font-body-sm text-body-sm
                                           text-on-surface">
                                    {{ movimiento.detalle }}
                                </span>

                                <span v-if="movimiento.secundario" class="font-body-sm text-body-sm
                                           text-on-surface-variant
                                           block mt-1">
                                    {{ movimiento.secundario }}
                                </span>
                            </td>

                            <td class="px-4 py-4 align-top">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full
                                               bg-primary-container
                                               text-on-primary
                                               flex items-center justify-center
                                               font-label-sm text-label-sm
                                               font-bold shrink-0">
                                        {{ initials(movimiento.usuario) }}
                                    </div>

                                    <span class="font-body-sm text-body-sm
                                               text-on-surface">
                                        {{ movimiento.usuario }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-4 py-4 align-top text-right">
                                <button type="button" class="w-9 h-9 rounded-lg
                                           bg-surface-container-low
                                           text-on-surface-variant
                                           hover:bg-surface-container-high
                                           hover:text-secondary
                                           transition-colors
                                           inline-flex items-center
                                           justify-center" aria-label="Ver instrumento">
                                    <span class="material-symbols-outlined
                                               text-[18px]">
                                        visibility
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <div v-if="loading" class="lg:hidden mt-space-md space-y-space-sm">
            <article v-for="movimiento in movimientos" :key="`mobile-${movimiento.id}`" class="bg-surface-container-lowest
                       rounded-xl shadow-sm p-space-sm">
                <div class="flex items-start justify-between
                           gap-space-sm">
                    <div class="min-w-0">
                        <button type="button" class="font-code-md text-code-md
                                   font-bold text-secondary">
                            {{ movimiento.codigo }}
                        </button>

                        <span class="font-body-sm text-body-sm
                                   text-on-surface-variant
                                   block truncate mt-0.5">
                            {{ movimiento.instrumento }}
                        </span>
                    </div>

                    <span class="inline-flex items-center gap-1
                               px-2 py-1 rounded-full
                               font-label-sm text-label-sm
                               font-bold shrink-0" :class="getTipoClass(movimiento.tipo)">
                        <span class="material-symbols-outlined text-[14px]">
                            {{ getTipoIcon(movimiento.tipo) }}
                        </span>

                        {{ formatTipo(movimiento.tipo) }}
                    </span>
                </div>

                <p class="font-body-sm text-body-sm
                           text-on-surface mt-space-sm">
                    {{ movimiento.detalle }}
                </p>

                <p v-if="movimiento.secundario" class="font-body-sm text-body-sm
                           text-on-surface-variant mt-1">
                    {{ movimiento.secundario }}
                </p>

                <div class="grid grid-cols-2 gap-space-sm
                           mt-space-sm pt-space-sm
                           border-t border-surface-container-high">
                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase text-outline block">
                            Fecha
                        </span>

                        <span class="font-code-md text-code-md
                                   text-on-surface">
                            {{ movimiento.fecha }}
                            · {{ movimiento.hora }}
                        </span>
                    </div>

                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase text-outline block">
                            Registrado por
                        </span>

                        <span class="font-body-sm text-body-sm
                                   text-on-surface">
                            {{ movimiento.usuario }}
                        </span>
                    </div>
                </div>

                <button type="button" class="w-full h-9 mt-space-sm rounded-lg
                           bg-surface-container-high
                           text-on-surface
                           font-label-sm text-label-sm font-semibold
                           flex items-center justify-center gap-1.5
                           hover:bg-surface-container-highest
                           transition-colors">
                    <span class="material-symbols-outlined text-[17px]
                               text-secondary">
                        visibility
                    </span>

                    Ver instrumento
                </button>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, reactive, ref, onMounted, watch, computed } from 'vue'

import { movimientosService } from '@/services/movimientos.service'
import { usuariosService } from '@/services/usuarios.service'
import { instrumentosService } from '@/services/instrumentos.service'

import type { Movimiento, TipoMovimiento } from '@/types/movimientos'
import type { UsuarioItem } from '@/services/usuarios.service'

import { getApiErrorMessage } from '@/utils/apiError'

const filters = reactive({
    search: '',
    tipo: '',
    usuarioId: '',
    desde: '',
    hasta: '',
})

const movimientos = ref<Movimiento[]>([])
const usuarios = ref<UsuarioItem[]>([])

const instrumentoIdBusqueda = ref<number | undefined>(
    undefined
)

const totalMovimientos = ref(0)

const totalUsos = computed(() => {
    return movimientos.value.filter(
        (movimiento) =>
            movimiento.tipo === 'USO'
    ).length
})

const totalCambiosUbicacion = computed(() => {
    return movimientos.value.filter(
        (movimiento) =>
            movimiento.tipo === 'CAMBIO_UBICACION'
    ).length
})

const totalIntentosBloqueados = computed(() => {
    return movimientos.value.filter(
        (movimiento) =>
            movimiento.tipo ===
            'INTENTO_USO_BLOQUEADO'
    ).length
})

const loading = ref(false)
const searching = ref(false)
const errorMessage = ref('')

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const inputClass =
    'w-full h-11 px-3 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left font-label-sm text-label-sm ' +
    'uppercase tracking-wider text-outline font-semibold'

const clearFilters = () => {
    filters.search = ''
    filters.tipo = ''
    filters.usuarioId = ''
    filters.desde = ''
    filters.hasta = ''

    instrumentoIdBusqueda.value = undefined
}

const formatTipo = (tipo: TipoMovimiento) => {
    const labels: Record<TipoMovimiento, string> = {
        ALTA: 'Alta',
        USO: 'Uso',
        CAMBIO_UBICACION: 'Ubicación',
        CAMBIO_ESTADO: 'Estado',
        CAMBIO_URGENTE: 'Cambio urgente',
        BAJA: 'Baja',
        INTENTO_USO_BLOQUEADO: 'Uso bloqueado',
    }

    return labels[tipo]
}

const getTipoIcon = (tipo: TipoMovimiento) => {
    const icons: Record<TipoMovimiento, string> = {
        ALTA: 'add_circle',
        USO: 'add_task',
        CAMBIO_UBICACION: 'move_item',
        CAMBIO_ESTADO: 'sync_alt',
        CAMBIO_URGENTE: 'warning',
        BAJA: 'block',
        INTENTO_USO_BLOQUEADO: 'gpp_bad',
    }

    return icons[tipo]
}

const getTipoClass = (tipo: TipoMovimiento) => {
    if (
        tipo === 'CAMBIO_URGENTE' ||
        tipo === 'INTENTO_USO_BLOQUEADO' ||
        tipo === 'BAJA'
    ) {
        return 'bg-error-container text-on-error-container'
    }

    if (tipo === 'USO') {
        return 'bg-secondary-fixed text-on-secondary-fixed'
    }

    return 'bg-surface-container-high text-on-surface-variant'
}

const initials = (name: string) => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

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

const resolverInstrumentoPorCodigo = async () => {
    const search = filters.search.trim()

    if (!search) {
        instrumentoIdBusqueda.value = undefined
        return
    }

    try {
        const instrumentos =
            await instrumentosService.getAll({
                search,
            })

        const codigoBuscado =
            search.toUpperCase()

        const instrumento =
            instrumentos.find(
                (item) =>
                    item.codigo.toUpperCase() ===
                    codigoBuscado
            )

        instrumentoIdBusqueda.value =
            instrumento?.id
    } catch (error) {
        instrumentoIdBusqueda.value = undefined

        console.error(
            'Error buscando instrumento:',
            error
        )
    }
}

const buscarPorCodigo = async () => {
    if (searching.value || loading.value) return

    const search = filters.search.trim()

    if (!search) {
        instrumentoIdBusqueda.value = undefined
        await loadMovimientos()
        return
    }

    searching.value = true
    errorMessage.value = ''

    try {
        await resolverInstrumentoPorCodigo()

        if (instrumentoIdBusqueda.value === undefined) {
            movimientos.value = []
            totalMovimientos.value = 0
            errorMessage.value = `No se encontró el instrumento "${search}".`
            return
        }

        await loadMovimientos()
    } finally {
        searching.value = false
    }
}

const loadMovimientos = async () => {
    if (loading.value) return

    loading.value = true
    errorMessage.value = ''

    try {
        const result = await movimientosService.getAll({
            instrumentoId: instrumentoIdBusqueda.value,

            tipo: filters.tipo
                ? filters.tipo as TipoMovimiento
                : undefined,

            usuarioId: filters.usuarioId
                ? Number(filters.usuarioId)
                : undefined,

            desde: filters.desde || undefined,
            hasta: filters.hasta || undefined
        })

        movimientos.value = result.movimientos

        totalMovimientos.value = result.total
    } catch (error) {
        movimientos.value = []
        totalMovimientos.value = 0

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando movimientos:', error)
    } finally {
        loading.value = false
    }
}

const loadUsuarios = async () => {
    try {
        const data = await usuariosService.getAll()

        usuarios.value = data.filter((usuario) => usuario.activo)
    } catch (error) {
        console.log('Error cargando usuarios:', error)
    }
}

onMounted(async () => {
    await Promise.all([
        loadMovimientos(),
        loadUsuarios(),
    ])
})

watch(
    () => filters.search,
    (search, oldSearch) => {
        if (
            oldSearch &&
            !search.trim()
        ) {
            instrumentoIdBusqueda.value =
                undefined

            loadMovimientos()
        }
    }
)

watch(
    [
        () => filters.tipo,
        () => filters.usuarioId,
        () => filters.desde,
        () => filters.hasta,
    ],
    () => {
        const tieneDesde =
            Boolean(filters.desde)

        const tieneHasta =
            Boolean(filters.hasta)

        if (tieneDesde !== tieneHasta) {
            return
        }

        loadMovimientos()
    }
)

const MetricCard = (props: {
    label: string
    value: string
    icon: string
}) =>
    h(
        'div',
        {
            class:
                'bg-surface-container-lowest ' +
                'rounded-xl p-space-md shadow-sm',
        },
        [
            h(
                'div',
                {
                    class:
                        'flex items-start ' +
                        'justify-between gap-3',
                },
                [
                    h(
                        'div',
                        {},
                        [
                            h(
                                'span',
                                {
                                    class:
                                        'font-label-sm text-label-sm ' +
                                        'uppercase tracking-wider ' +
                                        'text-on-surface-variant ' +
                                        'font-semibold',
                                },
                                props.label
                            ),

                            h(
                                'div',
                                {
                                    class:
                                        'font-headline-lg ' +
                                        'text-headline-lg ' +
                                        'font-bold ' +
                                        'text-on-surface mt-1',
                                },
                                props.value
                            ),
                        ]
                    ),

                    h(
                        'span',
                        {
                            class:
                                'material-symbols-outlined ' +
                                'text-[25px] text-secondary',
                        },
                        props.icon
                    ),
                ]
            ),
        ]
    )
</script>