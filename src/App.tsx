import { useCallback, useState } from 'react'
import { Intro, Nav } from './components/Chrome'
import { BookingModal } from './components/BookingModal'
import {
  Brands,
  Ethos,
  Footer,
  Hero,
  Range,
  Rides,
  Service,
  Spotlight,
  Sukeun,
  TheShop,
  Testimonials,
  Visit,
} from './components/sections'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState('Bike Fit ($225)')

  const finish = useCallback(() => setIntroDone(true), [])

  const handleOpenBooking = useCallback((service?: string) => {
    if (service) setBookingService(service)
    setBookingOpen(true)
  }, [])

  return (
    <div className="vx-grain min-h-screen bg-background text-foreground">
      {!introDone && <Intro onDone={finish} />}

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <Nav onOpenBooking={handleOpenBooking} />

      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <Ethos />
        <Range onOpenBooking={handleOpenBooking} />
        <Spotlight onOpenBooking={handleOpenBooking} />
        <Service onOpenBooking={handleOpenBooking} />
        <Sukeun />
        <Brands />
        <TheShop />
        <Rides />
        <Testimonials />
        <Visit onOpenBooking={handleOpenBooking} />
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingService}
      />
    </div>
  )
}
