import { useState } from "react";
import { initialForm, validateField } from "../validation/validationRules";

function useFormValidation() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function validateSingleField(name, value, currentData = formData) {
    const message = validateField(name, value, currentData);

    setErrors((current) => ({
      ...current,
      [name]: message
    }));

    return message;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setFormData((current) => {
      const nextData = { ...current, [name]: nextValue };

      if (touched[name]) {
        validateSingleField(name, nextValue, nextData);
      }

      if (name === "password" && touched.confirmPassword) {
        validateSingleField("confirmPassword", nextData.confirmPassword, nextData);
      }

      if (name === "phone" && touched.alternatePhone) {
        validateSingleField("alternatePhone", nextData.alternatePhone, nextData);
      }

      return nextData;
    });
  }

  function handleBlur(event) {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setTouched((current) => ({ ...current, [name]: true }));
    validateSingleField(name, fieldValue);
  }

  function validateForm() {
    const nextErrors = {};

    Object.keys(formData).forEach((name) => {
      const message = validateField(name, formData[name], formData);
      if (message) nextErrors[name] = message;
    });

    setErrors(nextErrors);
    setTouched(
      Object.keys(formData).reduce(
        (result, name) => ({ ...result, [name]: true }),
        {}
      )
    );

    return Object.keys(nextErrors).length === 0;
  }

  function resetForm() {
    setFormData(initialForm);
    setErrors({});
    setTouched({});
  }

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    validateField: validateSingleField,
    validateForm,
    resetForm
  };
}

export default useFormValidation;