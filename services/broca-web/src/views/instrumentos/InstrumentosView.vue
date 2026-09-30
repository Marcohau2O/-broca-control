<template>
    <div class=" gap-space-lg">
        <div class="flex flex-col w-full">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-lg">
                <div>
                    <div class="flex items-center gap-space-xs mb-1">
                        <span
                            class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Gestión
                            de Activos Quirúrgicos</span>
                        <span class="text-outline-variant">•</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant font-medium"> Gestión de
                            Instrumental /
                            Trazabilidad Unitaria</span>
                    </div>
                    <h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">Instrumentos
                    </h1>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">
                        Consulta y administra los instrumentos registrados, sus usos,
                        vidas restantes, ubicación y estado operativo.
                    </p>
                </div>
                <div class="flex flex-wrap items-center gap-space-sm">
                    <button
                        class="h-10 px-4 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm"
                        type="button">
                        <span class="material-symbols-outlined text-[19px] text-secondary">qr_code_scanner</span>
                        <span>Escanear QR</span>
                    </button>
                    <!-- Export Dropdown Trigger -->
                    <div class="relative group">
                        <button
                            class="h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm"
                            type="button">
                            <span class="material-symbols-outlined text-[18px] text-on-surface-variant">ios_share</span>
                            <span>Exportar</span>
                            <span class="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                        </button>
                        <div
                            class="absolute right-0 top-full mt-1.5 w-44 bg-surface-container-lowest rounded-lg shadow-xl py-1 hidden group-hover:flex flex-col z-30">
                            <!-- <a class="px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                href="#">
                                <span class="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                                <span>Reporte PDF Certificado</span>
                            </a>
                            <a class="px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                href="#">
                                <span class="material-symbols-outlined text-[16px] text-secondary">table_view</span>
                                <span>Excel Completo (.xlsx)</span>
                            </a> -->
                            <a class="px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                href="#">
                                <span
                                    class="material-symbols-outlined text-[16px] text-on-surface-variant">data_object</span>
                                <span>Archivo CSV / Raw</span>
                            </a>
                        </div>
                    </div>
                    <button @click="registrarInstrumento"
                        class="h-10 px-4 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 hover:bg-primary transition-colors shadow-sm"
                        type="button">
                        <span class="material-symbols-outlined text-[18px] text-secondary-fixed">add_circle</span>
                        <span>Registrar broca</span>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-sm mb-space-md">
                <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase text-outline font-semibold block">Total
                            Activas</span>
                        <span class="font-headline-md text-headline-md font-bold text-on-surface">{{ totalActivas
                            }}</span>
                    </div>
                    <span class="material-symbols-outlined text-[24px] text-secondary">all_inbox</span>
                </div>
                <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                        <span
                            class="font-label-sm text-label-sm uppercase text-tertiary-container font-semibold block">3
                            Vidas restantes</span>
                        <span class="font-headline-md text-headline-md font-bold text-on-surface">{{ tresVidas }}</span>
                    </div>
                    <div class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></div>
                </div>
                <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase text-secondary font-semibold block">2
                            Vidas</span>
                        <span class="font-headline-md text-headline-md font-bold text-on-surface">{{ dosVidas }}</span>
                    </div>
                    <div class="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                </div>
                <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase text-on-surface font-semibold block">1 Vida
                            (Alerta)</span>
                        <span class="font-headline-md text-headline-md font-bold text-on-surface">{{ unaVida }}</span>
                    </div>
                    <span class="material-symbols-outlined text-[20px] text-secondary-container">priority_high</span>
                </div>
                <div
                    class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between bg-gradient-to-r from-surface-container-lowest to-error-container/20">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase text-error font-bold block">Cambio
                            Urgente</span>
                        <span class="font-headline-md text-headline-md font-bold text-error">{{ cambioUrgente }}</span>
                    </div>
                    <span class="material-symbols-outlined text-[22px] text-error">lock</span>
                </div>
            </div>
            <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md">
                <div class="flex flex-col lg:flex-row items-stretch lg:items-center gap-space-sm mb-space-sm">
                    <div class="relative flex-1">
                        <span
                            class="material-symbols-outlined absolute left-3.5 top-3 text-outline text-[20px]">search</span>
                        <input v-model="search" @keyup.enter="aplicarFiltros"
                            class="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-outline"
                            placeholder="Buscar por código, lote, serie, marca o modelo..." type="text">
                    </div>
                    <div class="flex items-center gap-space-xs shrink-0">
                        <button
                            class="h-11 px-4 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-colors"
                            type="button">
                            <span class="material-symbols-outlined text-[18px]">tune</span>
                            <span>Filtros avanzados</span>
                            <span v-if="filtrosActivos > 0"
                                class="w-4 h-4 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center font-bold">{{
                                    filtrosActivos }}</span>
                        </button>
                        <button @click="limpiarFiltros"
                            class="h-11 px-3 rounded-lg bg-surface-container-low text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
                            title="Restablecer filtros" type="button">
                            <span class="material-symbols-outlined text-[18px]">restart_alt</span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm pt-space-xs">
                    <div class="flex flex-col gap-1">
                        <label class="font-label-sm text-label-sm uppercase text-outline font-semibold">Estado
                            operativo</label>
                        <div class="relative">
                            <select v-model="estado" @change="aplicarFiltros"
                                class="w-full h-9 pl-2.5 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-secondary">
                                <option value="">Todos los estados</option>
                                <option value="DISPONIBLE">Disponible</option>
                                <option value="EN_USO">En uso</option>
                                <option value="EN_LIMPIEZA">En limpieza</option>
                                <option value="EN_MANTENIMIENTO">En mantenimiento</option>
                                <option value="NO_DISPONIBLE">No disponible</option>
                                <option value="EXTRAVIADA">Extraviada</option>
                                <option value="CAMBIO_URGENTE">Cambio urgente</option>
                                <option value="BAJA">Baja</option>
                            </select>
                            <span
                                class="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-label-sm text-label-sm uppercase text-outline font-semibold">Vidas
                            Restantes</label>
                        <div class="relative">
                            <select v-model="vidas"
                                class="w-full h-9 pl-2.5 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-secondary">
                                <option value="">Todas las vidas</option>
                                <option :value="3">3 vidas restantes</option>
                                <option :value="2">2 vidas restantes</option>
                                <option :value="1">1 vida restante</option>
                                <option :value="0">0 vidas restantes</option>
                            </select>
                            <span
                                class="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-label-sm text-label-sm uppercase text-outline font-semibold">Ubicación
                            Actual</label>
                        <div class="relative">
                            <select v-model="ubicacionId" @change="aplicarFiltros"
                                class="w-full h-9 pl-2.5 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-secondary">
                                <option value="">Todas las ubicaciones</option>
                                <option v-for="ubicacion in ubicaciones" :key="ubicacion.id" :value="ubicacion.id">{{
                                    ubicacion.nombre }}</option>
                            </select>
                            <span
                                class="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="font-label-sm text-label-sm uppercase text-outline font-semibold">Fabricante /
                            Marca</label>
                        <div class="relative">
                            <select v-model="marcaId" @change="aplicarFiltros"
                                class="w-full h-9 pl-2.5 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-secondary">
                                <option value="">Todas las marcas</option>
                                <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}
                                </option>
                            </select>
                            <span
                                class="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="font-label-sm text-label-sm uppercase text-outline font-semibold">Tipo de
                            Instrumental</label>
                        <div class="relative">
                            <select v-model="tipoInstrumentoId" @change="aplicarFiltros"
                                class="w-full h-9 pl-2.5 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-secondary">
                                <option value="">Todos los modelos</option>
                                <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
                            </select>
                            <span
                                class="material-symbols-outlined absolute right-2 top-2 text-outline text-[16px] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-space-xs mt-space-sm pt-space-xs">
                    <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Filtros
                        Activos:</span>
                    <span
                        class="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                        Estado: Cambio Urgente
                        <button class="hover:opacity-75"><span
                                class="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                    <!-- <span
                        class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                        Ubicación: Todas
                        <button class="hover:opacity-75"><span
                                class="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                    <span
                        class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                        Marca: Todas
                        <button class="hover:opacity-75"><span
                                class="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                    <button class="font-label-sm text-label-sm text-secondary hover:underline ml-2"
                        type="button">Limpiar todos</button> -->
                </div>
            </div>
            <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div
                    class="px-space-md py-2.5 bg-primary-container text-on-primary flex items-center justify-between text-xs">
                    <div class="flex items-center gap-space-sm">
                        <span class="material-symbols-outlined text-[18px] text-error">gavel</span>
                        <span class="font-label-sm text-label-sm tracking-wide">
                            <strong class="text-error-container font-bold">PROTOCOLO ESTRICTO:</strong> Toda broca con 3
                            usos registrados pasa a <strong>CAMBIO URGENTE</strong> e inhabilitación inmediata. Se
                            bloquea el registro de uso.
                        </span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-label-sm text-label-sm text-primary-fixed-dim">Total listadas:
                            <strong>10</strong> de 250</span>
                    </div>
                </div>
                <div class="overflow-x-auto w-full">
                    <table class="w-full text-left border-collapse min-w-[1300px]">
                        <thead>
                            <tr
                                class="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider h-10">
                                <th class="pl-space-md pr-2 w-10">
                                    <input
                                        class="rounded bg-surface-container-lowest text-secondary focus:ring-0 w-4 h-4 cursor-pointer"
                                        type="checkbox">
                                </th>
                                <th class="px-space-sm py-2 font-semibold">Código QR &amp; ID</th>
                                <th class="px-space-sm py-2 font-semibold min-w-[220px]">Instrumento / Descripción</th>
                                <th class="px-space-sm py-2 font-semibold">Marca / Modelo</th>
                                <th class="px-space-sm py-2 font-semibold">Lote &amp; Serie</th>
                                <th class="px-space-sm py-2 font-semibold text-center min-w-[130px]">Medidor de Usos
                                    (Máx 3)</th>
                                <th class="px-space-sm py-2 font-semibold text-center">Vidas</th>
                                <th class="px-space-sm py-2 font-semibold">Ubicación</th>
                                <th class="px-space-sm py-2 font-semibold text-center min-w-[170px]">Estado operativo
                                </th>
                                <th class="px-space-sm py-2 font-semibold min-w-[180px]">Último Movimiento</th>
                                <th class="pr-space-md pl-space-sm py-2 font-semibold text-right min-w-[150px]">Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
                            <tr v-if="loading">
                                <td colspan="11" class="px-space-md py-12 text-center">
                                    <div class="flex flex-col items-center justify-center gap-2">
                                        <span class="material-symbols-outlined text-[32px] text-secondary animate-spin">
                                            progress_activity
                                        </span>

                                        <span class="font-body-md text-body-md text-on-surface-variant">
                                            Cargando instrumentos...
                                        </span>
                                    </div>
                                </td>
                            </tr>

                            <tr v-else-if="errorMessage">
                                <td colspan="11" class="px-space-md py-10 text-center">
                                    <div class="max-w-lg mx-auto rounded-xl bg-error-container/30 p-space-md">
                                        <span class="material-symbols-outlined text-[30px] text-error">
                                            error
                                        </span>

                                        <p class="font-label-md text-label-md font-bold text-error mt-2">
                                            No fue posible cargar los instrumentos
                                        </p>

                                        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                            {{ errorMessage }}
                                        </p>

                                        <button type="button"
                                            class="mt-3 h-9 px-4 rounded-lg bg-error text-on-error font-label-sm text-label-sm font-semibold"
                                            @click="loadInstrumentos">
                                            Reintentar
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr v-else-if="instrumentosFiltrados.length === 0">
                                <td colspan="11" class="px-space-md py-14 text-center">
                                    <span class="material-symbols-outlined text-[42px] text-outline">
                                        inventory_2
                                    </span>

                                    <p class="font-label-md text-label-md font-bold text-on-surface mt-2">
                                        No se encontraron instrumentos
                                    </p>

                                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                        Intenta cambiar o restablecer los filtros.
                                    </p>
                                </td>
                            </tr>

                            <tr v-for="instrumento in instrumentosFiltrados" :key="instrumento.id" :class="[
                                'transition-colors',
                                instrumento.estadoOperativo === 'CAMBIO_URGENTE'
                                    ? 'bg-error-container/10 hover:bg-error-container/20'
                                    : instrumento.estadoOperativo === 'BAJA'
                                        ? 'bg-surface-container-low/20 opacity-80 hover:opacity-100'
                                        : 'hover:bg-surface-container-low',
                            ]">
                                <td class="pl-space-md pr-2 py-3">
                                    <input
                                        class="rounded bg-surface-container-lowest text-secondary focus:ring-0 w-4 h-4 cursor-pointer"
                                        type="checkbox" />
                                </td>

                                <td class="px-space-sm py-3">
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="w-8 h-8 rounded bg-surface-container-low p-1 flex items-center justify-center shrink-0">
                                            <span class="material-symbols-outlined text-[20px] text-primary">
                                                qr_code_2
                                            </span>
                                        </div>

                                        <div>
                                            <span :class="[
                                                'font-code-md text-code-md font-bold block leading-tight',
                                                instrumento.estadoOperativo === 'BAJA'
                                                    ? 'text-outline line-through'
                                                    : 'text-on-surface',
                                            ]">
                                                {{ instrumento.codigo }}
                                            </span>

                                            <span v-if="instrumento.estadoOperativo === 'CAMBIO_URGENTE'"
                                                class="font-label-sm text-[10px] text-error font-semibold uppercase">
                                                Bloqueada
                                            </span>

                                            <span v-else-if="instrumento.estadoOperativo === 'BAJA'"
                                                class="font-label-sm text-[10px] text-outline font-semibold uppercase">
                                                Baja
                                            </span>

                                            <span v-else
                                                class="font-label-sm text-[10px] text-secondary font-semibold uppercase">
                                                {{ instrumento.activo ? 'Activo' : 'Inactivo' }}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-space-sm py-3">
                                    <div :class="[
                                        'font-label-md text-label-md font-bold',
                                        instrumento.estadoOperativo === 'BAJA'
                                            ? 'text-outline line-through'
                                            : 'text-on-surface',
                                    ]">
                                        {{ instrumento.tipoInstrumento?.nombre ?? 'Sin tipo' }}
                                    </div>

                                    <span class="font-body-sm text-outline text-xs block max-w-[260px] truncate"
                                        :title="instrumento.descripcion ?? ''">
                                        {{ instrumento.descripcion || 'Sin descripción' }}
                                    </span>
                                </td>

                                <td class="px-space-sm py-3">
                                    <span class="font-label-md text-label-md text-on-surface block font-medium">
                                        {{ instrumento.marca?.nombre ?? 'Sin marca' }}
                                    </span>

                                    <span class="font-code-md text-[11px] text-outline">
                                        {{ instrumento.modelo?.nombre ?? 'Sin modelo' }}
                                    </span>
                                </td>

                                <td class="px-space-sm py-3">
                                    <div class="font-code-md text-code-md text-on-surface font-medium">
                                        {{ instrumento.lote || '—' }}
                                    </div>

                                    <div class="font-code-md text-[11px] text-outline">
                                        {{ instrumento.serie || '—' }}
                                    </div>
                                </td>

                                <td class="px-space-sm py-3 text-center">
                                    <div class="inline-flex flex-col items-center">
                                        <div class="flex items-center gap-1">
                                            <div v-for="numero in instrumento.usosMaximos" :key="numero" :class="[
                                                'w-6 h-2 rounded-sm',
                                                numero <= instrumento.usosRealizados
                                                    ? instrumento.vidasRestantes === 0
                                                        ? 'bg-error'
                                                        : instrumento.vidasRestantes === 1
                                                            ? 'bg-secondary-container'
                                                            : 'bg-secondary'
                                                    : 'bg-surface-container-high',
                                            ]"></div>
                                        </div>

                                        <span :class="[
                                            'font-label-sm text-[11px] font-semibold mt-1',
                                            instrumento.vidasRestantes === 0
                                                ? 'text-error'
                                                : instrumento.vidasRestantes === 1
                                                    ? 'text-on-secondary-container'
                                                    : 'text-outline',
                                        ]">
                                            {{ instrumento.usosRealizados }}
                                            de
                                            {{ instrumento.usosMaximos }}
                                            Usos
                                            ({{ porcentajeUsos(instrumento) }}%)
                                        </span>
                                    </div>
                                </td>

                                <td class="px-space-sm py-3 text-center">
                                    <span :class="[
                                        'px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold',
                                        instrumento.vidasRestantes === 0
                                            ? 'bg-error-container text-on-error-container'
                                            : instrumento.vidasRestantes === 1
                                                ? 'bg-secondary-container text-on-secondary-container'
                                                : instrumento.vidasRestantes === 2
                                                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                                                    : 'bg-surface-container-high text-on-surface',
                                    ]">
                                        {{ instrumento.vidasRestantes }}
                                        {{ instrumento.vidasRestantes === 1 ? 'vida' : 'vidas' }}
                                    </span>
                                </td>

                                <td class="px-space-sm py-3">
                                    <span
                                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                                        <span class="material-symbols-outlined text-[14px] text-outline">
                                            room
                                        </span>

                                        {{ instrumento.ubicacion?.nombre ?? 'Sin ubicación' }}
                                    </span>
                                </td>

                                <td class="px-space-sm py-3 text-center">
                                    <span :class="[
                                        'inline-flex items-center gap-1.5 px-2.5 py-1 font-label-sm text-label-sm font-bold',
                                        instrumento.estadoOperativo === 'CAMBIO_URGENTE'
                                            ? 'rounded bg-primary text-on-primary shadow-sm'
                                            : instrumento.estadoOperativo === 'BAJA'
                                                ? 'rounded bg-surface-container-high text-outline'
                                                : instrumento.estadoOperativo === 'DISPONIBLE'
                                                    ? 'rounded-full bg-surface-container text-on-surface'
                                                    : instrumento.estadoOperativo === 'EN_LIMPIEZA'
                                                        ? 'rounded-full bg-surface-container text-on-surface'
                                                        : 'rounded-full bg-surface-container-high text-on-surface',
                                    ]">
                                        <span v-if="instrumento.estadoOperativo === 'CAMBIO_URGENTE'"
                                            class="material-symbols-outlined text-[14px] text-error">
                                            lock
                                        </span>

                                        <span v-else-if="instrumento.estadoOperativo === 'BAJA'"
                                            class="material-symbols-outlined text-[14px]">
                                            cancel
                                        </span>

                                        <span v-else class="w-2 h-2 rounded-full bg-secondary"></span>

                                        {{ estadoLabel(instrumento.estadoOperativo) }}
                                    </span>
                                </td>

                                <td class="px-space-sm py-3">
                                    <span class="font-label-md text-label-md text-on-surface block font-medium">
                                        {{ instrumento.responsable?.nombre ?? 'Sin responsable' }}
                                    </span>

                                    <span v-if="instrumento.responsable?.correo"
                                        class="font-body-sm text-[11px] text-outline block truncate max-w-[180px]">
                                        {{ instrumento.responsable.correo }}
                                    </span>
                                </td>

                                <td class="pr-space-md pl-space-sm py-3 text-right">
                                    <div class="flex items-center justify-end gap-1">

                                        <button type="button"
                                            class="p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
                                            title="Ver ficha y trazabilidad" @click="verInstrumento(instrumento)">
                                            <span class="material-symbols-outlined text-[16px]">
                                                visibility
                                            </span>
                                        </button>

                                        <button type="button" :disabled="!puedeRegistrarUso(instrumento)" :class="[
                                            'p-1.5 rounded-lg transition-colors',
                                            puedeRegistrarUso(instrumento)
                                                ? 'bg-secondary text-on-secondary hover:bg-primary'
                                                : 'bg-surface-container-low text-outline opacity-40 cursor-not-allowed',
                                        ]" :title="puedeRegistrarUso(instrumento)
                                            ? 'Registrar uso clínico'
                                            : 'Registro de uso no disponible'
                                            ">
                                            <span class="material-symbols-outlined text-[16px]">
                                                add_task
                                            </span>
                                        </button>

                                        <button type="button" :disabled="instrumento.estadoOperativo === 'BAJA'" :class="[
                                            'p-1.5 rounded-lg transition-colors',
                                            instrumento.estadoOperativo === 'BAJA'
                                                ? 'bg-surface-container-low text-outline opacity-40 cursor-not-allowed'
                                                : 'bg-surface-container-high text-outline hover:text-error',
                                        ]" title="Dar de baja">
                                            <span class="material-symbols-outlined text-[16px]">
                                                delete
                                            </span>
                                        </button>

                                        <button type="button"
                                            class="p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
                                            title="Imprimir QR">
                                            <span class="material-symbols-outlined text-[16px]">
                                                print
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    class="px-space-md py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div class="flex items-center gap-2">
                        <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">
                            Mostrando <strong class="text-on-surface">{{ instrumentosFiltrados.length }}</strong>
                            instrumentos
                        </span>
                        <template v-if="cambioUrgente > 0">
                            <span class="text-outline-variant">|</span>
                            <span class="font-label-sm text-label-sm text-error font-bold flex items-center gap-1">
                                <span class="w-2 h-2 rounded-full bg-error"></span>
                                {{ cambioUrgente }} en Cambio Urgente
                            </span>
                        </template>
                    </div>
                    <!-- <div class="flex items-center gap-space-xs">
                        <button
                            class="h-8 px-2.5 rounded bg-surface-container-lowest text-outline hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center gap-1 shadow-sm transition-colors"
                            type="button">
                            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
                            <span>Anterior</span>
                        </button>
                        <button
                            class="w-8 h-8 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm"
                            type="button">1</button>
                        <button
                            class="w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold shadow-sm transition-colors"
                            type="button">2</button>
                        <button
                            class="w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold shadow-sm transition-colors"
                            type="button">3</button>
                        <span class="text-outline text-xs px-1">...</span>
                        <button
                            class="w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold shadow-sm transition-colors"
                            type="button">25</button>
                        <button
                            class="h-8 px-2.5 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm flex items-center gap-1 shadow-sm transition-colors"
                            type="button">
                            <span>Siguiente</span>
                            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { instrumentosService } from '@/services/instrumentos.service';
