import type { CSSProperties, ReactNode } from 'react'

type StitchedFrameProps = {
  children: ReactNode
  tilt?: number
  variant?: 'paper' | 'photo'
  className?: string
  style?: CSSProperties
}

export default function StitchedFrame({
  children,
  tilt = 0,
  variant = 'paper',
  className = '',
  style,
}: StitchedFrameProps) {
  const isPhoto = variant === 'photo'

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `rotate(${tilt}deg)`,
        filter:
          'drop-shadow(0 6px 14px rgba(80, 45, 15, 0.22)) drop-shadow(0 1px 2px rgba(80, 45, 15, 0.15))',
        ...style,
      }}
    >
      <div
        className="relative"
        style={{
          backgroundColor: '#fffaf0',
          padding: isPhoto ? '6px' : '18px 22px',
          borderRadius: '2px',
        }}
      >
        {children}
        <svg
          className="pointer-events-none absolute"
          style={{ top: 4, left: 4, right: 4, bottom: 4, width: 'calc(100% - 8px)', height: 'calc(100% - 8px)', overflow: 'visible' }}
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
            strokeDasharray="6 4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="0.6"
            strokeDasharray="6 4"
            strokeDashoffset="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
    </div>
  )
}
