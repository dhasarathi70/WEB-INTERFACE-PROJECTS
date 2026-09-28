import { useEffect, useState } from 'react'
import { ensureGsapRegistered, gsap, prefersReducedMotion } from './utils/gsapSetup'

import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Journey from './components/Journey.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import SecurityMindset from './components/SecurityMindset.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [heroReady, setHeroReady] = useState(false)

  // Global scroll-reveal: every element with class "reveal" outside the
  // hero fades/slides in once it's ~85% into the viewport. The hero's own
  // .reveal elements are driven by the entrance timeline in Hero.jsx instead,
  // so they're excluded here.
  useEffect(() => {
    if (prefersReducedMotion()) return
    ensureGsapRegistered()

    const ctx = gsap.context(() => {
      const revealEls = gsap.utils.toArray('.reveal').filter(
        (el) => !el.closest('#hero')
      )
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })

      const tlRows = gsap.utils.toArray('.tl-row')
      tlRows.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-vignette" />

      <Preloader onComplete={() => setHeroReady(true)} />

      <Navbar />

      <main>
        <Hero active={heroReady} />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <SecurityMindset />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
