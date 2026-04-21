import { Router } from 'express'
import { pool } from '../config/db.js'

export const healthRouter = Router()

healthRouter.get('/health', async (_req, res) => {
  const { rows } = await pool.query<{ ok: number }>('select 1 as ok')
  res.json({ status: 'ok', db: rows[0]?.ok === 1 ? 'up' : 'down' })
})
