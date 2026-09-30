<template>
    <div class="flex flex-col w-full gap-space-lg">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
            <div>
                <div class="flex items-center gap-2">
                    <span class="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Dashboard</h1>
                    <span
                        class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-md text-code-md font-medium">CONTROL
                        OPERATIVO</span>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">Resumen general del inventario y
                    utilización de instrumental quirúrgico reutilizable.</p>
            </div>
            <div class="flex flex-wrap items-center gap-space-sm">
                <!-- <button
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg shadow-sm transition-all cursor-pointer active:scale-95"
                    type="button">
                    <span class="material-symbols-outlined text-[20px]"
                        :style="{ fontVariationSettings: `'FILL' 1` }">qr_code_scanner</span>
                    <span>Escanear QR Rápido</span>
                </button> -->
                <button @click="irANuevoInstrumento"
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-inverse-surface text-on-primary font-label-lg text-label-lg shadow-sm transition-all cursor-pointer active:scale-95"
                    type="button">
                    <span class="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>Registrar broca</span>
                </button>
                <button @click="irAReportes"
                    class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all cursor-pointer shadow-sm active:scale-95"
                    type="button">
                    <span class="material-symbols-outlined text-[18px]">file_download</span>
                    <span>Exportar Informe</span>
                </button>
            </div>
        </div>
        <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-1.5 rounded-xl bg-surface-container-lowest shadow-sm">
            <div class="flex items-center gap-1 overflow-x-auto">
                <button class="px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors" :class="periodoSeleccionado === '7' ? 'bg-primary-container text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'"
                    @click="seleccionarPeriodo('7')">Últimos
                    7 días></button>
                <button class="px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors" :class="periodoSeleccionado === '30'
                    ? 'bg-primary-container text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                    " @click="seleccionarPeriodo('30')">Últimos
                    30 días</button>
                <div class="flex items-center gap-2 px-2">
                    <input v-model="fechaDesde" type="date"
                        class="px-2 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none">
                    <span class="text-on-surface-variant">
                        a
                    </span>
                    <input v-model="fechaHasta" type="date"
                        class="px-2 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none">
                    <button type="button"
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors"
                        :disabled="loadingPeriodo" @click="aplicarPeriodoPersonalizado">
                        <span class="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Periodo personalizado</span>
                    </button>
                </div>
            </div>

            <div v-if="errorMessage" class="mt-2 px-3 py-2 rounded-lg bg-error-container/40 text-on-error-container flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-error">
                    error
                </span>

                <span class="font-body-sm text-body-sm">
                    {{ errorMessage }}
                </span>
            </div>
            <!-- <div class="flex items-center gap-2 text-on-surface-variant px-3 py-1 text-right">
                <span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">autorenew</span>
                <span class="font-code-md text-code-md">Sincronizado: hace 42 seg</span>
            </div> -->
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-space-md">
            <div
                class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:bg-surface-container-low/40 cursor-pointer transition-all active:scale-[0.99]">
                <div class="flex items-start justify-between">
                    <div>
                        <span
                            class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block font-semibold">Brocas
                            activas</span>
                        <div class="flex items-baseline gap-2 mt-1">
                            <span class="font-display-lg text-display-lg text-on-surface font-bold">{{
                                resumen?.instrumentos.activos ?? 0 }}</span>
                            <span class="font-body-sm text-body-sm text-on-surface-variant">Instrumentos</span>
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                        <span class="material-symbols-outlined text-[22px]">medical_services</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 flex items-center justify-between text-on-surface-variant">
                    <span
                        class="font-label-sm text-label-sm flex items-center gap-1 text-on-tertiary-container font-semibold">
                        <span class="material-symbols-outlined text-[16px]">trending_up</span>
                    </span>
                    <!-- <svg class="w-16 h-6 text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 64 24">
                        <path d="M1 18 L16 12 L30 15 L45 8 L63 2" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2.5"></path>
                    </svg> -->
                </div>
            </div>
            <div
                class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:bg-surface-container-low/40 cursor-pointer transition-all active:scale-[0.99]">
                <div class="flex items-start justify-between">
                    <div>
                        <div
                            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold tracking-wide mb-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>VIDAS RESTANTES · 3
                            VIDAS
                        </div>
                        <div class="flex items-baseline gap-2 mt-1">
                            <span class="font-display-lg text-display-lg text-on-surface font-bold">{{
                                resumen?.instrumentos.porVidas.tres ?? 0 }}</span>
                            <span class="font-body-sm text-body-sm text-on-surface-variant">brocas</span>
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-xl bg-tertiary-fixed/20 flex items-center justify-center text-on-tertiary-container group-hover:bg-tertiary-fixed-dim transition-colors">
                        <span class="material-symbols-outlined text-[22px]"
                            :style="{ fontVariationSettings: `'FILL' 1` }">check_circle</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 flex items-center justify-between">
                    <div class="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                        <div class="bg-on-tertiary-container h-full rounded-full"
                            :style="{ width: `${porcentajeTresVidas}%` }"></div>
                    </div>
                    <span class="font-code-md text-code-md text-on-surface-variant font-bold ml-2">{{
                        porcentajeTresVidas }}%</span>
                </div>
            </div>
            <div
                class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:bg-surface-container-low/40 cursor-pointer transition-all active:scale-[0.99]">
                <div class="flex items-start justify-between">
                    <div>
                        <div
                            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold tracking-wide mb-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> VIDAS RESTANTES · 2 VIDAS
                        </div>
                        <div class="flex items-baseline gap-2 mt-1">
                            <span class="font-display-lg text-display-lg text-on-surface font-bold">{{
                                resumen?.instrumentos.porVidas.dos ?? 0 }}</span>
                            <span class="font-body-sm text-body-sm text-on-surface-variant">brocas</span>
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface group-hover:bg-secondary-fixed transition-colors">
                        <span class="material-symbols-outlined text-[22px]">report_problem</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 flex items-center justify-between">
                    <div class="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                        <div class="bg-outline h-full rounded-full" :style="{ width: `${porcentajeDosVidas}%` }"></div>
                    </div>
                    <span class="font-code-md text-code-md text-on-surface-variant font-bold ml-2">{{ porcentajeDosVidas
                        }}%</span>
                </div>
            </div>
            <div
                class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:bg-surface-container-low/40 cursor-pointer transition-all active:scale-[0.99]">
                <div class="flex items-start justify-between">
                    <div>
                        <div
                            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold tracking-wide mb-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> VIDAS RESTANTES · 1 VIDAS
                        </div>
                        <div class="flex items-baseline gap-2 mt-1">
                            <span class="font-display-lg text-display-lg text-on-surface font-bold">{{
                                resumen?.instrumentos.porVidas.una ?? 0 }}</span>
                            <span class="font-body-sm text-body-sm text-on-surface-variant">brocas</span>
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface group-hover:bg-secondary-fixed transition-colors">
                        <span class="material-symbols-outlined text-[22px]">report_problem</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 flex items-center justify-between">
                    <div class="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                        <div class="bg-outline h-full rounded-full" :style="{ width: `${porcentajeUnaVida}%` }"></div>
                    </div>
                    <span class="font-code-md text-code-md text-on-surface-variant font-bold ml-2">{{ porcentajeUnaVida
                        }}%</span>
                </div>
            </div>
            <div
                class="p-space-md rounded-xl bg-primary-container text-on-primary shadow-md flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all active:scale-[0.99]">
                <div class="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-error/20 pointer-events-none blur-xl">
                </div>
                <div class="flex items-start justify-between">
                    <div>
                        <div
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold tracking-wider uppercase animate-pulse">
                            <span class="material-symbols-outlined text-[13px]">block</span>CAMBIO URGENTE
                        </div>
                        <div class="flex items-baseline gap-2 mt-2">
                            <span class="font-display-lg text-display-lg text-on-primary font-bold">{{
                                resumen?.instrumentos.cambioUrgente ?? 0 }}</span>
                            <span class="font-body-sm text-body-sm text-inverse-primary">0 vidas</span>
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-xl bg-error/30 flex items-center justify-center text-on-error group-hover:bg-error transition-colors">
                        <span class="material-symbols-outlined text-[22px]">dangerous</span>
                    </div>
                </div>
                <div class="mt-4 pt-3 flex items-center justify-between text-inverse-primary">
                    <span class="font-label-sm text-label-sm">Límite de usos alcanzado</span>
                    <span class="font-code-md text-code-md font-bold text-error-container">{{ porcentajeCambioUrgente
                        }}% total</span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div class="lg:col-span-7 flex flex-col gap-space-lg">
                <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-6">
                        <div>
                            <span
                                class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Trazabilidad
                                Diaria</span>
                            <h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Usos registrados
                                por día</h2>
                            <p class="font-body-sm text-body-sm text-on-surface-variant">Actividad registrada durante el
                                periodo seleccionado</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1.5">
                                <span class="w-3 h-3 rounded-full bg-secondary"></span>
                                <span class="font-label-sm text-label-sm text-on-surface-variant">Total del período</span>
                            </div>
                        </div>
                    </div>

                    <div v-if="loadingPeriodo"
                        class="h-52 flex flex-col items-center justify-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-[30px] animate-spin text-secondary">
                            progress_activity
                        </span>

                        <span class="mt-2 font-body-sm text-body-sm">
                            Cargando usos...
                        </span>
                    </div>

                    <div v-else-if="errorUsos"
                        class="h-52 rounded-xl bg-error-container/30 flex flex-col items-center justify-center text-center p-4">
                        <span class="material-symbols-outlined text-[30px] text-error">
                            error
                        </span>

                        <p class="mt-2 font-label-md text-label-md font-semibold text-on-surface">
                            No fue posible cargar los usos
                        </p>

                        <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                            {{ errorUsos }}
                        </p>

                        <button type="button"
                            class="mt-3 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md"
                            @click="recargarPeriodoActual">
                            Reintentar
                        </button>
                    </div>

                    <div v-else-if="
                        (usos?.serie.length ?? 0) === 0 ||
                        (usos?.totalUsos ?? 0) === 0
                    " class="h-52 flex flex-col items-center justify-center text-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-[30px]">
                            query_stats
                        </span>

                        <p class="mt-2 font-label-md text-label-md font-semibold">
                            Sin usos registrados
                        </p>

                        <p class="mt-1 font-body-sm text-body-sm">
                            No existen usos durante el periodo
                            seleccionado.
                        </p>
                    </div>
                    <div v-else class="w-full">
                        <div
                            class="h-52 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6 pb-2 bg-surface-container-low/40 rounded-xl relative overflow-x-auto">
                            <div v-for="item in usos?.serie ?? []" :key="item.fecha"
                                class="flex-1 flex flex-col items-center gap-2 h-full justify-end group min-w-[24px]">
                                <span
                                    class="font-code-md text-[11px] text-on-surface font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {{ item.total }}
                                </span>

                                <div class="w-full max-w-[28px] bg-secondary/80 group-hover:bg-secondary rounded-t-lg transition-all"
                                    :style="{
                                        height: alturaBarra(item.total)
                                    }" :title="`${item.fecha}: ${item.total} usos`"></div>
                                <span
                                    class="font-label-sm text-label-sm text-on-surface-variant font-medium whitespace-nowrap">
                                    {{
                                        periodoSeleccionado === '30' ? formatoFechaCorta(item.fecha) :
                                            formatoDia(item.fecha)
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-space-sm text-center">
                        <div class="p-2.5 rounded-lg bg-surface-container-low">
                            <span class="font-label-sm text-label-sm text-on-surface-variant block">Total Semana</span>
                            <span class="font-headline-sm text-headline-sm text-on-surface font-bold">{{ usos?.totalUsos
                                ?? 0 }} usos</span>
                        </div>
                        <div class="p-2.5 rounded-lg bg-surface-container-low">
                            <span class="font-label-sm text-label-sm text-on-surface-variant block">Promedio
                                Diario</span>
                            <span class="font-headline-sm text-headline-sm text-on-surface font-bold">{{
                                promedioDiario.toFixed(1) }} usos</span>
                        </div>
                        <div class="p-2.5 rounded-lg bg-surface-container-low">
                            <span class="font-label-sm text-label-sm text-on-surface-variant block">Día Más
                                Crítico</span>
                            <span class="font-headline-sm text-headline-sm text-secondary font-bold">
                                <template v-if="diaMasCritico">
                                    {{ formatoFechaCorta(diaMasCritico.fecha) }}
                                    · {{ diaMasCritico.total }} usos
                                </template>
                                <template>
                                    Sin registros
                                </template>
                            </span>
                        </div>
                        <div class="p-2.5 rounded-lg bg-surface-container-low">
                            <span class="font-label-sm text-label-sm text-on-surface-variant block">Alertas de usos
                                bloqueados</span>
                            <span class="font-headline-sm text-headline-sm text-on-tertiary-container font-bold">{{
                                resumen?.alertas.porTipo.INTENTO_USO_BLOQUEADO ?? 0 }}</span>
                        </div>
                    </div>
                </div>
                <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
                    <div v-if="loadingPeriodo" class="py-10 flex flex-col items-center justify-center text-center">
                        <span class="material-symbols-outlined text-[32px] text-secondary animate-spin">
                            progress_activity
                        </span>

                        <p class="mt-3 font-label-md text-label-md text-on-surface">
                            Cargando distribución...
                        </p>

                        <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                            Consultando los usos registrados
                            durante el periodo seleccionado.
                        </p>
                    </div>

                    <div v-else-if="errorDistribucion" class="py-8 px-4 rounded-xl bg-error-container/30">
                        <div class="flex flex-col items-center text-center">
                            <div class="w-11 h-11 rounded-full bg-error-container flex items-center justify-center">
                                <span class="material-symbols-outlined text-error text-[24px]">
                                    error
                                </span>
                            </div>

                            <p class="mt-3 font-label-lg text-label-lg text-on-surface font-semibold">
                                No fue posible cargar la distribución
                            </p>

                            <p class="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                                {{ errorDistribucion }}
                            </p>

                            <button type="button"
                                class="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-inverse-surface transition-colors"
                                @click="recargarPeriodoActual">
                                <span class="material-symbols-outlined text-[18px]">
                                    refresh
                                </span>

                                Reintentar
                            </button>
                        </div>
                    </div>

                    <div v-else-if="
                        (distribucion?.servicios.length ?? 0) === 0
                    " class="py-10 flex flex-col items-center justify-center text-center">
                        <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                            <span class="material-symbols-outlined text-[26px] text-on-surface-variant">
                                bar_chart
                            </span>
                        </div>

                        <p class="mt-3 font-label-lg text-label-lg text-on-surface font-semibold">
                            Sin datos para mostrar
                        </p>

                        <p class="mt-1 max-w-sm font-body-sm text-body-sm text-on-surface-variant">
                            No existen usos asociados a servicios
                            durante el periodo seleccionado.
                        </p>
                    </div>

                    <div v-else class="space-y-4">
                        <div v-for="servicio in distribucion?.servicios ?? []" :key="servicio.id">
                            <div class="flex items-center justify-between text-sm mb-1.5 gap-3">
                                <span
                                    class="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-secondary"></span>

                                    {{ servicio.nombre }}
                                </span>

                                <span class="font-code-md text-code-md text-on-surface font-bold whitespace-nowrap">
                                    {{ servicio.total }} usos

                                    <span class="text-on-surface-variant font-normal">
                                        ({{
                                            porcentajeServicio(
                                                servicio.total
                                            )
                                        }}%)
                                    </span>
                                </span>
                            </div>

                            <div class="w-full h-2.5 rounded-full bg-surface-container-low overflow-hidden">
                                <div class="h-full bg-secondary rounded-full transition-all" :style="{
                                    width:
                                        `${porcentajeServicio(
                                            servicio.total
                                        )}%`
                                }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-5 flex flex-col gap-space-md">
                <div class="flex items-center justify-between px-1">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[20px] text-error">notification_important</span>
                        <h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Atención Requerida y
                            Alertas Clínicas</h2>
                    </div>
                    <span
                        class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-code-md text-[11px] font-bold">
                        {{ resumen?.alertas.pendientes ?? 0 }} ACTIVAS</span>
                </div>
                <div
                    class="p-space-md rounded-xl bg-primary-container text-on-primary shadow-md relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
                    <div class="flex items-start justify-between gap-space-sm pl-2">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span
                                    class="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold uppercase tracking-wider">CRÍTICO</span>
                                <span class="font-code-md text-code-md text-inverse-primary">0 vidas
                                    restantes</span>
                            </div>
                            <h4 class="font-headline-sm text-headline-sm font-bold text-on-primary">{{
                                resumen?.instrumentos.cambioUrgente ?? 0 }} Brocas en CAMBIO
                                URGENTE</h4>
                            <p class="font-body-sm text-body-sm text-inverse-primary mt-1">Alcanzaron el máximo
                                permitido de usos y
                                requieren revisión para tramitar su baja.</p>
                            <div class="mt-4 flex items-center justify-between">
                                <button @click="irAInstrumentos"
                                    class="px-3.5 py-1.5 rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-md text-label-md font-bold transition-colors shadow-sm flex items-center gap-1.5"
                                    type="button">
                                    <span class="material-symbols-outlined text-[16px]">delete_forever</span>
                                    <span class="">Ver y Tramitar Baja</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
                    <div class="pl-2">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wider">VIDA
                                PREVENTIVA</span>
                            <span class="font-code-md text-code-md text-on-surface-variant">Seguimiento preventivo</span>
                        </div>
                        <h4 class="font-headline-sm text-headline-sm font-semibold text-on-surface">{{
                            resumen?.alertas.porTipo.VIDA_PREVENTIVA ?? 0 }} alertas de vida preventiva</h4>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Instrumentos próximos a
                            alcanzar su límite máximo de usos.</p>
                        <div class="mt-3 flex items-center gap-2">
                            <button @click="irAInstrumentos"
                                class="px-5 py-3 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                                type="button">
                                Ver Instrumentos
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="p-space-md rounded-xl bg-error-container/40 text-on-error-container shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
                    <div class="pl-2">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold uppercase tracking-wider">INCIDENCIA
                                DE SEGURIDAD</span>
                        </div>
                        <h4 class="font-headline-sm text-headline-sm font-bold text-on-surface">{{
                            resumen?.alertas.porTipo.INTENTO_USO_BLOQUEADO ?? 0 }} intentos de uso
                            bloqueados pendientes</h4>
                        <p class="font-body-sm text-body-sm text-on-surface mt-1"> Intentos bloqueados automáticamente
                            por las reglas de seguridad del sistema.</p>
                        <div class="mt-3 flex items-center justify-between">
                            <span
                                class="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                <span class="material-symbols-outlined text-[16px] text-error">verified_user</span>
                                Bloqueo automático aplicado
                            </span>
                            <button @click="irAMovimientos"
                                class="font-label-sm text-label-sm text-error underline font-bold hover:text-on-error-container">Ver
                                movimientos</button>
                        </div>
                    </div>
                </div>
                <div class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-outline"></div>
                    <div class="pl-2">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">INCONSISTENCIA
                                DE INVENTARIO</span>
                        </div>
                        <h4 class="font-headline-sm text-headline-sm font-semibold text-on-surface">{{
                            resumen?.alertas.porTipo.INCONSISTENCIA_INVENTARIO ?? 0 }} inconsistencias
                            pendientes</h4>
                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Alertas relacionadas con
                            inconsistencias detectadas en el inventario.
                        </p>
                        <div class="mt-3 flex items-center justify-between">
                            <button @click="irAInstrumentos"
                                class="px-3 py-1 rounded bg-secondary/10 hover:bg-secondary/20 text-secondary font-label-sm text-label-sm font-semibold transition-colors"
                                type="button">
                                Ver instrumentos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useRouter } from 'vue-router'

