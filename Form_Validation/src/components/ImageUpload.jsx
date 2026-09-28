function ImageUpload({
  value,
  preview,
  onChange,
  onRemove,
  error,
  touched
}) {
  const inputId = "field-photo";
  const errorId = "field-photo-error";

  return (
    <div className="form-field full-width">
      <label className="form-label" htmlFor={inputId}>
        Profile Photo
      </label>

      <div className="image-upload">
        {preview ? (
          <img src={preview} alt="Selected profile preview" className="image-preview" />
        ) : (
          <div className="image-placeholder">300×300 minimum</div>
        )}

        <div>
          <input
            id={inputId}
            name="photo"
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            className="file-input"
            onChange={onChange}
            aria-invalid={Boolean(touched && error)}
            aria-describedby={touched && error ? errorId : undefined}
          />
          <small className="form-help">
            JPG, JPEG or PNG · maximum 500 KB · 300×300 to 2000×2000 px
          </small>

          {value && !error && (
            <div className="location-note success">
              Image selected successfully.
              <button
                type="button"
                className="danger-button"
                style={{ marginLeft: 10, padding: "5px 8px", fontSize: 11 }}
                onClick={onRemove}
              >
                Remove
              </button>
            </div>
          )}

          {touched && error && (
            <small id={errorId} className="form-error" role="alert">
              {error}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;