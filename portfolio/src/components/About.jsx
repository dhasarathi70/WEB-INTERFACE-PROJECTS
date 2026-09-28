import './About.css'

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">02</span>
          <span className="line"></span>ABOUT
        </div>
        <div className="about-grid">
          <div>
            <h2 className="section-title reveal">
              A developer
              <br />
              in progress.
            </h2>
          </div>
          <div className="div"></div>
          <div className="about-body reveal">
            <p>
              I'm currently building my foundation in computer science through
              coursework, coding practice, personal projects and continuous
              exploration. My work spans programming, web development, data
              analysis and databases, with UI/UX as something I care about in
              every build.
            </p>
            <p>
              Cybersecurity is my academic specialization within Computer
              Science &amp; Engineering. It's not a professional credential
              yet — it's the lens I'm learning to see software through, from
              how data is handled to how systems are trusted.
            </p>
            <div className="about-list">
              <div className="about-list-row">
                <span>DEGREE</span>
                <span>B.E. Computer Science &amp; Engineering</span>
              </div>
              <div className="about-list-row">
                <span>SPECIALIZATION</span>
                <span>Cyber Security</span>
              </div>
              <div className="about-list-row">
                <span>STATUS</span>
                <span>II Year, III Semester</span>
              </div>
              <div className="about-list-row">
                <span>FOCUS</span>
                <span>Programming · Web Development · Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
