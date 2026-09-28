import './SecurityMindset.css'

const CHIPS = ['DATA', 'TRUST', 'PRIVACY', 'ACCESS', 'RESPONSIBILITY']

export default function SecurityMindset() {
  return (
    <section id="security">
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">07</span>
          <span className="line"></span>SECURITY MINDSET
        </div>
        <h2 className="section-title reveal">
          Security
          <br />
          as a mindset.
        </h2>

        <div className="sec-grid" style={{ marginTop: 50 }}>
          <div>
            <p className="section-sub">
              Cybersecurity is my academic specialization, not a professional
              expertise — I'm still learning. But it's already changing how I
              think about the software I build: who can access it, what it
              does with data, and why a user should trust it.
            </p>
            <div className="sec-chips">
              {CHIPS.map((chip) => (
                <span className="sec-chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="terminal">
            <div className="terminal-bar">
              <span>TERMINAL</span>
              <span>zsh — 80×20</span>
            </div>
            <div className="terminal-body">
              <div><span className="prompt">$</span> whoami</div>
              <div className="out">dhasarathi</div>
              <br />
              <div><span className="prompt">$</span> focus</div>
              <div className="out">learning + building</div>
              <br />
              <div><span className="prompt">$</span> stack</div>
              <div className="out">Java, Python, React, SQL</div>
              <br />
              <div><span className="prompt">$</span> status</div>
              <div className="out">
                student / developer<span className="cursor-blink"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
