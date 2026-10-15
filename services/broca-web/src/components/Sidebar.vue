<template>
    <aside
        class="h-full w-72 bg-primary-container text-inverse-on-surface flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div class="flex flex-col h-full overflow-hidden">
            <div class="p-space-md flex items-center gap-space-sm bg-primary">
                <div class="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                    <span class="material-symbols-outlined text-[20px]">medical_services</span>
                </div>
                <div>
                    <span class="font-headline-sm text-headline-sm text-on-primary tracking-tight block">BROCA
                        CONTROL</span>
                    <span
                        class="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider block">Trazabilidad
                        Quirúrgica</span>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
                <nav class="space-y-space-xs"
                    data-active-classes="bg-secondary text-on-secondary font-label-md rounded-lg shadow-sm">
                    <div class="px-space-sm py-space-xs">
                        <span
                            class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">OPERACIÓN</span>
                    </div>
                    <button :class="menuClass"
                        type="button" @click="handleDashboard">
                        <span class="material-symbols-outlined text-[18px]">dashboard</span>
                        <span class="font-label-md text-label-md">Dashboard</span>
                    </button>
                    <button v-if="auth.hasPermission('instrumento.ver')"
                        :class="menuClass"
                        type="button" @click="handleInstrumentos">
                        <span class="material-symbols-outlined text-[18px]">inventory_2</span>
                        <span class="font-label-md text-label-md">Instrumentos</span>
                    </button>
                    <!-- <a class="flex items-center justify-between px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-all">
                        <div class="flex items-center gap-space-sm">
                            <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                            <span class="font-label-md text-label-md font-semibold">Escanear QR</span>
                        </div>
                        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a> -->
                    <button v-if="auth.hasPermission('movimiento.ver')"
                        :class="menuClass"
                        type="button" @click="handleMovimientos">
                        <span class="material-symbols-outlined text-[18px]">sync_alt</span>
                        <span class="font-label-md text-label-md">Movimientos</span>
                    </button>

                    <template v-if="canAccessCirugias">
                        <div class="pt-space-sm px-space-sm py-space-xs">
                            <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">
                                GESTIÓN DE CIRUGÍAS
                            </span>
                        </div>
                        <button v-if="canCreateSolicitud"
                            :class="menuClass"
                            type="button"  @click="goToCirugia('cirugia-create')">
                            <span class="material-symbols-outlined text-[18px]">
                                note_add
                            </span>
                            <span class="font-label-md text-label-md">
                                Nueva solicitud
                            </span>
                        </button>
                        <button v-if="canReviewInventario"
                            :class="menuClass"
                            type="button" @click="goToCirugia('cirugia-inventario')">
                            <span class="material-symbols-outlined text-[18px]">
                                fact_check
                            </span>
                            <span class="font-label-md text-label-md">
                                Revisión de Inventario
                            </span>
                        </button>
                        <button type="button"
                            :class="menuClass"
                            @click="goToCirugia('cirugias-calendario')">
                            <span class="material-symbols-outlined text-[18px]">
                                calendar_month
                            </span>
                            <span class="font-label-md text-label-md">
                                Calendario de Cirugías
                            </span>
                        </button>
                        <button type="button"
                            :class="menuClass"
                            @click="goToCirugia('cirugias-prereportes')">
                            <span class="material-symbols-outlined text-[18px]">
                                description
                            </span>
                            <span class="font-label-md text-label-md">
                                 Pre-reportes
                            </span>
                        </button>
                    </template>
                    <!-- <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">verified</span>
                        <span class="font-label-md text-label-md">Ficha y Trazabilidad</span>
                    </a> -->
                    <div class="pt-space-sm px-space-sm py-space-xs">
                        <span
                            class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">SEGURIDAD
                            Y CONTROL</span>
                    </div>
                    <button :class="menuClass"
                        type="button" @click="handleAlertas">
                        <div class="flex items-center gap-space-sm">
                            <span class="material-symbols-outlined text-[18px] text-error">warning</span>
                            <span class="font-label-md text-label-md">Alertas Críticas</span>
                        </div>
                        <!-- <span
                            class="px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">4</span> -->
                    </button>
                    <button v-if="auth.hasPermission('auditoria.ver')"
                        :class="menuClass"
                        type="button" @click="handleAuditoria">
                        <span class="material-symbols-outlined text-[18px]">rule</span>
                        <span class="font-label-md text-label-md">Auditoría</span>
                    </button>
                    <button v-if="auth.hasPermission('reporte.ver')"
                        :class="menuClass"
                        type="button" @click="handleReportes">
                        <span class="material-symbols-outlined text-[18px]">bar_chart</span>
                        <span class="font-label-md text-label-md">Reportes</span>
                    </button>
                    <div v-if="auth.hasPermission('usuario.ver') || auth.hasPermission('catalogo.administrar')"
                        class="pt-space-sm px-space-sm py-space-xs">
                        <span
                            class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-semibold">ADMINISTRACIÓN</span>
                    </div>
                    <button v-if="auth.hasPermission('usuario.ver')"
                        :class="menuClass"
                        type="button" @click="handleUsuarios">
                        <span class="material-symbols-outlined text-[18px]">group</span>
                        <span class="font-label-md text-label-md">Usuarios</span>
                    </button>
                    <!-- <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">room</span>
                        <span class="font-label-md text-label-md">Ubicaciones &amp; Quirófanos</span>
                    </a> -->
                    <button v-if="auth.hasPermission('catalogo.administrar')"
                       :class="menuClass"
                        type="button" @click="handleCatalogos">
                        <span class="material-symbols-outlined text-[18px]">category</span>
                        <span class="font-label-md text-label-md">Catálogos</span>
                    </button>
                    <!-- <a class="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-inverse-on-surface hover:bg-surface-container-high/10 hover:text-on-primary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">settings</span>
                        <span class="font-label-md text-label-md">Configuración</span>
                    </a> -->
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigate } from '@/composables/useNavigate';
import { useAuthStore } from '@/stores/auth.store';

