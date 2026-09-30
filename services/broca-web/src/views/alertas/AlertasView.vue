<template>
    <div class="w-full">
        <div class="flex flex-col xl:flex-row xl:items-start
                   xl:justify-between gap-space-md">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                               tracking-wider text-secondary font-bold">
                        Seguridad y control
                    </span>

                    <span class="text-outline-variant">•</span>

                    <span class="font-label-sm text-label-sm
                               text-on-surface-variant font-medium">
                        Seguimiento operativo
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Alertas
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Revisa las alertas generadas por el control de vida útil,
                    intentos de uso bloqueados e inconsistencias de inventario.
                </p>
            </div>

            <button type="button" :disabled="loading" class="h-10 px-4 rounded-lg
                       bg-surface-container-lowest text-on-surface
                       font-label-md text-label-md font-semibold
                       flex items-center justify-center gap-2
                       hover:bg-surface-container-high
                       transition-colors shadow-sm shrink-0" @click="loadAlertas">
                <span class="material-symbols-outlined text-[18px] text-secondary" :class="{ 'animate-spin': loading }">
                    refresh
                </span>

                {{ loading ? 'Actualizando' : 'Actualizar' }}
            </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5
                   gap-space-sm mt-space-lg">
            <!-- Pending -->
            <div class="col-span-2 md:col-span-1
                       bg-primary-container rounded-xl p-space-md">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase
                                   tracking-wider text-primary-fixed-dim
                                   font-semibold">
                            Pendientes
                        </span>

                        <div class="font-headline-lg text-headline-lg
                                   font-bold text-on-primary mt-1">
                            {{ totalPendientes }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px]
                               text-secondary-fixed">
                        notifications_active
                    </span>
                </div>
            </div>

            <MetricCard label="Cambio urgente" :value="String(totalCambioUrgente)" icon="warning" tone="error" />

            <MetricCard label="Vida preventiva" :value="String(totalVidaPreventiva)" icon="favorite" />

            <MetricCard label="Usos bloqueados" :value="String(totalUsosBloqueados)" icon="block" />

            <MetricCard label="Inconsistencias" :value="String(totalInconsistencias)" icon="inventory" />
        </div>

        <div class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <div class="relative">
                <span v-if="!searching" class="material-symbols-outlined absolute
                           left-3 top-1/2 -translate-y-1/2
                           text-[20px] text-outline">
                    search
                </span>

                <span v-else class="material-symbols-outlined absolute left-3 top-1/2
                            -translate-y-1/2 text-[20px] text-secondary animate-spin">
                    progress_activity
                </span>

                <input v-model="search" type="search" placeholder="Buscar por código de instrumento..." :disabled="searching || loading" class="w-full h-11 pl-10 pr-4 rounded-lg
                           bg-surface-container-low text-on-surface
                           font-body-md text-body-md
                           placeholder:text-outline
                           focus:outline-none focus:ring-2
                           focus:ring-secondary
                           disabled:opacity-60" @keyup.enter="buscarPorCodigo" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2
                       xl:grid-cols-2 gap-space-sm mt-space-sm">
                <div>
                    <label for="estadoAlerta" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Estado
                    </label>

                    <div class="relative">
                        <select id="estadoAlerta" v-model="estadoFilter" :class="selectClass">
                            <option value="">Todos los estados</option>
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="REVISADA">Revisada</option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <div>
                    <label for="tipoAlerta" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Tipo de alerta
                    </label>

                    <div class="relative">
                        <select id="tipoAlerta" v-model="tipoFilter" :class="selectClass">
                            <option value="">Todos los tipos</option>

                            <option value="CAMBIO_URGENTE">
                                Cambio urgente
                            </option>

                            <option value="VIDA_PREVENTIVA">
                                Vida preventiva
                            </option>

                            <option value="INTENTO_USO_BLOQUEADO">
                                Intento de uso bloqueado
                            </option>

                            <option value="INCONSISTENCIA_INVENTARIO">
                                Inconsistencia de inventario
                            </option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <!-- <div>
                    <label for="fechaDesde" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Desde
                    </label>

                    <input id="fechaDesde" v-model="fechaDesde" type="date" class="w-full h-11 px-3 rounded-lg
                               bg-surface-container-low text-on-surface
                               font-body-md text-body-md
                               focus:outline-none focus:ring-2
                               focus:ring-secondary" />
                </div>

                <div>
                    <label for="fechaHasta" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Hasta
                    </label>

                    <input id="fechaHasta" v-model="fechaHasta" type="date" class="w-full h-11 px-3 rounded-lg
                               bg-surface-container-low text-on-surface
                               font-body-md text-body-md
                               focus:outline-none focus:ring-2
                               focus:ring-secondary" />
                </div> -->
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center
                       sm:justify-between gap-space-xs mt-space-sm
                       pt-space-sm border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                    {{ totalPendientes }}
                    {{ totalPendientes === 1 ? 'alerta pendiente' : 'alertas pendientes' }}
                    de revisión
                </span>

                <button type="button" class="font-label-sm text-label-sm text-secondary
                           font-bold hover:underline self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </div>

        <div class="mt-space-md space-y-space-sm">
            <div v-if="loading" class="bg-surface-container-lowest rounded-xl shadow-sm
               min-h-[220px] flex flex-col items-center justify-center">
                <span class="material-symbols-outlined text-[36px] text-secondary animate-spin">
                    progress_activity
                </span>

                <span class="font-body-md text-body-md text-on-surface-variant mt-3">
                    Cargando alertas...
                </span>
            </div>
            <div v-else-if="errorMessage" class="p-space-sm rounded-lg
               bg-error-container text-on-error-container">
                {{ errorMessage }}
            </div>

            <div v-else-if="alertas.length === 0" class="bg-surface-container-lowest
               rounded-xl shadow-sm min-h-[180px] flex flex-col items-center justify-center text-center p-space-md">
                <span class="material-symbols-outlined text-[36px] text-outline">
                    notifications_off
                </span>

                <span class="font-body-md text-body-md
                   text-on-surface-variant mt-2">
                    No se encontraron alertas.
                </span>
            </div>

            <article v-for="alerta in alertas" v-else :key="alerta.id" class="bg-surface-container-lowest rounded-xl
                       shadow-sm overflow-hidden">
                <div class="flex">
                    <div class="w-1.5 bg-error shrink-0" :class="isDanger(alerta.tipo) ? 'bg-error' : 'bg-secondary'">
                    </div>

                    <div class="flex-1 min-w-0 p-space-md">
                        <AlertContent :title="getTituloAlerta(alerta.tipo)" :type-label="getTipoLabel(alerta.tipo)"
                            :code="alerta.instrumento.codigo"
                            :instrument="alerta.instrumento.descripcion ?? alerta.instrumento.tipoInstrumento.nombre"
                            :location="alerta.instrumento.ubicacion?.nombre ?? 'Sin ubicación'"
                            :date="formatFecha(alerta.fechaCreacion)" :description="alerta.mensaje"
                            :icon="getIconAlerta(alerta.tipo)" :danger="isDanger(alerta.tipo)" :estado="alerta.estado"
                            :revisando="revisandoId === alerta.id" @revisar="revisarAlerta(alerta)"
                            @ver-instrumento="verInstrumentoId(alerta.instrumento.id)" />
                    </div>
                </div>
            </article>
        </div>

        <!-- <div class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm px-space-md py-space-sm
                   flex flex-col sm:flex-row sm:items-center
                   sm:justify-between gap-space-sm">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
                Mostrando
                <strong class="text-on-surface">1–4</strong>
                de
                <strong class="text-on-surface">24</strong>
                alertas
            </span>

            <div class="flex items-center gap-1 self-end sm:self-auto">
                <button type="button" disabled class="w-9 h-9 rounded-lg
                           bg-surface-container-low
                           text-outline flex items-center
                           justify-center disabled:opacity-50">
                    <span class="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>

                <button type="button" class="w-9 h-9 rounded-lg bg-primary-container
                           text-on-primary font-label-sm text-label-sm
                           font-bold">
                    1
                </button>

                <button type="button" class="w-9 h-9 rounded-lg
                           text-on-surface-variant
                           hover:bg-surface-container-high
                           font-label-sm text-label-sm font-semibold">
                    2
                </button>

                <button type="button" class="w-9 h-9 rounded-lg
                           text-on-surface-variant
                           hover:bg-surface-container-high
                           flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { h, ref, computed, onMounted, watch } from 'vue'

