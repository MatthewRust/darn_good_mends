import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8787),
  DATABASE_URL: z.string().url(),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5178'),
})

export const env = envSchema.parse(process.env)
