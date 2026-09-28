import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../utils/gsapSetup'
import './Hero.css'

export default function Hero({ active }) {
  const playedRef = useRef(false)

  useEffect(() => {
    if (!active || playedRef.current) return
    playedRef.current = true

    if (prefersReducedMotion()) {
      document.querySelectorAll('#hero .reveal').forEach((el) => {
        el.style.opacity = 1
        el.style.transform = 'none'
      })
      const span = document.querySelector('.hero-name .line span')
      if (span) span.style.transform = 'none'
      gsap.fromTo(
  ".hero-reveal",
  {
    opacity: 0,
    y: 70,
    clipPath: "inset(100% 0 0 0)",
  },
  {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    duration: 1.1,
    stagger: 0.12,
    delay: 0.25,
    ease: "power4.out",
  }
);

gsap.fromTo(
  ".hero-photo-reveal",
  {
    opacity: 0,
    y: 60,
    scale: 1.06,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.4,
    delay: 0.35,
    ease: "power4.out",
  }
);
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('header.nav', { autoAlpha: 0, y: -16, duration: 0.6 })
      .from('#heroLabel', { autoAlpha: 0, y: 10, duration: 0.5 }, '-=.2')
      .to('.hero-name .line span', { y: '0%', duration: 0.9, ease: 'power4.out' }, '-=.2')
      .to('.hero-role', { opacity: 1, y: 0, duration: 0.7 }, '-=.5')
      .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, '-=.55')
      .to('.hero-stack', { opacity: 1, y: 0, duration: 0.6 }, '-=.5')
      .to('.hero-cta-row', { opacity: 1, y: 0, duration: 0.6 }, '-=.45')
      .to('.hero-photo-wrap', { opacity: 1, y: 0, duration: 0.9 }, '-=.9')

    return () => tl.kill()
  }, [active])

  return (
    <section id="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-label" id="heroLabel">
            STUDENT / DEVELOPER — B.E. CSE (CYBER SECURITY)
          </div>
          <h1 className="hero-name">
            <span className="line">
              <span>DHASARATHI A.</span>
            </span>
          </h1>
          <p className="hero-role reveal">Cyber Security Student, Developer.</p>
          <p className="hero-desc reveal">
            B.E. Computer Science &amp; Engineering, specializing in Cyber Security.
            Currently learning, building and exploring through real, hands-on projects.
          </p>
          <div className="hero-stack reveal">
            <span>Java</span>
            <span>Python</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>SQL</span>
          </div>
          <div className="hero-cta-row reveal">
            <a href="#projects" className="btn-primary">VIEW PROJECTS ↗</a>
            <a href="#about" className="btn-secondary">ABOUT ME ↓</a>
          </div>
        </div>

        <div className="hero-photo-wrap reveal">
          <HeroPortrait />
        </div>
      </div>
    </section>
  )
}

function HeroPortrait() {
  return (
    <div className="hero-photo">
      <span className="photo-corner c1"></span>
      <span className="photo-corner c2"></span>
      <span className="photo-corner c3"></span>
      <span className="photo-corner c4"></span>

      <span className="photo-meta tl">
        STUDENT / DEVELOPER
      </span>

      <span className="photo-meta tr">
        2025 — 2029
        <br />
        INDIA
      </span>
<img
  src="/profile.jpg"
  alt="Dhasarathi A."
  className="profile-photo"
/>

      <span className="photo-meta bl">
        B.E. CSE / CYBER SECURITY
      </span>
    </div>
  )
}