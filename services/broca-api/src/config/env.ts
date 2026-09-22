import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(4000),

    DATABASE_URL: z
        .string()
        .min(1, 'DATABASE_URL es obligatoria'),

    JWT_SECRET: z
        .string()
        .min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),

    JWT_EXPIRES_IN: z
        .string()
        .default('8h'),
    CORS_ORIGINS: z
        .string()
        .default('http://localhost:5173,http://localhost:5000'),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('Variables de entorno inválidas:', result.error.flatten().fieldErrors,)
  throw new Error('Configuración de entorno inválida')
}

export const env = result.data