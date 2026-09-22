import app from './app.js'
import { env } from './config/env.js'
import prisma from './lib/prisma.js'

const server = app.listen(env.PORT, '0.0.0.0', () => {
    console.log(`BROCA CONTROL API ejecutándose en puerto ${env.PORT}`)
})

let shuttingDown = false

async function shutdown(signal: NodeJS.Signals): Promise<void> {
    if (shuttingDown) {
        return
    }

    shuttingDown = true

    console.log(`${signal} recibido. Cerrando BROCA CONTROL API...`)

    server.close(async (error) => {
        if (error) {
            console.error('Error al cerrar el servidor HTTP:', error)

            try {
                await prisma.$disconnect()
            } finally {
                process.exit(1)
            }

            return
        }

        try {
            await prisma.$disconnect()

            console.log('BROCA CONTTROL API cerrando correctamente')

            process.exit(0)
        } catch (error) {
            console.error('Error al desconectar Prisma:', error)

            process.exit(1)
        }
    })
}

process.on('SIGTERM', () => {
  void shutdown('SIGTERM')
})

process.on('SIGINT', () => {
  void shutdown('SIGINT')
})