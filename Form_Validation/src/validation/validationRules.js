import {
  calculateAge,
  isFutureDate,
  isValidDate,
  normalizeText,
  required
} from "./validationHelpers";
import { validateLocation } from "../data/locationData";
import { calculatePasswordStrength } from "../utils/passwordUtils";

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[.'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[.'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*)*$/;
const usernamePattern = /^[A-Za-z0-9_.]{4,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[6-9]\d{9}$/;

export function validateField(name, value, formData) {
  const normalized = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "fullName":
      if (!normalized) return "Full name is required.";
      if (normalized.length < 2 || normalized.length > 80) {
        return "Full name must be between 2 and 80 characters.";
      }
      if (!namePattern.test(normalizeText(normalized))) {
        return "Please enter a valid name.";
      }
      return "";

    case "username":
      if (!normalized) return "Username is required.";
      if (!usernamePattern.test(normalized)) {
        return "Username can contain letters, numbers, underscores and dots.";
      }
      return "";

   case "dob":
  if (!normalized) {
    return "Date of birth is required.";
  }

  if (!isValidDate(normalized)) {
    return "Please enter a valid date of birth.";
  }

  if (isFutureDate(normalized)) {
    return "Date of birth cannot be in the future.";
  }

  const age = calculateAge(normalized);

  if (age < 13) {
    return "You must be at least 13 years old.";
  }

  if (age > 120) {
    return "Please enter a realistic date of birth.";
  }

  return "";

    case "gender":
      return required(normalized, "Please select a gender.");

    case "email":
      if (!normalized) return "Email address is required.";
      if (normalized.length > 254 || !emailPattern.test(normalized)) {
        return "Please enter a valid email address.";
      }
      return "";

    case "phone":
      if (!normalized) return "Primary phone number is required.";
      if (!phonePattern.test(normalized)) {
        return "Enter a valid 10-digit Indian mobile number.";
      }
      return "";

    case "alternatePhone":
      if (!normalized) return "";
      if (!phonePattern.test(normalized)) {
        return "Enter a valid 10-digit Indian mobile number.";
      }
      if (normalized === formData.phone) {
        return "Alternate phone must be different from primary phone.";
      }
      return "";

    case "address":
      if (!normalized) return "Address is required.";
      if (normalized.length < 10 || normalized.length > 250) {
        return "Address must be between 10 and 250 characters.";
      }
      return "";

    case "state":
      return required(normalized, "Please select a state.");

    case "district":
      if (!normalized) return "Please select a district.";
      if (!formData.state) return "Select a state first.";
      return "";

    case "city":
      if (!normalized) return "City is required.";
      if (!formData.state || !formData.district) {
        return "Select state and district before choosing a city.";
      }
      return "";

 case "pincode": {
  if (!normalized) {
    return "Pincode is required.";
  }

  if (!/^\d{6}$/.test(normalized)) {
    return "Pincode must contain exactly 6 digits.";
  }

  const locationResult = validateLocation(
    formData.state,
    formData.district,
    formData.city,
    normalized
  );

  if (!locationResult.valid) {
    return locationResult.message;
  }

  return "";
}

    case "password":
      if (!normalized) return "Password is required.";
      if (calculatePasswordStrength(normalized) < 5) {
        return "Use 8+ characters with uppercase, lowercase, number and special character.";
      }
      return "";

    case "confirmPassword":
      if (!normalized) return "Please confirm your password.";
      if (normalized !== formData.password) return "Passwords do not match.";
      return "";

    case "photo":
      return "";

    case "terms":
      return value ? "" : "You must accept the Terms and Conditions.";

    case "privacy":
      return value ? "" : "You must accept the Privacy Policy.";

    default:
      return "";
  }
}

export const initialForm = {
  fullName: "",
  username: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  alternatePhone: "",
  address: "",
  state: "",
  district: "",
  city: "",
  pincode: "",
  password: "",
  confirmPassword: "",
  photo: null,
  terms: false,
  privacy: false
};