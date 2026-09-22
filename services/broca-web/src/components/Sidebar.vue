<template>
    <aside class="h-full w-72 bg-primary-container text-inverse-on-surface flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div class="flex flex-col h-full overflow-hidden">
            <div class="p-space-md flex items-center gap-space-sm bg-primary">
                <div class="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                    <span class="material-symbols-outlined text-[20px]">medical_services</span>
                </div>
                <div>
                    <span class="font-headline-sm text-headline-sm text-on-primary tracking-tight block">BROCA CONTROL</span>
                    <span class="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider block">Trazabilidad Quirúrgica</span>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
                <nav class="space-y-space-xs" data-active-classes="bg-secondary text-on-secondary font-label-md rounded-lg shadow-sm">
                    <div class="px-space-sm py-space-xs">
                        <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">OPERACIÓN</span>
                    </div>
                    <button class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors" type="button" @click="goDashboard">
                        <span class="material-symbols-outlined text-[18px]">dashboard</span>
                        <span class="font-label-md text-label-md">Dashboard</span>
                    </button>
                    <button class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors" type="button" @click="goInventario">
                        <span class="material-symbols-outlined text-[18px]">inventory_2</span>
                        <span class="font-label-md text-label-md">Inventario</span>
                    </button>
                    <a class="flex items-center justify-between px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-all">
                        <div class="flex items-center gap-space-sm">
                            <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                            <span class="font-label-md text-label-md font-semibold">Escanear QR</span>
                        </div>
                        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">sync_alt</span>
                        <span class="font-label-md text-label-md">Movimientos</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">verified</span>
                        <span class="font-label-md text-label-md">Ficha y Trazabilidad</span>
                    </a>
                    <div class="pt-space-sm px-space-sm py-space-xs">
                        <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">SEGURIDAD Y CONTROL</span>
                    </div>
                    <a class="flex items-center justify-between px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <div class="flex items-center gap-space-sm">
                            <span class="material-symbols-outlined text-[18px] text-error">warning</span>
                            <span class="font-label-md text-label-md">Alertas Críticas</span>
                        </div>
                        <span class="px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">4</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">rule</span>
                        <span class="font-label-md text-label-md">Auditoría</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">bar_chart</span>
                        <span class="font-label-md text-label-md">Reportes</span>
                    </a>
                    <div class="pt-space-sm px-space-sm py-space-xs">
                        <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">ADMINISTRACIÓN</span>
                    </div>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">group</span>
                        <span class="font-label-md text-label-md">Usuarios</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">room</span>
                        <span class="font-label-md text-label-md">Ubicaciones &amp; Quirófanos</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">category</span>
                        <span class="font-label-md text-label-md">Catálogos</span>
                    </a>
                    <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">settings</span>
                        <span class="font-label-md text-label-md">Configuración</span>
                    </a>
                </nav>
            </div>
            <div class="p-space-sm m-space-sm bg-surface-container-lowest/5 rounded-lg border-l-2 border-error">
                <div class="flex items-center gap-1.5 text-error-container mb-1">
                    <span class="material-symbols-outlined text-[16px] text-error">gavel</span>
                    <span class="font-label-sm text-label-sm uppercase font-bold text-on-primary">Regla de Oro</span>
                </div>
                <p class="font-body-sm text-body-sm text-primary-fixed-dim leading-snug">
                    Máximo 3 usos por broca reutilizable. Al tercer uso se inhabilita de manera irrevocable.
                </p>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useNavigate } from '@/composables/useNavigate';

const { goDashboard, goInventario } = useNavigate()
</script>