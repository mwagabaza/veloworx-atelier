import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  BRANDS,
  CATEGORIES,
  RIDES,
  SERVICES,
  SHOP,
  SPOTLIGHT,
  TESTIMONIALS,
} from '../lib/content'
import { Magnetic, Reveal, SectionLabel } from './primitives'
import { Wordmark } from './Chrome'

const SHELL = 'mx-auto max-w-[1600px] px-6 sm:px-10'

const heroPhotos = [
  { src: "/images/cyclist-in-motion.jpg", alt: "Cyclist in Motion", tag: "PRECISION MOTION" },
  { src: "/assets/venti-views-Mn9RPCNGSSI-unsplash.jpg", alt: "Venice Promenade Ride", tag: "BEACH PATH" },
  { src: "/assets/elisa-borghi-KIdwxVKu7dw-unsplash.jpg", alt: "Pro Carbon Road Build", tag: "CUSTOM ROAD" },
  { src: "/assets/jan-kopriva-0MrV3XwiYEE-unsplash.jpg", alt: "Santa Monica Canyon Gravel", tag: "GRAVEL EXPLORER" },
  { src: "/assets/jens-de-decker-W2vKVr4C3Xc-unsplash.jpg", alt: "Master Mechanic & Service", tag: "ATELIER CRAFT" },
  { src: "/assets/lalo-zepeda-IHiBr7jUu-8-unsplash.jpg", alt: "Venice Surf & Cruise", tag: "BEACH & SURF", objectPos: "object-[center_80%]" },
  { src: "/assets/linda-pomerantz-zhang-Ab6SE0LSNGE-unsplash.jpg", alt: "Criterium Race Motion", tag: "HIGH SPEED" },
  { src: "/assets/mike-von-ZtqK2T7LJis-unsplash.jpg", alt: "Custom Track & Fixed-Gear", tag: "URBAN FIXIE", objectPos: "object-[center_80%]" },
  { src: "/assets/rachel-martin-YZEGtY07jG0-unsplash.jpg", alt: "Topanga Mountain Overlook", tag: "TRAIL SUMMIT", objectPos: "object-[center_80%]" },
  { src: "/assets/rafael-garcin-o8vKaWK_k4g-unsplash.jpg", alt: "Pacific Coast Highway Ride", tag: "COASTAL PACIFIC", objectPos: "object-[center_80%]" },
  { src: "/assets/rafael-garcin-wgELNcDK49Q-unsplash.jpg", alt: "Santa Monica Pier Ride", tag: "PIER SILHOUETTE", objectPos: "object-[center_80%]" },
  { src: "/assets/raul-de-los-santos-hwdbmbL2Duo-unsplash.jpg", alt: "Santa Monica Palm Avenue", tag: "PALM PROMENADE", objectPos: "object-[center_80%]" },
  { src: "/assets/tim-foster-jhovC0t8f-8-unsplash.jpg", alt: "Off-Road Trail Shredding", tag: "MOUNTAIN" },
  { src: "/assets/travis-yewell-43ScFMWx2xY-unsplash.jpg", alt: "Venice Skate & Bike Culture", tag: "BEACH CULTURE", objectPos: "object-[center_80%]" },
  { src: "/assets/venti-views-D21SWrnHof8-unsplash.jpg", alt: "City Lights Night Sprint", tag: "NIGHT RIDE" },
  { src: "/assets/venti-views-EEZRG2acqgQ-unsplash.jpg", alt: "Pro Team Rider & Kit", tag: "PRO ATHLETE" },
  { src: "/assets/venti-views-S-tyJJKWCyU-unsplash.jpg", alt: "Golden Hour Hill Climb", tag: "SUNSET CLIMB" },
  { src: "/assets/venti-views-tA43SkziQYI-unsplash.jpg", alt: "Pro Peloton Cornering", tag: "PELOTON" },
]

/* ── Hero ─────────────────────────────────────────────────────────────── */