const emit = defineEmits<{
    (e: 'close'): void
}>()

const router = useRouter()
const auth = useAuthStore()

const { goDashboard, goInventario, goMovimiento, goAlerta, goReporte, goUsuario, goCalalogo, goAuditoria } = useNavigate()

const menuClass =
    'w-full flex items-center gap-space-sm px-space-sm py-2 ' +
    'rounded-lg text-inverse-on-surface text-left ' +
    'hover:bg-surface-container-high/10 hover:text-on-primary ' +
    'transition-colors'

const currentRole = computed(() =>
    auth.roleName.trim().toUpperCase()
)

const isAdmin = computed(() =>
    ['ADMINISTRADOR', 'ADMIN'].includes(currentRole.value)
)

const isTecnico = computed(() =>
    ['TÉCNICO', 'TECNICO'].includes(currentRole.value)
)

const isInventario = computed(() =>
    currentRole.value === 'INVENTARIO'
)

const canAccessCirugias = computed(() =>
    isAdmin.value || isTecnico.value || isInventario.value
)

const canCreateSolicitud = computed(() =>
    isAdmin.value || isTecnico.value
)

const canReviewInventario = computed(() =>
    isAdmin.value || isInventario.value
)

const goToCirugia = async (routeName: string) => {
    await router.push({ name: routeName })
    emit('close')
}

const handleDashboard = () => {
    goDashboard()
    emit('close')
}

const handleInstrumentos = () => {
    goInventario()
    emit('close')
}

const handleMovimientos = () => {
    goMovimiento()
    emit('close')
}

const handleAlertas = () => {
    goAlerta()
    emit('close')
}

const handleReportes = () => {
    goReporte()
    emit('close')
}

const handleUsuarios = () => {
    goUsuario()
    emit('close')
}

const handleCatalogos = () => {
    goCalalogo()
    emit('close')
}

const handleAuditoria = () => {
    goAuditoria()
    emit('close')
}
</script>