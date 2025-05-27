// api-01.js
export function calculateCarValue(input) {
  console.log("Received input:", input);

  if (!input || typeof input !== "object") {
    return {
      error: "error",
      description:
        "Input is null, undefined, or not a valid object. It must be a valid JSON object",
    };
  }

  const { model, year } = input;

  if (model === undefined || year === undefined) {
    return {
      error: "error",
      description: "Missing required keys: model or year",
    };
  }

  console.log("Received model:", model);
  console.log("Received year:", year);

  const parsedModel = String(model);
  const parsedYear = parseInt(year);

  if (typeof parsedModel !== "string") {
    return { error: "error: a model must be a string of characters." };
  }
  if (isNaN(parsedYear) || parsedYear < 0) {
    return { error: "error: a year must be a four digit integer." };
  }

  const cleanedModel = parsedModel.replace(/[^a-zA-Z]/g, "");

  const charValueSum = cleanedModel
    .toUpperCase()
    .split("")
    .reduce((sum, char) => {
      const charValue = char.charCodeAt(0) - 64;
      return sum + charValue;
    }, 0);

  const carValue = charValueSum * 100 + parsedYear;

  return { car_value: carValue };
}
