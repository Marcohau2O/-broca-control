<template>
    <div class="min-h-[calc(100vh-8rem)]
               flex items-center justify-center
               px-4 py-10">
        <div class="w-full max-w-2xl text-center">
            <div
                class="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-primary-container flex items-center justify-center">
                <span class="material-symbols-outlined
                           text-secondary-fixed
                           text-[48px] sm:text-[56px]">
                    search_off
                </span>

                <div
                    class="absolute -right-2 -bottom-2 min-w-11 h-11 px-2 rounded-xl bg-surface-container-lowest shadow-md flex items-center justify-center">
                    <span class="font-code-md text-code-md
                               font-bold text-secondary">
                        404
                    </span>
                </div>
            </div>

            <div class="mt-space-lg">
                <span class="font-label-sm text-label-sm
                           uppercase tracking-wider
                           text-secondary font-bold">
                    Página no encontrada
                </span>

                <h1 class="font-headline-lg text-headline-lg
                           text-on-surface font-bold
                           tracking-tight mt-2">
                    Esta página no existe
                </h1>

                <p class="font-body-md text-body-md
                           text-on-surface-variant
                           max-w-xl mx-auto mt-space-sm">
                    La dirección solicitada no corresponde a una
                    página disponible dentro de BROCA CONTROL.
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
                            link_off
                        </span>
                    </div>

                    <div class="min-w-0">
                        <span class="font-label-sm text-label-sm
                                   uppercase tracking-wider
                                   text-outline font-semibold">
                            Ruta solicitada
                        </span>

                        <code class="font-code-md text-code-md
                                   text-on-surface block mt-1
                                   break-all">
                            {{ currentPath }}
                        </code>
                    </div>
                </div>
            </div>

            <div class="mt-space-lg
                       flex flex-col sm:flex-row
                       items-stretch sm:items-center
                       justify-center gap-space-sm">
                <button type="button"
                    class="h-11 px-5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
                    @click="goBack">
                    <span class="material-symbols-outlined
                               text-[18px]">
                        arrow_back
                    </span>

                    Regresar
                </button>

                <button type="button"
                    class="h-11 px-5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                    @click="goDashboard">
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => {
    return route.fullPath
})

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