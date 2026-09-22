import { createRouter, createWebHistory } from 'vue-router'
import LayoutSyT from '@/components/LayoutSyT.vue'

//Vistas
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import InventarioView from '@/views/InventarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: LayoutSyT,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'inventario',
          name: 'inventario',
          component: InventarioView
        },
      ]
    },
  ],
})

export default router
