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
    return router.push({ name: 'instrumentos' })
  }

  const goMovimiento = () => {
    return router.push({ name: 'movimientos' })
  }

  const goAlerta = () => {
    return router.push({ name: 'alertas'})
  }

  const goReporte = () => {
    return router.push({ name: 'reportes'})
  }

  const goUsuario = () => {
    return router.push({ name: 'usuarios'})
  }

  const goCalalogo = () => {
    return router.push({ name: 'catalogos'})
  }

  const goAuditoria = () => {
    return router.push({ name: 'auditoria'})
  }

  return { goLogin, goDashboard, goInventario, goMovimiento, goAlerta, goReporte, goUsuario, goCalalogo, goAuditoria }
}