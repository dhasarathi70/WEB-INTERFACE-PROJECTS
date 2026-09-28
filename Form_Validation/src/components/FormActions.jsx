import { Link } from "react-router-dom";

function FormActions({ submitting, onReset }) {
  return (
    <div className="form-actions">
      <button type="button" className="secondary-button" onClick={onReset} disabled={submitting}>
        Reset Form
      </button>

      <Link to="/" className="secondary-button">
        Cancel
      </Link>

      <button type="submit" className="primary-button" disabled={submitting}>
        {submitting ? "Creating Account..." : "Create Account"}
      </button>
    </div>
  );
}

export default FormActions;