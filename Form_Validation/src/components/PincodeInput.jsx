import { findByPincode } from "../data/locationData";

function PincodeInput({
  value,
  onChange,
  onBlur,
  error,
  touched,
  state,
  district,
  city,
  onUseDetectedLocation
}) {
  const normalizedValue = String(value ?? "").trim();

  const detected =
    /^\d{6}$/.test(normalizedValue)
      ? findByPincode(normalizedValue)
      : null;

  const inputId = "field-pincode";
  const errorId = "field-pincode-error";

  const isComplete = normalizedValue.length === 6;

  /*
    A pincode is valid ONLY when:
    1. It has 6 digits
    2. It exists in locationData
    3. It belongs to the selected state/district/city
  */

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={inputId}>
        Pincode{" "}
        <span className="required" aria-hidden="true">
          *
        </span>
      </label>

      <input
        id={inputId}
        name="pincode"
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={(event) => {
          const numericValue = event.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

          onChange({
            target: {
              name: "pincode",
              value: numericValue
            }
          });
        }}
        onBlur={onBlur}
        placeholder="6-digit pincode"
        className={`form-control ${
          touched && error ? "input-error" : ""
        } ${
          touched && isComplete && detected && !error
            ? "input-valid"
            : ""
        }`}
        aria-invalid={Boolean(touched && error)}
        aria-describedby={touched && error ? errorId : undefined}
      />

      {/* Validation error */}
      {touched && error && (
        <small
          id={errorId}
          className="form-error"
          role="alert"
        >
          {error}
        </small>
      )}

      {/* Pincode exists in database */}
      {isComplete && detected && (
        <div className="location-note success">
          <strong>✓ Pincode found in database</strong>

          <br />

          {detected.city}, {detected.district}, {detected.state}

          {/*
            Only show this button when the detected
            location can be used to fill the fields.
          */}

          <br />

          <button
            type="button"
            className="secondary-button"
            style={{
              marginTop: 8,
              padding: "7px 10px",
              fontSize: 11
            }}
            onClick={() => onUseDetectedLocation(detected)}
          >
            Use detected location
          </button>
        </div>
      )}

      {/* 6 digits entered but NOT in database */}
      {isComplete && !detected && (
        <div className="location-note error">
          <strong>✕ Pincode not found</strong>
          <br />
          This pincode is not available in the location database.
          <br />
          Please enter a pincode that exists in the database.
        </div>
      )}

      {/* Less than 6 digits */}
      {!isComplete && normalizedValue.length > 0 && (
        <small className="form-help">
          Enter all 6 digits to verify the pincode against the
          location database.
        </small>
      )}

      {/* Database result */}
      {detected && state && district && city && (
        <small className="form-help">
          Database location: {detected.city}, {detected.district},{" "}
          {detected.state}
        </small>
      )}
    </div>
  );
}

export default PincodeInput;