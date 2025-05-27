import { premiumLimits } from "./config/premiumConfig.js";

// all the error messages
import { errorMessages } from "./config/errorMessages.js";

export function premiumCalculator({ car_value, risk_rating }) {
  
// ----------------- CALCULATION FORMULA ---------------- //
  const calculation = {
    calculatePremium(car_value, risk_rating) {
      const yearly = (car_value * risk_rating) / 100;
      const monthly = yearly / 12;
      return {
        monthly_premium: parseFloat(monthly.toFixed(2)),
        yearly_premium: parseFloat(yearly.toFixed(2)),
      };
    },
  };

  // --------------------- VALIDATION --------------------- //
  if (car_value === undefined || risk_rating === undefined)
    return { error: errorMessages.MISSING_INPUT };

  //   isNaN(NaN) returns true, so to catch invalid number types (NaN, 0/0)
  if (
    typeof car_value !== "number" ||
    typeof risk_rating !== "number" ||
    isNaN(car_value) ||
    isNaN(risk_rating)
  )
    return {
      error: errorMessages.INVALID_DATA_TYPE
    };

  if (car_value === 0 || risk_rating === 0)
    return { error: errorMessages.ZERO_INPUT };

  if (car_value < 0 || risk_rating < 0)
    return { error: errorMessages.NEGATIVE_INPUT };

  if (
    risk_rating < premiumLimits.MIN_RISK_VALUE ||
    risk_rating > premiumLimits.MAX_RISK_VALUE
  )
    return {
      error: errorMessages.INVALID_RISK,
    };

  if (
    car_value < premiumLimits.MIN_CAR_VALUE ||
    car_value > premiumLimits.MAX_CAR_VALUE
  )
    return {
      error: errorMessages.INVALID_CAR_VALUE
    };

  // ----------- IF VALID, CALCULATE AND RETURN ----------- //
  return calculation.calculatePremium(car_value, risk_rating);
}
