import { useEffect, useRef, useState } from 'react'
import { NAV, SHOP } from '../lib/content'

export function useCrankSpin(isHovered: boolean) {
  const [rotation, setRotation] = useState(0)
  const animRef = useRef<number | null>(null)
  const velRef = useRef(0)
  const rotRef = useRef(0)

  useEffect(() => {
    const maxVelocity = 15.0 // max degrees per frame (~2.5 rev/sec)
    const accel = 0.45 // acceleration rate
    const decel = 0.22 // deceleration rate

    const loop = () => {
      if (isHovered) {
        velRef.current = Math.min(maxVelocity, velRef.current + accel)
      } else {
        velRef.current = Math.max(0, velRef.current - decel)
      }

      if (velRef.current > 0) {
        rotRef.current = (rotRef.current + velRef.current) % 360
        setRotation(rotRef.current)
        animRef.current = requestAnimationFrame(loop)
      } else {
        animRef.current = null
      }
    }

    if (isHovered || velRef.current > 0) {
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(loop)
      }
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
  }, [isHovered])

  return rotation
}

export function RedBikeGear({ isHovered = false, className = 'h-[0.72em] w-[0.72em]' }: { isHovered?: boolean; className?: string }) {
  const rotation = useCrankSpin(isHovered)

  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={`inline-block text-accent align-[-0.08em] ${className}`}
      aria-hidden="true"
    >
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: '16px 16px',
        }}
      >
        {/* Outer Chainring 50t */}
        <path d="M 29.80,15.20 L 31.00,15.15 L 31.00,16.85 L 29.80,16.80 L 29.74,17.95 L 30.91,18.25 L 30.49,19.90 L 29.35,19.50 L 28.94,20.57 L 29.99,21.20 L 29.17,22.68 L 28.16,21.95 L 27.42,22.84 L 28.32,23.74 L 27.12,24.94 L 26.22,24.04 L 25.33,24.78 L 26.06,25.79 L 24.58,26.61 L 23.95,25.56 L 22.88,25.97 L 23.28,27.11 L 21.63,27.53 L 21.33,26.36 L 20.18,26.42 L 20.23,27.62 L 18.53,27.62 L 18.48,26.42 L 17.33,26.36 L 17.03,27.53 L 15.38,27.11 L 15.78,25.97 L 14.71,25.56 L 14.08,26.61 L 12.60,25.79 L 13.33,24.78 L 12.44,24.04 L 11.54,24.94 L 10.34,23.74 L 11.24,22.84 L 10.50,21.95 L 9.49,22.68 L 8.67,21.20 L 9.72,20.57 L 9.31,19.50 L 8.17,19.90 L 7.75,18.25 L 8.92,17.95 L 8.86,16.80 L 7.66,16.85 L 7.66,15.15 L 8.86,15.20 L 8.92,14.05 L 7.75,13.75 L 8.17,12.10 L 9.31,12.50 L 9.72,11.43 L 8.67,10.80 L 9.49,9.32 L 10.50,10.05 L 11.24,9.16 L 10.34,8.26 L 11.54,7.06 L 12.44,7.96 L 13.33,7.22 L 12.60,6.21 L 14.08,5.39 L 14.71,6.44 L 15.78,6.03 L 15.38,4.89 L 17.03,4.47 L 17.33,5.64 L 18.48,5.58 L 18.53,4.38 L 20.23,4.38 L 20.18,5.58 L 21.33,5.64 L 21.63,4.47 L 23.28,4.89 L 22.88,6.03 L 23.95,6.44 L 24.58,5.39 L 26.06,6.21 L 25.33,7.22 L 26.22,7.96 L 27.12,7.06 L 28.32,8.26 L 27.42,9.16 L 28.16,10.05 L 29.17,9.32 L 29.99,10.80 L 28.94,11.43 L 29.35,12.50 L 30.49,12.10 L 30.91,13.75 L 29.74,14.05 Z" />

        {/* Outer Gap Window */}
        <circle cx="16" cy="16" r="12.8" fill="none" stroke="var(--background)" strokeWidth="0.8" />

        {/* Middle Chainring 34t */}
        <path d="M 24.40,15.45 L 25.30,15.40 L 25.30,16.60 L 24.40,16.55 L 24.33,17.40 L 25.20,17.65 L 24.85,18.80 L 23.98,18.48 L 23.63,19.26 L 24.42,19.75 L 23.75,20.80 L 22.95,20.24 L 22.36,20.91 L 23.05,21.58 L 22.18,22.45 L 21.51,21.76 L 20.84,22.35 L 21.40,23.15 L 20.35,23.82 L 19.86,23.03 L 19.08,23.38 L 19.40,24.25 L 18.25,24.60 L 17.90,23.73 L 17.05,23.80 L 17.10,24.70 L 15.90,24.70 L 15.85,23.80 L 15.00,23.73 L 14.65,24.60 L 13.50,24.25 L 13.82,23.38 L 13.04,23.03 L 12.55,23.82 L 11.50,23.15 L 12.06,22.35 L 11.39,21.76 L 10.72,22.45 L 9.85,21.58 L 10.54,20.91 L 9.95,20.24 L 9.15,20.80 L 8.48,19.75 L 9.27,19.26 L 8.92,18.48 L 8.05,18.80 L 7.70,17.65 L 8.57,17.40 L 8.50,16.55 L 7.60,16.60 L 7.60,15.40 L 8.50,15.45 L 8.57,14.60 L 7.70,14.35 L 8.05,13.20 L 8.92,13.52 L 9.27,12.74 L 8.48,12.25 L 9.15,11.20 L 9.95,11.76 L 10.54,11.09 L 9.85,10.42 L 10.72,9.55 L 11.39,10.24 L 12.06,9.65 L 11.50,8.85 L 12.55,8.18 L 13.04,8.97 L 13.82,8.62 L 13.50,7.75 L 14.65,7.40 L 15.00,8.27 L 15.85,8.20 L 15.90,7.30 L 17.10,7.30 L 17.05,8.20 L 17.90,8.27 L 18.25,7.40 L 19.40,7.75 L 19.08,8.62 L 19.86,8.97 L 20.35,8.18 L 21.40,8.85 L 20.84,9.65 L 21.51,10.24 L 22.18,9.55 L 23.05,10.42 L 22.36,11.09 L 22.95,11.76 L 23.75,11.20 L 24.42,12.25 L 23.63,12.74 L 23.98,13.52 L 24.85,13.20 L 25.20,14.35 L 24.33,14.60 Z" />

        {/* Middle Gap Window */}
        <circle cx="16" cy="16" r="9.3" fill="none" stroke="var(--background)" strokeWidth="0.7" />

        {/* Inner Chainring 22t */}
        <path d="M 21.20,15.60 L 22.00,15.55 L 22.00,16.45 L 21.20,16.40 L 21.08,17.30 L 21.82,17.60 L 21.42,18.70 L 20.66,18.32 L 20.30,19.15 L 20.98,19.70 L 20.30,20.62 L 19.56,20.01 L 18.96,20.73 L 19.53,21.47 L 18.67,22.21 L 18.04,21.41 L 17.29,21.97 L 17.67,22.79 L 16.66,23.35 L 16.20,22.45 L 15.35,22.75 L 15.54,23.65 L 14.46,23.95 L 14.18,23.02 L 13.30,23.05 L 13.28,24.00 L 12.20,24.00 L 12.18,23.05 L 11.30,23.02 L 11.02,23.95 L 9.94,23.65 L 10.13,22.75 L 9.28,22.45 L 8.82,23.35 L 7.81,22.79 L 8.19,21.97 L 7.44,21.41 L 6.81,22.21 L 5.95,21.47 L 6.52,20.73 L 5.92,20.01 L 5.18,20.62 L 4.50,19.70 L 5.18,19.15 L 4.82,18.32 L 4.06,18.70 L 3.66,17.60 L 4.40,17.30 L 4.28,16.40 L 3.48,16.45 L 3.48,15.55 L 4.28,15.60 L 4.40,14.70 L 3.66,14.40 L 4.06,13.30 L 4.82,13.68 L 5.18,12.85 L 4.50,12.30 L 5.18,11.38 L 5.92,11.99 L 6.52,11.27 L 5.95,10.53 L 6.81,9.79 L 7.44,10.59 L 8.19,10.03 L 7.81,9.21 L 8.82,8.65 L 9.28,9.55 L 10.13,9.25 L 9.94,8.35 L 11.02,8.05 L 11.30,8.98 L 12.18,8.95 L 12.20,8.00 L 13.28,8.00 L 13.30,8.95 L 14.18,8.98 L 14.46,8.05 L 15.54,8.35 L 15.35,9.25 L 16.20,9.55 L 16.66,8.65 L 17.67,9.21 L 17.29,10.03 L 18.04,10.59 L 18.67,9.79 L 19.53,10.53 L 18.96,11.27 L 19.56,11.99 L 20.30,11.38 L 20.98,12.30 L 20.30,12.85 L 20.66,13.68 L 21.42,13.30 L 21.82,14.40 L 21.08,14.70 Z" />

        {/* Integrated 3-Spoke Spider & Long Rightward Crank Arm */}
        <path
          d="
            M 16 12.0
            C 18.0 12.0, 20.5 13.0, 26.5 13.8
            C 28.5 14.1, 30.5 14.8, 30.5 16.0
            C 30.5 17.2, 28.5 17.9, 26.5 18.2
            C 20.5 19.0, 18.0 20.0, 16 20.0
            C 13.0 20.0, 11.5 21.5, 8.8 25.5
            C 7.5 27.5, 5.5 26.5, 4.5 24.8
            C 3.5 23.2, 5.0 21.0, 7.5 18.2
            C 5.5 16.2, 5.5 15.8, 7.5 13.8
            C 5.0 11.0, 3.5 8.8, 4.5 7.2
            C 5.5 5.5, 7.5 4.5, 8.8 6.5
            C 11.5 10.5, 13.0 12.0, 16 12.0
            Z
          "
        />

        {/* Pedal Eyelet Hole at end of Crank Arm */}
        <circle cx="28" cy="16" r="1.1" fill="var(--background)" />

        {/* Crank Arm Channel Groove */}
        <line x1="18.5" y1="16" x2="25.5" y2="16" stroke="var(--background)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Central Dust Cap / Axle Bolt */}
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.6" fill="none" stroke="var(--background)" strokeWidth="0.5" />
        <line x1="15.2" y1="16" x2="16.8" y2="16" stroke="var(--background)" strokeWidth="0.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/** Wordmark: a lowercase grotesque with a cool red bike gear between velo and worx. */
