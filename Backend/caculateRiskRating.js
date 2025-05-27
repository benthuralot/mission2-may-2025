
/**
 * Calculates the risk rating of a driver based on their claim history.
 * - Counts the number of keyword matches in the claim history.
 * - Returns a rating from 1 (low risk) to 5 (high risk).
 * - Returns error messages for invalid or missing input.
 *
 * @param {Object} input - JSON object containing the claim_history field.
 * @returns {Object} JSON object with either a risk_rating or error details.
 */
export function calculateRiskRating(input) {
  console.log("Received input:", input); // Log the input for debugging

  // Destructure claim_history from the input
  const { claim_history } = input;

  // Check if input is a valid object
  if (!input || typeof input !== "object") {
    return {
      error: "error",
      description: "Input is null, undefined, or not a valid object. It must be a valid JSON object.",
    };
  }

  // Check if claim_history key is missing
  if (claim_history === undefined) {
    return {
      error: "error",
      description: "Missing required key: claim_history.",
    };
  }

  // Check if claim_history is not a string
  if (typeof claim_history !== "string") {
    return {
      error: "error",
      description: "claim_history must be a string.",
    };
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

  console.log("Calculated risk rating:", riskRating); // Debug log

  // Return the final risk rating
  return { risk_rating: riskRating };
}
