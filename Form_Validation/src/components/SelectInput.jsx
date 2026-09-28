function SelectInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched,
  required = false,
  disabled = false,
  placeholder = "Select an option"
}) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>

      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`form-control ${touched && error ? "input-error" : ""} ${
          touched && value && !error ? "input-valid" : ""
        }`}
        aria-invalid={Boolean(touched && error)}
        aria-describedby={touched && error ? errorId : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {touched && error && (
        <small id={errorId} className="form-error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default SelectInput;