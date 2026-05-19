import { Router } from 'express'
import multer from 'multer'
import { z } from 'zod'
import { logger } from '../config/logger.js'
import { sendBooking, type BookingPhoto } from '../services/email.js'

export const bookingsRouter = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 12 },
})

const itemSchema = z.object({
  garmentType: z.string().trim().min(1, 'garmentType is required'),
  material: z.string().trim().min(1, 'material is required'),
  materialOther: z.string().trim().default(''),
  repairType: z.string().trim().min(1, 'repairType is required'),
  repairSize: z.string().trim().min(1, 'repairSize is required'),
  sashiko: z.string().trim().default(''),
  notes: z.string().trim().default(''),
})

const payloadSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  address: z.string().trim().min(1),
  urgent: z.string().trim().min(1),
  items: z.array(itemSchema).min(1),
})

bookingsRouter.post('/bookings', upload.any(), async (req, res) => {
  const raw = typeof req.body?.payload === 'string' ? req.body.payload : null
  if (!raw) {
    return res.status(400).json({ error: 'Missing payload field' })
  }

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    return res.status(400).json({ error: 'payload is not valid JSON' })
  }

  const parsed = payloadSchema.safeParse(parsedJson)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Validation failed', issues: parsed.error.issues })
  }

  const files = (req.files as Express.Multer.File[] | undefined) ?? []
  const photos: BookingPhoto[] = []
  for (const f of files) {
    const match = /^photo_(\d+)$/.exec(f.fieldname)
    if (!match) continue
    const idx = Number(match[1])
    if (!Number.isInteger(idx) || idx < 0 || idx >= parsed.data.items.length) continue
    photos.push({
      itemIndex: idx,
      filename: f.originalname || `item-${idx + 1}.bin`,
      contentType: f.mimetype || 'application/octet-stream',
      buffer: f.buffer,
    })
  }

  try {
    const result = await sendBooking(parsed.data, photos)
    logger.info({ result }, 'Booking emails sent')
    return res.status(202).json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logger.error({ err }, 'Failed to send booking emails')
    return res.status(502).json({ error: 'Failed to send booking emails', detail: message })
  }
})