import { useRouter } from 'vue-router'

import { alertasService } from '@/services/alertas.service'

import type { Alerta, EstadoAlerta, TipoAlerta } from '@/types/alertas'

import { instrumentosService } from '@/services/instrumentos.service'

import { getApiErrorMessage } from '@/utils/apiError'

const router = useRouter()

const alertas = ref<Alerta[]>([])
const revisandoId = ref<number | null>(null)

const loading = ref(false)
const errorMessage = ref('')

const search = ref('')
const estadoFilter = ref('')
const tipoFilter = ref('')
const fechaDesde = ref('')
const fechaHasta = ref('')

const instrumentoIdBusqueda = ref<number | undefined>(undefined)

const searching = ref(false)

const totalPendientes = computed(() => {
    return alertas.value.filter((alerta) => alerta.estado === 'PENDIENTE').length
})

const totalCambioUrgente = computed(() => {
    return alertas.value.filter((alerta) => alerta.tipo === 'CAMBIO_URGENTE').length
})

const totalVidaPreventiva = computed(() => {
    return alertas.value.filter((alerta) =>alerta.tipo === 'VIDA_PREVENTIVA').length
})

const totalUsosBloqueados = computed(() => {
    return alertas.value.filter((alerta) => alerta.tipo === 'INTENTO_USO_BLOQUEADO').length
})

