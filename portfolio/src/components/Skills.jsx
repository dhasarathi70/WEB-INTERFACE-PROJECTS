import { useRef, useState } from 'react'
import { gsap } from '../utils/gsapSetup'
import './Skills.css'

const SKILL_DATA = [
  {
    name: 'Programming',
    tags: ['Java', 'Python', 'OOP', 'Data Structures'],
    note: 'The languages and thinking patterns behind everything else I build.',
  },
  {
    name: 'Web Development',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    note: 'Building interfaces — from static pages to component-driven React apps.',
  },
  {
    name: 'Data & Database',
    tags: ['Python', 'Pandas', 'NumPy', 'SQL'],
    note: 'Working with data — from relational databases to exploratory analysis.',
  },
  {
    name: 'Design & Tools',
    tags: ['UI/UX', 'Git', 'GitHub', 'VS Code'],
    note: 'The practices and tools that keep projects organized and usable.',
  },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const panelRef = useRef(null)

  const handleSelect = (i) => {
    setActive(i)
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0.4 }, { opacity: 1, duration: 0.35 })
    }
  }

  const current = SKILL_DATA[active]

  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">04</span>
          <span className="line"></span>SKILLS
        </div>
        <h2 className="section-title reveal">
          Tools I use.
          <br />
          Things I build.
        </h2>

        <div className="skills-layout" style={{ marginTop: 60 }}>
          <div className="skill-cat-list">
            {SKILL_DATA.map((cat, i) => (
              <div
                key={cat.name}
                className={`skill-cat${active === i ? ' active' : ''}`}
                onClick={() => handleSelect(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(i) }}
              >
                <div className="skill-cat-left">
                  <span className="skill-cat-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="skill-cat-name">{cat.name}</span>
                </div>
                <span className="skill-cat-arrow">→</span>
              </div>
            ))}
          </div>

          <div className="skill-panel" ref={panelRef}>
            <div className="skill-panel-head">
              <span>{String(active + 1).padStart(2, '0')} / 04</span>
              <span>ACTIVE CATEGORY</span>
            </div>
            <h3 className="skill-panel-title">{current.name}</h3>
            <div className="skill-tags">
              {current.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="skill-panel-note">{current.note}</p>
          </div>
        </div>

        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            <span className="num">05</span>
            <span className="line"></span>ACADEMIC SPECIALIZATION
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.6vw,1.9rem)' }}>
            Cyber Security
          </h3>
          <p className="section-sub" style={{ marginTop: 12 }}>
            Currently studying Cyber Security as part of my B.E. Computer Science &amp; Engineering degree.
          </p>
        </div>
      </div>
    </section>
  )
}
