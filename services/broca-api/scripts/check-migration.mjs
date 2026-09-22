import 'dotenv/config'
import pg from 'pg'

const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

try {
  await client.connect()

  const result = await client.query(`
    SELECT
      migration_name,
      started_at,
      finished_at,
      rolled_back_at,
      applied_steps_count,
      logs
    FROM "_prisma_migrations"
    WHERE migration_name = '0001_initial';
  `)

  console.dir(result.rows, {
    depth: null,
  })
} catch (error) {
  console.error('Error consultando la migración:')
  console.error(error)
} finally {
  await client.end()
}