import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router()

router.get('/',async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`

        res.status(200).json({
            status: 'ok',
            service: 'BROCA API',
            database: 'connected',
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error en health check:', error)

        res.status(503).json({
            status: 'error',
            service: 'BROCA API',
            database: 'disconnected',
            timestamp: new Date().toISOString(),
        })
    }
})

export default router