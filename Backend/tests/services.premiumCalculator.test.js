import { premiumCalculator } from "../premiumCalculator.js";

// all the error messages
import { errorMessages } from "../config/errorMessages.js";

describe("Insurance Premium API", () => {
  describe("Valid Input Tests", () => {
    test.each([
       
      ["Sunny day scenario",{ car_value: 25000, risk_rating: 3 }, { monthly_premium: 62.5, yearly_premium: 750, }],
      ["Max valid values",{ car_value: 1_500_000, risk_rating: 5 }, { monthly_premium: 6250, yearly_premium: 75000, }],
      ["Min valid values",{ car_value: 500, risk_rating: 1 }, { monthly_premium: 0.42, yearly_premium: 5, }],
      
    ])('should calculate correct premium for input: %o', (_desc, input, expected) => {
      expect(premiumCalculator(input)).toEqual(expected);
    });
  });
});

  describe("Invalid Input Tests", () => {
    test.each([
      ['out-of-range risk rating',{ car_value: 1_000_000, risk_rating: 7 }, errorMessages.INVALID_RISK],
       
      ['out-of-range car value ',{ car_value: 1_600_000, risk_rating: 1 }, errorMessages.INVALID_CAR_VALUE],
      
      ['no input provided',{ car_value: undefined, risk_rating: undefined }, errorMessages.MISSING_INPUT],
       
      ['zero value inputs ',{ car_value: 0, risk_rating: 0 }, errorMessages.ZERO_INPUT],
       
      ['negative value inputs',{ car_value: -9877, risk_rating: -3 }, errorMessages.NEGATIVE_INPUT],
      
      ['invalid data type inputs',{ car_value: 'Nine Thousand', risk_rating: {risk: 'three'} }, errorMessages.INVALID_DATA_TYPE],])('should return correct error for input: %o', (_desc, input, expecterError) =>{
        expect(premiumCalculator(input)).toEqual({ error: expecterError });
      });
});