export function Hero({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [y, setY] = useState(0)

  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPhotos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroPhotos.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)

  const currentPhoto = heroPhotos[currentIndex]

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-[#14140f] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: `translateY(${y * 0.28}px)` }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentPhoto.src}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 6, ease: "easeOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className={`h-full w-full object-cover ${currentPhoto.objectPos || ''}`}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 z-10" />
      </div>

      {/* Main Hero Content */}
      <div className={`relative z-20 flex h-full flex-col justify-end pb-16 ${SHELL} sm:pb-20`}>
        <div className="max-w-5xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="vx-eyebrow rounded-full border border-white/20 bg-black/40 px-4 py-1.5 backdrop-blur-md text-accent">
              {currentPhoto.tag}
            </span>
            <p
              className="vx-eyebrow text-white/60"
              style={{ opacity: Math.max(0, 1 - y / 320) }}
            >
              Venice · Santa Monica · Est. {SHOP.established}
            </p>
          </div>
          <h1 className="vx-display text-[10vw] text-white sm:text-[7vw] lg:text-[5.75rem] uppercase leading-[0.95] tracking-tight">
            Boutique Bikeshop
            <br />
            <span className="text-white/55">&amp; Precision Tuning Atelier</span>
          </h1>
          <div className="mt-8 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-[0.95rem] leading-relaxed text-white/75">
              A boutique bicycle shop on Lincoln. Road, gravel, mountain, and the cruiser
              you will actually ride to the pier. Fitted, built, and tuned by hand.
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic onClick={() => onOpenBooking?.('Bike Fit ($225)')}>Book a fitting</Magnetic>
              <Magnetic href="#range" variant="outline" className="!text-white !border-white/30">
                See the range
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute left-6 right-6 top-1/2 z-30 flex -translate-y-1/2 justify-between pointer-events-none sm:left-10 sm:right-10">
        <button
          type="button"
          onClick={prevSlide}
          className="pointer-events-auto rounded-full border border-white/25 bg-black/40 p-3 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-black/70 hover:text-accent group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="pointer-events-auto rounded-full border border-white/25 bg-black/40 p-3 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-black/70 hover:text-accent group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Bottom Bar: Slide Counter & Animated Progress Indicator */}
      <div className={`absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none sm:bottom-8 sm:left-10 sm:right-10`}>
        <div className="pointer-events-auto rounded border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
          <span className="font-mono text-xs text-white/80">{currentPhoto.alt}</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          <div className="font-mono text-xs tabular-nums text-white/70">
            <span className="font-bold text-accent">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>{String(heroPhotos.length).padStart(2, '0')}</span>
          </div>
          <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/20 sm:w-44">
            <motion.div
              key={currentIndex + (isPaused ? '-paused' : '-active')}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: isPaused ? 0 : 4.5,
                ease: 'linear',
              }}
              className={`h-full ${isPaused ? 'bg-white/50' : 'bg-accent'}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Ethos ────────────────────────────────────────────────────────────── */

export function Ethos() {
  return (
    <section className={`${SHELL} py-28 sm:py-40`}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel index="00">Ethos</SectionLabel>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={80}>
            <p className="font-display text-[2rem] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.6rem]">
              We do not sell bicycles. We set them up, take them apart, and hand them
              back better than they arrived — whether that is a{' '}
              <span className="text-accent">$14,000 race machine</span> or a swap-meet
              cruiser with a bent fender.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
              {[
                ['One mechanic', 'Sukeun touches every bike that leaves the stand.'],
                ['No hard sell', 'We will happily tell you not to buy the expensive one.'],
                ['Two dogs', 'Ruse and Comet supervise. Neither is certified.'],
              ].map(([title, body]) => (
                <div key={title}>
                  <h3 className="vx-eyebrow mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Range ────────────────────────────────────────────────────────────── */

export function Range({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="range" className={`${SHELL} scroll-mt-24 pb-28 sm:pb-40`}>
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <SectionLabel index="01">The Range</SectionLabel>
          <h2 className="vx-display mt-6 text-[13vw] sm:text-[7vw] lg:text-[5.5rem]">
            Five ways
            <br />
            to ride
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Everything on the floor has been ridden by someone who works here. Ask what
          we actually think.
        </p>
      </Reveal>

      <div className="border-t border-border">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 60}>
            <button
              type="button"
              onClick={() => onOpenBooking?.(`${cat.name} Bike Fitting / Build`)}
              className="group relative flex w-full items-center justify-between gap-6 border-b border-border py-7 text-left transition-colors duration-500 hover:border-foreground sm:py-9"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <div className="flex flex-1 items-baseline gap-5 sm:gap-10">
                <span className="vx-eyebrow w-8 shrink-0 text-muted-foreground transition-colors group-hover:text-accent">
                  {cat.index}
                </span>
                <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  <h3 className="vx-display text-[10vw] leading-none sm:text-[5vw] lg:text-[4.25rem]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground lg:hidden">
                    {cat.line}
                  </p>
                </div>
              </div>
              <p className="hidden max-w-sm flex-1 text-sm leading-relaxed text-muted-foreground lg:block">
                {cat.line}
              </p>
              <span
                aria-hidden
                className="hidden shrink-0 text-2xl text-foreground/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent sm:block"
              >
                ↗
              </span>

              {/* Mobile / small screens get the description stacked instead of the floating image */}
              <span className="sr-only">{cat.note}</span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Hover-reveal preview, pinned to the right of the list on large screens. */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-10 top-1/2 z-30 hidden h-[26rem] w-[19rem] -translate-y-1/2 overflow-hidden bg-muted xl:block"
        style={{
          opacity: active === null ? 0 : 1,
          transform: `translateY(-50%) scale(${active === null ? 0.96 : 1})`,
          transition: 'opacity .5s cubic-bezier(0.16,1,0.3,1), transform .6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <img
            key={cat.name}
            src={cat.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
          <p className="text-xs leading-relaxed text-white/85">
            {active !== null && CATEGORIES[active].note}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Spotlight ────────────────────────────────────────────────────────── */

export function Spotlight({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  return (
    <section className="bg-foreground py-24 text-background sm:py-32">
      <div className={`${SHELL} grid items-center gap-14 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800">
            <img
              src={SPOTLIGHT.image}
              alt={SPOTLIGHT.alt}
              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 lg:pl-10">
          <p className="vx-eyebrow text-accent">{SPOTLIGHT.eyebrow}</p>
          <h2 className="vx-display mt-6 text-[11vw] sm:text-[6vw] lg:text-[4.75rem]">
            {SPOTLIGHT.name}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-background/50">
            {SPOTLIGHT.build}
          </p>
          <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-background/75">
            {SPOTLIGHT.copy}
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-background/15 pt-6">
            {[
              ['Price', SPOTLIGHT.price],
              ['Weight', SPOTLIGHT.weight],
              ['Sizes', SPOTLIGHT.size],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="vx-eyebrow text-background/45">{k}</dt>
                <dd className="mt-2 font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Magnetic onClick={() => onOpenBooking?.('Test Ride: Cervélo Áspero-5')} variant="outline" className="!border-background/30 !text-background">
              Reserve a test ride
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Service ──────────────────────────────────────────────────────────── */

export function Service({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  return (
    <section id="service" className={`${SHELL} scroll-mt-24 py-28 sm:py-40`}>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="02">Service &amp; Repairs</SectionLabel>
            <h2 className="vx-display mt-6 text-[13vw] sm:text-[7vw] lg:text-[5rem]">
              The stand
              <br />
              is the shop
            </h2>
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
              Walk-ins welcome for anything small. Anything larger gets a written
              estimate before a single bolt moves — and a call if we find something you
              did not ask about.
            </p>
            <div className="mt-10">
              <Magnetic href={SHOP.phoneHref}>Call {SHOP.phone}</Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="border-t border-border">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 50}>
                <button
                  type="button"
                  onClick={() => onOpenBooking?.(`${s.name} (${s.price})`)}
                  className="group grid w-full items-baseline grid-cols-[auto_1fr_auto] gap-x-5 border-b border-border py-6 text-left transition-colors duration-500 hover:border-accent"
                >
                  <span className="vx-eyebrow text-muted-foreground">{s.index}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {s.name}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {s.detail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{s.price}</p>
                    <p className="vx-eyebrow mt-1 text-muted-foreground">{s.turn}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sukeun ───────────────────────────────────────────────────────────── */

export function Sukeun() {
  return (
    <section id="sukeun" className="scroll-mt-24 border-y border-border bg-secondary py-24 sm:py-32">
      <div className={`${SHELL} grid gap-14 lg:grid-cols-12 lg:items-end`}>
        <Reveal className="lg:col-span-6">
          <SectionLabel index="03">Heritage</SectionLabel>
          <h2 className="vx-display mt-6 text-[13vw] sm:text-[7vw] lg:text-[5.5rem]">
            Sukeun
          </h2>
          <p className="mt-8 max-w-lg text-[1.05rem] leading-relaxed">
            Three decades at the stand. Team mechanic work in Europe, wheels built for
            riders who counted spoke tension in newtons, and twenty-odd years on Lincoln
            teaching people how to hold a chain tool.
          </p>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
            He will spend the same hour on a first-time commuter as on a national
            champion, and he will not remember which one spent more money.
          </p>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ['Years at the bench', '31'],
              ['Wheels built', '4,200+'],
              ['Bikes fit', '9,800+'],
            ].map(([k, v]) => (
              <div key={k}>
                <dd className="font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                  {v}
                </dd>
                <dt className="vx-eyebrow mt-3 text-muted-foreground">{k}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <figure className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src="/images/mechanic-bike.jpg"
                alt="Sukeun working on a bicycle in the Veloworx workshop"
                className="h-full w-full object-cover transition-all duration-[1.4s] ease-out hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption className="vx-eyebrow mt-4 text-muted-foreground">
              Sukeun · owner, mechanic, fitter
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Brands ───────────────────────────────────────────────────────────── */

export function Brands() {
  const row = [...BRANDS, ...BRANDS]
  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <div className={`${SHELL} mb-10`}>
        <Reveal>
          <SectionLabel index="04">Stocked &amp; Serviced</SectionLabel>
        </Reveal>
      </div>
      <div className="relative">
        <div className="vx-marquee flex w-max gap-16 sm:gap-24">
          {row.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground/35 transition-colors duration-300 hover:text-foreground sm:text-4xl"
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  )
}

/* ── The Shop ─────────────────────────────────────────────────────────── */

export function TheShop() {
  const oceanPhotos = [
    { src: '/assets/lalo-zepeda-IHiBr7jUu-8-unsplash.jpg', alt: 'Venice Surf & Cruiser', caption: 'Venice Beach Boardwalk' },
    { src: '/assets/rafael-garcin-o8vKaWK_k4g-unsplash.jpg', alt: 'Pacific Coast Highway Ride', caption: 'Pacific Coast Highway' },
    { src: '/assets/rafael-garcin-wgELNcDK49Q-unsplash.jpg', alt: 'Santa Monica Pier Sunset', caption: 'Santa Monica Pier' },
    { src: '/assets/raul-de-los-santos-hwdbmbL2Duo-unsplash.jpg', alt: 'Santa Monica Palm Promenade', caption: 'Palm Avenue' },
    { src: '/assets/travis-yewell-43ScFMWx2xY-unsplash.jpg', alt: 'Venice Beach Bike Culture', caption: 'Ocean Promenade' },
  ]

  return (
    <section id="shop" className={`${SHELL} scroll-mt-24 py-24 sm:py-32`}>
      <Reveal className="mb-14 max-w-2xl">
        <SectionLabel index="05">The Shop</SectionLabel>
        <h2 className="vx-display mt-6 text-[11vw] sm:text-[6vw] lg:text-[4.75rem] leading-[0.95]">
          5 minute bike ride
          <br />
          <span className="text-muted-foreground">to the beach</span>
        </h2>
      </Reveal>

      {/* Main Shop Floor Info */}
      <div className="mb-12 grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img
              src="/images/shop-floor.jpg"
              alt="The Veloworx workshop floor with bikes on repair stands"
              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={100} className="md:col-span-5">
          <div className="flex h-full flex-col justify-between gap-8 bg-secondary p-8 sm:p-10">
            <p className="text-[0.95rem] leading-relaxed">
              Lincoln Boulevard, between the Venice canals and Ocean Park. Espresso on
              the counter, a floor pump by the door, and two dogs who will greet you
              before anyone else does.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">Ruse</p>
                <p className="vx-eyebrow mt-2 text-muted-foreground">Shop dog · greeter</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">Comet</p>
                <p className="vx-eyebrow mt-2 text-muted-foreground">Shop dog · quality control</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Ocean Block Photo Gallery */}
      <Reveal delay={140} className="mt-16">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <span className="vx-eyebrow text-accent">Ocean Block · Santa Monica &amp; Venice Beach</span>
          <span className="font-mono text-xs text-muted-foreground">5 Min Ride</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {oceanPhotos.map((photo, i) => (
            <div key={photo.src} className="group relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="vx-eyebrow block text-[10px] text-accent">0{i + 1}</span>
                <p className="font-mono text-xs leading-snug">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ── Rides ────────────────────────────────────────────────────────────── */

export function Rides() {
  return (
    <section className={`${SHELL} py-20 sm:py-28`}>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionLabel index="06">Shop Rides</SectionLabel>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Free, open to anyone, and nobody gets left on a climb. Meet outside the
            roll-up door.
          </p>
        </Reveal>
        <div className="lg:col-span-8">
          <div className="border-t border-border">
            {RIDES.map((r, i) => (
              <Reveal key={r.name} delay={i * 70}>
                <div className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-border py-6 transition-colors hover:border-accent">
                  <div className="flex items-baseline gap-6">
                    <span className="vx-eyebrow w-24 shrink-0 text-accent">{r.day}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{r.detail}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm tabular-nums">{r.time}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ─────────────────────────────────────────────────────── */

export function Testimonials() {
  const [i, setI] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % TESTIMONIALS.length)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section
      className="border-y border-border bg-secondary py-24 sm:py-32"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <div className={SHELL}>
        <Reveal>
          <SectionLabel index="07">In Their Words</SectionLabel>
        </Reveal>

        <div className="relative mt-12 min-h-[19rem] sm:min-h-[16rem]">
          {TESTIMONIALS.map((t, idx) => (
            <blockquote
              key={t.name}
              aria-hidden={idx !== i}
              className="absolute inset-0"
              style={{
                opacity: idx === i ? 1 : 0,
                transform: idx === i ? 'none' : 'translateY(14px)',
                transition: 'opacity .7s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1)',
                pointerEvents: idx === i ? 'auto' : 'none',
              }}
            >
              <p className="max-w-4xl font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.03em] sm:text-[2.4rem] lg:text-[3rem]">
                <span className="text-accent">“</span>
                {t.quote}
                <span className="text-accent">”</span>
              </p>
              <footer className="mt-8 flex items-baseline gap-4">
                <cite className="vx-eyebrow not-italic">{t.name}</cite>
                <span className="vx-eyebrow text-muted-foreground">{t.meta}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-6 border-t border-border pt-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-accent hover:text-accent"
            >
              →
            </button>
          </div>
          <div className="flex flex-1 gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={idx === i}
                className="group h-6 flex-1"
              >
                <span
                  className="block h-px w-full transition-all duration-500"
                  style={{
                    marginTop: 12,
                    backgroundColor: idx === i ? 'var(--accent)' : 'var(--border)',
                    height: idx === i ? 2 : 1,
                  }}
                />
              </button>
            ))}
          </div>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {String(i + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── Visit ────────────────────────────────────────────────────────────── */

export function Visit({ onOpenBooking }: { onOpenBooking?: (service?: string) => void }) {
  return (
    <section id="visit" className={`${SHELL} scroll-mt-24 py-28 sm:py-40`}>
      <Reveal className="mb-14">
        <SectionLabel index="08">Visit</SectionLabel>
        <h2 className="vx-display mt-6 text-[13vw] sm:text-[8vw] lg:text-[6.5rem]">
          3106 Lincoln
        </h2>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <dl className="space-y-8">
            <div className="border-t border-border pt-5">
              <dt className="vx-eyebrow text-muted-foreground">Hours</dt>
              <dd className="mt-4 space-y-2">
                {SHOP.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6 text-[0.95rem]">
                    <span>{h.days}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
            <div className="border-t border-border pt-5">
              <dt className="vx-eyebrow text-muted-foreground">Address</dt>
              <dd className="mt-4 text-[0.95rem] leading-relaxed">
                {SHOP.address}
                <br />
                {SHOP.city}
              </dd>
            </div>
            <div className="border-t border-border pt-5">
              <dt className="vx-eyebrow text-muted-foreground">Contact</dt>
              <dd className="mt-4 flex flex-col items-start gap-2 text-[0.95rem]">
                <a href={SHOP.phoneHref} className="vx-link">
                  {SHOP.phone}
                </a>
                <a
                  href={SHOP.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="vx-link"
                >
                  Instagram
                </a>
                <a
                  href={SHOP.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="vx-link"
                >
                  Facebook
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Magnetic onClick={() => onOpenBooking?.('Bike Fit ($225)')}>Book a fitting</Magnetic>
              <Magnetic href={SHOP.mapHref} variant="outline">Get directions</Magnetic>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <a
            href={SHOP.mapHref}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative block h-full min-h-[26rem] overflow-hidden border border-border bg-muted"
            aria-label="Open Veloworx location in Google Maps"
          >
            <iframe
              title="Map showing Veloworx at 3106 Lincoln Blvd, Santa Monica"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7272828236746!2d-118.4637659235043!3d34.00469897317377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba54817a3a89%3A0x6b4fb7c805eb3db9!2s3106%20Lincoln%20Blvd%2C%20Santa%20Monica%2C%20CA%2090405!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="h-full min-h-[26rem] w-full invert contrast-125 saturate-50 transition-all duration-700 group-hover:invert-0 group-hover:contrast-100 group-hover:saturate-100"
              loading="lazy"
              style={{ border: 0 }}
            />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded border border-white/15 bg-black/85 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-semibold text-white">3106 Lincoln Blvd · Santa Monica, CA</span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="bg-foreground pb-10 pt-20 text-background">
      <div className={SHELL}>
        <Wordmark className="block text-[19vw] leading-[0.78] text-background sm:text-[15vw]" />
        <div className="mt-14 flex flex-col gap-8 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="vx-eyebrow text-background/50">
            Est. {SHOP.established} · Lincoln Blvd · Santa Monica
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="vx-link vx-eyebrow text-background/70 hover:text-background"
            >
              Instagram
            </a>
            <a
              href={SHOP.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="vx-link vx-eyebrow text-background/70 hover:text-background"
            >
              Facebook
            </a>
            <a href={SHOP.phoneHref} className="vx-link vx-eyebrow text-background/70 hover:text-background">
              {SHOP.phone}
            </a>
          </div>
          <p className="vx-eyebrow text-background/35">
            © {new Date().getFullYear()} Veloworx
          </p>
        </div>
      </div>
    </footer>
  )
}