export function Wordmark({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group cursor-pointer inline-flex items-baseline font-display font-extrabold lowercase tracking-[-0.05em] select-none ${className}`}
    >
      velo
      <span className="inline-flex items-center px-[0.08em] text-accent">
        <RedBikeGear isHovered={isHovered} />
      </span>
      worx
    </span>
  )
}

/** Load intro: rules close in, the wordmark resolves, the curtain lifts. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }
    const t1 = setTimeout(() => setPhase(1), 90)
    const t2 = setTimeout(() => setPhase(2), 1500)
    const t3 = setTimeout(onDone, 2200)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
      style={{
        transform: phase === 2 ? 'translateY(-101%)' : 'none',
        transition: 'transform 0.9s cubic-bezier(0.76,0,0.24,1)',
      }}
    >
      <div className="relative overflow-hidden px-6">
        <Wordmark className="block text-[13vw] leading-none sm:text-[9vw]" />
        <div
          className="absolute inset-0 bg-background"
          style={{
            transform: phase >= 1 ? 'translateX(101%)' : 'none',
            transition: 'transform 1.1s cubic-bezier(0.76,0,0.24,1) 0.12s',
          }}
        />
      </div>
      <div
        className="absolute bottom-10 left-1/2 h-px w-[min(70vw,520px)] -translate-x-1/2 bg-foreground/20"
        style={{
          transform: `translateX(-50%) scaleX(${phase >= 1 ? 1 : 0})`,
          transition: 'transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}
      />
    </div>
  )
}

export function Nav({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundColor: condensed ? 'rgba(244,242,238,0.86)' : 'transparent',
          backdropFilter: condensed ? 'blur(14px) saturate(1.1)' : 'none',
          borderColor: condensed ? 'var(--border)' : 'transparent',
        }}
      >
        <div
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 sm:px-10"
          style={{ paddingTop: condensed ? 14 : 26, paddingBottom: condensed ? 14 : 26 }}
        >
          <a href="#top" className="relative z-10 mix-blend-difference">
            {/* White + mix-blend-difference: reads light on the hero, ink once condensed. */}
            <Wordmark className="text-white" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="vx-link vx-eyebrow text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => onOpenBooking?.('Bike Fit ($225)')}
              className="vx-eyebrow border border-foreground/25 px-5 py-2.5 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
            >
              Book a Fitting
            </button>
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="block h-px bg-foreground transition-all duration-300"
              style={{ width: open ? 22 : 26, transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block h-px bg-foreground transition-all duration-300"
              style={{ width: open ? 22 : 18, transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 md:hidden"
        style={{
          clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.7s cubic-bezier(0.76,0,0.24,1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="vx-display border-b border-border py-4 text-[13vw] text-foreground transition-colors hover:text-accent"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(20px)',
                transition: `opacity .5s ease ${180 + i * 60}ms, transform .6s cubic-bezier(0.16,1,0.3,1) ${180 + i * 60}ms, color .3s`,
              }}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-10 space-y-1 font-mono text-xs text-muted-foreground">
          <p>{SHOP.address}</p>
          <p>{SHOP.city}</p>
          <a href={SHOP.phoneHref} className="vx-link text-foreground">
            {SHOP.phone}
          </a>
        </div>
      </div>
    </>
  )
}
