export function calculateCarValue(car) {
  if (!car || typeof car !== 'object') {
    return {
      error: "error",
      description: "Please provide a valid car object with model and year."
    };
  }

  const { model, year } = car;

  if (model === undefined || year === undefined) {
    return {
      error: "error",
      description: "Missing required keys: model or year."
    };
  }

    if (typeof model !== "string" || model.trim() === "") {
    return {
      error: "error",
      description: "Please enter a model and year."
    };
  }

  const parsedModel = String(model).trim();
  const parsedYear = parseInt(year);

  if (parsedModel.length === 0) {
    return {
      error: "error",
      description: "Please enter a model and year."
    };
  }

  if (isNaN(parsedYear) || parsedYear <= 0) {
    return {
      error: "error",
      description: "A Year must be a positive integer."
    };
  }

  // Remove all non-alphabetical characters from model
  const cleanedModel = parsedModel.replace(/[^a-zA-Z]/g, "");

  if (cleanedModel.length === 0) {
    return {
      error: "error",
      description: "Model must contain alphabetical characters only."
    };
  }

  const charValueSum = cleanedModel
    .toUpperCase()
    .split("")
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

  const carValue = charValueSum * 100 + parsedYear;

  return { car_value: carValue };
}
