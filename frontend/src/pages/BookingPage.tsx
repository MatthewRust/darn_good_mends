import { useState, type ChangeEvent, type FormEvent } from 'react'
import StitchedFrame from '../components/StitchedFrame'

// ── Types ────────────────────────────────────────────────────────────────────

type ItemData = {
  garmentType: string
  material: string
  materialOther: string
  repairType: string
  repairSize: string
  sashiko: string
  photo: File | null
  notes: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  address: string
  urgent: string
  items: ItemData[]
}

function blankItem(): ItemData {
  return {
    garmentType: '',
    material: '',
    materialOther: '',
    repairType: '',
    repairSize: '',
    sashiko: '',
    photo: null,
    notes: '',
  }
}

function blankForm(): FormData {
  return {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    urgent: '',
    items: [blankItem()],
  }
}

// ── Shared field components ──────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-hand text-[#7a0000] block mb-1" style={{ fontSize: '1.2rem' }}>
      {children}
    </span>
  )
}

function TextInput({
  value,
  onChange,
  placeholder = '',
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-[#7a0000]/30 bg-[#fffaf0] px-3 py-2 font-body text-[#3b2a18] outline-none focus:border-[#7a0000]/70"
      style={{ fontSize: '0.95rem', borderRadius: 2 }}
    />
  )
}

function TextArea({
  value,
  onChange,
  placeholder = '',
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-[#7a0000]/30 bg-[#fffaf0] px-3 py-2 font-body text-[#3b2a18] outline-none focus:border-[#7a0000]/70 resize-none"
      style={{ fontSize: '0.95rem', borderRadius: 2 }}
    />
  )
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-start gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-1 accent-[#7a0000] shrink-0"
          />
          <span className="font-body text-[#3b2a18]" style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  )
}

// ── Per-item block ───────────────────────────────────────────────────────────

function ItemBlock({
  index,
  item,
  onChange,
  onRemove,
  canRemove,
}: {
  index: number
  item: ItemData
  onChange: (field: keyof ItemData, value: string | File | null) => void
  onRemove: () => void
  canRemove: boolean
}) {
  const namePrefix = `item-${index}`

  return (
    <StitchedFrame variant="paper" className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="font-hand text-[#7a0000]" style={{ fontSize: '1.4rem' }}>
          {index === 0 ? 'item details' : `item ${index + 1}`}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-body text-[#7a0000]/60 hover:text-[#7a0000] transition-colors"
            style={{ fontSize: '0.85rem' }}
          >
            remove
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {/* Garment type */}
        <div>
          <Label>describe the type of garment (jeans, jumper, shirt etc.)</Label>
          <TextInput
            value={item.garmentType}
            onChange={(v) => onChange('garmentType', v)}
            placeholder="e.g. jeans, jumper, shirt"
          />
        </div>

        {/* Material */}
        <div>
          <Label>what material is the garment?</Label>
          <RadioGroup
            name={`${namePrefix}-material`}
            value={item.material}
            onChange={(v) => onChange('material', v)}
            options={[
              { value: 'knitted', label: 'knitted' },
              { value: 'cotton', label: 'cotton' },
              { value: 'denim', label: 'denim' },
              { value: 'linen', label: 'linen' },
              { value: 'polyester', label: 'polyester' },
              { value: 'specialised', label: 'specialised (e.g. ripstop, waxed cotton)' },
              { value: 'other', label: 'other (please specify)' },
            ]}
          />
          {item.material === 'other' && (
            <div className="mt-2">
              <TextInput
                value={item.materialOther}
                onChange={(v) => onChange('materialOther', v)}
                placeholder="please specify material"
              />
            </div>
          )}
        </div>

        {/* Repair type */}
        <div>
          <Label>type of repair needed</Label>
          <RadioGroup
            name={`${namePrefix}-repairType`}
            value={item.repairType}
            onChange={(v) => onChange('repairType', v)}
            options={[
              { value: 'hole-knitwear', label: 'hole, rip or tear repair (knitwear)' },
              { value: 'hole-woven', label: 'hole, rip or tear repair (woven fabric e.g. trousers, shirts, skirts)' },
              { value: 'rehem', label: 're-hemming' },
              { value: 'button', label: 'button repair' },
              { value: 'pocket-external', label: 'pocket repair (external)' },
              { value: 'pocket-bag', label: 'pocket bag repair (internal)' },
              { value: 'crotch', label: 'crotch repair or threadbare trousers' },
            ]}
          />
        </div>

        {/* Repair size */}
        <div>
          <Label>how big is the repair area?</Label>
          <RadioGroup
            name={`${namePrefix}-repairSize`}
            value={item.repairSize}
            onChange={(v) => onChange('repairSize', v)}
            options={[
              { value: 'tiny', label: 'tiny (sub 1cm)' },
              { value: 'small', label: 'small (1–2cm)' },
              { value: 'medium', label: 'medium (2–5cm)' },
              { value: 'large', label: 'large (5–15cm)' },
              { value: 'xlarge', label: 'extra large (15cm+)' },
              { value: 'na-rehem', label: 'not applicable, i want my garment re-hemmed' },
            ]}
          />
        </div>

        {/* Sashiko */}
        <div>
          <Label>would you like to add sashiko or hand embroidery detailing?</Label>
          <RadioGroup
            name={`${namePrefix}-sashiko`}
            value={item.sashiko}
            onChange={(v) => onChange('sashiko', v)}
            options={[
              { value: 'yes-small', label: 'yes (small, ~£7.50)' },
              { value: 'yes-medium', label: 'yes (medium, ~£15)' },
              { value: 'yes-large', label: 'yes (large, £30+)' },
              { value: 'no', label: 'no thank you' },
            ]}
          />
        </div>

        {/* Photo */}
        <div>
          <Label>could you provide a photograph of the damaged area?</Label>
          <p className="font-body text-[#3b2a18]/70 mb-2" style={{ fontSize: '0.85rem' }}>
            not required, but it would help to provide the most accurate estimate
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange('photo', e.target.files?.[0] ?? null)
            }
            className="font-body text-[#3b2a18] w-full"
            style={{ fontSize: '0.9rem' }}
          />
        </div>

        {/* Notes */}
        <div>
          <Label>any other notes about the repair</Label>
          <TextArea
            value={item.notes}
            onChange={(v) => onChange('notes', v)}
            placeholder="anything else you'd like us to know"
            rows={3}
          />
        </div>
      </div>
    </StitchedFrame>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export function BookingPage() {
  const [form, setForm] = useState<FormData>(blankForm)
  const [submitted, setSubmitted] = useState(false)

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function setItemField(index: number, field: keyof ItemData, value: string | File | null) {
    setForm((f) => {
      const items = f.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
      return { ...f, items }
    })
  }

  function addItem() {
    setForm((f) => ({ ...f, items: [...f.items, blankItem()] }))
  }

  function removeItem(index: number) {
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== index) }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('Booking enquiry:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="relative mx-auto max-w-2xl px-6 pt-12 pb-24 sm:px-10 flex flex-col items-center gap-8">
        <StitchedFrame variant="paper" className="w-full text-center">
          <p className="font-hand text-[#7a0000]" style={{ fontSize: '1.8rem', lineHeight: 1.2 }}>
            thank you!
          </p>
          <p className="font-body text-[#3b2a18] mt-3" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
            i've received your enquiry and will aim to get back to you within 1 working day.
          </p>
        </StitchedFrame>
      </main>
    )
  }

  return (
    <main className="relative mx-auto max-w-2xl px-6 pt-8 pb-24 sm:px-10">
      {/* Intro */}
      <StitchedFrame variant="paper" className="mb-8">
        <p className="font-body text-[#3b2a18]" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
          <span className="font-hand text-[#7a0000]" style={{ fontSize: '1.3rem' }}>
            please fill in the form below
          </span>{' '}
          if you would like an estimate on the cost and timeline for a garment repair. i aim to
          provide a response to your enquiry within{' '}
          <strong>1 working day</strong> of you submitting the form.
        </p>
        <p className="font-body text-[#3b2a18] mt-3" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
          my rates are <strong>£20/hour</strong> including tracked postage both ways (for mends
          outwith E10 or N16). sashiko and visible mending is charged on top of this at a rate of{' '}
          <strong>£30/hour</strong>.
        </p>
      </StitchedFrame>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        {/* Contact details */}
        <StitchedFrame variant="paper" className="w-full max-w-2xl">
          <span className="font-hand text-[#7a0000] block mb-4" style={{ fontSize: '1.4rem' }}>
            your details
          </span>

          <div className="flex flex-col gap-5">
            {/* Name row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>first name</Label>
                <TextInput
                  value={form.firstName}
                  onChange={(v) => setField('firstName', v)}
                  placeholder="first name"
                />
              </div>
              <div>
                <Label>last name</Label>
                <TextInput
                  value={form.lastName}
                  onChange={(v) => setField('lastName', v)}
                  placeholder="last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>email address</Label>
              <TextInput
                type="email"
                value={form.email}
                onChange={(v) => setField('email', v)}
                placeholder="your@email.com"
              />
            </div>

            {/* Address */}
            <div>
              <Label>postal address</Label>
              <TextArea
                value={form.address}
                onChange={(v) => setField('address', v)}
                placeholder="your full address"
                rows={3}
              />
            </div>

            {/* Urgency */}
            <div>
              <Label>is this repair urgent?</Label>
              <p className="font-body text-[#3b2a18]/70 mb-2" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                if posted, the shortest timeframe is 5 working days from confirmation and postage of
                item. if collecting, i can complete the mend within 1 working day (£15 surcharge for
                rush).
              </p>
              <RadioGroup
                name="urgent"
                value={form.urgent}
                onChange={(v) => setField('urgent', v)}
                options={[
                  { value: 'yes-posting', label: 'yes, posting' },
                  { value: 'yes-collecting', label: 'yes, collecting (£15)' },
                  { value: 'no', label: 'no' },
                ]}
              />
            </div>
          </div>
        </StitchedFrame>

        {/* Item blocks */}
        {form.items.map((item, i) => (
          <ItemBlock
            key={i}
            index={i}
            item={item}
            onChange={(field, value) => setItemField(i, field, value)}
            onRemove={() => removeItem(i)}
            canRemove={form.items.length > 1}
          />
        ))}

        {/* Add another item */}
        <button
          type="button"
          onClick={addItem}
          className="relative font-hand tracking-wide text-[#7a0000] transition-transform hover:-translate-y-0.5"
          style={{ fontSize: '1.2rem' }}
        >
          <span className="relative z-10 inline-block bg-[#fffaf0] px-4 py-1">
            + add another item
          </span>
          <svg
            className="pointer-events-none absolute"
            style={{
              top: 2,
              left: 2,
              right: 2,
              bottom: 2,
              width: 'calc(100% - 4px)',
              height: 'calc(100% - 4px)',
              overflow: 'visible',
            }}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#7a0000"
              strokeWidth="1.4"
              strokeDasharray="5 3"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="relative font-hand tracking-wide text-[#fffaf0] bg-[#7a0000] transition-transform hover:-translate-y-0.5 px-8 py-2"
          style={{ fontSize: '1.35rem', borderRadius: 2 }}
        >
          submit
        </button>
      </form>
    </main>
  )
}
