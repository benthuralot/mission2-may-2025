const express = require("express"); 
const app = express(); 
const PORT = 4000;

app.use(express.json()); 

// Calculates the risk rating of a driver based on their claim history.
function calculateRiskRating(input) {
  console.log("Received input:", input); 

  if (!input || typeof input !== "object") {
    return {
      error: "error",
      description: "Input is null, undefined, or not a valid object. It must be a valid JSON object.",
    };
  }

  const { claim_history } = input;

  if (claim_history === undefined) {
    return {
      error: "error",
      description: "Missing required key: claim_history.",
    };
  }

  if (typeof claim_history !== "string") {
    return {
      error: "error",
      description: "claim_history must be a string.",
    };
  }

  const keywords = ["collide", "crash", "scratch", "bump", "smash"];
  const text = claim_history.toLowerCase();
  let riskCount = 0;

  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword, "g");
    const matches = text.match(regex);
    if (matches) {
      riskCount += matches.length;
    }
  });

  const riskRating = Math.min(Math.max(riskCount, 1), 5);

  console.log("Calculated risk rating:", riskRating); // Debug log

  return { risk_rating: riskRating };
}

// Define the POST route
app.post("/api/rating", (req, res) => {
  const result = calculateRiskRating(req.body);
  res.json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the function (optional, for testing)
module.exports = { calculateRiskRating };
