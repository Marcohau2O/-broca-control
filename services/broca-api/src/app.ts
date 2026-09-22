import express from "express"
import cors from 'cors'
import { env } from "./config/env.js"

import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import ubicacionRoutes from './routes/ubicacion.routes.js'
import servicioRoutes from './routes/servicio.routes.js'
import procedimientoRoutes from './routes/procedimiento.routes.js'
import proveedorRoutes from './routes/proveedor.routes.js'
import motivoBajaRoutes from './routes/motivo-baja.routes.js'
import tipoInstrumentoRoutes from './routes/tipo-instrumento.routes.js'
import marcaRoutes from './routes/marca.routes.js'
import modeloRoutes from './routes/modelo.routes.js'
import instrumentoRoutes from './routes/instrumento.routes.js'
import alertaRoutes from './routes/alerta.routes.js'
import auditoriaRoutes from './routes/auditoria.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import reporteRoutes from './routes/reporte.routes.js'

import { notFoundHandler } from "./middlewares/not-found.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import { AppError } from "./errors/AppError.js"

const app = express()

app.disable('x-powered-by')

const allowedOrigins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)

app.use(cors({
    origin(origin, callback) {

        if (!origin) {
            callback(null, true)
            return
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }

        callback(
            new AppError('Origen no permitido por CORS', 403, 'CORS_ORIGIN_NOT_ALLOWED')
        )
    },

    credentials: true,
}))

app.use('/api', (_req, res, next) => {
    res.setHeader(
        'Cache-Control',
        'no-store',
    )

    next()
})

app.use(express.json({
    limit: '1mb'
}))

//Rutas
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/ubicaciones', ubicacionRoutes)
app.use('/api/servicios', servicioRoutes)
app.use('/api/procedimientos', procedimientoRoutes)
app.use('/api/proveedores', proveedorRoutes)
app.use('/api/motivos-baja', motivoBajaRoutes)
app.use('/api/tipos-instrumento', tipoInstrumentoRoutes)
app.use('/api/marca', marcaRoutes)
app.use('/api/modelos', modeloRoutes)
app.use('/api/instrumentos', instrumentoRoutes)
app.use('/api/alertas', alertaRoutes)
app.use('/api/auditoria', auditoriaRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/reportes', reporteRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app