import { dashboardService } from '@/services/dashboard.service';
import { getApiErrorMessage } from '@/utils/apiError';

import type { DashboardDistribucionUsos, DashboardResumen, DashboardUsos, DashboardUsosParams } from '@/types/dashboard';

type PeriodoSeleccionado =
    | '7'
    | '30'
    | 'personalizado'

const router = useRouter()

const resumen = ref<DashboardResumen | null>(null)

const usos = ref<DashboardUsos | null>(null)

const distribucion = ref<DashboardDistribucionUsos | null>(null)

const loading = ref(true)
const loadingPeriodo = ref(false)

const errorMessage = ref('')
const errorResumen = ref('')
const errorUsos = ref('')
const errorDistribucion = ref('')

const periodoSeleccionado = ref<PeriodoSeleccionado>('7')

const fechaDesde = ref('')
const fechaHasta = ref('')

const porcentaje = (cantidad: number, total: number): number => {
    if (total <= 0) {
        return 0
    }

    return Math.round((cantidad / total) * 100)
}

const porcentajeTresVidas = computed(() =>
    porcentaje(resumen.value?.instrumentos.porVidas.tres ?? 0, resumen.value?.instrumentos.activos ?? 0)
)

const porcentajeDosVidas = computed(() =>
    porcentaje(resumen.value?.instrumentos.porVidas.dos ?? 0, resumen.value?.instrumentos.activos ?? 0)
)

