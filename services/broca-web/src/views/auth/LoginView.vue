<template>
    <main class="w-full min-h-screen">
        <div class="flex flex-col w-full">
            <div class="relative w-full min-h-dvh flex items-center justify-center p-space-md sm:p-space-lg lg:p-space-xl overflow-hidden">
                <div class="absolute inset-0 -z-10 bg-gradient-to-br from-surface-container-low via-surface to-surface-variant/30"></div>
                <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none"></div>
                <div class="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 rounded-xl shadow-xl overflow-hidden bg-surface-container-lowest border-none">
                    <div class="lg:col-span-5 bg-primary-container text-on-primary p-space-lg lg:p-space-xl flex flex-col justify-between relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none"></div>
                        <div class="absolute bottom-0 left-0 w-64 h-64 bg-tertiary-fixed/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
                        <div class="relative z-10 flex flex-col gap-space-lg">
                            <div class="flex items-center gap-space-sm">
                                <div class="w-10 h-10 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center text-on-primary">
                                    <span class="material-symbols-outlined text-headline-md">precision_manufacturing</span>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-space-xs">
                                        <span class="font-headline-sm text-headline-sm tracking-tight text-on-primary">BROCA CONTROL</span>
                                        <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">+</span>
                                    </div>
                                    <span class="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">Trazabilidad Quirúrgica</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-space-sm mt-space-md">
                                <span class="inline-flex items-center gap-space-xs px-space-sm pt-space-xs rounded-full bg-surface-container-lowest/10 w-fit text-primary-fixed font-code-md text-code-md">
                                    <span class="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                                    CONTROL DE INSTRUMENTAL • TRAZABILIDAD
                                </span>
                                <h1 class="font-headline-lg text-headline-lg text-on-primary leading-tight">Control de Instrumental Crítico y Trazabilidad</h1>
                                <p class="font-body-md text-body-md text-primary-fixed/80">Acceso exclusivo para personal autorizado. Control de usos, ubicación, estado y trazabilidad de brocas reutilizables.</p>
                            </div>
                            <div class="bg-surface-container-lowest/5 rounded-lg p-space-md flex flex-col gap-space-sm">
                                <div class="flex items-center justify-between">
                                    <span class="font-label-md text-label-md text-primary-fixed">Regla de Oro Activa</span>
                                    <span class="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">EN VIGOR</span>
                                </div>
                                <div class="flex items-baseline gap-space-xs">
                                    <span class="font-display-lg text-display-lg text-on-primary">3</span>
                                    <span class="font-body-sm text-body-sm text-primary-fixed/70">usos máx. permitidos por broca reutilizable antes de cambio urgente</span>
                                </div>
                                <div class="w-full bg-surface-container-lowest/15 h-1.5 rounded-full overflow-hidden flex">
                                    <div class="bg-tertiary-fixed w-1/3 h-full"></div>
                                    <div class="bg-secondary-container w-1/3 h-full"></div>
                                    <div class="bg-error w-1/3 h-full"></div>
                                </div>
                                <div class="flex justify-between font-code-md text-body-sm text-primary-fixed/60">
                                    <span>1º Ciclo</span>
                                    <span>2º Ciclo</span>
                                    <span class="text-error-container font-semibold">3º Cambio urgente</span>
                                </div>
                            </div>
                        </div>
                        <div class="relative z-10 pt-space-lg flex items-center justify-between text-primary-fixed/60 font-code-md text-body-sm">
                            <span class="flex items-center gap-space-xs">
                                <span class="material-symbols-outlined text-body-sm">terminal</span>
                                CONTROL HOSPITALARIO
                            </span>
                            <span class="flex items-center gap-space-xs">
                                <span class="material-symbols-outlined">shield</span>
                                ACCESO RESTRINGIDO
                            </span>
                        </div>
                    </div>
                    <div class="lg:col-span-7 bg-surface-container-lowest p-space-lg sm:p-space-xl flex flex-col justify-between">
                        <div class="flex flex-col gap-space-sm">
                            <div class="flex items-center justify-between">
                                <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Acceso hospitalario</span>
                                <div class="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                    <span class="material-symbols-outlined text-body-sm text-on-tertiary-container" :style="{ fontVariationSettings: `'FILL' 1`}">lock</span>
                                        Sesión Encriptada
                                </div>
                            </div>
                            <h2 class="font-headline-lg text-headline-lg text-on-surface">Ingreso de Personal</h2>
                            <p class="font-body-md text-body-md text-on-surface-variant">Ingrese sus credenciales corporativas</p>
                        </div>
                        <form class="flex flex-col gap-space-md" @submit.prevent="Login">
                            <div class="flex flex-col gap-space-xs">
                                <label class="font-label-md text-label-md text-on-surface justify-between">
                                    <span>Correo institucional</span>
                                    <span class="font-code-md text-body-sm text-surface-variant">ID</span>
                                </label>
                                <div class="relative flex items-center">
                                    <span class="absolute left-space-md text-on-surface-variant flex items-center pointer-events-none">
                                        <span class="material-symbols-outlined text-headline-sm">alternate_email</span>
                                    </span>
                                    <input v-model.trim="form.correo" class="w-full h-11 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-lowest transition-all" placeholder="@hospital.gob.mx" type="email" autocomplete="email" required :disabled="auth.loading">
                                </div>
                            </div>
                            <div class="flex flex-col gap-space-xs">
                                <label class="font-label-md text-label-md text-on-surface flex justify-between">
                                    <span>Contraseña</span>
                                    <span class="font-code-md text-body-sm text-on-surface-variant">Mín. 12 caracteres</span>
                                </label>
                                <div class="relative flex items-center">
                                    <span class="absolute left-space-md text-on-surface-variant flex items-center pointer-events-none">
                                        <span class="material-symbols-outlined text-headline-sm">lock</span>
                                    </span>
                                    <input v-model="form.password" class="w-full h-11 pl-11 pr-11 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-lowest transition-all" placeholder="Ingrese su contraseña" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" minlength="12" maxlength="128" required :disabled="auth.loading">
                                    <button class="absolute right-space-md text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors focus:outline-none" type="button" :disabled="auth.loading" @click="showPassword = !showPassword">
                                        <span class="material-symbols-outlined text-headline-sm">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                    </button>
                                </div>
                                <p v-if="errorMessage" class="font-label-sm text-label-sm text-error flex items-center gap-space-xs mt-0.5" role="alert">
                                    <span class="material-symbols-outlined text-headline-sm shrink-0">error</span>
                                    <span class="font-body-sm text-body-sm">{{ errorMessage }}</span>
                                </p>
                            </div>
                            <div class="flex flex-col gap-space-sm mt-space-sm">
                                <button class="w-full h-12 bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm" type="submit" :disabled="auth.loading">
                                    <template v-if="auth.loading">
                                        <span class="w-5 h-5 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin"></span>
                                        <span>Iniciando sesión</span>
                                    </template>
                                    <template v-else>
                                        <span>
                                            Iniciar sesión
                                        </span>
                                        <span class="material-symbols-outlined text-headline-sm">
                                            arrow_forward
                                        </span>
                                    </template>
                                </button>
                            </div>
                        </form>
                        <div class="pt-space-lg mt-space-md flex flex-col gap-space-xs">
                            <div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                                <span class="material-symbols-outlined text-body-sm text-on-tertiary-container">verified_user</span>
                                <span>Sistema de Control y Trazabilidad</span>
                            </div>
                            <div class="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant/80">
                                <span>Regla de Oro activa: Máximo 3 usos por broca reutilizable.</span>
                                <span class="font-code-md text-body-sm">BROCA CONTROL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { getApiErrorMessage } from '@/utils/apiError';
import { useNavigate } from '@/composables/useNavigate';

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()

const showPassword = ref(false)

const errorMessage = ref('')

const form = reactive({
    correo: '',
    password: '',
})

const Login = async () => {
    if (auth.loading) {
        return
    }

    errorMessage.value = ''

    try {
        await auth.login({
            correo: form.correo,
            password: form.password,
        })

        const redirect = typeof route.query.redirect === 'string'
                            ? route.query.redirect
                            : '/dashboard'

        await router.replace(redirect)
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)
    }
}

</script>

<style scoped>

</style>