const totalInconsistencias = computed(() => {
    return alertas.value.filter((alerta) => alerta.tipo === 'INCONSISTENCIA_INVENTARIO').length
})

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const primaryButtonClass =
    'h-9 px-3 rounded-lg bg-secondary text-on-secondary ' +
    'font-label-sm text-label-sm font-bold inline-flex ' +
    'items-center justify-center gap-1.5 ' +
    'hover:bg-primary hover:text-on-primary transition-colors'

const secondaryButtonClass =
    'h-9 px-3 rounded-lg bg-surface-container-high ' +
    'text-on-surface font-label-sm text-label-sm font-semibold ' +
    'inline-flex items-center justify-center gap-1.5 ' +
    'hover:bg-surface-container-highest transition-colors'

const clearFilters = async () => {
    search.value = ''
    estadoFilter.value = ''
    tipoFilter.value = ''

    instrumentoIdBusqueda.value = undefined

    fechaDesde.value = ''
    fechaHasta.value = ''

    await loadAlertas()
}

const verInstrumentoId = (instrumentoId: number) => {
    router.push({
        name: 'instrumento-detail',
        params: {
            id: instrumentoId
        }
    })
}

const formatFecha = (fecha: string) => {
    return new Intl.DateTimeFormat(
        'es-MX',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }
    ).format(new Date(fecha))
}

const getTituloAlerta = (tipo: Alerta['tipo']) => {
    const titulos: Record<Alerta['tipo'], string> = {
        CAMBIO_URGENTE: 'Cambio urgente requerido',
        VIDA_PREVENTIVA: 'Última vida disponible',
        INTENTO_USO_BLOQUEADO: 'Intento de uso bloqueado',
        INCONSISTENCIA_INVENTARIO: 'Inconsistencia de inventario',
    }

    return titulos[tipo]
}

const getTipoLabel = (tipo: Alerta['tipo']) => {
    const labels: Record<Alerta['tipo'], string> = {
        CAMBIO_URGENTE: 'CAMBIO URGENTE',
        VIDA_PREVENTIVA: 'VIDA PREVENTIVA',
        INTENTO_USO_BLOQUEADO: 'USO BLOQUEADO',
        INCONSISTENCIA_INVENTARIO: 'INCONSISTENCIA',
    }

    return labels[tipo]
}

const getIconAlerta = (tipo: Alerta['tipo']) => {
    const icons: Record<Alerta['tipo'], string> = {
        CAMBIO_URGENTE: 'warning',
        VIDA_PREVENTIVA: 'favorite',
        INTENTO_USO_BLOQUEADO: 'block',
        INCONSISTENCIA_INVENTARIO: 'inventory',
    }

    return icons[tipo]
}

