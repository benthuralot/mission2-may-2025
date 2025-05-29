import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputCar from "./components/InputCard";

export default function CarInsuranceCalculator() {
  // Input states
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [claimHistory, setClaimHistory] = useState("");
  const [premiumCarValueInput, setPremiumCarValueInput] = useState("");
  const [premiumRiskRatingInput, setPremiumRiskRatingInput] = useState("");

  // Result states
  const [carValueResult, setCarValueResult] = useState(null);
  const [riskRatingResult, setRiskRatingResult] = useState(null);
  const [monthlyPremiumResult, setMonthlyPremiumResult] = useState(null);
  const [yearlyPremiumResult, setYearlyPremiumResult] = useState(null);

  // Error states
  const [carValueError, setCarValueError] = useState(null);
  const [riskRatingError, setRiskRatingError] = useState(null);
  const [premiumError, setPremiumError] = useState(null);

  // API Functions
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
    const input = { car: { model: carModel.trim(), year: Number(carYear) } };
    const result = await calculateCarValueAPI(input);
    if (result.description) {
      setCarValueError(result.description);
    } else if (result.car_value !== undefined) {
      setCarValueResult(result.car_value);
    } else {
      setCarValueError("Unexpected API response");
    }
  }

  async function handleCalculateRiskRating() {
    setRiskRatingError(null);
    setRiskRatingResult(null);
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
      const result = await premiumCalculatorAPI({
        car_value: carValueNum,
        risk_rating: riskRatingNum,
      });
      if (result.error) {
        setPremiumError(result.error);
      } else {
        setYearlyPremiumResult(result.yearly_premium);
        setMonthlyPremiumResult(result.monthly_premium);
      }
    } else {
      if (carValueResult === null || riskRatingResult === null) {
        setPremiumError(
          "Calculate car value and risk rating first or enter manually."
        );
        return;
      }
      const result = await premiumCalculatorAPI({
        car_value: carValueResult,
        risk_rating: riskRatingResult,
      });
      if (result.error) {
        setPremiumError(result.error);
      } else {
        setYearlyPremiumResult(result.yearly_premium);
        setMonthlyPremiumResult(result.monthly_premium);
      }
    }
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
        <h2>Turners Car Insurance Calculator</h2>

        <InputCar
          title="1. Calculate Car Value"
          inputs={[
            {
              label: "Car Model",
              type: "text",
              value: carModel,
              onChange: (e) => setCarModel(e.target.value),
            },
            {
              label: "Year",
              type: "number",
              value: carYear,
              onChange: (e) => setCarYear(e.target.value),
            },
          ]}
          onSubmit={handleCalculateCarValue}
          result={
            carValueResult !== null ? `Car Value: $${carValueResult}` : null
          }
          error={carValueError}
        />

        <InputCar
          title="2. Calculate Risk Rating"
          inputs={[
            {
              label: "Claim History",
              type: "textarea",
              value: claimHistory,
              onChange: (e) => setClaimHistory(e.target.value),
            },
          ]}
          onSubmit={handleCalculateRiskRating}
          result={
            riskRatingResult !== null
              ? `Risk Rating: ${riskRatingResult}`
              : null
          }
          error={riskRatingError}
        />

        <InputCar
          title="3. Calculate Premium"
          inputs={[
            {
              label: "Car Value",
              type: "text",
              value: premiumCarValueInput,
              onChange: (e) => setPremiumCarValueInput(e.target.value),
            },
            {
              label: "Risk Rating (1-5)",
              type: "text",
              value: premiumRiskRatingInput,
              onChange: (e) => setPremiumRiskRatingInput(e.target.value),
              min: 1,
              max: 5,
            },
          ]}
          onSubmit={handleCalculatePremium}
          result={
            monthlyPremiumResult !== null && yearlyPremiumResult !== null ? (
              <>
                <div>Monthly: ${monthlyPremiumResult.toFixed(2)}</div>
                <div>Yearly: ${yearlyPremiumResult.toFixed(2)}</div>
              </>
            ) : null
          }
          error={premiumError}
        />
      </main>
      <Footer />
    </>
  );
}
