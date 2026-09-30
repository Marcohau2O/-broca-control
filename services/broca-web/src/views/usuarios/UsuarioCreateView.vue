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
                    Nuevo usuario
                </span>
            </div>

            <h1 class="font-headline-lg text-headline-lg
                       text-on-surface font-bold tracking-tight">
                Crear usuario
            </h1>

            <p class="font-body-md text-body-md
                       text-on-surface-variant mt-1 max-w-2xl">
                Registra una nueva cuenta y asigna el rol
                correspondiente para controlar su acceso al sistema.
            </p>
        </div>

        <div v-if="errorMessage" class="mb-space-md rounded-xl
           bg-error-container
           text-on-error-container
           p-space-sm
           font-body-sm text-body-sm">
            {{ errorMessage }}
        </div>

        <UsuarioForm mode="create" :loading="saving" @cancel="goBack" @submit="handleSubmit" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CreateUsuarioData } from '@/types/usuarios'

import { useRouter } from 'vue-router'

import UsuarioForm from '@/components/usuarios/UsuarioForm.vue'

import { usuariosService } from '@/services/usuarios.service'
import { getApiErrorMessage } from '@/utils/apiError'

const router = useRouter()

const saving = ref(false)
const errorMessage = ref('')

const goBack = () => {
    router.push({
        name: 'usuarios'
    })
}

const handleSubmit = async (data: CreateUsuarioData) => {
    if (saving.value) {
        return
    }

    if (!data.password) {
        errorMessage.value = 'La contraseña es obligatoria.'
        return
    }

    saving.value = true
    errorMessage.value = ''

    try {
        await usuariosService.create({
            nombre: data.password,
            correo: data.correo,
            password: data.password,
            rolId: Number(data.rolId),
        })

        router.push({
            name: 'usuarios'
        })
    } catch (error) {
        errorMessage.value = getApiErrorMessage(error)

        console.error('Error creando usuario:', error)
    } finally {
        saving.value = false
    }
}
</script>