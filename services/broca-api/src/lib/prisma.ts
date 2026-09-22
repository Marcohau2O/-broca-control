import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

import { env } from '../config/env.js'

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

const prisma = new PrismaClient({
    adapter,
})

export default prisma