const isDanger = (tipo: Alerta['tipo']) => {
    return (tipo === 'CAMBIO_URGENTE' || tipo === 'INTENTO_USO_BLOQUEADO')
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

const AlertContent = (props: {
    title: string
    typeLabel: string
    code: string
    instrument: string
    location: string
    date: string
    description: string
    icon: string
    danger?: boolean
    estado: Alerta['estado']
    revisando?: boolean
},
    {
        emit,
    }: {
        emit: (
            event:
                | 'revisar'
                | 'ver-instrumento'
        ) => void
    }) =>
    h('div', [
        h(
            'div',
            {
                class:
                    'flex flex-col lg:flex-row lg:items-start ' +
                    'lg:justify-between gap-space-sm',
            },
            [
                h(
                    'div',
                    {
                        class:
                            'flex items-start gap-3 min-w-0',
                    },
                    [
                        h(
                            'div',
                            {
                                class:
                                    'w-11 h-11 rounded-xl flex items-center ' +
                                    'justify-center shrink-0 ' +
                                    (props.danger
                                        ? 'bg-error-container text-on-error-container'
                                        : 'bg-surface-container-high text-secondary'),
                            },
                            [
                                h(
                                    'span',
                                    {
                                        class:
                                            'material-symbols-outlined text-[22px]',
                                    },
                                    props.icon
                                ),
                            ]
                        ),

                        h('div', { class: 'min-w-0' }, [
                            h(
                                'div',
                                {
                                    class:
                                        'flex flex-wrap items-center gap-2',
                                },
                                [
                                    h(
                                        'span',
                                        {
                                            class:
                                                'font-label-md text-label-md ' +
                                                'font-bold text-on-surface',
                                        },
                                        props.title
                                    ),

                                    h(
                                        'span',
                                        {
                                            class:
                                                'px-2 py-0.5 rounded-full ' +
                                                'bg-surface-container-high ' +
                                                'text-on-surface-variant ' +
                                                'font-label-sm text-label-sm font-bold',
                                        },
                                        props.typeLabel
                                    ),

                                    h(
                                        'span',
                                        {
                                            class:
                                                'px-2 py-0.5 rounded-full ' +
                                                'font-label-sm text-label-sm font-bold' +
                                                (
                                                    props.estado === 'PENDIENTE'
                                                        ? 'bg-primary-container text-on-primary '
                                                        : 'bg-surface-container-high text-on-surface-variant'
                                                ),
                                        },
                                        props.estado
                                    ),
                                ]
                            ),

                            h(
                                'p',
                                {
                                    class:
                                        'font-body-sm text-body-sm ' +
                                        'text-on-surface-variant mt-1',
                                },
                                props.description
                            ),

                            h(
                                'div',
                                {
                                    class:
                                        'flex flex-wrap items-center ' +
                                        'gap-x-space-md gap-y-1 mt-2',
                                },
                                [
                                    h(
                                        'span',
                                        {
                                            class:
                                                'font-code-md text-code-md ' +
                                                'text-on-surface font-bold',
                                        },
                                        props.code
                                    ),

                                    h(
                                        'span',
                                        {
                                            class:
                                                'font-body-sm text-body-sm ' +
                                                'text-on-surface-variant',
                                        },
                                        props.instrument
                                    ),

                                    h(
                                        'span',
                                        {
                                            class:
                                                'font-body-sm text-body-sm ' +
                                                'text-on-surface-variant',
                                        },
                                        props.location
                                    ),
                                ]
                            ),
                        ]),
                    ]
                ),

                h(
                    'span',
                    {
                        class:
                            'font-code-md text-code-md ' +
                            'text-on-surface-variant whitespace-nowrap',
                    },
                    props.date
                ),
            ]
        ),

        h(
            'div',
            {
                class:
                    'flex flex-col sm:flex-row sm:items-center ' +
                    'sm:justify-end gap-space-xs mt-space-sm ' +
                    'pt-space-sm border-t border-surface-container-high',
            },
            [
                h(
                    'button',
                    {
                        type: 'button',
                        class: secondaryButtonClass,

                        onClick: () => {
                            emit('ver-instrumento')
                        }
                    },
                    [
                        h(
                            'span',
                            {
                                class:
                                    'material-symbols-outlined text-[17px]',
                            },
                            'visibility'
                        ),
                        'Ver instrumento',
                    ]
                ),

                props.estado === 'PENDIENTE'
                    ? h(
                        'button',
                        {
                            type: 'button',

                            disabled:
                                props.revisando,

                            class:
                                primaryButtonClass +
                                (
                                    props.revisando
                                        ? ' opacity-60 cursor-not-allowed'
                                        : ''
                                ),

                            onClick: () => {
                                emit('revisar')
                            },
                        },
                        [
                            h(
                                'span',
                                {
                                    class:
                                        'material-symbols-outlined text-[17px] ' +
                                        (
                                            props.revisando
                                                ? 'animate-spin'
                                                : ''
                                        ),
                                },
                                props.revisando
                                    ? 'progress_activity'
                                    : 'done'
                            ),

                            props.revisando
                                ? 'Marcando...'
                                : 'Marcar revisada',
                        ]
                    )
                    : h(
                        'span',
                        {
                            class:
                                'h-9 px-3 rounded-lg ' +
                                'bg-surface-container-high ' +
                                'text-on-surface-variant ' +
                                'font-label-sm text-label-sm ' +
                                'font-semibold inline-flex ' +
                                'items-center gap-1.5',
                        },
                        [
                            h(
                                'span',
                                {
                                    class:
                                        'material-symbols-outlined text-[17px]',
                                },
                                'check_circle'
                            ),

                            'Revisada',
                        ]
                    )
            ]
        ),
    ])

const MetricCard = (props: {
    label: string
    value: string
    icon: string
    tone?: 'default' | 'error'
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
                                        'font-headline-lg text-headline-lg ' +
                                        'font-bold text-on-surface mt-1',
                                },
                                props.value
                            ),
                        ]
                    ),

                    h(
                        'span',
                        {
                            class:
                                'material-symbols-outlined text-[25px] ' +
                                (
                                    props.tone === 'error'
                                        ? 'text-error'
                                        : 'text-secondary'
                                ),
                        },
                        props.icon
                    ),
                ]
            ),
        ]
    )

