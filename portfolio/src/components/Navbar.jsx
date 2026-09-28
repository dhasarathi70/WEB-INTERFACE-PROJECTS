import { useEffect, useState } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'hero', label: '01 HOME' },
  { id: 'about', label: '02 ABOUT' },
  { id: 'journey', label: '03 JOURNEY' },
  { id: 'skills', label: '04 SKILLS' },
  { id: 'projects', label: '05 PROJECTS' },
  { id: 'contact', label: '06 CONTACT' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const targets = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (!('IntersectionObserver' in window) || targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#hero" className="nav-logo" onClick={handleNavClick}>
          <span className="dot">D</span> DHASARATHI A.
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={active === item.id ? 'active' : ''}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <span className="status-dot" />
          <span className="status-label">AVAILABLE</span>
          <button
            className="theme-toggle"
            aria-label="Toggle light/dark theme"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          >
            ◐
          </button>
          <button
            className="nav-mobile-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
