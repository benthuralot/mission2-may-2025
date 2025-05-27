// api-01.test.js
import { calculateCarValue } from "./api-01.js"; // note the .js extension

test("Happy path - Civic 2020", () => {
  expect(calculateCarValue({ model: "Civic", year: 2020 })).toEqual({
    car_value: 6620,
  });
});

test("Handles spaces - Model T 1908", () => {
  expect(calculateCarValue({ model: "Model T", year: 1908 })).toEqual({
    car_value: 8808,
  });
});

test("Special characters - RX-8 2010", () => {
  expect(calculateCarValue({ model: "RX-8", year: 2010 })).toEqual({
    car_value: 6210,
  });
});

test("Negative year", () => {
  expect(calculateCarValue({ model: "Corolla", year: -1999 })).toEqual({
    error: "error: a year must be a four digit integer.",
  });
});

test("Non-numeric year", () => {
  expect(calculateCarValue({ model: "Accord", year: "TwoThousand" })).toEqual({
    error: "error: a year must be a four digit integer.",
  });
});

test("Empty model name", () => {
  expect(calculateCarValue({ model: "", year: 2020 })).toEqual({
    car_value: 2020,
  });
});

test("Single character model - A 2020", () => {
  expect(calculateCarValue({ model: "A", year: 2020 })).toEqual({
    car_value: 2120,
  });
});

test("Single character model - Z 2020", () => {
  expect(calculateCarValue({ model: "Z", year: 2020 })).toEqual({
    car_value: 4620,
  });
});

test("Case insensitivity - Civic 2020", () => {
  expect(calculateCarValue({ model: "cIvIc", year: 2020 })).toEqual({
    car_value: 6620,
  });
});

test("Multiple spaces - Honda Accord 2020", () => {
  expect(calculateCarValue({ model: "Honda  Accord", year: 2020 })).toEqual({
    car_value: 10620,
  });
});

test("Model with special characters - RX-8 2010", () => {
  expect(calculateCarValue({ model: "RX-8", year: 2010 })).toEqual({
    car_value: 6210,
  });
});

test("Very large year", () => {
  expect(calculateCarValue({ model: "Tesla", year: 9999999 })).toEqual({
    car_value: 10005699,
  });
});

test("Model with all alphabet letters - ABCDEFGHIJKLMNOPQRSTUVWXYZ", () => {
  expect(
    calculateCarValue({ model: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", year: 2020 })
  ).toEqual({ car_value: 37120 });
});
