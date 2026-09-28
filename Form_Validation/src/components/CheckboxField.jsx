function CheckboxField({
  name,
  checked,
  onChange,
  error,
  touched,
  children
}) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-field">
      <label className="checkbox-label" htmlFor={inputId}>
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={Boolean(touched && error)}
          aria-describedby={touched && error ? errorId : undefined}
        />
        <span>{children}</span>
      </label>

      {touched && error && (
        <small id={errorId} className="form-error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default CheckboxField;