export const calculator = {
    calculatePremium(car_value, risk_rating) {
      const yearly = (car_value * risk_rating) / 100;
      const monthly = yearly / 12;
      return {
        monthly_premium: parseFloat(monthly.toFixed(2)),
        yearly_premium: parseFloat(yearly.toFixed(2)),
      };
    },
  };