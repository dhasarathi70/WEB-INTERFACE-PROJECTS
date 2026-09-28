import { useEffect, useRef, useState } from "react";
import { searchCities } from "../data/locationData";

function CityAutocomplete({
  value,
  onChange,
  onBlur,
  state,
  district,
  error,
  touched,
  disabled
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  const suggestions =
    state && district ? searchCities(state, district, value).slice(0, 8) : [];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function selectCity(city) {
    onChange({ target: { name: "city", value: city } });
    setOpen(false);
    setHighlightedIndex(0);
  }

  function handleKeyDown(event) {
    if (!open || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => (index + 1) % suggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex(
        (index) => (index - 1 + suggestions.length) % suggestions.length
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      selectCity(suggestions[highlightedIndex]);
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const inputId = "field-city";
  const errorId = "field-city-error";

  return (
    <div className="form-field autocomplete" ref={containerRef}>
      <label className="form-label" htmlFor={inputId}>
        City <span className="required" aria-hidden="true">*</span>
      </label>

      <input
        id={inputId}
        name="city"
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event);
          setOpen(Boolean(event.target.value));
          setHighlightedIndex(0);
        }}
        onFocus={() => {
          if (value) setOpen(true);
        }}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Select district first" : "Type to search city"}
        role="combobox"
        aria-expanded={open && suggestions.length > 0}
        aria-controls="city-suggestions"
        aria-autocomplete="list"
        aria-invalid={Boolean(touched && error)}
        aria-describedby={touched && error ? errorId : undefined}
        className={`form-control ${touched && error ? "input-error" : ""} ${
          touched && value && !error ? "input-valid" : ""
        }`}
      />

      {open && suggestions.length > 0 && (
        <ul
          id="city-suggestions"
          className="suggestion-list"
          role="listbox"
          aria-label="City suggestions"
        >
          {suggestions.map((city, index) => (
            <li key={city} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                className="suggestion-button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectCity(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}

      {touched && error && (
        <small id={errorId} className="form-error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default CityAutocomplete;