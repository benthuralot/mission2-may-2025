import React, { useState } from "react";

export default function CarInsuranceCalculator() {
  // Input states
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [claimHistory, setClaimHistory] = useState("");

  // Result states
  const [carValueResult, setCarValueResult] = useState(null);
  const [riskRatingResult, setRiskRatingResult] = useState(null);
  const [monthlyPremiumResult, setMonthlyPremiumResult] = useState(null);
  const [yearlyPremiumResult, setYearlyPremiumResult] = useState(null);

  // Error states
  const [carValueError, setCarValueError] = useState(null);
  const [riskRatingError, setRiskRatingError] = useState(null);
  const [premiumError, setPremiumError] = useState(null);

  // New states for manual premium inputs
  const [premiumCarValueInput, setPremiumCarValueInput] = useState("");
  const [premiumRiskRatingInput, setPremiumRiskRatingInput] = useState("");

  // Mock API call wrappers - replace these with real fetch calls or imported API functions
  async function calculateCarValueAPI(input) {
    const { model, year } = input;
    if (!model || !year) {
      return { error: "Missing model or year" };
    }
    if (typeof model !== "string" || isNaN(year)) {
      return { error: "Invalid model or year" };
    }
    const cleanedModel = model.replace(/[^a-zA-Z]/g, "");
    const charValueSum = cleanedModel
      .toUpperCase()
      .split("")
      .reduce((sum, c) => sum + (c.charCodeAt(0) - 64), 0);
    const car_value = charValueSum * 100 + parseInt(year);
    return { car_value };
  }

  async function calculateRiskRatingAPI(input) {
    const { claim_history } = input;
    if (!claim_history || typeof claim_history !== "string") {
      return { error: "Invalid claim history" };
    }
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    let riskCount = 0;
    const text = claim_history.toLowerCase();
    keywords.forEach((kw) => {
      const matches = text.match(new RegExp(kw, "g"));
      if (matches) riskCount += matches.length;
    });
    const risk_rating = Math.min(Math.max(riskCount, 1), 5);
    return { risk_rating };
  }

  async function premiumCalculatorAPI(input) {
    const { car_value, risk_rating } = input;
    if (typeof car_value !== "number" || typeof risk_rating !== "number") {
      return { error: "Invalid inputs for premium calculator" };
    }
    // Mock premium calculation
    const yearly_premium = car_value * risk_rating * 0.01;
    const monthly_premium = yearly_premium / 12;
    return {
      yearly_premium: yearly_premium.toFixed(2),
      monthly_premium: monthly_premium.toFixed(2),
    };
  }

  // Handlers
  async function handleCalculateCarValue() {
    setCarValueError(null);
    setCarValueResult(null);
    setRiskRatingResult(null);
    setMonthlyPremiumResult(null);
    setYearlyPremiumResult(null);
    setRiskRatingError(null);
    setPremiumError(null);

    const input = { model: carModel.trim(), year: Number(carYear) };
    const result = await calculateCarValueAPI(input);

    if (result.error) {
      setCarValueError(result.error);
    } else {
      setCarValueResult(result.car_value);
    }
  }

  async function handleCalculateRiskRating() {
    setRiskRatingError(null);
    setRiskRatingResult(null);
    setMonthlyPremiumResult(null);
    setYearlyPremiumResult(null);
    setPremiumError(null);

    const input = { claim_history: claimHistory.trim() };
    const result = await calculateRiskRatingAPI(input);

    if (result.error) {
      setRiskRatingError(result.error);
    } else {
      setRiskRatingResult(result.risk_rating);
    }
  }

  async function handleCalculatePremium() {
    setPremiumError(null);
    setMonthlyPremiumResult(null);
    setYearlyPremiumResult(null);

    // Try manual inputs first
    const carValueNum = Number(premiumCarValueInput);
    const riskRatingNum = Number(premiumRiskRatingInput);

    if (
      !isNaN(carValueNum) &&
      carValueNum > 0 &&
      !isNaN(riskRatingNum) &&
      riskRatingNum >= 1 &&
      riskRatingNum <= 5
    ) {
      const input = { car_value: carValueNum, risk_rating: riskRatingNum };
      const result = await premiumCalculatorAPI(input);
      if (result.error) {
        setPremiumError(result.error);
      } else {
        setYearlyPremiumResult(result.yearly_premium);
        setMonthlyPremiumResult(result.monthly_premium);
      }
    } else {
      // fallback to calculated values
      if (carValueResult === null) {
        setPremiumError("Calculate car value first or enter manually.");
        return;
      }
      if (riskRatingResult === null) {
        setPremiumError("Calculate risk rating first or enter manually.");
        return;
      }

      const input = { car_value: carValueResult, risk_rating: riskRatingResult };
      const result = await premiumCalculatorAPI(input);
      if (result.error) {
        setPremiumError(result.error);
      } else {
        setYearlyPremiumResult(result.yearly_premium);
        setMonthlyPremiumResult(result.monthly_premium);
      }
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Turners Car Insurance Calculator</h2>

      {/* Car Value */}
      <section style={{ marginBottom: 30 }}>
        <h3>1. Calculate Car Value</h3>
        <input
          type="text"
          placeholder="Car Model (e.g. Toyota)"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          style={{ marginRight: 10, padding: 6 }}
        />
        <input
          type="number"
          placeholder="Year (e.g. 2015)"
          value={carYear}
          onChange={(e) => setCarYear(e.target.value)}
          style={{ marginRight: 10, padding: 6, width: 100 }}
        />
        <button onClick={handleCalculateCarValue} style={{ padding: "6px 12px" }}>
          Calculate Car Value
        </button>
        <div style={{ marginTop: 10 }}>
          {carValueError && <div style={{ color: "red" }}>Error: {carValueError}</div>}
          {carValueResult !== null && <div>Car Value: <strong>${carValueResult}</strong></div>}
        </div>
      </section>

      {/* Risk Rating */}
      <section style={{ marginBottom: 30 }}>
        <h3>2. Calculate Risk Rating</h3>
        <textarea
          placeholder="Enter Claim History"
          value={claimHistory}
          onChange={(e) => setClaimHistory(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 6, fontFamily: "inherit" }}
        />
        <button onClick={handleCalculateRiskRating} style={{ marginTop: 8, padding: "6px 12px" }}>
          Calculate Risk Rating
        </button>
        <div style={{ marginTop: 10 }}>
          {riskRatingError && <div style={{ color: "red" }}>Error: {riskRatingError}</div>}
          {riskRatingResult !== null && <div>Risk Rating: <strong>{riskRatingResult}</strong></div>}
        </div>
      </section>

      {/* Premium Calculator */}
      <section style={{ marginBottom: 30 }}>
        <h3>3. Calculate Premium</h3>

        <div style={{ marginBottom: 10 }}>
          <input
            type="number"
            placeholder="Car Value"
            value={premiumCarValueInput}
            onChange={(e) => setPremiumCarValueInput(e.target.value)}
            style={{ marginRight: 10, padding: 6, width: 120 }}
          />
          <input
            type="number"
            placeholder="Risk Rating (1-5)"
            value={premiumRiskRatingInput}
            onChange={(e) => setPremiumRiskRatingInput(e.target.value)}
            style={{ marginRight: 10, padding: 6, width: 120 }}
            min={1}
            max={5}
          />
        </div>

        <button onClick={handleCalculatePremium} style={{ padding: "6px 12px" }}>
          Calculate Premium
        </button>

        <div style={{ marginTop: 10 }}>
          {premiumError && <div style={{ color: "red" }}>Error: {premiumError}</div>}
          {monthlyPremiumResult !== null && yearlyPremiumResult !== null && (
            <div>
              <div>Monthly Premium: <strong>${monthlyPremiumResult}</strong></div>
              <div>Yearly Premium: <strong>${yearlyPremiumResult}</strong></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
