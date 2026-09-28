import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSection from "../components/FormSection";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PasswordInput from "../components/PasswordInput";
import CityAutocomplete from "../components/CityAutocomplete";
import PincodeInput from "../components/PincodeInput";
import ImageUpload from "../components/ImageUpload";
import CheckboxField from "../components/CheckboxField";
import FormActions from "../components/FormActions";
import useFormValidation from "../hooks/useFormValidation";
import { getStates, getDistricts, getCities } from "../data/locationData";
import { validateImageFile, createImagePreview } from "../utils/imageValidation";

function RegistrationPage() {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm
  } = useFormValidation();

  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoError, setPhotoError] = useState("");

  const states = useMemo(() => getStates(), []);
  const districts = useMemo(
    () => getDistricts(formData.state),
    [formData.state]
  );
  const cities = useMemo(
    () => getCities(formData.state, formData.district),
    [formData.state, formData.district]
  );

  const completedFields = Object.entries(formData).filter(([key, value]) => {
    if (key === "photo") return Boolean(value);
    return typeof value === "boolean" ? value : String(value).trim().length > 0;
  }).length;

  const progress = Math.round((completedFields / Object.keys(formData).length) * 100);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ];

  function handleLocationChange(event) {
    const { name, value } = event.target;

    if (name === "state") {
      setFormData((current) => ({
        ...current,
        state: value,
        district: "",
        city: "",
        pincode: ""
      }));

      setErrors((current) => ({
        ...current,
        state: "",
        district: "",
        city: "",
        pincode: ""
      }));

      return;
    }

    if (name === "district") {
      setFormData((current) => ({
        ...current,
        district: value,
        city: "",
        pincode: ""
      }));

      setErrors((current) => ({
        ...current,
        district: "",
        city: "",
        pincode: ""
      }));

      return;
    }

    handleChange(event);
  }

  function handleCityChange(event) {
    handleChange(event);

    if (event.target.value && touched.city) {
      setTimeout(() => validateField("city", event.target.value), 0);
    }
  }

  function useDetectedLocation(detected) {
    setFormData((current) => ({
      ...current,
      state: detected.state,
      district: detected.district,
      city: detected.city,
      pincode: detected.pincode
    }));

    setErrors((current) => ({
      ...current,
      state: "",
      district: "",
      city: "",
      pincode: ""
    }));
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setFormData((current) => ({ ...current, photo: null }));
      setPhotoPreview("");
      setPhotoError("");
      return;
    }

    const result = await validateImageFile(file);

    if (!result.valid) {
      setFormData((current) => ({ ...current, photo: null }));
      setPhotoPreview("");
      setPhotoError(result.message);
      return;
    }

    setFormData((current) => ({ ...current, photo: file }));
    setPhotoPreview(createImagePreview(file));
    setPhotoError("");
  }

  function removePhoto() {
    setFormData((current) => ({ ...current, photo: null }));
    setPhotoPreview("");
    setPhotoError("");
  }

  function focusFirstInvalidField() {
    const fieldName = Object.keys(errors)[0];
    if (!fieldName) return;

    const element = document.getElementById(`field-${fieldName}`);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid || photoError) {
      setTimeout(focusFirstInvalidField, 0);
      return;
    }

    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitting(false);
    navigate("/success");
  }

  function handleReset() {
    resetForm();
    setPhotoPreview("");
    setPhotoError("");
  }

  return (
    <section className="registration-page">
      <div className="page-container">
        <div className="page-intro">
          <span className="eyebrow">Registration</span>
          <h1>Create your account</h1>
          <p>
            Complete the form below. Validation is performed locally in your
            browser for demonstration purposes.
          </p>
        </div>

        <div className="progress-card" aria-label={`Form completion ${progress}%`}>
          <div className="progress-top">
            <span>Form progress</span>
            <span>{progress}% complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="registration-layout">
          <form className="registration-form" onSubmit={handleSubmit} noValidate>
            <FormSection
              title="Personal Information"
              description="Basic details used to identify your account."
            >
              <div className="form-grid">
                <TextInput
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.fullName}
                  touched={touched.fullName}
                  required
                  placeholder="Levi Ackerman"
                  maxLength={80}
                  autoComplete="name"
                />

                <TextInput
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  touched={touched.username}
                  required
                  placeholder="levi.ackerman"
                  maxLength={20}
                  autoComplete="username"
                />

                <TextInput
  label="Date of Birth"
  name="dob"
  type="date"
  value={formData.dob}
  onChange={handleChange}
  onBlur={handleBlur}
  error={errors.dob}
  touched={touched.dob}
  required
  max={new Date().toISOString().split("T")[0]}
