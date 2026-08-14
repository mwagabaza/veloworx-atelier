import { useCallback, useState } from 'react'
import { Intro, Nav } from './components/Chrome'
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
  const finish = useCallback(() => setIntroDone(true), [])

  return (
    <div className="vx-grain min-h-screen bg-background text-foreground">
      {!introDone && <Intro onDone={finish} />}

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Ethos />
        <Range />
        <Spotlight />
        <Service />
        <Sukeun />
        <Brands />
        <TheShop />
        <Rides />
        <Testimonials />
        <Visit />
      </main>

      <Footer />
    </div>
  )
}