const porcentajeUnaVida = computed(() =>
    porcentaje(resumen.value?.instrumentos.porVidas.una ?? 0, resumen.value?.instrumentos.activos ?? 0)
)

const porcentajeCambioUrgente = computed(() =>
    porcentaje(resumen.value?.instrumentos.cambioUrgente ?? 0, resumen.value?.instrumentos.activos ?? 0)
)

const maxUsosGrafica = computed(() => {
    const valores = usos.value?.serie.map((item) => item.total) ?? []

    return Math.max(
        ...valores,
        1
    )
})

const promedioDiario = computed(() => {
    if (!usos.value) {
        return 0
    }

    if (usos.value.rango.dias <= 0) {
        return 0
    }

    return (
        usos.value.totalUsos /
        usos.value.rango.dias
    )
})

const diaMasCritico = computed(() => {
    if (!usos.value || usos.value.serie.length === 0) {
        return null
    }

    return usos.value.serie.reduce(
        (mayor, actual) =>
            actual.total > mayor.total
                ? actual
                : mayor
    )
})

const formatoDia = (fecha: string): string => {
    const date = new Date(`${fecha}T00:00:00`)

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            weekday: 'short',
        }
    )
        .format(date)
        .replace('.', '')
}

const formatoFechaCorta = (fecha: string): string => {
    const date = new Date(`${fecha}T00:00:00`)

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            day: '2-digit',
            month: 'short',
        }
    ).format(date)
}