import { catalogosService } from '@/services/catalogos.service';
import { getApiErrorMessage } from '@/utils/apiError';

import type { EstadoOperativo, Instrumento } from '@/types/instrumentos';

import type { CatalogItem } from '@/types/catalogos';

const router = useRouter()

const instrumentos = ref<Instrumento[]>([])

const tipos = ref<CatalogItem[]>([])
const marcas = ref<CatalogItem[]>([])
const ubicaciones = ref<CatalogItem[]>([])

const loading = ref(false)
const errorMessage = ref('')

const search = ref('')
const estado = ref<EstadoOperativo | ''>('')
const vidas = ref<number | ''>('')
const ubicacionId = ref<number | ''>('')
const marcaId = ref<number | ''>('')
const tipoInstrumentoId = ref<number | ''>('')

const totalActivas = computed(() => {
    return instrumentos.value.filter((item) => item.activo).length
})

const tresVidas = computed(() => {
    return instrumentos.value.filter((item) => item.activo && item.vidasRestantes === 3).length
})

const dosVidas = computed(() => {
    return instrumentos.value.filter((item) => item.activo && item.vidasRestantes === 2).length
})

const unaVida = computed(() => {
    return instrumentos.value.filter((item) => item.activo && item.vidasRestantes === 1).length
})

