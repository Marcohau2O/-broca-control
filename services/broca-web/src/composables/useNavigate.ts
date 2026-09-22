import { useRouter } from "vue-router";

export const useNavigate = () => {
    const router = useRouter()

    const goLogin = () => {
        return router.push({ name: 'login' })
    }

  const goDashboard = () => {
        return router.push({ name: 'dashboard' })
    }

  const goInventario = () => {
    return router.push({ name: 'inventario' })
  }

  return { goLogin, goDashboard, goInventario }
}