const alturaBarra = (total: number): string => {
    if (total <= 0) {
        return '0%'
    }

    return `${Math.max((total / maxUsosGrafica.value) * 100, 5)
        }%`
}

const porcentajeServicio = (total: number): number => {
    const totalUsos =
        distribucion.value?.totalUsos ?? 0

    if (totalUsos <= 0) {
        return 0
    }

    return Number(((total / totalUsos) * 100).toFixed(1))
}

const recargarPeriodoActual = async () => {
    if (periodoSeleccionado.value === '7' || periodoSeleccionado.value === '30') {
        await cargarPeriodo({
            periodo: periodoSeleccionado.value,
        })

        return
    }

    if (
        periodoSeleccionado.value === 'personalizado' && fechaDesde.value && fechaHasta.value) {
        await cargarPeriodo({
            desde: fechaDesde.value,
            hasta: fechaHasta.value,
        })
    }
}

const cargarPeriodo = async (
    params: DashboardUsosParams) => {
    loadingPeriodo.value = true

    errorUsos.value = ''
    errorDistribucion.value = ''

    try {
        const [
            usosResult,
            distribucionResult,
        ] = await Promise.allSettled([
            dashboardService.getUsos(params),
            dashboardService.getDistribucionUsos(params),
        ])

        if (usosResult.status === 'fulfilled') {
            usos.value = usosResult.value
        } else {
            usos.value = null

            errorUsos.value = getApiErrorMessage(usosResult.reason)
        }

        if (
            distribucionResult.status === 'fulfilled') {
            distribucion.value = distribucionResult.value
        } else {
            distribucion.value = null

            errorDistribucion.value = getApiErrorMessage(distribucionResult.reason)
        }
    } finally {
        loadingPeriodo.value = false
    }
}

