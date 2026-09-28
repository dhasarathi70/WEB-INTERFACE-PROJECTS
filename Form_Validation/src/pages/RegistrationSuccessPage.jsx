import { Link } from "react-router-dom";

function RegistrationSuccessPage() {
  return (
    <section className="success-page">
      <div className="page-container">
        <div className="success-card">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h1>Registration Successful</h1>
          <p>
            Your demo registration has been accepted by the frontend
            validation system. No personal information was uploaded to a
            server or displayed on this page.
          </p>

          <div className="success-actions">
            <Link to="/" className="secondary-button">
              Back to Home
            </Link>
            <Link to="/register" className="primary-button">
              Create Another Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationSuccessPage;