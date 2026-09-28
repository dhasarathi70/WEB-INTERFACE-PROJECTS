export function required(value, message) {
  return String(value ?? "").trim() ? "" : message;
}

export function validateLength(value, min, max, message) {
  const length = String(value ?? "").trim().length;

  if (length < min || length > max) {
    return message;
  }

  return "";
}

export function validatePattern(value, pattern, message) {
  return pattern.test(String(value ?? "")) ? "" : message;
}

export function normalizeText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

/*
  Strict date validation.

  HTML date input normally gives:
  YYYY-MM-DD

  Example:
  2004-08-15
*/
export function isValidDate(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  /*
    This prevents invalid dates such as:

    2020-02-31
    2021-04-31
  */
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function calculateAge(dob) {
  if (!isValidDate(dob)) {
    return 0;
  }

  const [year, month, day] = dob.split("-").map(Number);

  const today = new Date();

  let age = today.getFullYear() - year;

  const birthdayPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!birthdayPassed) {
    age--;
  }

  return age;
}

export function isFutureDate(value) {
  if (!isValidDate(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const selected = new Date(year, month - 1, day);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selected > today;
}