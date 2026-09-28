import { Link } from "react-router-dom";

const features = [
  ["01", "Real-time validation", "Touched-field validation provides useful feedback without overwhelming the user."],
  ["02", "Dependent location", "State, district and city relationships prevent impossible combinations."],
  ["03", "City autocomplete", "Typeahead suggestions make larger city lists easier to search."],
  ["04", "Pincode intelligence", "A local demo dataset can compare pincode and selected location."],
  ["05", "Password strength", "Requirements and strength feedback help users create stronger passwords."],
  ["06", "Image validation", "File type, size and image dimensions are checked before accepting a photo."],
  ["07", "Accessible controls", "Labels, focus states, ARIA attributes and keyboard interaction are included."],
  ["08", "Cross-field checks", "Related values such as phone numbers, passwords and location are validated together."]
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="page-container hero-grid">
          <div>
            <span className="eyebrow">Frontend Form Architecture</span>
            <h1>
              Professional User Registration
              <br />
              <span>& Validation System</span>
            </h1>
            <p className="hero-description">
              A realistic React form project designed to demonstrate validation,
              dependent fields, autocomplete, accessibility, password analysis,
              image validation and client-side data handling.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button">
                Start Registration
              </Link>
              <a href="#features" className="secondary-button">
                Explore Features
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <h2 className="hero-panel-title">What this project demonstrates</h2>
            <div className="demo-list">
              {["Controlled React form state", "Separated validation architecture", "Dependent location data", "Accessible user feedback", "Client-side file checks"].map(
                (item) => (
                  <div className="demo-row" key={item}>
                    <span className="demo-check">✓</span>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="page-container">
          <div className="section-heading">
            <h2>Built around real-world form principles</h2>
            <p>
              The interface keeps UI components, validation rules, location
              data and utility functions separated so the project remains
              understandable and maintainable.
            </p>
          </div>

          <div className="feature-grid">
            {features.map(([number, title, description]) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon">{number}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;