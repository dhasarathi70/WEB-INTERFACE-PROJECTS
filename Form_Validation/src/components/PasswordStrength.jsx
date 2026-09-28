import {
  calculatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordRequirements
} from "../utils/passwordUtils";

function PasswordStrength({ password }) {
  const strength = calculatePasswordStrength(password);
  const label = getPasswordStrengthLabel(strength);
  const requirements = getPasswordRequirements(password);

  return (
    <div className="strength-box" aria-live="polite">
      <div className="strength-head">
        <span>Password strength</span>
        <span>{label}</span>
      </div>

      <div
        className="strength-bars"
        aria-label={`Password strength: ${label}`}
        role="meter"
        aria-valuemin="0"
        aria-valuemax="5"
        aria-valuenow={strength}
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            className={`strength-bar ${level <= strength ? "filled" : ""}`}
          />
        ))}
      </div>

      <ul className="requirement-list">
        <li className={requirements.length ? "met" : ""}>✓ 8+ characters</li>
        <li className={requirements.uppercase ? "met" : ""}>✓ Uppercase</li>
        <li className={requirements.lowercase ? "met" : ""}>✓ Lowercase</li>
        <li className={requirements.number ? "met" : ""}>✓ Number</li>
        <li className={requirements.special ? "met" : ""}>✓ Special character</li>
      </ul>
    </div>
  );
}

export default PasswordStrength;