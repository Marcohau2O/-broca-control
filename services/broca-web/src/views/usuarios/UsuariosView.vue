<template>
    <div class="w-full">
        <div class="flex flex-col xl:flex-row xl:items-start
                   xl:justify-between gap-space-md">
            <div>
                <div class="flex flex-wrap items-center gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                               tracking-wider text-secondary font-bold">
                        Administración
                    </span>

                    <span class="text-outline-variant">•</span>

                    <span class="font-label-sm text-label-sm
                               text-on-surface-variant font-medium">
                        Control de acceso
                    </span>
                </div>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold tracking-tight">
                    Usuarios
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant mt-1 max-w-2xl">
                    Administra las cuentas de usuario, sus roles
                    y el estado de acceso al sistema.
                </p>
            </div>

            <button type="button" class="h-10 px-4 rounded-lg
                       bg-secondary text-on-secondary
                       font-label-md text-label-md font-bold
                       flex items-center justify-center gap-2
                       hover:bg-primary hover:text-on-primary
                       transition-colors shadow-sm shrink-0" @click="goCreate">
                <span class="material-symbols-outlined text-[18px]">
                    person_add
                </span>

                Nuevo usuario
            </button>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4
                   gap-space-sm mt-space-lg">
            <div class="col-span-2 sm:col-span-1
                       bg-primary-container rounded-xl p-space-md">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <span class="font-label-sm text-label-sm uppercase
                                   tracking-wider text-primary-fixed-dim
                                   font-semibold">
                            Total usuarios
                        </span>

                        <div class="font-headline-lg text-headline-lg
                                   font-bold text-on-primary mt-1">
                            {{ usuarios.length }}
                        </div>
                    </div>

                    <span class="material-symbols-outlined text-[25px]
                               text-secondary-fixed">
                        group
                    </span>
                </div>
            </div>

            <MetricCard label="Activos" :value="String(totalActivos)" icon="verified_user" />

            <MetricCard label="Inactivos" :value="String(totalInactivos)" icon="person_off" />

            <MetricCard label="Administradores" :value="String(totalAdministradores)" icon="admin_panel_settings" />
        </div>

        <section class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm p-space-sm">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_220px_220px]
                       gap-space-sm">
                <div>
                    <label for="buscarUsuario" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Buscar usuario
                    </label>

                    <div class="relative">
                        <span class="material-symbols-outlined absolute
                                   left-3 top-1/2 -translate-y-1/2
                                   text-[20px] text-outline">
                            search
                        </span>

                        <input id="buscarUsuario" v-model="filters.search" type="search"
                            placeholder="Nombre o correo electrónico..." class="w-full h-11 pl-10 pr-4 rounded-lg
                                   bg-surface-container-low text-on-surface
                                   font-body-md text-body-md
                                   placeholder:text-outline
                                   focus:outline-none focus:ring-2
                                   focus:ring-secondary" />
                    </div>
                </div>

                <div>
                    <label for="rolUsuario" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Rol
                    </label>

                    <div class="relative">
                        <select id="rolUsuario" :disabled="loadingRoles || loading" v-model="filters.rol" :class="selectClass">
                            <option value="" disabled>
                                {{ 
                                    loadingRoles
                                        ? 'Cargando roles...'
                                        : 'Todos los roles'    
                                }}
                            </option>

                            <option v-for="rol in roles" :key="rol.id" :value="String(rol.id)">
                                {{ rol.nombre }}
                            </option>

                        </select>

                        <SelectArrow />
                    </div>
                </div>

                <div>
                    <label for="estadoUsuario" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Estado
                    </label>

                    <div class="relative">
                        <select id="estadoUsuario" v-model="filters.estado" :class="selectClass">
                            <option value="">
                                Todos los estados
                            </option>

                            <option value="ACTIVO">
                                Activo
                            </option>

                            <option value="INACTIVO">
                                Inactivo
                            </option>
                        </select>

                        <SelectArrow />
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center
                       sm:justify-between gap-space-xs
                       mt-space-sm pt-space-sm
                       border-t border-surface-container-high">
                <span class="font-body-sm text-body-sm
                           text-on-surface-variant">
                    {{ filteredUsuarios.length }}
                    {{
                        filteredUsuarios.length === 1
                            ? 'usuario encontrado'
                            : 'usuarios encontrados'
                    }}
                </span>

                <button type="button" class="font-label-sm text-label-sm
                           text-secondary font-bold
                           hover:underline self-start sm:self-auto" @click="clearFilters">
                    Limpiar filtros
                </button>
            </div>
        </section>

        <section class="hidden lg:block mt-space-md
                   bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[900px]">
                    <thead class="bg-surface-container-low">
                        <tr>
                            <th :class="thClass">
                                Usuario
                            </th>

                            <th :class="thClass">
                                Rol
                            </th>

                            <th :class="thClass">
                                Estado
                            </th>

                            <th :class="thClass">
                                Última actualización
                            </th>

                            <th class="px-4 py-3 text-right
                                       font-label-sm text-label-sm
                                       uppercase tracking-wider
                                       text-outline font-semibold">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-surface-container-high">
                        <tr v-for="usuario in filteredUsuarios" :key="usuario.id" class="hover:bg-surface-container-low/60
                                   transition-colors">
                            <td class="px-4 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full
                                               bg-primary-container
                                               text-on-primary
                                               flex items-center justify-center
                                               font-label-md text-label-md
                                               font-bold shrink-0">
                                        {{ initials(usuario.nombre) }}
                                    </div>

                                    <div class="min-w-0">
                                        <span class="font-label-md text-label-md
                                                   font-bold text-on-surface
                                                   block">
                                            {{ usuario.nombre }}
                                        </span>

                                        <span class="font-body-sm text-body-sm
                                                   text-on-surface-variant
                                                   block">
                                            {{ usuario.correo }}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-4">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined
                                               text-[18px] text-secondary">
                                        {{
                                            roleIcon(usuario.rol.nombre)
                                        }}
                                    </span>

                                    <span class="font-body-sm text-body-sm
                                               text-on-surface">
                                        {{ usuario.rol.nombre }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-4 py-4">
                                <span class="inline-flex items-center
                                           gap-1.5 px-2.5 py-1
                                           rounded-full font-label-sm
                                           text-label-sm font-bold" :class="usuario.activo
                                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                                            : 'bg-surface-container-highest text-on-surface-variant'
                                            ">
                                    <span class="w-2 h-2 rounded-full" :class="usuario.activo
                                        ? 'bg-secondary'
                                        : 'bg-outline'
                                        "></span>

                                    {{
                                        usuario.activo
                                            ? 'ACTIVO'
                                            : 'INACTIVO'
                                    }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <span class="font-code-md text-code-md
                                           text-on-surface-variant">
                                    {{ formatDateTime(usuario.updatedAt) }}
                                </span>
                            </td>

                            <td class="px-4 py-4">
                                <div class="flex items-center
                                           justify-end gap-1">
                                    <button type="button" :class="iconButtonClass" aria-label="Editar usuario"
                                        title="Editar usuario" @click="goEdit(usuario.id)">
                                        <span class="material-symbols-outlined
                                                   text-[18px]">
                                            edit
                                        </span>
                                    </button>

                                    <button type="button" :class="iconButtonClass" aria-label="Restablecer contraseña"
                                        title="Restablecer contraseña" @click="openPasswordModal(usuario)">
                                        <span class="material-symbols-outlined
                                                   text-[18px]">
                                            password
                                        </span>
                                    </button>

                                    <button :disabled="changingStatusId === usuario.id" type="button" class="w-9 h-9 rounded-lg 
                                               flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed
                                               transition-colors" :class="usuario.activo
                                                ? 'bg-error-container/50 text-error hover:bg-error-container'
                                                : 'bg-secondary-fixed/50 text-on-secondary-fixed hover:bg-secondary-fixed'
                                                " :aria-label="usuario.activo
                                                    ? 'Desactivar usuario'
                                                    : 'Activar usuario'
                                                    " :title="usuario.activo
                                                        ? 'Desactivar usuario'
                                                        : 'Activar usuario'
                                                        " @click="toggleEstado(usuario)">
                                        <span v-if="changingStatusId === usuario.id" class="w-4 h-4 rounded-full
                                        border-2 border-current border-t-transparent animate-spin"></span>

                                        <span v-else class="material-symbols-outlined
                                                   text-[18px]">
                                            {{
                                                usuario.activo
                                                    ? 'person_off'
                                                    : 'person_check'
                                            }}
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <div class="lg:hidden mt-space-md space-y-space-sm">
            <article v-for="usuario in filteredUsuarios" :key="`mobile-${usuario.id}`" class="bg-surface-container-lowest
                       rounded-xl shadow-sm p-space-sm">
                <div class="flex items-start gap-3">
                    <div class="w-11 h-11 rounded-full
                               bg-primary-container text-on-primary
                               flex items-center justify-center
                               font-label-md text-label-md
                               font-bold shrink-0">
                        {{ initials(usuario.nombre) }}
                    </div>

                    <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap items-start
                                   justify-between gap-2">
                            <div class="min-w-0">
                                <h2 class="font-label-md text-label-md
                                           font-bold text-on-surface">
                                    {{ usuario.nombre }}
                                </h2>

                                <p class="font-body-sm text-body-sm
                                           text-on-surface-variant
                                           break-all mt-0.5">
                                    {{ usuario.correo }}
                                </p>
                            </div>

                            <span class="inline-flex items-center gap-1.5
                                       px-2 py-1 rounded-full
                                       font-label-sm text-label-sm
                                       font-bold shrink-0" :class="usuario.activo
                                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                                        : 'bg-surface-container-highest text-on-surface-variant'
                                        ">
                                <span class="w-1.5 h-1.5 rounded-full" :class="usuario.activo
                                    ? 'bg-secondary'
                                    : 'bg-outline'
                                    "></span>

                                {{
                                    usuario.activo
                                        ? 'ACTIVO'
                                        : 'INACTIVO'
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2
                           gap-space-sm mt-space-sm
                           pt-space-sm
                           border-t border-surface-container-high">
                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase text-outline block">
                            Rol
                        </span>

                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="material-symbols-outlined
                                       text-[17px] text-secondary">
                                {{ roleIcon(usuario.rol.nombre) }}
                            </span>

                            <span class="font-body-sm text-body-sm
                                       text-on-surface">
                                {{ usuario.rol.nombre }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <span class="font-label-sm text-label-sm
                                   uppercase text-outline block">
                            Actualizado
                        </span>

                        <span class="font-code-md text-code-md
                                   text-on-surface">
                            {{ formatDateTime(usuario.updatedAt) }}
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3
                           gap-space-xs mt-space-sm">
                    <button type="button" :class="mobileButtonClass" @click="goEdit(usuario.id)">
                        <span class="material-symbols-outlined
                                   text-[17px] text-secondary">
                            edit
                        </span>

                        Editar
                    </button>

                    <button type="button" :class="mobileButtonClass" @click="openPasswordModal(usuario)">
                        <span class="material-symbols-outlined
                                   text-[17px] text-secondary">
                            password
                        </span>

                        Contraseña
                    </button>

                    <button type="button" :disabled="changingStatusId === usuario.id" class="h-9 px-3 rounded-lg font-label-sm text-label-sm
                               font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed
                               transition-colors" :class="usuario.activo
                                ? 'bg-error-container/50 text-error hover:bg-error-container'
                                : 'bg-secondary-fixed/50 text-on-secondary-fixed hover:bg-secondary-fixed'
                                " @click="toggleEstado(usuario)">
                        <span v-if="changingStatusId === usuario.id"
                            class="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>
                        <span v-else class="material-symbols-outlined text-[17px]">
                            {{
                                usuario.activo
                                    ? 'person_off'
                                    : 'person_check'
                            }}
                        </span>

                        {{
                            usuario.activo
                                ? 'Desactivar'
                                : 'Activar'
                        }}
                    </button>
                </div>
            </article>
        </div>

        <div v-if="filteredUsuarios.length === 0" class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm py-space-xl px-space-md
                   text-center">
            <div class="w-14 h-14 mx-auto rounded-full
                       bg-surface-container-high
                       flex items-center justify-center">
                <span class="material-symbols-outlined
                           text-[28px] text-outline">
                    person_search
                </span>
            </div>

            <h2 class="font-headline-sm text-headline-sm
                       font-bold text-on-surface mt-space-sm">
                No se encontraron usuarios
            </h2>

            <p class="font-body-sm text-body-sm
                       text-on-surface-variant mt-1">
                Intenta modificar o limpiar los filtros de búsqueda.
            </p>

            <button type="button" class="mt-space-sm font-label-md text-label-md
                       text-secondary font-bold hover:underline" @click="clearFilters">
                Limpiar filtros
            </button>
        </div>

        <div v-if="filteredUsuarios.length > 0" class="mt-space-md bg-surface-container-lowest
                   rounded-xl shadow-sm px-space-md py-space-sm
                   flex flex-col sm:flex-row sm:items-center
                   sm:justify-between gap-space-sm">
            <span class="font-body-sm text-body-sm
                       text-on-surface-variant">
                Mostrando
                <strong class="text-on-surface">
                    {{ filteredUsuarios.length }}
                </strong>
                usuarios
            </span>

            <!-- <div class="flex items-center gap-1
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

                <button type="button" disabled :class="paginationButtonClass">
                    <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div> -->
        </div>

        <div v-if="passwordUser" class="fixed inset-0 z-[100]
                   flex items-end sm:items-center
                   justify-center sm:p-4">
            <button type="button" aria-label="Cerrar" class="absolute inset-0 bg-black/40
                       backdrop-blur-[1px]" @click="closePasswordModal"></button>

            <div class="relative z-10 w-full sm:max-w-md
                       bg-surface-container-lowest
                       rounded-t-2xl sm:rounded-2xl
                       shadow-xl overflow-hidden">
                <div class="px-space-md py-space-sm
                           border-b border-surface-container-high
                           flex items-start justify-between gap-3">
                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Restablecer contraseña
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            {{ passwordUser.nombre }}
                        </p>
                    </div>

                    <button type="button" class="w-9 h-9 rounded-lg
                               hover:bg-surface-container-high
                               text-on-surface-variant
                               flex items-center justify-center" @click="closePasswordModal">
                        <span class="material-symbols-outlined text-[20px]">
                            close
                        </span>
                    </button>
                </div>

                <form class="p-space-md" @submit.prevent="resetPassword">
                    <label for="newPassword" class="font-label-sm text-label-sm uppercase
                               tracking-wider text-outline
                               font-semibold block mb-1.5">
                        Nueva contraseña
                    </label>

                    <div class="relative">
                        <input id="newPassword" v-model="newPassword" :type="showPassword ? 'text' : 'password'"
                            minlength="12" maxlength="128" required autocomplete="new-password"
                            placeholder="Mínimo 12 caracteres" class="w-full h-11 pl-3 pr-11 rounded-lg
                                   bg-surface-container-low text-on-surface
                                   font-body-md text-body-md
                                   placeholder:text-outline
                                   focus:outline-none focus:ring-2
                                   focus:ring-secondary" />

                        <button type="button" class="absolute right-2 top-1
                                   w-9 h-9 rounded-lg
                                   text-on-surface-variant
                                   hover:bg-surface-container-high
                                   flex items-center justify-center" :aria-label="showPassword
                                    ? 'Ocultar contraseña'
                                    : 'Mostrar contraseña'
                                    " @click="showPassword = !showPassword">
                            <span class="material-symbols-outlined text-[19px]">
                                {{
                                    showPassword
                                        ? 'visibility_off'
                                        : 'visibility'
                                }}
                            </span>
                        </button>
                    </div>

                    <div class="mt-space-sm">
                        <label for="confirmPassword"
                            class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block mb-1.5">
                            Confirmar contraseña
                        </label>

                        <div class="relative">
                            <input id="confirmPassword" v-model="confirmPassword"
                                :type="showPassword ? 'text' : 'password'" minlength="12" maxlength="128" required
                                autocomplete="new-password" placeholder="Repite la nueva contraseña"
                                class="w-full h-11 pl-3 pr-11 rounded-lg
                                    bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary" />

                            <button type="button" class="absolute right-2 top-1 w-9 h-9 rounded-lg text-on-surface-varian
                                hover:bg-surface-container-high flex items-center justify-center" :aria-label="showPassword
                                    ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                                @click="showPassword = !showPassword">
                                <span class="material-symbols-outlined text-[19px]">
                                    {{
                                        showPassword
                                            ? 'visibility_off'
                                            : 'visibility'
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <p class="font-body-sm text-body-sm
                               text-on-surface-variant mt-1.5">
                        La contraseña debe contener entre
                        12 y 128 caracteres.
                    </p>

                    <div v-if="passwordError" class="rounded-lg bg-error-container text-on-error-container
                    px-space-sm py-space-xs font-body-sm text-body-sm">
                        {{ passwordError }}
                    </div>

                    <div class="flex flex-col-reverse sm:flex-row
                               sm:justify-end gap-space-xs
                               mt-space-md">
                        <button :disabled="resettingPassword" type="button" class="h-10 px-4 rounded-lg
                                   bg-surface-container-high
                                   text-on-surface
                                   font-label-md text-label-md
                                   font-semibold" @click="closePasswordModal">
                            Cancelar
                        </button>

                        <button :disabled="resettingPassword" type="submit"
                            class="h-10 px-4 rounded-lg
                                   bg-secondary text-on-secondary
                                   font-label-md text-label-md font-bold
                                   flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="resettingPassword" class="w-4 h-4 rounded-full border-2 border-current
                            border-t-transparent animate-spin"></span>

                            <span v-else class="material-symbols-outlined text-[18px]">
                                lock_reset
                            </span>

                            {{
                                resettingPassword
                                    ? 'Actualizando...'
                                    : 'Restablecer contraseña'
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import { usuariosService } from '@/services/usuarios.service'

import type { Usuario, Rol } from '@/types/usuarios'

import { getApiErrorMessage } from '@/utils/apiError'

const router = useRouter()

const filters = reactive({
    search: '',
    rol: '',
    estado: '',
})

const usuarios = ref<Usuario[]>([])
const loading = ref(false)
const errorMessage = ref('')

const roles = ref<Rol[]>([])
const loadingRoles = ref(false)
const rolesError = ref('')

const passwordUser = ref<Usuario | null>(null)
const changingStatusId = ref<number | null>(null)
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const resettingPassword = ref(false)
const passwordError = ref('')

const loadRoles = async () => {
    if (loadingRoles.value) {
        return
    }

    loadingRoles.value = true
    rolesError.value = ''

    try {
        roles.value = await usuariosService.getAllRoles()
    } catch (error) {
        roles.value = []
        rolesError.value = getApiErrorMessage(error)

        console.error(
            'Error cargando roles:',
            error
        )
    } finally {
        loadingRoles.value = false
    }
}

const loadUsuarios = async () => {
    if (loading.value) {
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        usuarios.value = await usuariosService.getAll()
    } catch (error) {
        usuarios.value = []

        errorMessage.value =
            getApiErrorMessage(error)

        console.error(
            'Error cargando usuarios:',
            error
        )
    } finally {
        loading.value = false
    }
}

const filteredUsuarios = computed(() => {
    const search = filters.search.trim().toLowerCase()

    return usuarios.value.filter(
        (usuario) => {
            const matchesSearch = !search ||
                usuario.nombre.toLowerCase().includes(search) ||
                usuario.correo.toLowerCase().includes(search)

            const matchesRole = !filters.rol ||
                usuario.rolId === Number(filters.rol)

            const matchesStatus = !filters.estado ||
                (filters.estado === 'ACTIVO' && usuario.activo) ||
                (filters.estado === 'INACTIVO' && !usuario.activo)

            return (matchesSearch && matchesRole && matchesStatus)
        }
    )
})

const totalActivos = computed(() =>
    usuarios.value.filter((usuario) => usuario.activo).length
)

const totalInactivos = computed(() =>
    usuarios.value.filter((usuario) => !usuario.activo).length
)

const totalAdministradores = computed(() =>
    usuarios.value.filter(
        (usuario) =>
            usuario.rol.nombre === 'Administrador' &&
            usuario.activo
    ).length
)

const formatDateTime = (value: string): string => {
    return new Intl.DateTimeFormat(
        'es-MX',
        {
            dateStyle: 'medium',
            timeStyle: 'short',
        }
    ).format(new Date(value))
}

const toggleEstado = async (usuario: Usuario) => {
    if (changingStatusId.value !== null) {
        return
    }

    const nuevoEstado = !usuario.activo

    changingStatusId.value = usuario.id

    try {
        const actualizado = await usuariosService.updateEstado(
            usuario.id,
            nuevoEstado
        )

        const index = usuarios.value.findIndex(
            (item) => item.id === usuario.id
        )

        if (index !== -1) {
            usuarios.value[index] = actualizado
        }
    } catch (error) {
        console.error('Error actualizando estado:', error)

        window.alert(getApiErrorMessage(error))
    } finally {
        changingStatusId.value = null
    }
}

const resetPassword = async () => {
    if (!passwordUser.value || resettingPassword.value) {
        return
    }

    passwordError.value = ''

    if (newPassword.value.length < 12) {
        passwordError.value = 'La contraseña debe tener al menos 12 caracteres.'
        return
    }

    if (newPassword.value.length > 128) {
        passwordError.value = 'La contraseña no puede superar 128 caracteres.'
        return
    }

    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = 'Las contraseñas no coinciden.'
        return
    }

    resettingPassword.value = true

    try {
        await usuariosService.updatePassword(
            passwordUser.value.id,
            newPassword.value
        )

        resettingPassword.value = false

        closePasswordModal()

        window.alert('Contraseña actualizada correctamente.')
    } catch (error) {
        passwordError.value = getApiErrorMessage(error)

        console.error('Error actualizando contraseña:', error)
    } finally {
        resettingPassword.value = false
    }
}

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const thClass =
    'px-4 py-3 text-left font-label-sm text-label-sm ' +
    'uppercase tracking-wider text-outline font-semibold'

const iconButtonClass =
    'w-9 h-9 rounded-lg bg-surface-container-low ' +
    'text-on-surface-variant hover:bg-surface-container-high ' +
    'hover:text-secondary transition-colors ' +
    'flex items-center justify-center'

const mobileButtonClass =
    'h-9 px-3 rounded-lg bg-surface-container-high ' +
    'text-on-surface font-label-sm text-label-sm ' +
    'font-semibold flex items-center justify-center gap-1.5 ' +
    'hover:bg-surface-container-highest transition-colors'

const paginationButtonClass =
    'w-9 h-9 rounded-lg text-on-surface-variant ' +
    'hover:bg-surface-container-high flex items-center ' +
    'justify-center disabled:opacity-40 disabled:cursor-not-allowed'

const clearFilters = () => {
    filters.search = ''
    filters.rol = ''
    filters.estado = ''
}

const initials = (name: string) => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

const roleIcon = (role: string): string => {
    const icons: Record<string, string> = {
        Administrador: 'admin_panel_settings',
        'Inventarios / Almacén': 'inventory_2',
        'Usuario Operativo': 'medical_services',
        Supervisor: 'supervisor_account',
    }

    return icons[role] ?? 'manage_accounts'
}

const goCreate = () => {
    router.push('usuarios/nuevo')
}

const goEdit = (id: number) => {
    router.push(`usuarios/${id}/editar`)
}

const openPasswordModal = (usuario: Usuario) => {
    passwordUser.value = usuario
    newPassword.value = ''
    confirmPassword.value = ''
    passwordError.value = ''
}

const closePasswordModal = () => {
    if (resettingPassword.value) {
        return
    }

    passwordUser.value = null
    newPassword.value = ''
    confirmPassword.value = ''
    passwordError.value = ''
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

const MetricCard = (props: {
    label: string
    value: string
    icon: string
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
                                    'font-bold text-on-surface mt-1',
                            },
                            props.value
                        ),
                    ]),

                    h(
                        'span',
                        {
                            class:
                                'material-symbols-outlined ' +
                                'text-[24px] text-secondary',
                        },
                        props.icon
                    ),
                ]
            ),
        ]
    )


onMounted(() => {
    loadUsuarios()
    loadRoles()
})
</script>