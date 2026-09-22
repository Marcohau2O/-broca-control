import { Router } from 'express'

import { exportarReporteBajas,
    exportarReporteInstrumentos,
    exportarReporteMovimientos,
    exportarReporteUsos,
    getReporteUsos,
    getReporteInstrumentos,
    getReporteMovimientos,
    getReporteBajas } from '../controllers/reporte.controller.js'

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'

import { reporteUsosQuerySchema, reporteInstrumentosQuerySchema, reporteMovimientosQuerySchema, reporteBajasQuerySchema } from '../validators/reporte.validator.js'

const router = Router()

router.use(authenticate)

router.get('/usos', authorize('reporte.ver'), validate(reporteUsosQuerySchema), getReporteUsos)

router.get('/instrumentos', authorize('reporte.ver'), validate(reporteInstrumentosQuerySchema), getReporteInstrumentos)

router.get('/movimientos', authorize('reporte.ver'), validate(reporteMovimientosQuerySchema), getReporteMovimientos)

router.get('/bajas', authorize('reporte.ver'), validate(reporteBajasQuerySchema), getReporteBajas)

router.get('/bajas', authorize('reporte.ver'), validate(reporteBajasQuerySchema), getReporteBajas)

//Exportar archivos
router.get('/usos/exportar', authorize('reporte.exportar'), validate(reporteUsosQuerySchema), exportarReporteUsos)

router.get('/instrumentos/exportar', authorize('reporte.exportar'), validate(reporteInstrumentosQuerySchema), exportarReporteInstrumentos)

router.get('/movimientos/exportar', authorize('reporte.exportar'), validate(reporteMovimientosQuerySchema), exportarReporteMovimientos,)

router.get('/bajas/exportar', authorize('reporte.exportar'), validate(reporteBajasQuerySchema), exportarReporteBajas)

export default router