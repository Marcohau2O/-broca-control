<template>
    <div class="min-h-[calc(100vh-8rem)]
               flex items-center justify-center
               px-4 py-10">
        <div class="w-full max-w-2xl text-center">
            <div class="relative mx-auto
                       w-24 h-24 sm:w-28 sm:h-28
                       rounded-3xl
                       bg-error-container
                       flex items-center justify-center">
                <span class="material-symbols-outlined
                           text-error text-[48px]
                           sm:text-[56px]">
                    lock
                </span>

                <div class="absolute -right-2 -bottom-2
                           min-w-11 h-11 px-2
                           rounded-xl
                           bg-surface-container-lowest
                           shadow-md
                           flex items-center justify-center">
                    <span class="font-code-md text-code-md
                               font-bold text-error">
                        403
                    </span>
                </div>
            </div>

            <div class="mt-space-lg">
                <span class="font-label-sm text-label-sm
                           uppercase tracking-wider
                           text-error font-bold">
                    Acceso restringido
                </span>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold
                           tracking-tight mt-2">
                    No tienes permiso para acceder
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant
                           max-w-xl mx-auto mt-space-sm">
                    Tu cuenta está autenticada, pero no cuenta
                    con los permisos necesarios para consultar
                    esta sección del sistema.
                </p>
            </div>

            <div class="mt-space-lg
                       bg-surface-container-lowest
                       rounded-xl shadow-sm
                       p-space-md text-left">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-lg
                               bg-surface-container-high
                               flex items-center justify-center
                               shrink-0">
                        <span class="material-symbols-outlined
                                   text-[20px] text-secondary">
                            shield_person
                        </span>
                    </div>

                    <div>
                        <h2 class="font-label-md text-label-md
                                   font-bold text-on-surface">
                            Control de acceso
                        </h2>

                        <p class="font-body-sm text-body-sm
                                   text-on-surface-variant mt-1">
                            Las funciones disponibles dependen de
                            los permisos asociados al rol de tu
                            cuenta.
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-space-lg
                       flex flex-col sm:flex-row
                       items-stretch sm:items-center
                       justify-center gap-space-sm">
                <button type="button" class="h-11 px-5 rounded-lg
                           bg-surface-container-high
                           text-on-surface
                           font-label-md text-label-md
                           font-semibold
                           flex items-center justify-center gap-2
                           hover:bg-surface-container-highest
                           transition-colors" @click="goBack">
                    <span class="material-symbols-outlined
                               text-[18px]">
                        arrow_back
                    </span>

                    Regresar
                </button>

                <button type="button" class="h-11 px-5 rounded-lg
                           bg-secondary text-on-secondary
                           font-label-md text-label-md
                           font-bold
                           flex items-center justify-center gap-2
                           hover:bg-primary
                           hover:text-on-primary
                           transition-colors shadow-sm" @click="goDashboard">
                    <span class="material-symbols-outlined
                               text-[18px]">
                        dashboard
                    </span>

                    Ir al Dashboard
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    if (window.history.length > 1) {
        router.back()
        return
    }

    router.push('/dashboard')
}

const goDashboard = () => {
    router.push('/dashboard')
}
</script>