const cambioUrgente = computed(() => {
    return instrumentos.value.filter((item) => item.estadoOperativo === 'CAMBIO_URGENTE').length
})

const instrumentosFiltrados = computed(() => {
    if (vidas.value === '') {
        return instrumentos.value
    }

    return instrumentos.value.filter((item) => item.vidasRestantes === vidas.value)
})

const loadCatalogos = async () => {
    try {
        const [
            tiposResponse,
            marcasResponse,
            ubicacionesResponse,
        ] = await Promise.all([
            catalogosService.getAll('tipos'),
            catalogosService.getAll('marcas'),
            catalogosService.getAll('ubicaciones'),
        ])

        tipos.value = tiposResponse.filter(
            (item) => item.activo
        )

        marcas.value = marcasResponse.filter(
            (item) => item.activo
        )

        ubicaciones.value =
            ubicacionesResponse.filter(
                (item) => item.activo
            )
    } catch (error) {
        console.error('Error cargando catálogos:', error)
    }
}

const loadInstrumentos = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
        instrumentos.value = await instrumentosService.getAll({
            search:
                search.value.trim() ||
                undefined,

            estadoOperativo:
                estado.value ||
                undefined,

            ubicacionId:
                ubicacionId.value ||
                undefined,

            marcaId:
                marcaId.value ||
                undefined,

            tipoInstrumentoId:
                tipoInstrumentoId.value ||
                undefined,
        })
    } catch (error) {
        instrumentos.value = []
        errorMessage.value = getApiErrorMessage(error)
    } finally {
        loading.value = false
    }
}

