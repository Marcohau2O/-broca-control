import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import LayoutSyT from '@/components/LayoutSyT.vue'


import LoginView from '@/views/auth/LoginView.vue'

import DashboardView from '@/views/dashboard/DashboardView.vue'

import InstrumentosView from '@/views/instrumentos/InstrumentosView.vue'
import InstrumentoDetalleView from '@/views/instrumentos/InstrumentoDetalleView.vue'
import InstrumentoCreateView from '@/views/instrumentos/InstrumentoCreateView.vue'
import InstrumentoEditView from '@/views/instrumentos/InstrumentoEditView.vue'

import MovimientosView from '@/views/movimientos/MovimientosView.vue'

import AlertasView from '@/views/alertas/AlertasView.vue'

import ReportesView from '@/views/reportes/ReportesView.vue'

import UsuariosView from '@/views/usuarios/UsuariosView.vue'
import UsuarioCreateView from '@/views/usuarios/UsuarioCreateView.vue'
import UsuarioEditView from '@/views/usuarios/UsuarioEditView.vue'

import CatalogosView from '@/views/catalogos/CatalogosView.vue'

import AuditoriaView from '@/views/auditorias/AuditoriaView.vue'

import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

import SolicitudCreateView from '@/views/cirugias/SolicitudCreateView.vue'
import SolicitudInventarioView from '@/views/cirugias/SolicitudInventarioView.vue'
import CalendarioCirugiasView from '@/views/cirugias/CalendarioCirugiasView.vue'

import PrereporteCirugiaView from '@/views/cirugias/PrereporteCirugiaView.vue'
import PrereportesListView from '@/views/cirugias/PrereportesListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,

      meta: {
        guestOnly: true,
      }
    },
    {
      path: '/dashboard',
      component: LayoutSyT,

      meta: {
        requiresAuth: true
      },

      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'instrumentos',
          name: 'instrumentos',
          component: InstrumentosView,

          meta: {
            permission: 'instrumento.ver',
          },
        },
        {
          path: 'instrumentos/:id',
          name: 'instrumento-detail',
          component: InstrumentoDetalleView,

          meta: {
            permission: 'instrumento.ver',
          }
        },
        {
          path: 'instrumentos/nuevo',
          name: 'instrumento-create',
          component: InstrumentoCreateView,

          meta: {
            permission: 'instrumento.crear',
          }
        },
        {
          path: 'instrumentos/:id/editar',
          name: 'instrumento-edit',
          component: InstrumentoEditView,

          meta: {
            permission: 'instrumento.editar',
          }
        },
        {
          path: 'movimientos',
          name: 'movimientos',
          component: MovimientosView,

          meta: {
            permission: 'movimiento.ver',
          }
        },
        {
          path: 'alertas',
          name: 'alertas',
          component: AlertasView,
        },
        {
          path: 'reportes',
          name: 'reportes',
          component: ReportesView,

          meta: {
            permission: 'reporte.ver',
          }
        },
        {
          path: 'usuarios',
          name: 'usuarios',
          component: UsuariosView,

          meta: {
            permission: 'usuario.ver',
          }
        },
        {
          path: 'usuarios/nuevo',
          name: 'usuario-create',
          component: UsuarioCreateView,

          meta: {
            permission: 'usuario.crear',
          },
        },
        {
          path: 'usuarios/:id/editar',
          name: 'usuario-edit',
          component: UsuarioEditView,

          meta: {
            permission: 'usuario.editar',
          }
        },
        {
          path: 'catalogos',
          name: 'catalogos',
          component: CatalogosView,

          meta: {
            permission: 'catalogo.administrar',
          }
        },
        {
          path: 'auditoria',
          name: 'auditoria',
          component: AuditoriaView,

          meta: {
            permission: 'auditoria.ver',
          },
        },
        {
          path: 'cirugias/nueva',
          name: 'cirugia-create',
          component: SolicitudCreateView,
          meta: {
            roles: ['TECNICO', 'ADMINISTRADOR'],
          },
        },
        {
          path: 'cirugias/inventario',
          name: 'cirugia-inventario',
          component: SolicitudInventarioView,
          meta: {
            roles: ['INVENTARIO', 'ADMINISTRADOR'],
          },
        },
        {
          path: 'cirugias/calendario',
          name: 'cirugias-calendario',
          component: CalendarioCirugiasView,
          meta: {
            roles: ['TECNICO', 'INVENTARIO', 'ADMINISTRADOR'],
          },
        },
        {
          path: 'cirugias/prereportes',
          name: 'cirugias-prereportes',
          component: PrereportesListView,
          meta: {
            roles: ['TECNICO', 'INVENTARIO', 'ADMINISTRADOR'],
          },
        },
        {
          path: 'cirugias/prereporte',
          name: 'cirugias-prereporte',
          component: PrereporteCirugiaView,
          meta: {
            roles: ['TECNICO', 'INVENTARIO', 'ADMINISTRADOR'],
          },
        }
      ],
    },
    {
      path: '/403',
      name: 'forbidden',
      component: ForbiddenView,

      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.initialized) {
    await auth.restoreSession()
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return {
      name: 'dashboard',
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      name: 'login',

      query: {
        redirect: to.fullPath,
      },
    }
  }

  const permission = to.meta.permission as string | undefined

  if (permission && !auth.hasPermission(permission)) {
    return {
      name: 'forbidden'
    }
  }

  const allowedRoles = to.meta.roles as string[] | undefined

  if (allowedRoles && auth.isAuthenticated) {
    const userRole = auth.roleName
      .trim()
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const normalizedAllowedRoles = allowedRoles.map((role) =>
      role
        .trim()
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    )

    const isAdminAlias = userRole === 'ADMIN' && normalizedAllowedRoles.includes('ADMINISTRADOR')

    if (!normalizedAllowedRoles.includes(userRole) && !isAdminAlias) {
      return {
        name: 'forbidden'
      }
    }
  }

  return true
})

export default router
