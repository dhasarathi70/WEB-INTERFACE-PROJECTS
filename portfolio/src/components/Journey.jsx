import './Journey.css'

const MILESTONES = [
  {
    num: '01',
    title: 'Programming',
    desc: 'Java and Python as core languages — object-oriented design and data structures through coursework and practice.',
  },
  {
    num: '02',
    title: 'Web Development',
    desc: 'HTML → CSS → JavaScript → React, building interfaces that are progressively more structured and interactive.',
  },
  {
    num: '03',
    title: 'Data & Projects',
    desc: 'Learning by building — practical projects in data analysis, databases and applied software design.',
  },
]

export default function Journey() {
  return (
    <section id="journey">
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">03</span>
          <span className="line"></span>EDUCATION / JOURNEY
        </div>
        <h2 className="section-title reveal">
          Learning
          <br />
          in motion.
        </h2>

        <div className="timeline-top" style={{ marginTop: 60 }}>
          <div className="timeline-years reveal">2025 — 2029</div>
          <div className="timeline-status reveal">
            CURRENTLY II YEAR, III SEMESTER
            <span>B.E. Computer Science &amp; Engineering — Cyber Security</span>
          </div>
        </div>

        <div className="timeline-rows">
          {MILESTONES.map((m) => (
            <div className="tl-row reveal" key={m.num}>
              <div className="tl-num">{m.num}</div>
              <div className="tl-title">{m.title}</div>
              <div className="tl-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
