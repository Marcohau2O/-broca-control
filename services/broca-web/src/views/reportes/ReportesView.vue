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
                        Análisis operativo
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Reportes
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Consulta información operativa de los instrumentos,
                    usos y movimientos dentro del periodo seleccionado.
                </p>
            </div>

            <button type="button" :disabled="exporting || loading" class="h-10 px-4 rounded-lg bg-secondary
                       text-on-secondary font-label-md text-label-md
                       font-bold flex items-center justify-center gap-2
                       hover:bg-primary hover:text-on-primary
                       transition-colors shadow-sm shrink-0" @click="exportCsv">
                <span v-if="exporting"
                    class="w-4 h-4 rounded-full border-2 border-current border-t-transparentanimate-spin"></span>

                <span class="material-symbols-outlined text-[18px]">
                    download
                </span>

                {{ exporting ? 'Exportando...' : 'Exportar CSV' }}
            </button>
        </div>

        <section class="mt-space-lg bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-[20px] text-secondary mt-0.5">
                        analytics
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Tipo de reporte
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            Selecciona la información que deseas consultar.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm">
                <button type="button" class="text-left rounded-xl border-2 p-space-sm
                           transition-colors" :class="reportType === 'instrumentos'
                            ? activeReportClass
                            : inactiveReportClass
                            " @click="reportType = 'instrumentos'">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            precision_manufacturing
                        </span>
                    </div>

                    <span class="font-label-md text-label-md
                               font-bold text-on-surface
                               block mt-space-sm">
                        Instrumentos
                    </span>

                    <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-1">
                        Estado, vidas restantes, ubicación y clasificación.
                    </span>
                </button>

                <button type="button" class="text-left rounded-xl border-2 p-space-sm
                           transition-colors" :class="reportType === 'usos'
                            ? activeReportClass
                            : inactiveReportClass
                            " @click="reportType = 'usos'">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            add_task
                        </span>
                    </div>

                    <span class="font-label-md text-label-md
                               font-bold text-on-surface
                               block mt-space-sm">
                        Usos
                    </span>

                    <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-1">
                        Usos registrados por instrumento durante el periodo.
                    </span>
                </button>

                <button type="button" class="text-left rounded-xl border-2 p-space-sm
                           transition-colors" :class="reportType === 'movimientos'
                            ? activeReportClass
                            : inactiveReportClass
                            " @click="reportType = 'movimientos'">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            history
                        </span>
                    </div>

                    <span class="font-label-md text-label-md
                               font-bold text-on-surface
                               block mt-space-sm">
                        Movimientos
                    </span>

                    <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-1">
                        Historial operativo y trazabilidad de movimientos.
                    </span>
                </button>

                <button type="button" class="text-left rounded-xl border-2 p-space-sm
                           transition-colors" :class="reportType === 'bajas'
                            ? activeReportClass
                            : inactiveReportClass
                            " @click="reportType = 'bajas'">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            delete_forever
                        </span>
                    </div>

                    <span class="font-label-md text-label-md
                               font-bold text-on-surface
                               block mt-space-sm">
                        Bajas
                    </span>

                    <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-1">
                        Instrumentos dados de baja
                    </span>
                </button>

                <!-- <button type="button" class="group text-left rounded-xl bg-surface-container-lowest
                        shadow-sm p-space-md transition-all hover:shadow-md" :class="reportType === 'bajas'
                            ? 'ring-2 ring-secondary'
                            : ''" @click="reportType = 'bajas'">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                                Bajas
                            </span>

                            <div class="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                                {{
                                    reporteBajas?.resumen.totalBajas ?? 0
                                }}
                            </div>

                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                Instrumentos dados de baja
                            </p>
                        </div>

                        <span class="material-symbols-outlined text-[28px] text-error">
                            delete_forever
                        </span>
                    </div>
                </button> -->
            </div>
        </section>

        <section class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-md">
            <div class="flex flex-col lg:flex-row lg:items-end
                       gap-space-sm">
                <div class="flex-1">
                    <label for="fechaDesde" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Desde
                    </label>

                    <input id="fechaDesde" v-model="filters.desde" type="date" :class="inputClass" />
                </div>

                <div class="flex-1">
                    <label for="fechaHasta" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Hasta
                    </label>

                    <input id="fechaHasta" v-model="filters.hasta" type="date" :class="inputClass" />
                </div>

                <div class="flex-1" v-if="reportType === 'movimientos'">
                    <label for="ubicacionReporte" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Tipo de movimiento
                    </label>

                    <div class="relative">
                        <select id="ubicacionReporte" v-model="filters.tipoMovimiento" :class="selectClass">
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

                        <span class="material-symbols-outlined
                                   absolute right-3 top-3
                                   text-[18px] text-outline
                                   pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>

                <button type="button" :disabled="loading" class="h-11 px-5 rounded-lg bg-primary-container text-on-primary
                font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed" @click="applyFilters">
                    <span v-if="loading"
                        class="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin">
                    </span>

                    <span v-else class="material-symbols-outlined text-[18px]">
                        filter_alt
                    </span>

                    {{ loading ? 'Cargando...' : 'Aplicar' }}
                </button>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center
                       sm:justify-between gap-space-xs
                       mt-space-sm pt-space-sm
                       border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm
                           text-on-surface-variant">
                    Periodo actual:
                    <strong class="text-on-surface">
                        <template v-if="reportType === 'usos' && reporteUsos">
                            {{ formatDate(reporteUsos.rango.desde) }}
                            –
                            {{ formatDate(reporteUsos.rango.hasta) }}
                        </template>
                        <template v-else-if="reportType === 'movimientos' && reporteMovimientos">
                            {{ formatDate(reporteMovimientos.rango.desde) }}
                            –
                            {{ formatDate(reporteMovimientos.rango.hasta) }}
                        </template>
                        <template v-else-if="reportType === 'bajas' && reporteBajas">
                            {{ formatDate(reporteBajas.rango.desde) }}
                            –
                            {{ formatDate(reporteBajas.rango.hasta) }}
                        </template>
                        <template v-else>
                            No Aplica
                        </template>
                    </strong>
                </span>

                <button type="button" class="font-label-sm text-label-sm
                           text-secondary font-bold hover:underline
                           self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </section>

        <div class="grid grid-cols-3 lg:grid-cols-4
                   gap-space-sm mt-space-md">
            <div class="col-span-2 sm:col-span-1
                       bg-primary-container rounded-xl p-space-md">
                <span class="font-label-sm text-label-sm uppercase
                           tracking-wider text-primary-fixed-dim
                           font-semibold">
                    Instrumentos
                </span>

                <div class="font-headline-lg text-headline-lg
                           font-bold text-on-primary mt-1">
                    {{ reporteInstrumentos?.resumen.totalInstrumentos ?? 0 }}
                </div>

                <span class="font-body-sm text-body-sm
                           text-primary-fixed-dim">
                    registrados
                </span>
            </div>

            <ReportMetric label="Usos del periodo" :value="String(
                reporteUsos?.resumen.totalUsos ?? 0
            )" detail="Máximo de usos" icon="warning" danger />

            <ReportMetric label="Cambios urgentes" :value="String(
                reporteInstrumentos?.resumen.cambioUrgente ?? 0
            )" detail="Registros de uso" icon="add_task" />

            <ReportMetric label="Movimientos" :value="String(
                reporteMovimientos?.resumen.totalMovimientos ?? 0
            )" detail="Durante el periodo" icon="history" />

            <ReportMetric label="Movimientos" :value="String(
                reporteBajas?.resumen.totalBajas ?? 0
            )" detail="Reporte de bajas" icon="delete_forever" />
        </div>

        <div v-if="loading" class="mt-space-md
           bg-surface-container-lowest
           rounded-xl shadow-sm
           px-space-md py-space-lg">
            <div class="flex flex-col items-center
               justify-center gap-3
               min-h-[180px]">
                <span class="w-9 h-9 rounded-full
                   border-[3px]
                   border-surface-container-highest
                   border-t-secondary
                   animate-spin"></span>

                <div class="text-center">
                    <p class="font-label-md text-label-md
                       font-bold text-on-surface">
                        Cargando información
                    </p>

                    <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-1">
                        Consultando los datos del reporte...
                    </p>
                </div>
            </div>
        </div>
        <section v-if="reportType === 'instrumentos' && !loading" class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high
                       flex flex-col sm:flex-row sm:items-center
                       sm:justify-between gap-space-sm">
                <div>
                    <h2 class="font-headline-sm text-headline-sm
                               font-bold text-on-surface">
                        {{ currentReportTitle }}
                    </h2>

                    <p class="font-body-sm text-body-sm
                               text-on-surface-variant mt-0.5">
                        {{ currentReportDescription }}
                    </p>
                </div>

                <span class="inline-flex items-center gap-1.5
                           px-2.5 py-1 rounded-full
                           bg-surface-container-high
                           text-on-surface-variant
                           font-label-sm text-label-sm font-bold
                           self-start sm:self-auto">
                    <span class="material-symbols-outlined text-[15px]">
                        database
                    </span>

                    {{ reportRows.length }} registros
                </span>
            </div>

            <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[900px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Instrumento
                            </th>

                            <th :class="thClass">
                                Tipo
                            </th>

                            <th :class="thClass">
                                Estado
                            </th>

                            <th :class="thClass">
                                Usos
                            </th>

                            <th :class="thClass">
                                Vidas
                            </th>

                            <th :class="thClass">
                                Ubicación
                            </th>

                            <th :class="thClass">
                                Último movimiento
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-surface-container-high">
                        <tr v-for="item in reportRows" :key="item.id" class="hover:bg-surface-container-low/60
                                   transition-colors">
                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                           font-bold text-secondary">
                                    {{ item.codigo }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                           text-on-surface-variant
                                           block mt-0.5">
                                    {{ item.nombre }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                           text-on-surface">
                                    {{ item.tipo }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="inline-flex px-2.5 py-1
                                           rounded-full font-label-sm
                                           text-label-sm font-bold" :class="estadoClass(item.estado)">
                                    {{ formatEstado(item.estado) }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                           text-on-surface font-bold">
                                    {{ item.usos }} / {{ item.usosMaximos }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                           font-bold" :class="item.vidas === 0
                                            ? 'text-error'
                                            : 'text-secondary'
                                            ">
                                    {{ item.vidas }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                           text-on-surface">
                                    {{ item.ubicacion }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                           text-on-surface-variant
                                           whitespace-nowrap">
                                    {{ item.ultimoMovimiento || '—' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="md:hidden divide-y
                       divide-surface-container-high">
                <article v-for="item in reportRows" :key="`mobile-${item.id}`" class="p-space-sm">
                    <div class="flex items-start justify-between
                               gap-space-sm">
                        <div class="min-w-0">
                            <span class="font-code-md text-code-md
                                       text-secondary font-bold">
                                {{ item.codigo }}
                            </span>

                            <span class="font-body-sm text-body-sm
                                       text-on-surface-variant
                                       block mt-0.5">
                                {{ item.nombre }}
                            </span>
                        </div>

                        <span class="px-2 py-1 rounded-full
                                   font-label-sm text-label-sm
                                   font-bold shrink-0" :class="estadoClass(item.estado)">
                            {{ formatEstado(item.estado) }}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-space-sm
                               mt-space-sm">
                        <ReportMobileField label="Tipo" :value="item.tipo" />

                        <ReportMobileField label="Ubicación" :value="item.ubicacion" />

                        <ReportMobileField label="Usos" :value="`${item.usos} / ${item.usosMaximos}`" />

                        <ReportMobileField label="Vidas" :value="String(item.vidas)" />
                    </div>

                    <div class="mt-space-sm pt-space-sm
                               border-t border-surface-container-high">
                        <span class="font-label-sm text-label-sm
                                   uppercase text-outline block">
                            Último movimiento
                        </span>

                        <span class="font-code-md text-code-md
                                   text-on-surface">
                            {{ item.ultimoMovimiento || '—' }}
                        </span>
                    </div>
                </article>
            </div>
        </section>

        <section v-if="reportType === 'usos' && !loading" class="mt-space-md bg-surface-container-lowest
           rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
               border-b border-surface-container-high
               flex flex-col sm:flex-row sm:items-center
               sm:justify-between gap-space-sm">
                <div>
                    <h2 class="font-headline-sm text-headline-sm
                       font-bold text-on-surface">
                        Reporte de usos
                    </h2>

                    <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-0.5">
                        Usos registrados durante el periodo seleccionado.
                    </p>
                </div>

                <span class="inline-flex items-center gap-1.5
                   px-2.5 py-1 rounded-full
                   bg-surface-container-high
                   text-on-surface-variant
                   font-label-sm text-label-sm font-bold
                   self-start sm:self-auto">
                    <span class="material-symbols-outlined text-[15px]">
                        database
                    </span>

                    {{ reporteUsos?.usos.length ?? 0 }} registros
                </span>
            </div>

            <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[1100px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Fecha
                            </th>

                            <th :class="thClass">
                                Instrumento
                            </th>

                            <th :class="thClass">
                                Uso
                            </th>

                            <th :class="thClass">
                                Vidas
                            </th>

                            <th :class="thClass">
                                Usuario
                            </th>

                            <th :class="thClass">
                                Servicio
                            </th>

                            <th :class="thClass">
                                Procedimiento
                            </th>

                            <th :class="thClass">
                                Ubicación
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y
                       divide-surface-container-high">
                        <tr v-for="uso in reporteUsos?.usos ?? []" :key="uso.id" class="hover:bg-surface-container-low/60
                           transition-colors">
                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   text-on-surface-variant
                                   whitespace-nowrap">
                                    {{ formatDateTime(uso.fechaHora) }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold text-secondary">
                                    {{ uso.instrumento.codigo }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant
                                   block mt-0.5">
                                    {{
                                        uso.instrumento.descripcion ||
                                        uso.instrumento.tipoInstrumento.nombre
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold text-on-surface">
                                    #{{ uso.numeroUso }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold" :class="uso.vidasRestantes === 0
                                    ? 'text-error'
                                    : 'text-secondary'
                                    ">
                                    {{ uso.vidasRestantes }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{ uso.usuario.nombre }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{ uso.servicio?.nombre || '—' }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{ uso.procedimiento?.nombre || '—' }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{ uso.ubicacion?.nombre || '—' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="md:hidden divide-y
               divide-surface-container-high">
                <article v-for="uso in reporteUsos?.usos ?? []" :key="`uso-${uso.id}`" class="p-space-sm">
                    <div class="flex items-start
                       justify-between gap-space-sm">
                        <div>
                            <span class="font-code-md text-code-md
                               text-secondary font-bold">
                                {{ uso.instrumento.codigo }}
                            </span>

                            <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-0.5">
                                {{
                                    uso.instrumento.descripcion ||
                                    uso.instrumento.tipoInstrumento.nombre
                                }}
                            </span>
                        </div>

                        <span class="font-code-md text-code-md
                           font-bold text-on-surface">
                            Uso #{{ uso.numeroUso }}
                        </span>
                    </div>

                    <div class="grid grid-cols-2
                       gap-space-sm mt-space-sm">
                        <ReportMobileField label="Vidas restantes" :value="String(uso.vidasRestantes)" />

                        <ReportMobileField label="Usuario" :value="uso.usuario.nombre" />

                        <ReportMobileField label="Servicio" :value="uso.servicio?.nombre || '—'" />

                        <ReportMobileField label="Ubicación" :value="uso.ubicacion?.nombre || '—'" />
                    </div>

                    <div class="mt-space-sm pt-space-sm
                       border-t
                       border-surface-container-high">
                        <span class="font-label-sm text-label-sm
                           uppercase text-outline block">
                            Fecha y hora
                        </span>

                        <span class="font-code-md text-code-md
                           text-on-surface">
                            {{ formatDateTime(uso.fechaHora) }}
                        </span>
                    </div>
                </article>
            </div>
        </section>

        <section v-if="reportType === 'movimientos' && !loading" class="mt-space-md bg-surface-container-lowest
           rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
               border-b border-surface-container-high
               flex flex-col sm:flex-row sm:items-center
               sm:justify-between gap-space-sm">
                <div>
                    <h2 class="font-headline-sm text-headline-sm
                       font-bold text-on-surface">
                        Reporte de movimientos
                    </h2>

                    <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-0.5">
                        Trazabilidad operativa durante el periodo seleccionado.
                    </p>
                </div>

                <span class="inline-flex items-center gap-1.5
                   px-2.5 py-1 rounded-full
                   bg-surface-container-high
                   text-on-surface-variant
                   font-label-sm text-label-sm font-bold
                   self-start sm:self-auto">
                    <span class="material-symbols-outlined text-[15px]">
                        database
                    </span>

                    {{
                        reporteMovimientos?.movimientos.length ?? 0
                    }}
                    registros
                </span>
            </div>

            <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[1200px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Fecha
                            </th>

                            <th :class="thClass">
                                Instrumento
                            </th>

                            <th :class="thClass">
                                Movimiento
                            </th>

                            <th :class="thClass">
                                Estado
                            </th>

                            <th :class="thClass">
                                Ubicación
                            </th>

                            <th :class="thClass">
                                Usuario
                            </th>

                            <th :class="thClass">
                                Descripción
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y
                       divide-surface-container-high">
                        <tr v-for="movimiento in reporteMovimientos?.movimientos ?? []" :key="movimiento.id" class="hover:bg-surface-container-low/60
                           transition-colors">
                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   text-on-surface-variant
                                   whitespace-nowrap">
                                    {{
                                        formatDateTime(
                                            movimiento.fechaHora
                                        )
                                    }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold text-secondary">
                                    {{
                                        movimiento.instrumento.codigo
                                    }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant
                                   block mt-0.5">
                                    {{
                                        movimiento.instrumento
                                            .descripcion ||
                                        movimiento.instrumento
                                            .tipoInstrumento.nombre
                                    }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="inline-flex px-2.5 py-1
                                   rounded-full
                                   bg-surface-container-high
                                   text-on-surface
                                   font-label-sm text-label-sm
                                   font-bold whitespace-nowrap">
                                    {{
                                        formatMovimientoTipo(
                                            movimiento.tipo
                                        )
                                    }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <div class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{
                                        formatOptionalValue(
                                            movimiento.estadoAnterior
                                        )
                                    }}
                                    <span v-if="
                                        movimiento.estadoAnterior ||
                                        movimiento.estadoNuevo
                                    " class="text-outline mx-1">
                                        →
                                    </span>
                                    {{
                                        formatOptionalValue(
                                            movimiento.estadoNuevo
                                        )
                                    }}
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                <div class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{
                                        formatOptionalValue(
                                            movimiento.ubicacionAnterior
                                        )
                                    }}

                                    <span v-if="
                                        movimiento.ubicacionAnterior ||
                                        movimiento.ubicacionNueva
                                    " class="text-outline mx-1">
                                        →
                                    </span>

                                    {{
                                        formatOptionalValue(
                                            movimiento.ubicacionNueva
                                        )
                                    }}
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{
                                        movimiento.usuario?.nombre ||
                                        'Sistema'
                                    }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                                    {{
                                        movimiento.descripcion ||
                                        '—'
                                    }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="md:hidden divide-y
               divide-surface-container-high">
                <article v-for="movimiento in reporteMovimientos?.movimientos ?? []"
                    :key="`movimiento-${movimiento.id}`" class="p-space-sm">
                    <div class="flex items-start justify-between
                       gap-space-sm">
                        <div class="min-w-0">
                            <span class="font-code-md text-code-md
                               text-secondary font-bold">
                                {{ movimiento.instrumento.codigo }}
                            </span>

                            <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-0.5">
                                {{
                                    movimiento.instrumento
                                        .descripcion ||
                                    movimiento.instrumento
                                        .tipoInstrumento.nombre
                                }}
                            </span>
                        </div>

                        <span class="px-2 py-1 rounded-full
                           bg-surface-container-high
                           text-on-surface
                           font-label-sm text-label-sm
                           font-bold shrink-0">
                            {{
                                formatMovimientoTipo(
                                    movimiento.tipo
                                )
                            }}
                        </span>
                    </div>

                    <div class="grid grid-cols-2
                       gap-space-sm mt-space-sm">
                        <ReportMobileField label="Estado anterior" :value="formatOptionalValue(
                            movimiento.estadoAnterior
                        )
                            " />

                        <ReportMobileField label="Estado nuevo" :value="formatOptionalValue(
                            movimiento.estadoNuevo
                        )
                            " />

                        <ReportMobileField label="Ubicación anterior" :value="formatOptionalValue(
                            movimiento.ubicacionAnterior
                        )
                            " />

                        <ReportMobileField label="Ubicación nueva" :value="formatOptionalValue(
                            movimiento.ubicacionNueva
                        )
                            " />

                        <ReportMobileField label="Usuario" :value="movimiento.usuario?.nombre ||
                            'Sistema'
                            " />
                    </div>

                    <div class="mt-space-sm pt-space-sm
                       border-t
                       border-surface-container-high">
                        <span class="font-label-sm text-label-sm
                           uppercase text-outline block">
                            Fecha y hora
                        </span>

                        <span class="font-code-md text-code-md
                           text-on-surface">
                            {{
                                formatDateTime(
                                    movimiento.fechaHora
                                )
                            }}
                        </span>

                        <p v-if="movimiento.descripcion" class="font-body-sm text-body-sm
                           text-on-surface-variant mt-2">
                            {{ movimiento.descripcion }}
                        </p>
                    </div>
                </article>
            </div>
        </section>

        <section v-if="reportType === 'bajas' && !loading" class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
               border-b
               border-surface-container-high
               flex flex-col sm:flex-row
               sm:items-center
               sm:justify-between gap-space-sm">
                <div>
                    <h2 class="font-headline-sm text-headline-sm
                       font-bold text-on-surface">
                        Reporte de bajas
                    </h2>

                    <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-0.5">
                        Historial de instrumentos dados de baja.
                    </p>
                </div>

                <span class="inline-flex items-center gap-1.5
                   px-2.5 py-1 rounded-full
                   bg-surface-container-high
                   text-on-surface-variant
                   font-label-sm text-label-sm
                   font-bold
                   self-start sm:self-auto">
                    <span class="material-symbols-outlined
                       text-[15px]">
                        database
                    </span>

                    {{
                        reporteBajas?.bajas.length ?? 0
                    }}
                    registros
                </span>
            </div>

            <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[1100px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Fecha
                            </th>

                            <th :class="thClass">
                                Instrumento
                            </th>

                            <th :class="thClass">
                                Tipo
                            </th>

                            <th :class="thClass">
                                Usos
                            </th>

                            <th :class="thClass">
                                Vidas
                            </th>

                            <th :class="thClass">
                                Motivo
                            </th>

                            <th :class="thClass">
                                Usuario
                            </th>

                            <th :class="thClass">
                                Observaciones
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y
                       divide-surface-container-high">
                        <tr v-for="baja in reporteBajas?.bajas ?? []" :key="baja.id" class="hover:bg-surface-container-low/60
                           transition-colors">
                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   text-on-surface-variant
                                   whitespace-nowrap">
                                    {{
                                        formatDateTime(
                                            baja.fechaBaja
                                        )
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold text-secondary">
                                    {{
                                        baja.instrumento.codigo
                                    }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant
                                   block mt-0.5">
                                    {{
                                        baja.instrumento.descripcion ||
                                        'Sin descripción'
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{
                                        baja.instrumento
                                            .tipoInstrumento.nombre
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   text-on-surface">
                                    {{
                                        baja.instrumento
                                            .usosRealizados
                                    }}
                                    /
                                    {{
                                        baja.instrumento
                                            .usosMaximos
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                   font-bold" :class="baja.instrumento
                                        .vidasRestantes === 0
                                        ? 'text-error'
                                        : 'text-on-surface'
                                    ">
                                    {{
                                        baja.instrumento
                                            .vidasRestantes
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="inline-flex px-2.5 py-1
                                   rounded-full
                                   bg-error-container
                                   text-on-error-container
                                   font-label-sm text-label-sm
                                   font-bold">
                                    {{
                                        baja.motivoBaja.nombre
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface">
                                    {{ baja.usuario.nombre }}
                                </span>

                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant
                                   block mt-0.5">
                                    {{ baja.usuario.correo }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                                    {{
                                        baja.observaciones ||
                                        '—'
                                    }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="md:hidden divide-y
               divide-surface-container-high">
                <article v-for=" baja in reporteBajas?.bajas ?? []
            " :key="`baja-${baja.id}`" class="p-space-sm">
                    <div class="flex items-start
                       justify-between gap-3">
                        <div class="min-w-0">
                            <span class="font-code-md text-code-md
                               text-secondary font-bold">
                                {{ baja.instrumento.codigo }}
                            </span>

                            <span class="font-body-sm text-body-sm
                               text-on-surface-variant
                               block mt-0.5">
                                {{
                                    baja.instrumento.descripcion ||
                                    baja.instrumento
                                        .tipoInstrumento.nombre
                                }}
                            </span>
                        </div>

                        <span class="px-2 py-1 rounded-full
                           bg-error-container
                           text-on-error-container
                           font-label-sm text-label-sm
                           font-bold shrink-0">
                            Baja
                        </span>
                    </div>

                    <div class="grid grid-cols-2
                       gap-space-sm mt-space-sm">
                        <ReportMobileField label="Motivo" :value="baja.motivoBaja.nombre" />

                        <ReportMobileField label="Usuario" :value="baja.usuario.nombre" />

                        <ReportMobileField label="Usos" :value="`${baja.instrumento.usosRealizados}
                        / ${baja.instrumento.usosMaximos}`
                            " />

                        <ReportMobileField label="Vidas restantes" :value="String(
                            baja.instrumento
                                .vidasRestantes
                        )
                            " />

                        <ReportMobileField label="Ubicación" :value="baja.instrumento
                                .ubicacion?.nombre || '—'
                            " />

                        <ReportMobileField label="Tipo" :value="baja.instrumento
                                .tipoInstrumento.nombre
                            " />
                    </div>

                    <div class="mt-space-sm pt-space-sm
                       border-t
                       border-surface-container-high">
                        <span class="font-label-sm text-label-sm
                           uppercase text-outline block">
                            Fecha de baja
                        </span>

                        <span class="font-code-md text-code-md
                           text-on-surface">
                            {{
                                formatDateTime(
                                    baja.fechaBaja
                                )
                            }}
                        </span>

                        <p v-if="baja.observaciones" class="font-body-sm text-body-sm
                           text-on-surface-variant mt-2">
                            {{ baja.observaciones }}
                        </p>
                    </div>
                </article>
            </div>
        </section>

        <!-- <div v-else="false" class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm px-space-md py-space-sm
                   flex flex-col sm:flex-row sm:items-center
                   sm:justify-between gap-space-sm">
            <span class="font-body-sm text-body-sm
                       text-on-surface-variant">
                Mostrando
                <strong class="text-on-surface">
                    {{ reportRows.length }}
                </strong>
                de
                <strong class="text-on-surface">250</strong>
                registros
            </span>

            <div class="flex items-center gap-1
                       self-end sm:self-auto">
                <button type="button" disabled :class="paginationButtonClass">
                    <span class="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>

                <button type="button" class="w-9 h-9 rounded-lg
                           bg-primary-container text-on-primary
                           font-label-sm text-label-sm font-bold">
                    1
                </button>

                <button type="button" :class="paginationButtonClass">
                    2
                </button>

                <button type="button" :class="paginationButtonClass">
                    3
                </button>

                <button type="button" :class="paginationButtonClass">
                    <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref, onMounted } from 'vue'

import { reportesService } from '@/services/reportes.service'

import type { ReporteInstrumentos, ReporteUsos, ReporteMovimientos, ReporteBajas, TipoMovimiento } from '@/types/reportes'

import { getApiErrorMessage } from '@/utils/apiError'

type ReportType =
    | 'instrumentos'
    | 'usos'
    | 'movimientos'
    | 'bajas'

type EstadoInstrumento =
    | 'DISPONIBLE'
    | 'EN_USO'
    | 'EN_LIMPIEZA'
    | 'EN_MANTENIMIENTO'
    | 'NO_DISPONIBLE'
    | 'EXTRAVIADA'
    | 'CAMBIO_URGENTE'
    | 'BAJA'

interface ReportRow {
    id: number
    codigo: string
    nombre: string
    tipo: string
    estado: EstadoInstrumento
    usos: number
    vidas: number
    ubicacion: string
    ultimoMovimiento: string | null
    usosMaximos: number
}

const reporteInstrumentos = ref<ReporteInstrumentos | null>(null)
const reporteUsos = ref<ReporteUsos | null>(null)
const reporteMovimientos = ref<ReporteMovimientos | null>(null)
const reporteBajas = ref<ReporteBajas | null>(null)

const reportRows = computed<ReportRow[]>(() => {
    if (!reporteInstrumentos.value) {
        return []
    }

    return reporteInstrumentos.value.instrumentos.map(
        (instrumento) => ({
            id: instrumento.id,
            codigo: instrumento.codigo,
            nombre: instrumento.descripcion || 'Sin descripción',
            tipo: instrumento.tipoInstrumento.nombre,
            estado: instrumento.estadoOperativo,
            usos: instrumento.usosRealizados,
            vidas: instrumento.vidasRestantes,
            ubicacion: instrumento.ubicacion?.nombre || 'Sin ubicación',
            ultimoMovimiento: null,
            usosMaximos: instrumento.usosMaximos
        })
    )
})

const exporting = ref(false)

const loadingCount = ref(0)

const loading = computed(() => {
    return loadingCount.value > 0
})

const startLoading = () => {
    loadingCount.value++
}

const stopLoading = () => {
    loadingCount.value = Math.max(
        0,
        loadingCount.value - 1
    )
}

const errorMessage = ref('')

const reportType = ref<ReportType>('instrumentos')

const loadReporteInstrumentos = async () => {
    startLoading()
    errorMessage.value = ''

    try {
        reporteInstrumentos.value = await reportesService.getInstrumentos()

    } catch (error) {
        reporteInstrumentos.value = null

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando reporte de instrumentos:', error)
    } finally {
        stopLoading()
    }
}

const loadReporteUsos = async () => {
    try {
        startLoading()
        errorMessage.value = ''

        const params: {
            desde?: string
            hasta?: string
        } = {}

        if (filters.desde && filters.hasta) {
            params.desde = filters.desde
            params.hasta = filters.hasta
        }

        reporteUsos.value = await reportesService.getUsos(params)
    } catch (error) {
        reporteUsos.value = null

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando reporte de usos:', error)
    } finally {
        stopLoading()
    }
}

const loadReporteMovimientos = async () => {
    try {
        startLoading()
        errorMessage.value = ''

        const params: {
            desde?: string
            hasta?: string
            tipo?: TipoMovimiento
        } = {}

        if (filters.desde && filters.hasta) {
            params.desde = filters.desde
            params.hasta = filters.hasta
        }

        if (filters.tipoMovimiento) {
            params.tipo = filters.tipoMovimiento as TipoMovimiento
        }

        reporteMovimientos.value = await reportesService.getMovimientos(params)
    } catch (error) {
        reporteMovimientos.value = null

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando reporte de movimientos:', error)
    } finally {
        stopLoading()
    }
}

const loadReporteBajas = async () => {
    startLoading()
    errorMessage.value = ''

    try {
        const params: {
            desde?: string
            hasta?: string
        } = {}

        if (filters.desde && filters.hasta) {
            params.desde = filters.desde
            params.hasta = filters.hasta
        }

        reporteBajas.value =await reportesService.getBajas(params)
    } catch (error) {
        reporteBajas.value = null

        errorMessage.value = getApiErrorMessage(error)

        console.error(
            'Error cargando reporte de bajas:',
            error
        )
    } finally {
        stopLoading()
    }
}

const filters = reactive({
    desde: '',
    hasta: '',
    tipoMovimiento: '',
})

const formatDateTime = (value: string): string => {
    return new Intl.DateTimeFormat(
        'es-MX',
        {
            dateStyle: 'medium',
            timeStyle: 'short',
        }
    ).format(new Date(value))
}

const formatOptionalValue = (value: string | null): string => {
    if (!value) {
        return '—'
    }

    return value
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        )
}

const formatMovimientoTipo = (tipo: string): string => {
    const labels: Record<string, string> = {
        ALTA: 'Alta',
        USO: 'Uso',
        CAMBIO_UBICACION: 'Cambio ubicación',
        CAMBIO_ESTADO: 'Cambio estado',
        CAMBIO_URGENTE: 'Cambio urgente',
        BAJA: 'Baja',
        INTENTO_USO_BLOQUEADO: 'Intento bloqueado',
    }

    return labels[tipo] ?? tipo
}

const activeReportClass =
    'border-secondary bg-secondary-fixed/20'

const inactiveReportClass =
    'border-surface-container-high ' +
    'hover:border-secondary/40 hover:bg-surface-container-low'

const inputClass =
    'w-full h-11 px-3 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left font-label-sm text-label-sm ' +
    'uppercase tracking-wider text-outline font-semibold'

const paginationButtonClass =
    'w-9 h-9 rounded-lg text-on-surface-variant ' +
    'hover:bg-surface-container-high flex items-center ' +
    'justify-center font-label-sm text-label-sm font-semibold ' +
    'disabled:opacity-40 disabled:cursor-not-allowed'

const currentReportTitle = computed(() => {
    const titles: Record<ReportType, string> = {
        instrumentos: 'Reporte de instrumentos',
        usos: 'Reporte de usos',
        movimientos: 'Reporte de movimientos',
    }

    return titles[reportType.value]
})

const currentReportDescription = computed(() => {
    const descriptions: Record<ReportType, string> = {
        instrumentos:
            'Estado y ciclo de vida actual de los instrumentos.',
        usos:
            'Usos registrados durante el periodo seleccionado.',
        movimientos:
            'Trazabilidad operativa durante el periodo seleccionado.',
    }

    return descriptions[reportType.value]
})

const applyFilters = async () => {
    errorMessage.value = ''

    if (reportType.value === 'usos' && Boolean(filters.desde) !== Boolean(filters.hasta)) {
        errorMessage.value = 'Selecciona las fechas Desde y Hasta.'

        return
    }

    if (
        filters.desde && filters.hasta && filters.desde > filters.hasta) {
        errorMessage.value = 'La fecha Desde no puede ser posterior a Hasta.'

        return
    }

    if (reportType.value === 'usos') {
        await loadReporteUsos()
    }

    if (reportType.value === 'movimientos') {

        if (Boolean(filters.desde) !== Boolean(filters.hasta)) {
            errorMessage.value = 'Selecciona las fechas Desde y Hasta.'

            return
        }

        if (filters.desde && filters.hasta && filters.desde > filters.hasta) {
            errorMessage.value = 'La fecha Desde no puede ser posterior a Hasta.'

            return
        }

        await loadReporteMovimientos()
    }

    if (reportType.value === 'bajas') {
        await loadReporteBajas()
        return
    }
}

const clearFilters = async () => {
    filters.desde = ''
    filters.hasta = ''
    filters.tipoMovimiento = ''

    errorMessage.value = ''

    if (reportType.value === 'usos') {
        await loadReporteUsos()
        return
    }

    if (reportType.value === 'movimientos') {
        await loadReporteMovimientos()
        return
    }

    if (reportType.value === 'bajas') {
        await loadReporteBajas()
        return
    }
}

const exportCsv = async () => {
    if (exporting.value) {
        return
    }

    errorMessage.value = ''

    if (reportType.value !== 'instrumentos' && Boolean(filters.desde) !== Boolean(filters.hasta)) {
        errorMessage.value = 'Selecciona las fechas Desde y Hasta.'

        return
    }

    if (filters.desde && filters.hasta && filters.desde > filters.hasta) {
        errorMessage.value = 'La fecha Desde no puede ser posterior a Hasta.'

        return
    }

    exporting.value = true

    try {
        if (reportType.value === 'instrumentos') {
            await reportesService.exportInstrumentos()

            return
        }

        if (reportType.value === 'usos') {
            const params: {
                desde?: string
                hasta?: string
            } = {}

            if (
                filters.desde &&
                filters.hasta
            ) {
                params.desde = filters.desde
                params.hasta = filters.hasta
            }

            await reportesService.exportUsos(params)

            return
        }

        if (reportType.value === 'movimientos') {
            const params: {
                desde?: string
                hasta?: string
                tipo?: TipoMovimiento
            } = {}

            if (
                filters.desde &&
                filters.hasta
            ) {
                params.desde = filters.desde
                params.hasta = filters.hasta
            }

            if (filters.tipoMovimiento) {
                params.tipo =
                    filters.tipoMovimiento as TipoMovimiento
            }

            await reportesService.exportMovimientos(params)
        }

        if (reportType.value === 'bajas') {
            const params: {
                desde?: string
                hasta?: string
            } = {}

            if (
                filters.desde &&
                filters.hasta
            ) {
                params.desde = filters.desde
                params.hasta = filters.hasta
            }

            await reportesService.exportBajas(params)
        }
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)

        console.error('Error exportando CSV:', error)
    } finally {
        exporting.value = false
    }
}

const formatDate = (value: string): string => {
    const [year, month, day] = value.split('-').map(Number)

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    ).format(
        new Date(year, month - 1, day)
    )
}

const formatEstado = (estado: EstadoInstrumento) => {
    const labels: Record<EstadoInstrumento, string> = {
        DISPONIBLE: 'DISPONIBLE',
        EN_USO: 'EN USO',
        EN_LIMPIEZA: 'EN LIMPIEZA',
        EN_MANTENIMIENTO: 'EN MANTENIMIENTO',
        NO_DISPONIBLE: 'NO DISPONIBLE',
        EXTRAVIADA: 'EXTRAVIADA',
        CAMBIO_URGENTE: 'CAMBIO URGENTE',
        BAJA: 'BAJA',
    }

    return labels[estado]
}

const estadoClass = (estado: EstadoInstrumento) => {
    if (estado === 'CAMBIO_URGENTE') {
        return 'bg-error-container text-on-error-container'
    }

    if (estado === 'BAJA' || estado === 'EXTRAVIADA') {
        return 'bg-surface-container-highest text-on-surface-variant'
    }

    if (estado === 'DISPONIBLE') {
        return 'bg-secondary-fixed text-on-secondary-fixed'
    }

    return 'bg-surface-container-high text-on-surface-variant'
}

const ReportMetric = (props: {
    label: string
    value: string
    detail: string
    icon: string
    danger?: boolean
}) =>
    h(
        'div',
        {
            class:
                'bg-surface-container-lowest rounded-xl ' +
                'shadow-sm p-space-md',
        },
        [
            h(
                'div',
                {
                    class:
                        'flex items-start justify-between gap-3',
                },
                [
                    h('div', [
                        h(
                            'span',
                            {
                                class:
                                    'font-label-sm text-label-sm uppercase ' +
                                    'tracking-wider text-outline font-semibold',
                            },
                            props.label
                        ),

                        h(
                            'div',
                            {
                                class:
                                    'font-headline-lg text-headline-lg ' +
                                    'font-bold mt-1 ' +
                                    (props.danger
                                        ? 'text-error'
                                        : 'text-on-surface'),
                            },
                            props.value
                        ),

                        h(
                            'span',
                            {
                                class:
                                    'font-body-sm text-body-sm ' +
                                    'text-on-surface-variant',
                            },
                            props.detail
                        ),
                    ]),

                    h(
                        'span',
                        {
                            class:
                                'material-symbols-outlined text-[24px] ' +
                                (props.danger
                                    ? 'text-error'
                                    : 'text-secondary'),
                        },
                        props.icon
                    ),
                ]
            ),
        ]
    )

const ReportMobileField = (props: {
    label: string
    value: string
}) =>
    h('div', [
        h(
            'span',
            {
                class:
                    'font-label-sm text-label-sm uppercase ' +
                    'text-outline block',
            },
            props.label
        ),

        h(
            'span',
            {
                class:
                    'font-body-sm text-body-sm ' +
                    'text-on-surface font-medium',
            },
            props.value
        ),
    ])

onMounted(async () => {
    await Promise.all([
        loadReporteInstrumentos(),
        loadReporteUsos(),
        loadReporteMovimientos(),
        loadReporteBajas(),
    ])
})
</script>