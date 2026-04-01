export function validateDestination(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["Payload is required"] };
  }

  if (!payload.title || payload.title.trim().length < 2) {
    errors.push("Title must be at least 2 characters");
  }

  if (!payload.description || payload.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters");
  }

  if (!payload.country || payload.country.trim().length === 0) {
    errors.push("Country is required");
  }

  if (payload.images && !Array.isArray(payload.images)) {
    errors.push("Images must be an array");
  }

  if (payload.rating !== undefined) {
    const rating = Number(payload.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      errors.push("Rating must be between 0 and 5");
    }
  }

  return { isValid: errors.length === 0, errors };
}
