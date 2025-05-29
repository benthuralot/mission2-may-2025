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

  // Backend-connected API wrappers
  async function calculateCarValueAPI(input) {
    try {
      const res = await fetch("http://localhost:4000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      return await res.json();
    } catch (err) {
      return { error: "Failed to connect to backend" };
    }
  }

  async function calculateRiskRatingAPI(input) {
    try {
      const res = await fetch("http://localhost:4000/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      return await res.json();
    } catch (err) {
      return { error: "Failed to connect to backend" };
    }
  }

  async function premiumCalculatorAPI(input) {
    try {
      const res = await fetch("http://localhost:4000/api/premium-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      return await res.json();
    } catch (err) {
      return { error: "Failed to connect to backend" };
    }
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

  const input = { car: { model: carModel.trim(), year: Number(carYear) } };
  const result = await calculateCarValueAPI(input);

  if (result.description) {
    setCarValueError(result.description); // ✅ use only description
  } else if (result.car_value !== undefined) {
    setCarValueResult(result.car_value);
  } else {
    setCarValueError("Unexpected API response");
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
              <div>Monthly Premium: <strong>${monthlyPremiumResult.toFixed(2)}</strong></div>
              <div>Yearly Premium: <strong>${yearlyPremiumResult.toFixed(2)}</strong></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