/>

                <SelectInput
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.gender}
                  touched={touched.gender}
                  required
                  options={genderOptions}
                  placeholder="Select Gender"
                />
              </div>
            </FormSection>

            <FormSection
              title="Contact Information"
              description="Use contact details you can access and keep current."
            >
              <div className="form-grid">
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  required
                  placeholder="user@example.com"
                  maxLength={254}
                  autoComplete="email"
                />

                <TextInput
                  label="Primary Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
                    handleChange({
                      target: { name: "phone", value, type: "text" }
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  required
                  placeholder="9876543210"
                  inputMode="numeric"
                  autoComplete="tel"
                />

                <TextInput
                  label="Alternate Phone Number"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
                    handleChange({
                      target: { name: "alternatePhone", value, type: "text" }
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.alternatePhone}
                  touched={touched.alternatePhone}
                  placeholder="Optional"
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>
            </FormSection>

            <FormSection
              title="Address Information"
              description="Location fields are connected and checked against the local demo dataset."
            >
              <div className="form-grid">
                <TextInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.address}
                  touched={touched.address}
                  required
                  placeholder="Street, building, area and locality"
                  maxLength={250}
                  autoComplete="street-address"
                />

                <SelectInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleLocationChange}
                  onBlur={handleBlur}
                  error={errors.state}
                  touched={touched.state}
                  required
                  options={states.map((state) => ({ value: state, label: state }))}
                  placeholder="Select State"
                />

                <SelectInput
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleLocationChange}
                  onBlur={handleBlur}
                  error={errors.district}
                  touched={touched.district}
                  required
                  disabled={!formData.state}
                  options={districts.map((district) => ({
                    value: district,
                    label: district
                  }))}
                  placeholder={formData.state ? "Select District" : "Select state first"}
                />

                <CityAutocomplete
                  value={formData.city}
                  onChange={handleCityChange}
                  onBlur={handleBlur}
                  state={formData.state}
                  district={formData.district}
                  error={errors.city}
                  touched={touched.city}
                  disabled={!formData.district}
                />

                <PincodeInput
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.pincode}
                  touched={touched.pincode}
                  state={formData.state}
                  district={formData.district}
                  city={formData.city}
                  onUseDetectedLocation={useDetectedLocation}
                />
              </div>
            </FormSection>

            <FormSection
              title="Account Security"
              description="Create a password that satisfies all security requirements."
            >
              <div className="form-grid">
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  required
                  showStrength
                />

                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  required
                  autoComplete="new-password"
                />
              </div>
            </FormSection>

            <FormSection
              title="Profile"
              description="Add an optional local profile image. It is never uploaded."
            >
              <div className="form-grid">
                <ImageUpload
                  value={formData.photo}
                  preview={photoPreview}
                  onChange={handlePhotoChange}
                  onRemove={removePhoto}
                  error={photoError}
                  touched={Boolean(photoError)}
                />
              </div>
            </FormSection>

            <FormSection
              title="Confirmation"
              description="Review and acknowledge the two required policies."
            >
              <div className="checkbox-stack">
                <CheckboxField
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  error={errors.terms}
                  touched={touched.terms}
                >
                  I agree to the Terms and Conditions.
                </CheckboxField>

                <CheckboxField
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  error={errors.privacy}
                  touched={touched.privacy}
                >
                  I acknowledge the Privacy Policy.
                </CheckboxField>
              </div>
            </FormSection>

            <FormActions submitting={submitting} onReset={handleReset} />
          </form>

          <aside className="form-sidebar">
            <h3>Registration flow</h3>
            <ul className="sidebar-list">
              <li>01 · Personal information</li>
              <li>02 · Contact information</li>
              <li>03 · Address & location</li>
              <li>04 · Account security</li>
              <li>05 · Profile photo</li>
              <li>06 · Confirmation</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default RegistrationPage;