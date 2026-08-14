import { useEffect, useState } from 'react'
import { NAV, SHOP } from '../lib/content'

export function RedBikeGear({ className = 'h-[0.54em] w-[0.54em]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block text-accent align-[-0.04em] transition-transform duration-700 hover:rotate-90 ${className}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 19.496,10.746 L 22.36,11.094 L 23.492,11.559 L 23.492,12.441 L 22.36,12.906 L 19.496,13.254 L 19.298,14.122 L 21.728,15.679 L 22.545,16.588 L 22.162,17.384 L 20.941,17.312 L 18.209,16.382 L 17.654,17.078 L 19.168,19.535 L 19.51,20.709 L 18.82,21.26 L 17.751,20.665 L 15.693,18.643 L 14.891,19.029 L 15.189,21.899 L 14.987,23.105 L 14.127,23.302 L 13.422,22.302 L 12.445,19.587 L 11.555,19.587 L 10.578,22.302 L 9.873,23.302 L 9.013,23.105 L 8.811,21.899 L 9.109,19.029 L 8.307,18.643 L 6.249,20.665 L 5.18,21.26 L 4.49,20.709 L 4.832,19.535 L 6.346,17.078 L 5.791,16.382 L 3.059,17.312 L 1.838,17.384 L 1.455,16.588 L 2.272,15.679 L 4.702,14.122 L 4.504,13.254 L 1.64,12.906 L 0.508,12.441 L 0.508,11.559 L 1.64,11.094 L 4.504,10.746 L 4.702,9.878 L 2.272,8.321 L 1.455,7.412 L 1.838,6.616 L 3.059,6.688 L 5.791,7.618 L 6.346,6.922 L 4.832,4.465 L 4.49,3.291 L 5.18,2.74 L 6.249,3.335 L 8.307,5.357 L 9.109,4.971 L 8.811,2.101 L 9.013,0.895 L 9.873,0.698 L 10.578,1.698 L 11.555,4.413 L 12.445,4.413 L 13.422,1.698 L 14.127,0.698 L 14.987,0.895 L 15.189,2.101 L 14.891,4.971 L 15.693,5.357 L 17.751,3.335 L 18.82,2.74 L 19.51,3.291 L 19.168,4.465 L 17.654,6.922 L 18.209,7.618 L 20.941,6.688 L 22.162,6.616 L 22.545,7.412 L 21.728,8.321 L 19.298,9.878 Z M 15.521,12.748 L 18.065,13.289 A 6.2 6.2 0 0 1 15.1,17.369 L 13.8,15.118 A 3.6 3.6 0 0 0 15.521,12.748 Z M 12.376,15.58 L 12.648,18.166 A 6.2 6.2 0 0 1 7.851,16.607 L 9.591,14.675 A 3.6 3.6 0 0 0 12.376,15.58 Z M 8.711,13.464 L 6.336,14.522 A 6.2 6.2 0 0 1 6.336,9.478 L 8.711,10.536 A 3.6 3.6 0 0 0 8.711,13.464 Z M 9.591,9.325 L 7.851,7.393 A 6.2 6.2 0 0 1 12.648,5.834 L 12.376,8.42 A 3.6 3.6 0 0 0 9.591,9.325 Z M 13.8,8.882 L 15.1,6.631 A 6.2 6.2 0 0 1 18.065,10.711 L 15.521,11.252 A 3.6 3.6 0 0 0 13.8,8.882 Z M 16.2,12.0 a 0.6 0.6 0 1 0 1.2 0 a 0.6 0.6 0 1 0 -1.2 0 Z M 12.883,16.565 a 0.6 0.6 0 1 0 1.2 0 a 0.6 0.6 0 1 0 -1.2 0 Z M 7.517,14.821 a 0.6 0.6 0 1 0 1.2 0 a 0.6 0.6 0 1 0 -1.2 0 Z M 7.517,9.179 a 0.6 0.6 0 1 0 1.2 0 a 0.6 0.6 0 1 0 -1.2 0 Z M 12.883,7.435 a 0.6 0.6 0 1 0 1.2 0 a 0.6 0.6 0 1 0 -1.2 0 Z M 10.2,12 a 1.8 1.8 0 1 0 3.6 0 a 1.8 1.8 0 1 0 -3.6 0 Z"
      />
    </svg>
  )
}

/** Wordmark: a lowercase grotesque with a cool red bike gear between velo and worx. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-display font-extrabold lowercase tracking-[-0.05em] ${className}`}>
      velo
      <span className="inline-flex items-center px-[0.06em] text-accent">
        <RedBikeGear />
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
