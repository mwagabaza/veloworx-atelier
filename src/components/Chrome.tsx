import { useEffect, useState } from 'react'
import { NAV, SHOP } from '../lib/content'

/** Wordmark: a lowercase grotesque with a hairline between velo and worx. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold lowercase tracking-[-0.05em] ${className}`}>
      velo<span className="text-accent">·</span>worx
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
