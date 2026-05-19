import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.preprocess((v) => (v === '' || v == null ? undefined : v), z.coerce.number().default(8787)),
  DATABASE_URL: z.string().url(),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5178'),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().min(1),
  OWNER_EMAIL: z.string().email(),
})

export const env = envSchema.parse(process.env)
