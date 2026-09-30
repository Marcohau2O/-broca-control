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
                        Seguridad y control
                    </span>

                    <span class="text-outline-variant">
                        •
                    </span>

                    <span class="font-label-sm text-label-sm
                               text-on-surface-variant font-medium">
                        Registro del sistema
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Auditoría
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Consulta las acciones registradas por el sistema,
                    los usuarios que las ejecutaron y su resultado.
                </p>
            </div>

            <button type="button" class="h-10 px-4 rounded-lg
                       bg-surface-container-lowest
                       text-on-surface
                       font-label-md text-label-md font-semibold
                       flex items-center justify-center gap-2
                       hover:bg-surface-container-high
                       transition-colors shadow-sm shrink-0" :disabled="loading" @click="loadAuditorias">
                <span class="material-symbols-outlined
                           text-[18px] text-secondary" :class="{ 'animate-spin': loading }">
                    {{ loading ? 'progress_activity' : 'refresh' }}
                </span>

                {{ loading ? 'Actualizando...' : 'Actualizar' }}
            </button>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4
                   gap-space-sm mt-space-lg">
            <div class="col-span-2 sm:col-span-1
                       bg-primary-container
                       rounded-xl p-space-md">
                <div class="flex items-start
                           justify-between gap-3">
                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-primary-fixed-dim
                                   font-semibold">
                            Registros
                        </span>

                        <div class="font-headline-lg text-headline-lg
                                   font-bold text-on-primary mt-1">
                            {{ auditorias.length }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined
                               text-[25px] text-secondary-fixed">
                        policy
                    </span>
                </div>
            </div>

            <MetricCard label="Exitosos" :value="String(totalExitosos)" icon="check_circle" />

            <MetricCard label="Rechazados" :value="String(totalRechazados)" icon="cancel" danger />

            <MetricCard label="Usuarios" :value="String(totalUsuarios)" icon="group" />
        </div>

        <section class="mt-space-md
                   bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <div>
                <label for="buscarAuditoria" class="font-label-sm text-label-sm uppercase
                           tracking-wider text-outline
                           font-semibold block mb-1.5">
                    Buscar
                </label>

                <div class="relative">
                    <span class="material-symbols-outlined
                               absolute left-3 top-1/2
                               -translate-y-1/2
                               text-[20px] text-outline">
                        search
                    </span>

                    <input id="buscarAuditoria" v-model="filters.search" type="search"
                        placeholder="Buscar por usuario, acción o recurso..." class="w-full h-11 pl-10 pr-4
                               rounded-lg
                               bg-surface-container-low
                               text-on-surface
                               font-body-md text-body-md
                               placeholder:text-outline
                               focus:outline-none focus:ring-2
                               focus:ring-secondary" />
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2
                       xl:grid-cols-2 gap-space-sm
                       mt-space-sm">
                <div>
                    <label for="resultadoAuditoria" :class="filterLabelClass">
                        Resultado
                    </label>

                    <div class="relative">
                        <select id="resultadoAuditoria" v-model="filters.resultado" :class="selectClass">
                            <option value="">
                                Todos
                            </option>

                            <option value="EXITOSO">
                                Exitoso
                            </option>

                            <option value="RECHAZADO">
                                Rechazado
                            </option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <div>
                    <label for="usuarioAuditoria" :class="filterLabelClass">
                        Usuario
                    </label>

                    <div class="relative">
                        <select id="usuarioAuditoria" v-model="filters.usuarioId" :class="selectClass">
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
            </div>

            <div class="flex flex-col sm:flex-row
                       sm:items-center sm:justify-between
                       gap-space-xs mt-space-sm pt-space-sm
                       border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm
                           text-on-surface-variant">
                    {{ filteredAuditorias.length }}
                    {{
                        filteredAuditorias.length === 1
                            ? 'registro encontrado'
                            : 'registros encontrados'
                    }}
                </span>

                <button type="button" class="font-label-sm text-label-sm
                           text-secondary font-bold
                           hover:underline
                           self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </section>

        <div class="mt-space-md rounded-xl
                   bg-primary-container px-space-md py-space-sm
                   flex items-start gap-3">
            <span class="material-symbols-outlined
                       text-[20px] text-secondary-fixed
                       shrink-0 mt-0.5">
                lock
            </span>

            <div>
                <span class="font-label-md text-label-md
                           font-bold text-on-primary">
                    Registro de auditoría
                </span>

                <p class="font-body-sm text-body-sm
                           text-primary-fixed-dim mt-0.5">
                    Estos registros documentan acciones del sistema
                    y se presentan únicamente para consulta.
                </p>
            </div>
        </div>

        <div v-if="loading" class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm min-h-[260px]
            flex flex-col items-center justify-center px-space-md py-space-xl">
            <span class="material-symbols-outlined
               text-[36px] text-secondary
               animate-spin">
                progress_activity
            </span>

            <span class="font-label-md text-label-md
               font-semibold text-on-surface
               mt-space-sm">
                Cargando información...
            </span>

            <span class="font-body-sm text-body-sm
               text-on-surface-variant mt-1">
                Consultando registros de auditoría
            </span>
        </div>

        <div v-else-if="errorMessage" class="mt-space-md bg-surface-container-lowest rounded-xl shadow-sm
            min-h-[260px] flex flex-col items-center justify-center px-space-md py-space-xl text-center">
            <div class="w-14 h-14 rounded-full bg-error-container flex items-center justify-center">
                <span class="material-symbols-outlined text-[28px] text-error">
                    error
                </span>
            </div>

            <h2 class="font-headline-sm text-headline-sm font-bold text-on-surface mt-space-sm">
                No se pudo cargar la auditoría
            </h2>

            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-md">
                {{ errorMessage }}
            </p>

            <button type="button" class="h-10 px-4 mt-space-md rounded-lg bg-primary-container text-on-primary
               font-label-md text-label-md font-bold inline-flex items-center justify-center gap-2 hover:opacity-90
               transition-opacity" @click="loadAuditorias">
                <span class="material-symbols-outlined
                   text-[18px]">
                    refresh
                </span>

                Reintentar
            </button>
        </div>

        <template v-else>
            <section class="hidden lg:block mt-space-md
                    bg-surface-container-lowest
                    rounded-xl shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[1050px]">
                        <thead class="bg-surface-container-low">
                            <tr>
                                <th :class="thClass">
                                    Fecha y hora
                                </th>

                                <th :class="thClass">
                                    Usuario
                                </th>

                                <th :class="thClass">
                                    Acción
                                </th>

                                <th :class="thClass">
                                    Recurso
                                </th>

                                <th :class="thClass">
                                    Resultado
                                </th>

                                <th class="px-4 py-3 text-right
                                        font-label-sm text-label-sm
                                        uppercase tracking-wider
                                        text-outline font-semibold">
                                    Detalle
                                </th>
                            </tr>
                        </thead>

                        <tbody class="divide-y
                                divide-surface-container-high">
                            <tr v-for="audit in filteredAuditorias" :key="audit.id" class="hover:bg-surface-container-low/60
                                    transition-colors">
                                <td class="px-4 py-4
                                        align-top whitespace-nowrap">
                                    <span class="font-code-md text-code-md
                                            text-on-surface font-medium">
                                        {{ formatDate(audit.fechaHora) }}
                                    </span>

                                    <span class="font-code-md text-code-md
                                            text-on-surface-variant
                                            block mt-0.5">
                                        {{ formatTime(audit.fechaHora) }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-8 h-8 rounded-full
                                                bg-primary-container
                                                text-on-primary
                                                flex items-center
                                                justify-center
                                                font-label-sm text-label-sm
                                                font-bold shrink-0">
                                            {{ initials(audit.usuario?.nombre ?? 'Sistema') }}
                                        </div>

                                        <div>
                                            <span class="font-body-sm text-body-sm
                                                    font-medium
                                                    text-on-surface block">
                                                {{ audit.usuario?.nombre ?? 'Sistema' }}
                                            </span>

                                            <span class="font-body-sm text-body-sm
                                                    text-on-surface-variant">
                                                {{ audit.usuario?.rol.nombre ?? 'Sin usuario' }}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span class="font-code-md text-code-md
                                            text-on-surface font-semibold">
                                        {{ audit.accion }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span class="font-body-sm text-body-sm
                                            text-on-surface block">
                                        {{ audit.modulo }}
                                    </span>

                                    <span v-if="audit.registroId" class="font-code-md text-code-md
                                            text-secondary block mt-0.5">
                                        {{ audit.registroId }}
                                    </span>
                                </td>

                                <td class="px-4 py-4 align-top">
                                    <span class="inline-flex items-center
                                            gap-1.5 px-2.5 py-1
                                            rounded-full
                                            font-label-sm text-label-sm
                                            font-bold" :class="resultadoClass(
                                                audit.resultado
                                            )
                                                ">
                                        <span class="material-symbols-outlined
                                                text-[15px]">
                                            {{
                                                audit.resultado === 'EXITOSO'
                                                    ? 'check_circle'
                                                    : 'cancel'
                                            }}
                                        </span>

                                        {{ audit.resultado }}
                                    </span>
                                </td>

                                <td class="px-4 py-4
                                        align-top text-right">
                                    <button type="button" class="w-9 h-9 rounded-lg
                                            bg-surface-container-low
                                            text-on-surface-variant
                                            hover:bg-surface-container-high
                                            hover:text-secondary
                                            transition-colors
                                            inline-flex items-center
                                            justify-center" title="Ver detalle" aria-label="Ver detalle"
                                        @click="openDetail(audit)">
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


            <div class="lg:hidden mt-space-md
                    space-y-space-sm">
                <article v-for="audit in filteredAuditorias" :key="`mobile-${audit.id}`" class="bg-surface-container-lowest
                        rounded-xl shadow-sm p-space-sm">
                    <div class="flex items-start
                            justify-between gap-3">
                        <div>
                            <span class="font-code-md text-code-md
                                    text-on-surface font-bold">
                                {{ audit.accion }}
                            </span>

                            <span class="font-body-sm text-body-sm
                                    text-on-surface-variant
                                    block mt-0.5">
                                {{ audit.modulo }}

                                <template v-if="audit.registroId">
                                    · {{ audit.registroId }}
                                </template>
                            </span>
                        </div>

                        <span class="inline-flex items-center gap-1
                                px-2 py-1 rounded-full
                                font-label-sm text-label-sm
                                font-bold shrink-0" :class="resultadoClass(
                                    audit.resultado
                                )
                                    ">
                            <span class="material-symbols-outlined
                                    text-[14px]">
                                {{
                                    audit.resultado === 'EXITOSO'
                                        ? 'check_circle'
                                        : 'cancel'
                                }}
                            </span>

                            {{ audit.resultado }}
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2
                            gap-space-sm mt-space-sm
                            pt-space-sm
                            border-t
                            border-surface-container-high">
                        <div>
                            <span class="font-label-sm text-label-sm
                                    uppercase text-outline block">
                                Usuario
                            </span>

                            <span class="font-body-sm text-body-sm
                                    text-on-surface font-medium">
                                {{ audit.usuario?.nombre ?? 'Sistema' }}
                            </span>

                            <span class="font-body-sm text-body-sm
                                    text-on-surface-variant block">
                                {{ audit.usuario?.rol.nombre ?? 'Sin usuario' }}
                            </span>
                        </div>

                        <div>
                            <span class="font-label-sm text-label-sm
                                    uppercase text-outline block">
                                Fecha
                            </span>

                            <span class="font-code-md text-code-md
                                    text-on-surface">
                                {{ formatDate(audit.fechaHora) }} · {{ formatTime(audit.fechaHora) }}
                            </span>
                        </div>
                    </div>

                    <button type="button" class="w-full h-9 mt-space-sm
                            rounded-lg
                            bg-surface-container-high
                            text-on-surface
                            font-label-sm text-label-sm
                            font-semibold
                            flex items-center justify-center
                            gap-1.5
                            hover:bg-surface-container-highest
                            transition-colors" @click="openDetail(audit)">
                        <span class="material-symbols-outlined
                                text-[17px] text-secondary">
                            visibility
                        </span>

                        Ver detalle
                    </button>
                </article>
            </div>

            <div v-if="filteredAuditorias.length === 0" class="mt-space-md
                    bg-surface-container-lowest
                    rounded-xl shadow-sm
                    py-space-xl px-space-md text-center">
                <div class="w-14 h-14 mx-auto
                        rounded-full
                        bg-surface-container-high
                        flex items-center justify-center">
                    <span class="material-symbols-outlined
                            text-[27px] text-outline">
                        manage_search
                    </span>
                </div>

                <h2 class="font-headline-sm text-headline-sm
                        font-bold text-on-surface mt-space-sm">
                    No se encontraron registros
                </h2>

                <p class="font-body-sm text-body-sm
                        text-on-surface-variant mt-1">
                    Modifica los filtros para consultar
                    otros registros de auditoría.
                </p>

                <button type="button" class="mt-space-sm
                        font-label-md text-label-md
                        text-secondary font-bold
                        hover:underline" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>

            <!-- <div v-if="filteredAuditorias.length > 0" class="mt-space-md
                    bg-surface-container-lowest
                    rounded-xl shadow-sm
                    px-space-md py-space-sm
                    flex flex-col sm:flex-row
                    sm:items-center sm:justify-between
                    gap-space-sm">
                <span class="font-body-sm text-body-sm
                        text-on-surface-variant">
                    Mostrando
                    <strong class="text-on-surface">
                        {{ filteredAuditorias.length }}
                    </strong>
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
                            bg-primary-container
                            text-on-primary
                            font-label-sm text-label-sm
                            font-bold">
                        1
                    </button>

                    <button type="button" disabled :class="paginationButtonClass">
                        <span class="material-symbols-outlined text-[18px]">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div> -->
        </template>

        <div v-if="selectedAudit" class="fixed inset-0 z-[100]
                   flex items-end sm:items-center
                   justify-center sm:p-4">
            <button type="button" class="absolute inset-0
                       bg-black/40 backdrop-blur-[1px]" aria-label="Cerrar" @click="closeDetail"></button>

            <div class="relative z-10
                       w-full sm:max-w-xl
                       bg-surface-container-lowest
                       rounded-t-2xl sm:rounded-2xl
                       shadow-xl overflow-hidden">
                <div class="px-space-md py-space-sm
                           border-b
                           border-surface-container-high
                           flex items-start
                           justify-between gap-3">
                    <div>
                        <div class="flex items-center
                                   gap-space-xs">
                            <span class="font-label-sm text-label-sm
                                       uppercase tracking-wider
                                       text-secondary font-bold">
                                Auditoría
                            </span>

                            <span class="inline-flex items-center
                                       px-2 py-0.5 rounded-full
                                       font-label-sm text-label-sm
                                       font-bold" :class="resultadoClass(
                                        selectedAudit.resultado
                                    )
                                        ">
                                {{ selectedAudit.resultado }}
                            </span>
                        </div>

                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface mt-1">
                            {{ selectedAudit.accion }}
                        </h2>
                    </div>

                    <button type="button" class="w-9 h-9 rounded-lg
                               text-on-surface-variant
                               hover:bg-surface-container-high
                               flex items-center justify-center" aria-label="Cerrar" @click="closeDetail">
                        <span class="material-symbols-outlined
                                   text-[20px]">
                            close
                        </span>
                    </button>
                </div>

                <div class="p-space-md max-h-[70vh] overflow-y-auto">
                    <div v-if="loadingDetail" class="min-h-[260px] flex flex-col items-center justify-center">
                        <span class="material-symbols-outlined text-[34px] text-secondary animate-spin">
                            progress_activity
                        </span>

                        <span class="font-label-md text-label-md font-semibold text-on-surface  mt-space-sm">
                            Cargando detalle...
                        </span>

                        <span class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                            Consultando registro de auditoría
                        </span>
                    </div>

                    <div v-else-if="detailError" class="rounded-lg bg-error-container/50 p-space-md">
                        <div class="flex items-start gap-2">
                            <span class="material-symbols-outlined text-[20px] text-error">
                                error
                            </span>

                            <div>
                                <span class="font-label-sm text-label-sm font-bold text-error">
                                    No se pudo cargar el detalle
                                </span>

                                <p class="font-body-sm text-body-sm text-on-error-container mt-1">
                                    {{ detailError }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="rounded-xl bg-surface-container-low p-space-md">
                            <div class="flex items-center gap-3  mb-space-md">
                                <div
                                    class="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined  text-[20px] text-secondary-fixed">
                                        receipt_long
                                    </span>
                                </div>

                                <div>
                                    <h3 class="font-label-md text-label-md  font-bold text-on-surface">
                                        Información del registro
                                    </h3>

                                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                        Datos generales de la acción registrada
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1  sm:grid-cols-2 gap-x-space-lg gap-y-space-md">
                                <AuditField label="Fecha y hora" :value="`${formatDate(selectedAudit.fechaHora)} · ${formatTime(selectedAudit.fechaHora)}`
                                    " />

                                <AuditField label="Usuario" :value="selectedAudit.usuario?.nombre ??
                                    'Sistema'
                                    " />

                                <AuditField label="Rol" :value="selectedAudit.usuario?.rol.nombre ??
                                    'Sin usuario'
                                    " />

                                <AuditField label="Módulo" :value="selectedAudit.modulo" />

                                <AuditField label="Referencia" :value="selectedAudit.registroId ??
                                    'Sin referencia'
                                    " />

                                <div>
                                    <span
                                        class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
                                        Resultado
                                    </span>

                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-1
                                        font-label-sm text-label-sm font-bold"
                                        :class="resultadoClass(selectedAudit.resultado)">
                                        <span class="material-symbols-outlined text-[15px]">
                                            {{
                                                selectedAudit.resultado === 'EXITOSO'
                                                    ? 'check_circle'
                                                    : 'cancel'
                                            }}
                                        </span>

                                        {{ selectedAudit.resultado }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-sm">
                            <div class="rounded-xl border border-surface-container-high p-space-md">
                                <div class="flex items-start gap-3">
                                    <div
                                        class="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center shrink-0">
                                        <span class="material-symbols-outlined  text-[18px] text-on-secondary-fixed">
                                            bolt
                                        </span>
                                    </div>

                                    <div class="min-w-0 flex-1">
                                        <AuditField label="Acción realizada" :value="selectedAudit.accion" />
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-xl  border border-surface-container-high p-space-md">
                                <div class="flex items-start gap-3">
                                    <div
                                        class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                                        <span class="material-symbols-outlined text-[18px] text-on-surface-variant">
                                            description
                                        </span>
                                    </div>

                                    <div class="min-w-0 flex-1">
                                        <div class="rounded-lg bg-surface-container-low px-3 py-2.5">
                                            <AuditField label="Descripción" :value="selectedAudit.descripcion ??
                                                'Sin descripción'
                                                " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="hasAuditData(selectedAudit.datosAnteriores) || hasAuditData(selectedAudit.datosNuevos)"
                        class="mt-space-md pt-space-md border-t border-surface-container-high">
                        <div>
                            <span
                                class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                                Cambios registrados
                            </span>

                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                Información registrada antes y después
                                de realizar la acción.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-space-sm">
                            <div class="rounded-xl bg-surface-container-low p-space-sm">
                                <div class="flex items-center gap-2 mb-space-sm">
                                    <span class="material-symbols-outlined text-[18px] text-on-surface-variant">
                                        history
                                    </span>

                                    <span class="font-label-md text-label-md font-bold text-on-surface">
                                        Datos anteriores
                                    </span>
                                </div>

                                <div v-if="hasAuditData(selectedAudit.datosAnteriores)" class="space-y-2">
                                    <div v-for="(value, key) in
                                        (selectedAudit.datosAnteriores as Record<string, unknown>)" :key="String(key)"
                                        class="rounded-lg bg-surface-container-lowest px-3 py-2">
                                        <span class="font-label-sm text-label-sm text-outline block">
                                            {{ formatFieldName(String(key)) }}
                                        </span>

                                        <span
                                            class="font-code-md text-code-md text-on-surface font-medium break-all block mt-0.5">
                                            {{ formatAuditValue(value) }}
                                        </span>
                                    </div>
                                </div>

                                <p v-else class="font-body-sm text-body-sm text-on-surface-variant">
                                    Sin datos anteriores
                                </p>
                            </div>

                            <div class="rounded-xl bg-surface-container-low p-space-sm">
                                <div class="flex items-center gap-2 mb-space-sm">
                                    <span class="material-symbols-outlined text-[18px] text-secondary">
                                        update
                                    </span>

                                    <span class="font-label-md text-label-md font-bold text-on-surface">
                                        Datos nuevos
                                    </span>
                                </div>

                                <div v-if="hasAuditData(selectedAudit.datosNuevos)" class="space-y-2">
                                    <div v-for="(value, key) in (selectedAudit.datosNuevos as Record<string, unknown>)"
                                        :key="String(key)" class="rounded-lg bg-surface-container-lowest px-3 py-2">
                                        <span class="font-label-sm text-label-sm text-outline block">
                                            {{ formatFieldName(String(key)) }}
                                        </span>

                                        <span
                                            class="font-code-md text-code-md text-on-surface font-medium break-all block mt-0.5">
                                            {{ formatAuditValue(value) }}
                                        </span>
                                    </div>
                                </div>

                                <p v-else class="font-body-sm text-body-sm text-on-surface-variant">
                                    Sin datos nuevos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-space-md py-space-sm
                           border-t
                           border-surface-container-high
                           flex justify-end">
                    <button type="button" class="h-10 px-4 rounded-lg
                               bg-primary-container
                               text-on-primary
                               font-label-md text-label-md
                               font-bold" @click="closeDetail">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref, watch } from 'vue'

import { auditoriaService } from '@/services/auditoria.service'
import { usuariosService } from '@/services/usuarios.service'

import type { Auditoria, ResultadoAuditoria } from '@/types/auditoria'
import type { Usuario } from '@/types/usuarios'

import { getApiErrorMessage } from '@/utils/apiError'

const filters = reactive({
    search: '',
    resultado: '',
    usuarioId: '',
})

const selectedAudit = ref<Auditoria | null>(null)
const loadingDetail = ref(false)
const detailError = ref('')

const auditorias = ref<Auditoria[]>([])
const usuarios = ref<Usuario[]>([])

const loadingUsuarios = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const loadAuditorias = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
        auditorias.value = await auditoriaService.getAll({
            usuarioId: filters.usuarioId
                ? Number(filters.usuarioId)
                : undefined,

            resultado: filters.resultado
                ? filters.resultado as
                'EXITOSO' | 'RECHAZADO'
                : undefined,
        })
    } catch (error) {
        auditorias.value = []
        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando auditoría:', error)
    } finally {
        loading.value = false
    }
}

const loadUsuarios = async () => {
    if (loadingUsuarios.value) {
        return
    }

    loadingUsuarios.value = true

    try {
        usuarios.value = await usuariosService.getAll()
    } catch (error) {
        usuarios.value = []

        console.error(
            'Error cargando usuarios:',
            error
        )
    } finally {
        loadingUsuarios.value = false
    }
}

const filteredAuditorias = computed(() => {
    const search = filters.search.trim().toLowerCase()

    if (!search) {
        return auditorias.value
    }

    return auditorias.value.filter(
        (audit) => {
            const usuario = audit.usuario?.nombre?.toLowerCase() ?? ''
            const accion = audit.accion.toLowerCase()
            const modulo = audit.modulo.toLowerCase()
            const registroId = audit.registroId?.toLowerCase() ?? ''
            const descripcion = audit.descripcion?.toLowerCase() ?? ''

            return (
                usuario.includes(search) ||
                accion.includes(search) ||
                modulo.includes(search) ||
                registroId.includes(search) ||
                descripcion.includes(search)
            )
        }
    )
})

const totalExitosos = computed(() =>
    auditorias.value.filter(
        (audit) =>
            audit.resultado === 'EXITOSO'
    ).length
)

const totalRechazados = computed(() =>
    auditorias.value.filter(
        (audit) =>
            audit.resultado === 'RECHAZADO'
    ).length
)

const totalUsuarios = computed(() => {
    return new Set(
        auditorias.value
            .map((audit) => audit.usuario?.id)
            .filter(
                (id): id is number =>
                    id !== undefined
            )
    ).size
})

const formatDate = (value: string | null | undefined): string => {
    if (!value) {
        return 'Sin fecha'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        console.warn('fechaHora inválida:', value)

        return 'Fecha inválida'
    }

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            dateStyle: 'medium',
        }
    ).format(date)
}

const formatTime = (value: string | null | undefined): string => {
    if (!value) {
        return '--:--'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        console.warn('fechaHora inválida:', value)

        return '--:--'
    }

    return new Intl.DateTimeFormat(
        'es-MX',
        {
            hour: '2-digit',
            minute: '2-digit',
        }
    ).format(date)
}

const hasAuditData = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return false
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(
            value as Record<string, unknown>
        ).length > 0
    }

    return true
}

