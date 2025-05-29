import { errorMessages } from "./config/errorMessages.js";

export function calculateRiskRating(input) {
   console.log("INPUT:", input);
  console.log("ERROR MESSAGES:", errorMessages);
  const { claim_history } = input;
  // Check if input is a valid object
  if (!input || typeof input !== "object") {
    return { error: errorMessages.JSON_OBJECT };
  }

  // Check if claim_history key is missing
  if (claim_history === undefined) {
    return { error: errorMessages.MISSING_INPUT };
  }

  // Check if claim_history is not a string
  if (typeof claim_history !== "string") {
    return { error: errorMessages.INVALID_DATA_TYPE_STRING };
  }

  // List of risk-related keywords to search for
  const keywords = ["collide", "crash", "scratch", "bump", "smash"];

  // Convert input text to lowercase for case-insensitive matching
  const text = claim_history.toLowerCase();

  // Initialize keyword match count
  let riskCount = 0;

  // Loop through each keyword and count how many times it appears
  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword, "g");
    const matches = text.match(regex); // Find all matches
    if (matches) {
      riskCount += matches.length; // Add number of occurrences to the total
    }
  });

  // Ensure rating is between 1 and 5
  const riskRating = Math.min(Math.max(riskCount, 1), 5);

  return { risk_rating: riskRating };
}

