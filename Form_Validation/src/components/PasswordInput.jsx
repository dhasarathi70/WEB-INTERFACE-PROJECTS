import { useState } from "react";
import PasswordStrength from "./PasswordStrength";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  showStrength = false,
  autoComplete = "new-password"
}) {
  const [visible, setVisible] = useState(false);
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>

      <div className="password-wrap">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`form-control ${touched && error ? "input-error" : ""}`}
          aria-invalid={Boolean(touched && error)}
          aria-describedby={touched && error ? errorId : undefined}
          required={required}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {touched && error && (
        <small id={errorId} className="form-error" role="alert">
          {error}
        </small>
      )}

      {showStrength && <PasswordStrength password={value} />}
    </div>
  );
}

export default PasswordInput;