const formatFieldName = (key: string): string => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .trim()
        .replace(
            /^\w/,
            (letter) => letter.toUpperCase()
        )
}

const formatAuditValue = (value: unknown): string => {
    if (value === null || value === undefined) {
        return 'Sin valor'
    }

    if (typeof value === 'boolean') {
        return value ? 'Sí' : 'No'
    }

    if (typeof value === 'object') {
        return JSON.stringify(value)
    }

    return String(value)
}

const filterLabelClass =
    'font-label-sm text-label-sm uppercase ' +
    'tracking-wider text-outline ' +
    'font-semibold block mb-1.5'

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

// const inputClass =
//     'w-full h-11 px-3 rounded-lg ' +
//     'bg-surface-container-low text-on-surface ' +
//     'font-body-md text-body-md ' +
//     'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left ' +
    'font-label-sm text-label-sm uppercase ' +
    'tracking-wider text-outline font-semibold'

// const paginationButtonClass =
//     'w-9 h-9 rounded-lg ' +
//     'text-on-surface-variant ' +
//     'hover:bg-surface-container-high ' +
//     'flex items-center justify-center ' +
//     'disabled:opacity-40 ' +
//     'disabled:cursor-not-allowed'

const clearFilters = () => {
    filters.search = ''
    filters.resultado = ''
    filters.usuarioId = ''
}

