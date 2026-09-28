import { useRef, useState } from 'react'
import { gsap } from '../utils/gsapSetup'
import './Projects.css'

const PROJECTS = [
  {
    cat: 'WEB APPLICATION',
    title: 'Attendance Management System',
    tech: 'React / JavaScript / CSS',
    role: 'Frontend Development',
    desc: 'Responsive attendance management interface for managing student records and attendance status.',
  },
  {
    cat: 'WEB EXPERIENCE',
    title: 'CineNext',
    tech: 'HTML / CSS / JavaScript',
    role: 'Web Development',
    desc: 'Movie-focused website designed to present upcoming movies through an engaging web interface.',
  },
  {
    cat: 'DATA ANALYSIS',
    title: 'Movie Rating Analysis',
    tech: 'Python / Pandas / NumPy / Matplotlib',
    role: 'Data Analysis',
    desc: 'Data analysis project exploring movie ratings and visualizing patterns in the dataset.',
  },
  {
    cat: 'JAVA APPLICATION',
    title: 'Student Management System',
    tech: 'Java / OOP / Data Structures',
    role: 'Java Development',
    desc: 'Academic Java project focused on student record management and object-oriented programming concepts.',
  },
  {
    cat: 'PYTHON PROJECT',
    title: 'Password Strength Checker',
    tech: 'Python / String Processing',
    role: 'Python Development',
    desc: 'Python project that evaluates password characteristics and provides strength feedback.',
  },
  {
    cat: 'DATABASE PROJECT',
    title: 'Hospital Management System',
    tech: 'SQL / DBMS / ER Modeling',
    role: 'Database Design',
    desc: 'Database-oriented academic project focused on organizing hospital-related records and relationships.',
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const panelRef = useRef(null)

  const handleSelect = (i) => {
    if (i === active) return
    const panel = panelRef.current
    if (panel) {
      gsap.timeline()
        .to(panel, { opacity: 0, y: 8, duration: 0.2, ease: 'power2.in' })
        .call(() => setActive(i))
        .to(panel, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    } else {
      setActive(i)
    }
  }

  const p = PROJECTS[active]

  return (
    <section id="projects">
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">06</span>
          <span className="line"></span>PROJECTS
        </div>
        <h2 className="section-title reveal">
          Selected
          <br />
          projects.
        </h2>

        <div className="projects-layout" style={{ marginTop: 60 }}>
          <div id="projectList">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                className={`project-row${active === i ? ' active' : ''}`}
                onClick={() => handleSelect(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(i) }}
              >
                <div className="project-row-left">
                  <span className="project-row-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="project-row-name">{proj.title}</span>
                </div>
                <span className="project-row-arrow">↗</span>
              </div>
            ))}
          </div>

          <div className="project-panel" ref={panelRef}>
            <div className="pp-top">
              <span className="cat">{p.cat}</span>
              <span>{String(active + 1).padStart(2, '0')} / 06</span>
            </div>
            <h3 className="pp-title">{p.title}</h3>
            <p className="pp-desc">{p.desc}</p>
            <div className="pp-meta">
              <div className="pp-meta-item">
                TECHNOLOGY
                <strong>{p.tech}</strong>
              </div>
              <div className="pp-meta-item">
                ROLE
                <strong>{p.role}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