const seleccionarPeriodo = async (
    periodo: '7' | '30'
) => {

    errorMessage.value = ''

    periodoSeleccionado.value =
        periodo

    await cargarPeriodo({
        periodo,
    })
}

const aplicarPeriodoPersonalizado = async () => {
    errorMessage.value = ''

    if (!fechaDesde.value || !fechaHasta.value) {
        errorMessage.value = 'Selecciona la fecha inicial y final.'
        return
    }

    if (fechaDesde.value > fechaHasta.value) {
        errorMessage.value = 'La fecha inicial no puede ser mayor a la fecha final.'
        return
    }

    periodoSeleccionado.value = 'personalizado'

    await cargarPeriodo({
        desde: fechaDesde.value,
        hasta: fechaHasta.value
    })
}

const cargarDashboard = async () => {
    loading.value = true
    loadingPeriodo.value = true

    errorResumen.value = ''
    errorUsos.value = ''
    errorDistribucion.value = ''

    try {
        const [
            resumenResult,
            usosResult,
            distribucionResult,
        ] = await Promise.allSettled([
            dashboardService.getResumen(),

            dashboardService.getUsos({
                periodo: '7',
            }),

            dashboardService.getDistribucionUsos({
                periodo: '7',
            }),
        ])

        if (resumenResult.status === 'fulfilled') {
            resumen.value = resumenResult.value
        } else {
            resumen.value = null

            errorResumen.value = getApiErrorMessage(resumenResult.reason)
        }

        if (usosResult.status === 'fulfilled') {
            usos.value = usosResult.value
        } else {
            usos.value = null

            errorUsos.value = getApiErrorMessage(usosResult.reason)
        }

        if (distribucionResult.status === 'fulfilled') {
            distribucion.value = distribucionResult.value
        } else {
            distribucion.value = null

            errorDistribucion.value = getApiErrorMessage(distribucionResult.reason)
        }
    } finally {
        loading.value = false
        loadingPeriodo.value = false
    }
}

const irANuevoInstrumento = () => {
    router.push({
        name: 'instrumento-create'
    })
}

const irAReportes = () => {
    router.push({
        name: 'reportes'
    })
}

const irAInstrumentos = () => {
    router.push({
        name: 'instrumentos'
    })
}

const irAMovimientos = () => {
    router.push({
        name: 'movimientos'
    })
}

const irAAlertas = () => {
    router.push({
        name: 'alertas'
    })
}

onMounted(() => {
    cargarDashboard()
})

</script>

<style scoped></style>