const initials = (name: string) => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(
            (part) =>
                part.charAt(0).toUpperCase()
        )
        .join('')
}

const resultadoClass = (
    resultado: ResultadoAuditoria
) => {
    if (resultado === 'RECHAZADO') {
        return (
            'bg-error-container ' +
            'text-on-error-container'
        )
    }

    return (
        'bg-secondary-fixed ' +
        'text-on-secondary-fixed'
    )
}

const openDetail = async (audit: Auditoria) => {
    selectedAudit.value = audit
    loadingDetail.value = true
    detailError.value = ''

    try {
        selectedAudit.value = await auditoriaService.getById(audit.id)
    } catch (error) {
        detailError.value = getApiErrorMessage(error)

        console.error('Error cargando detalle de auditoría:', error)
    } finally {
        loadingDetail.value = false
    }
}

const closeDetail = () => {
    selectedAudit.value = null
    detailError.value = ''
    loadingDetail.value = false
}

const SelectArrow = () =>
    h(
        'span',
        {
            class:
                'material-symbols-outlined ' +
                'absolute right-3 top-3 ' +
                'text-[18px] text-outline ' +
                'pointer-events-none',
        },
        'expand_more'
    )

const MetricCard = (props: {
    label: string
    value: string
    icon: string
    danger?: boolean
}) =>
    h(
        'div',
        {
            class:
                'bg-surface-container-lowest ' +
                'rounded-xl shadow-sm p-space-md',
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
                    h('div', [
                        h(
                            'span',
                            {
                                class:
                                    'font-body-sm text-body-sm ' +
                                    'text-on-surface font-medium ' +
                                    'leading-relaxed block mt-1 ' +
                                    'break-words whitespace-normal'
                            },
                            props.label
                        ),

                        h(
                            'div',
                            {
                                class:
                                    'font-headline-lg text-headline-lg ' +
                                    'font-bold mt-1 ' +
                                    (
                                        props.danger
                                            ? 'text-error'
                                            : 'text-on-surface'
                                    ),
                            },
                            props.value
                        ),
                    ]),

                    h(
                        'span',
                        {
                            class:
                                'material-symbols-outlined ' +
                                'text-[24px] ' +
                                (
                                    props.danger
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

const AuditField = (props: {
    label: string
    value: string
}) =>
    h('div', [
        h(
            'span',
            {
                class:
                    'font-label-sm text-label-sm ' +
                    'uppercase tracking-wider ' +
                    'text-outline font-semibold block',
            },
            props.label
        ),

        h(
            'span',
            {
                class:
                    'font-body-sm text-body-sm ' +
                    'text-on-surface font-medium ' +
                    'block mt-1 break-words',
            },
            props.value
        ),
    ])

onMounted(async () => {
    await Promise.all([
        loadAuditorias(),
        loadUsuarios(),
    ])
})

watch(
    [
        () => filters.usuarioId,
        () => filters.resultado,
    ],
    () => {
        loadAuditorias()
    }
)
</script>