import { Resend } from 'resend'
import { env } from '../config/env.js'

const resend = new Resend(env.RESEND_API_KEY)

export type BookingItem = {
  garmentType: string
  material: string
  materialOther: string
  repairType: string
  repairSize: string
  sashiko: string
  notes: string
}

export type BookingPayload = {
  firstName: string
  lastName: string
  email: string
  address: string
  urgent: string
  items: BookingItem[]
}

export type BookingPhoto = {
  itemIndex: number
  filename: string
  contentType: string
  buffer: Buffer
}

const URGENT_LABELS: Record<string, string> = {
  'yes-posting': 'Yes — posting in',
  'yes-collecting': 'Yes — collecting in person',
  no: 'No — happy to wait',
}

const MATERIAL_LABELS: Record<string, string> = {
  knitted: 'Knitted',
  cotton: 'Cotton',
  denim: 'Denim',
  linen: 'Linen',
  polyester: 'Polyester',
  specialised: 'Specialised',
  other: 'Other',
}

const REPAIR_LABELS: Record<string, string> = {
  'hole-knitwear': 'Hole in knitwear',
  'hole-woven': 'Hole in woven fabric',
  rehem: 'Rehem',
  button: 'Button replacement',
  zip: 'Zip repair',
  seam: 'Seam repair',
  other: 'Other',
}

const SIZE_LABELS: Record<string, string> = {
  tiny: 'Tiny',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  xlarge: 'Extra large',
  'na-rehem': 'N/A (rehem)',
}

const SASHIKO_LABELS: Record<string, string> = {
  'yes-small': 'Yes — small',
  'yes-medium': 'Yes — medium',
  'yes-large': 'Yes — large',
  no: 'No',
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const label = (map: Record<string, string>, key: string) => map[key] ?? key ?? '—'

function renderItemRows(items: BookingItem[]): string {
  return items
    .map((item, i) => {
      const material =
        item.material === 'other' && item.materialOther
          ? `Other — ${escape(item.materialOther)}`
          : escape(label(MATERIAL_LABELS, item.material))
      return `
        <tr><td colspan="2" style="background:#a83829;color:#fff;padding:8px 12px;font-family:Georgia,serif;">Item ${i + 1}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Garment</td><td style="padding:6px 12px;">${escape(item.garmentType || '—')}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Material</td><td style="padding:6px 12px;">${material}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Repair type</td><td style="padding:6px 12px;">${escape(label(REPAIR_LABELS, item.repairType))}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Repair size</td><td style="padding:6px 12px;">${escape(label(SIZE_LABELS, item.repairSize))}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Sashiko</td><td style="padding:6px 12px;">${escape(label(SASHIKO_LABELS, item.sashiko || 'no'))}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Notes</td><td style="padding:6px 12px;white-space:pre-wrap;">${escape(item.notes || '—')}</td></tr>
      `
    })
    .join('')
}

function customerHtml(payload: BookingPayload): string {
  const name = escape(payload.firstName || 'friend')
  const itemsSummary = payload.items
    .map((item, i) => {
      const what = [
        label(REPAIR_LABELS, item.repairType),
        'on',
        item.garmentType || 'a garment',
      ].join(' ')
      return `<li style="margin-bottom:4px;"><strong>Item ${i + 1}:</strong> ${escape(what)} (${escape(label(SIZE_LABELS, item.repairSize))})</li>`
    })
    .join('')

  return `
  <div style="font-family:Georgia,serif;color:#3b2a18;max-width:560px;margin:0 auto;padding:24px;">
    <h2 style="color:#a83829;margin:0 0 12px 0;">Order details</h2>
    <ul style="padding-left:18px;margin:0 0 24px 0;">${itemsSummary}</ul>
    <p style="font-size:18px;margin:0 0 8px 0;"><strong>Hoydee!!!</strong></p>
    <p style="font-size:15px;line-height:1.5;margin:0 0 24px 0;">
      Thanks so much for your order ${name}, we will get to mending in a jiffy
      and if I have any more questions I will be in touch via email!
    </p>
  </div>
  `
}

function ownerHtml(payload: BookingPayload): string {
  const urgent = escape(label(URGENT_LABELS, payload.urgent))
  return `
  <div style="font-family:Georgia,serif;color:#3b2a18;max-width:640px;margin:0 auto;padding:24px;">
    <h2 style="color:#a83829;margin:0 0 16px 0;">New booking enquiry</h2>
    <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e6dccb;">
      <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escape(payload.firstName)} ${escape(payload.lastName)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escape(payload.email)}">${escape(payload.email)}</a></td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Address</td><td style="padding:6px 12px;white-space:pre-wrap;">${escape(payload.address)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Urgent?</td><td style="padding:6px 12px;">${urgent}</td></tr>
      ${renderItemRows(payload.items)}
    </table>
  </div>
  `
}

export async function sendBooking(payload: BookingPayload, photos: BookingPhoto[]) {
  const photoAttachments = photos.map((p) => ({
    filename: p.filename,
    content: p.buffer,
  }))

  const customerName = `${payload.firstName} ${payload.lastName}`.trim() || 'friend'

  const [customer, owner] = await Promise.all([
    resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: payload.email,
      subject: `Thanks for your order, ${payload.firstName || 'friend'}!`,
      html: customerHtml(payload),
      attachments: [],
    }),
    resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.OWNER_EMAIL,
      replyTo: payload.email,
      subject: `New booking — ${customerName}`,
      html: ownerHtml(payload),
      attachments: photoAttachments,
    }),
  ])

  if (customer.error) throw new Error(`Customer email failed: ${customer.error.message}`)
  if (owner.error) throw new Error(`Owner email failed: ${owner.error.message}`)

  return { customerId: customer.data?.id, ownerId: owner.data?.id }
}
