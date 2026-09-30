<template>
    <form class="space-y-space-md" @submit.prevent="submitForm">
        <section class="bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-[20px] text-secondary mt-0.5">
                        person
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Datos del usuario
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            Información utilizada para identificar
                            al usuario dentro del sistema.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2
                           gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="nombre" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Nombre
                            <span class="text-error">*</span>
                        </label>

                        <input id="nombre" v-model.trim="form.nombre" type="text" required autocomplete="name"
                            placeholder="Nombre completo" :class="inputClass" />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="correo" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Correo electrónico
                            <span class="text-error">*</span>
                        </label>

                        <input id="correo" v-model.trim="form.correo" type="email" required autocomplete="email"
                            placeholder="usuario@hospital.local" :class="inputClass" />
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-[20px] text-secondary mt-0.5">
                        admin_panel_settings
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Acceso y rol
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            Define el rol que determinará los permisos
                            disponibles para esta cuenta.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2
                           gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="rol" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Rol
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <select id="rol" v-model="form.rolId" :disabled="loadingRoles || loading" required
                                :class="selectClass">
                                <option value="" disabled>
                                    {{
                                        loadingRoles
                                            ? 'Cargando roles...'
                                            : 'Selecciona un rol'
                                    }}
                                </option>

                                <option v-for="rol in roles" :key="rol.id" :value="String(rol.id)">
                                    {{ rol.nombre }}
                                </option>
                            </select>
                            <p v-if="rolesError" class="mt-1.5 font-body-sm text-body-sm text-error">
                                {{ rolesError }}
                            </p>

                            <span class="material-symbols-outlined
                                       absolute right-3 top-3
                                       text-[18px] text-outline
                                       pointer-events-none">
                                expand_more
                            </span>
                        </div>

                        <span class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                            Los permisos se asignan mediante el rol.
                        </span>
                    </div>

                    <div v-if="mode === 'edit'" class="flex flex-col gap-1.5">
                        <span class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Estado de la cuenta
                        </span>

                        <div class="h-11 px-3 rounded-lg
                                   bg-surface-container-low
                                   flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full" :class="activo
                                    ? 'bg-secondary'
                                    : 'bg-outline'
                                    "></span>

                                <span class="font-label-md text-label-md
                                           font-semibold text-on-surface">
                                    {{
                                        activo
                                            ? 'Usuario activo'
                                            : 'Usuario inactivo'
                                    }}
                                </span>
                            </div>

                            <span class="font-label-sm text-label-sm
                                       font-bold" :class="activo
                                        ? 'text-secondary'
                                        : 'text-outline'
                                        ">
                                {{ activo ? 'ACTIVO' : 'INACTIVO' }}
                            </span>
                        </div>

                        <span class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                            El estado se administra desde el listado
                            de usuarios.
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="mode === 'create'" class="bg-surface-container-lowest
                   rounded-xl shadow-sm overflow-hidden">
            <div class="px-space-md py-space-sm
                       border-b border-surface-container-high">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined
                               text-[20px] text-secondary mt-0.5">
                        password
                    </span>

                    <div>
                        <h2 class="font-headline-sm text-headline-sm
                                   font-bold text-on-surface">
                            Contraseña inicial
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-0.5">
                            Define la contraseña con la que el usuario
                            podrá iniciar sesión.
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-space-md">
                <div class="grid grid-cols-1 md:grid-cols-2
                           gap-space-md">
                    <div class="flex flex-col gap-1.5">
                        <label for="password" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Contraseña
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <input id="password" v-model="form.password" :type="showPassword
                                ? 'text'
                                : 'password'
                                " required minlength="12" maxlength="128" autocomplete="new-password"
                                placeholder="Mínimo 12 caracteres" class="w-full h-11 pl-3 pr-11
                                       rounded-lg
                                       bg-surface-container-low
                                       text-on-surface
                                       font-body-md text-body-md
                                       placeholder:text-outline
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-secondary" />

                            <button type="button" class="absolute right-2 top-1
                                       w-9 h-9 rounded-lg
                                       text-on-surface-variant
                                       hover:bg-surface-container-high
                                       flex items-center justify-center" :aria-label="showPassword
                                        ? 'Ocultar contraseña'
                                        : 'Mostrar contraseña'
                                        " @click="
                                            showPassword = !showPassword
                                            ">
                                <span class="material-symbols-outlined
                                           text-[19px]">
                                    {{
                                        showPassword
                                            ? 'visibility_off'
                                            : 'visibility'
                                    }}
                                </span>
                            </button>
                        </div>

                        <span class="font-body-sm text-body-sm
                                   text-on-surface-variant">
                            Entre 12 y 128 caracteres.
                        </span>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="confirmPassword" class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Confirmar contraseña
                            <span class="text-error">*</span>
                        </label>

                        <div class="relative">
                            <input id="confirmPassword" v-model="confirmPassword" :type="showConfirmPassword
                                ? 'text'
                                : 'password'
                                " required minlength="12" maxlength="128" autocomplete="new-password"
                                placeholder="Repite la contraseña" class="w-full h-11 pl-3 pr-11
                                       rounded-lg
                                       bg-surface-container-low
                                       text-on-surface
                                       font-body-md text-body-md
                                       placeholder:text-outline
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-secondary" :class="passwordMismatch
                                        ? '!ring-2 !ring-error'
                                        : ''
                                        " />

                            <button type="button" class="absolute right-2 top-1
                                       w-9 h-9 rounded-lg
                                       text-on-surface-variant
                                       hover:bg-surface-container-high
                                       flex items-center justify-center" :aria-label="showConfirmPassword
                                        ? 'Ocultar contraseña'
                                        : 'Mostrar contraseña'
                                        " @click="
                                            showConfirmPassword =
                                            !showConfirmPassword
                                            ">
                                <span class="material-symbols-outlined
                                           text-[19px]">
                                    {{
                                        showConfirmPassword
                                            ? 'visibility_off'
                                            : 'visibility'
                                    }}
                                </span>
                            </button>
                        </div>

                        <span v-if="passwordMismatch" class="font-body-sm text-body-sm text-error">
                            Las contraseñas no coinciden.
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-primary-container rounded-xl overflow-hidden">
            <div class="p-space-md flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg
                           bg-secondary-fixed/10
                           flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined
                               text-[21px] text-secondary-fixed">
                        shield_person
                    </span>
                </div>

                <div>
                    <h3 class="font-label-md text-label-md
                               font-bold text-on-primary">
                        Control de acceso
                    </h3>

                    <p class="font-body-sm text-body-sm
                               text-primary-fixed-dim mt-1">
                        El usuario únicamente podrá acceder a las
                        funciones permitidas por los permisos asociados
                        a su rol.
                    </p>
                </div>
            </div>
        </section>

        <div class="flex flex-col-reverse sm:flex-row
                   sm:items-center sm:justify-between
                   gap-space-sm pt-space-xs">
            <button type="button" :disabled="loading" class="h-11 px-5 rounded-lg
                       bg-surface-container-high text-on-surface
                       font-label-md text-label-md font-semibold
                       hover:bg-surface-container-highest
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed" @click="emit('cancel')">
                Cancelar
            </button>

            <button type="submit" :disabled="!canSubmit || loading" class="h-11 px-5 rounded-lg
                       bg-secondary text-on-secondary
                       font-label-md text-label-md font-bold
                       flex items-center justify-center gap-2
                       hover:bg-primary hover:text-on-primary
                       transition-colors shadow-sm
                       disabled:opacity-50
                       disabled:cursor-not-allowed">
                <span v-if="loading" clas class="w-4 h-4 rounded-full
               border-2 border-current
               border-t-transparent
               animate-spin"></span>

                <span v-else class="material-symbols-outlined text-[18px]">
                    {{
                        mode === 'create'
                            ? 'person_add'
                            : 'save'
                    }}
                </span>

                {{
                    loading ? (
                        mode === 'create'
                            ? 'Creando...'
                            : 'Guardando...'
                    ) : (
                        mode === 'create'
                            ? 'Crear usuario'
                            : 'Guardar cambios'
                    )
                }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

import { usuariosService } from '@/services/usuarios.service'

import type { Rol } from '@/types/usuarios'

import { getApiErrorMessage } from '@/utils/apiError'

interface UsuarioFormData {
    nombre: string
    correo: string
    rolId: string
    password?: string
}

const props = withDefaults(
    defineProps<{
        mode: 'create' | 'edit'
        initialData?: Partial<UsuarioFormData>
        activo?: boolean
        loading?: boolean
    }>(),
    {
        initialData: () => ({}),
        activo: true,
        loading: false
    }
)

const emit = defineEmits<{
    (
        e: 'submit',
        data: UsuarioFormData
    ): void

    (e: 'cancel'): void
}>()

const form = reactive<UsuarioFormData>({
    nombre: props.initialData.nombre ?? '',
    correo: props.initialData.correo ?? '',
    rolId: props.initialData.rolId ?? '',
    password: '',
})

const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const roles = ref<Rol[]>([])
const loadingRoles = ref(false)
const rolesError = ref('')

const inputClass =
    'w-full h-11 px-3 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md ' +
    'placeholder:text-outline ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary'

const selectClass =
    'w-full h-11 pl-3 pr-9 rounded-lg ' +
    'bg-surface-container-low text-on-surface ' +
    'font-body-md text-body-md appearance-none ' +
    'focus:outline-none focus:ring-2 focus:ring-secondary' +
    'disabled:opacity-50 disabled:cursor-not-allowed'

const passwordMismatch = computed(() => {
    if (props.mode !== 'create') {
        return false
    }

    if (!confirmPassword.value) {
        return false
    }

    return form.password !== confirmPassword.value
})

const canSubmit = computed(() => {
    const basicData =
        Boolean(form.nombre.trim()) &&
        Boolean(form.correo.trim()) &&
        Boolean(form.rolId)

    if (!basicData) {
        return false
    }

    if (props.mode === 'edit') {
        return true
    }

    return (
        Boolean(form.password) &&
        form.password!.length >= 12 &&
        form.password!.length <= 128 &&
        form.password === confirmPassword.value
    )
})

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

const submitForm = () => {
    if (!canSubmit.value) return

    if (props.mode === 'create') {
        emit('submit', {
            nombre: form.nombre.trim(),
            correo: form.correo.trim(),
            rolId: form.rolId,
            password: form.password,
        })

        return
    }

    emit('submit', {
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        rolId: form.rolId,
    })
}

onMounted(() => {
    loadRoles()
})
</script>