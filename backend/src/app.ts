import cors from 'cors'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { healthRouter } from './routes/health.js'

export const app = express()

app.use((req, _res, next) => {
  logger.debug({ method: req.method, path: req.path }, 'Incoming request')
  next()
})
app.use(cors({ origin: env.FRONTEND_ORIGIN }))
app.use(express.json())

app.use('/api', healthRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err }, 'Unhandled application error')
  res.status(500).json({ error: 'Internal server error' })
})
