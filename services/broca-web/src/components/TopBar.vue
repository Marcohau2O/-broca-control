<template>
    <header class="fixed top-0 left-0 right-0 md:left-72 h-16 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-space-lg gap-space-sm sm:gap-space-md">
        <div class="flex items-center gap-space-md flex-1 min-w-0">
            <button class="md:hidden text-2xl shrink-0" type="button" @click="$emit('toggle-sidebar')">
                <span class="material-symbols-outlined">menu</span>
            </button>
        </div>

        <div class="flex items-center gap-1 sm:gap-space-md shrink-0">
            <button class="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 transition-all cursor-pointer text-[12px] font-label-md font-semibold">
                <span class="material-symbols-outlined text-[16px]">route</span>
                <span>Recorrido Quirófano</span>
            </button>
            <div class="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-error-container text-on-error-container border border-error/20">
                <span class="w-2 h-2 shrink-0 rounded-full bg-error animate-pulse"></span>
                <span class="font-label-sm text-label-sm font-bold whitespace-nowrap">
                    <span class="sm:hidden">15</span>
                    <span class="hidden sm:inline">
                        15 Bloqueadas (Cambio Urgente)
                    </span>
                </span>
            </div>
            <button class="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors shrink-0" type="button">
                <span class="material-symbols-outlined text-[22px]">notifications</span>
                <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error font-label-sm text-[10px] flex items-center justify-center font-bold">3</span>
            </button>
            <div ref="userMenuRef" class="relative flex items-center gap-space-sm pl-1 sm:pl-space-sm border-l border-outline-variant/30">
                <button class="flex items-center gap-space-sm text-left hover:opacity-80 transition-opacity focus:outline-none" type="button" :aria-expanded="isUserMenuOpen" aria-haspopup="menu" @click="toggleUserMenu">
                    <div class="text-right hidden lg:block">
                        <span class="font-label-md text-label-md text-on-surface block leading-tight">Lic. Andrea Morales</span>
                        <span class="font-body-sm text-body-sm text-secondary block leading-tight font-medium">Supervisora Quirúrgica</span>
                    </div>
                    <div class="w-8 h-8 shrink-0 rounded-full bg-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
                    </div>
                    <span class="material-symbols-outlined text-[16px] text-on-surface-variant hidden sm:block" :class="{ 'rotate-180' : isUserMenuOpen}">expand_more</span>
                </button>
                <div v-if="isUserMenuOpen" class="absolute right-0 top-10 w-48 rounded-xl bg-surface-container-lowest shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-outline-variant/30 py-2 z-50">
                    <div class="px-3 py-1.5 border-b border-outline-variant/20 mb-1">
                        <p class="font-label-sm text-label-sm text-on-surface-variant">Sesión activa</p>
                        <p class="font-label-md text-label-md text-on-surface font-semibold truncate">morales@hospital.com</p>
                    </div>
                    <div class="border-t border-outline-variant/20 my-1">
                        <button class="flex items-center gap-2 px-3 py-2 text-error hover:bg-error-container/20 font-label-md text-label-md transition-colors" type="button" role="menuitem" @click="Logout">
                            <span class="material-symbols-outlined text-[18px]">
                                logout
                            </span>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useNavigate } from '@/composables/useNavigate';

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const { goLogin } = useNavigate()
const isUserMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}
const closeUserMenu = () => {
  isUserMenuOpen.value = false
}
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  if (
    userMenuRef.value &&
    !userMenuRef.value.contains(target)
  ) {
    closeUserMenu()
  }
}
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeUserMenu()
  }
}
const Logout = () => {
  closeUserMenu()
  goLogin()
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>