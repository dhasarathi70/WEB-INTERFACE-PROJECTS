export function getPasswordRequirements(password = "") {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
}

export function calculatePasswordStrength(password = "") {
  if (!password) return 0;

  const requirements = getPasswordRequirements(password);
  let score = Object.values(requirements).filter(Boolean).length;

  if (password.length >= 12) score += 1;
  if (password.length >= 16 && score >= 5) score += 1;

  return Math.min(5, score);
}

export function getPasswordStrengthLabel(strength) {
  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  return strength === 0 ? "Very Weak" : labels[strength - 1];
}