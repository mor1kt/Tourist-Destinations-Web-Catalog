export function validateRegister(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["Payload is required"] };
  }

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!payload.email || !payload.email.includes("@")) {
    errors.push("Valid email is required");
  }

  if (!payload.password || payload.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return { isValid: errors.length === 0, errors };
}

export function validateLogin(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["Payload is required"] };
  }

  if (!payload.email || !payload.email.includes("@")) {
    errors.push("Valid email is required");
  }

  if (!payload.password) {
    errors.push("Password is required");
  }

  return { isValid: errors.length === 0, errors };
}
