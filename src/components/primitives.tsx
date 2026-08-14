import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react'

/** Reveals children once they enter the viewport, then stops observing. */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(28px)',
        filter: shown ? 'none' : 'blur(4px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 1s ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

/** Button that leans a few pixels toward the cursor. */
export function Magnetic({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline'
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.32,
    })
  }

  const base =
    'group relative inline-flex items-center gap-3 px-8 py-4 text-[0.7rem] font-mono uppercase tracking-[0.22em] transition-colors duration-300 will-change-transform'
  const skin =
    variant === 'solid'
      ? 'bg-foreground text-background hover:bg-accent'
      : 'border border-foreground/25 text-foreground hover:border-accent hover:text-accent'

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, color 0.3s, border-color 0.3s'
      : 'transform 0.15s ease-out, background-color 0.3s, color 0.3s, border-color 0.3s',
  }

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
    </>
  )

  const shared = {
    ref,
    className: `${base} ${skin} ${className}`,
    style,
    onPointerMove: move,
    onPointerLeave: () => setOffset({ x: 0, y: 0 }),
  }

  return href ? (
    <a {...shared} href={href}>
      {inner}
    </a>
  ) : (
    <button {...shared} type="button" onClick={onClick}>
      {inner}
    </button>
  )
}

/** Numbered section marker sitting on a hairline rule. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-border pt-4">
      <span className="vx-eyebrow text-accent">{index}</span>
      <span className="vx-eyebrow text-muted-foreground">{children}</span>
    </div>
  )
}