const revisarAlerta = async (alerta: Alerta) => {
    if (alerta.estado === 'REVISADA' || revisandoId.value !== null) {
        return
    }

    revisandoId.value = alerta.id
    errorMessage.value = ''

    try {
        const actualizada = await alertasService.revisar(alerta.id)

        const index = alertas.value.findIndex(
            (item) => item.id === alerta.id
        )

        if (index !== -1) {
            alertas.value[index] = actualizada
        }
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)
        console.log('Error revisando alerta:', error)
    } finally {
        revisandoId.value = null
    }
}

const resolverInstrumentoPorCodigo = async () => {
    const codigo = search.value.trim()

    if (!codigo) {
        instrumentoIdBusqueda.value = undefined
        return
    }

    const instrumentos = await instrumentosService.getAll({
        search: codigo,
    })

    const codigoBuscado = codigo.toUpperCase()

    const instrumento = instrumentos.find(
        (item) => item.codigo.toUpperCase() === codigoBuscado
    )

    instrumentoIdBusqueda.value = instrumento?.id
}

const buscarPorCodigo = async () => {
    if (searching.value || loading.value) {
        return
    }

    const codigo = search.value.trim()

    if (!codigo) {
        instrumentoIdBusqueda.value = undefined

        await loadAlertas()
        return
    }

    searching.value = true
    errorMessage.value = ''

    try {
        await resolverInstrumentoPorCodigo()

        if (instrumentoIdBusqueda.value === undefined) {
            alertas.value = []

            errorMessage.value = `No se encontró el instrumento "${codigo}".`

            return
        }

        await loadAlertas()
    } catch (error) {
        instrumentoIdBusqueda.value = undefined

        alertas.value = []

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error buscando instrumento:', error)
    } finally {
        searching.value = false
    }
}

const loadAlertas = async () => {
    if (loading.value) return

    loading.value = true
    errorMessage.value = ''

    try {
        alertas.value = await alertasService.getAll({
            tipo: tipoFilter.value
                ? tipoFilter.value as TipoAlerta
                : undefined,

            estado: estadoFilter.value
                ? estadoFilter.value as EstadoAlerta
                : undefined,

            instrumentoId: instrumentoIdBusqueda.value,
        })
    } catch (error) {
        alertas.value = []

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando alertas:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadAlertas()
})

watch(
    [
        estadoFilter,
        tipoFilter,
    ],
    () => {
        loadAlertas()
    }
)

watch(
    search,
    (nuevoValor, valorAnterior) => {
        if (
            valorAnterior &&
            !nuevoValor.trim()
        ) {
            instrumentoIdBusqueda.value =
                undefined

            loadAlertas()
        }
    }
)
</script>