const aplicarFiltros = async () => {
    await loadInstrumentos()
}

const limpiarFiltros = async () => {
    search.value = ''
    estado.value = ''
    vidas.value = ''
    ubicacionId.value = ''
    marcaId.value = ''
    tipoInstrumentoId.value = ''

    await loadInstrumentos()
}

const filtrosActivos = computed(() => {
    let total = 0

    if (search.value.trim()) total++
    if (estado.value) total++
    if (vidas.value !== '') total++
    if (ubicacionId.value) total++
    if (marcaId.value) total++
    if (tipoInstrumentoId.value) total++

    return total
})

const registrarInstrumento = () => {
    router.push('instrumentos/nuevo')
}

const verInstrumento = (instrumento: Instrumento) => {
    router.push(`instrumentos/${instrumento.id}`)
}

const estadoLabel = (estado: EstadoOperativo) => {
    const labels: Record<EstadoOperativo, string> = {
        DISPONIBLE: 'Disponible',
        EN_USO: 'En uso',
        EN_LIMPIEZA: 'En limpieza',
        EN_MANTENIMIENTO: 'En mantenimiento',
        NO_DISPONIBLE: 'No disponible',
        EXTRAVIADA: 'Extraviada',
        CAMBIO_URGENTE: 'Cambio urgente',
        BAJA: 'Baja',
    }

    return labels[estado]
}

const porcentajeUsos = (instrumento: Instrumento) => {
    if (!instrumento.usosMaximos) {
        return 0
    }

    return Math.round(
        (instrumento.usosRealizados / instrumento.usosMaximos) * 100
    )
}

const puedeRegistrarUso = (instrumento: Instrumento) => {
    return (
        instrumento.activo &&
        instrumento.estadoOperativo === 'DISPONIBLE' &&
        instrumento.vidasRestantes > 0 &&
        instrumento.usosRealizados < instrumento.usosMaximos
    )
}

onMounted(async () => {
    await Promise.all([
        loadCatalogos(),
        loadInstrumentos(),
    ])
})
</script>

<style scoped></style>