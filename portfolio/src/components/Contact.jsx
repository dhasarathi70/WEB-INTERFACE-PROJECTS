import './Contact.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap contact-inner">
        <div>
          <div className="eyebrow">
            <span className="num">08</span>
            <span className="line"></span>CONTACT
          </div>
          <h2 className="contact-title reveal">
            Let's build
            <br />
            something.
          </h2>
          <p className="contact-text reveal">
            I'm currently focused on learning, building projects and growing
            as a developer. If you'd like to discuss a project, collaboration,
            internship opportunity or simply connect, feel free to reach out.
          </p>
          <div className="contact-cta reveal">
            <a href="mailto:dhasarathi09@gmail.com" className="btn-primary">
              LET'S TALK ↗
            </a>
          </div>
        </div>

        <div className="contact-links reveal">
          <a className="contact-link-row" href="mailto:dhasarathi09@gmail.com">
            <span className="contact-link-label">EMAIL</span>
            <span className="contact-link-value">dhasarathi09@gmail.com</span>
          </a>
          <a
            className="contact-link-row"
            href="https://github.com/dhasarathi70"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link-label">GITHUB</span>
            <span className="contact-link-value">github.com/dhasarathi70</span>
          </a>
        <a
  className="contact-link-row"
  href="https://www.linkedin.com/in/dhasarathi-a-671652386/"
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="contact-link-label">LINKEDIN</span>
  <span className="contact-link-value">Connect with me</span>
</a>
        </div>
      </div>
    </section>
  )
}
