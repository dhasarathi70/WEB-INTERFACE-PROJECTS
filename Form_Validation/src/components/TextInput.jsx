function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder = "",
  helpText = "",
  maxLength,
  min,
  max,
  inputMode,
  autoComplete
})  {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;
  const describedBy = error && touched ? errorId : helpText ? helpId : undefined;
  const showValid = touched && value && !error;

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>

      <input
  id={inputId}
  name={name}
  type={type}
  value={value}
  onChange={onChange}
  onBlur={onBlur}
  placeholder={placeholder}
  maxLength={maxLength}
  min={min}
  max={max}
  inputMode={inputMode}
  autoComplete={autoComplete}
  className={`form-control ${touched && error ? "input-error" : ""} ${
    showValid ? "input-valid" : ""
  }`}
  aria-invalid={Boolean(touched && error)}
  aria-describedby={describedBy}
  required={required}
/>

      {helpText && !(touched && error) && (
        <small id={helpId} className="form-help">
          {helpText}
        </small>
      )}

      {touched && error && (
        <small id={errorId} className="form-error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default TextInput;