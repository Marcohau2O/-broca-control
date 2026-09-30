<template>
    <div class="w-full max-w-5xl mx-auto">
        <button type="button" class="inline-flex items-center gap-1.5
                   text-on-surface-variant hover:text-secondary
                   font-label-md text-label-md transition-colors" @click="goBack">
            <span class="material-symbols-outlined text-[18px]">
                arrow_back
            </span>

            Volver a usuarios
        </button>

        <div v-if="loading" class="mt-space-md bg-surface-container-lowest
           rounded-xl shadow-sm px-space-md py-space-xl">
            <div class="min-h-[180px] flex flex-col
               items-center justify-center gap-3">
                <span class="w-9 h-9 rounded-full
                   border-[3px]
                   border-surface-container-highest
                   border-t-secondary
                   animate-spin"></span>

                <p class="font-body-md text-body-md
                   text-on-surface-variant">
                    Cargando usuario...
                </p>
            </div>
        </div>

        <div v-else-if="errorMessage && !usuario" class="mt-space-md rounded-xl
           bg-error-container
           text-on-error-container
           p-space-md">
            {{ errorMessage }}
        </div>

        <template v-else-if="usuario">
            <div class="mt-space-md mb-space-lg">
                <div class="flex flex-wrap items-center
                        gap-space-xs mb-1">
                    <span class="font-label-sm text-label-sm uppercase
                            tracking-wider text-secondary font-bold">
                        Administración
                    </span>

                    <span class="text-outline-variant">
                        •
                    </span>

                    <span class="font-label-sm text-label-sm
                            text-on-surface-variant font-medium">
                        Editar usuario
                    </span>
                </div>

                <div class="flex flex-col sm:flex-row
                        sm:items-center gap-space-sm">
                    <div>
                        <h1 class="font-headline-lg text-headline-lg
                                text-on-surface font-bold
                                tracking-tight">
                            {{ usuario.nombre }}
                        </h1>

                        <p class="font-body-md text-body-md
                                text-on-surface-variant mt-1">
                            {{ usuario.correo }}
                        </p>
                    </div>

                    <span class="inline-flex items-center gap-1.5
                            px-2.5 py-1 rounded-full
                            font-label-sm text-label-sm
                            font-bold self-start" :class="usuario.activo
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
                </div>
            </div>

            <UsuarioForm mode="edit" :initial-data="{
                nombre: usuario.nombre,
                correo: usuario.correo,
                rolId: String(usuario.rolId),
                }" 
                :activo="usuario.activo"
                :loading="saving"
                @cancel="goBack"
                @submit="handleSubmit" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import UsuarioForm from '@/components/usuarios/UsuarioForm.vue'

import { usuariosService } from '@/services/usuarios.service'

import type { Usuario, UpdateUsuarioData } from '@/types/usuarios'

import { getApiErrorMessage } from '@/utils/apiError'

const route = useRoute()
const router = useRouter()

const usuario = ref<Usuario | null>(null)

const loading = ref(true)
const saving = ref(false)

const errorMessage = ref('')

const usuarioId = Number(route.params.id)

const loadUsuario = async () => {
    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
        errorMessage.value = 'El usuario solicitado no es válido.'

        loading.value = false
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        usuario.value = await usuariosService.getById(usuarioId)
    } catch (error) {
        usuario.value = null

        errorMessage.value = getApiErrorMessage(error)

        console.error('Error cargando usuario:', error)
    } finally {
        loading.value = false
    }
}

const goBack = () => {
    router.push({
        name: 'usuarios'
    })
}

const handleSubmit = async (data: UpdateUsuarioData) => {
    if (saving.value) {
        return
    }

    saving.value = true
    errorMessage.value = ''

    try {
        await usuariosService.update(usuarioId,
            {
                nombre: data.nombre,
                correo: data.correo,
                rolId: Number(data.rolId),
            }
        )

        router.push({
            name: 'usuarios'
        })
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)

        console.error('Error actualizando usuario:', error)
    } finally {
        saving.value = false
    }
}

onMounted(() => {
    loadUsuario()
})
</script>