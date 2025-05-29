// apiRoutes.test.js
import request from "supertest";
import express from "express";
import apiRoutes from "./apiRoutes.js";

// Mocking calculateCarValue from api-01.js
import * as carValue from "./calculateCarValue.js";

// ✅ Mocking calculateRiskRating from caculateRiskRating.js
import * as riskRating from "./caculateRiskRating.js";

// ✅ Mocking premiumCalculator from premiumCalculator.js
import * as premiumCalculator from "./premiumCalculator.js";

describe("API Routes", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/api", apiRoutes);
  });

  describe("GET /api", () => {
    it("responds with 200 and a JSON message", async () => {
      const res = await request(app).get("/api");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "API is working" });
    });
  });

  describe("POST /api/calculate", () => {
    it("calls calculateCarValue and returns the result", async () => {
      const mockResult = { car_value: 12345 };
      jest.spyOn(carValue, "calculateCarValue").mockReturnValue(mockResult);

      const res = await request(app)
        .post("/api/calculate")
        .send({ car: { model: "Civic", year: 2020 } });

      expect(carValue.calculateCarValue).toHaveBeenCalledWith({
        model: "Civic",
        year: 2020,
      });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResult);

      carValue.calculateCarValue.mockRestore();
    });

    it("returns 400 if calculateCarValue returns an error", async () => {
      const mockError = {
        error: "error",
        description: "Missing model or year",
      };
      jest.spyOn(carValue, "calculateCarValue").mockReturnValue(mockError);

      const res = await request(app).post("/api/calculate").send({ car: {} });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ description: mockError.description });

      carValue.calculateCarValue.mockRestore();
    });
  });

  describe("POST /api/rating", () => {
    it("returns 200 with risk rating", async () => {
      const mockResult = { riskRating: 4 };
      jest.spyOn(riskRating, "calculateRiskRating").mockReturnValue(mockResult);

      const res = await request(app)
        .post("/api/rating")
        .send({ age: 30, carValue: 20000 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResult);

      riskRating.calculateRiskRating.mockRestore();
    });

    it("returns 400 if calculateRiskRating returns error", async () => {
      const mockError = { error: "error", description: "Invalid age" };
      jest.spyOn(riskRating, "calculateRiskRating").mockReturnValue(mockError);

      const res = await request(app).post("/api/rating").send({ age: null });

      expect(res.status).toBe(400);
      expect(res.body).toEqual(mockError);

      riskRating.calculateRiskRating.mockRestore();
    });
  });

  describe("POST /api/premium-calculator", () => {
    it("returns 200 with premium calculation result", async () => {
      const mockResult = { premium: 299.99 };
      jest
        .spyOn(premiumCalculator, "premiumCalculator")
        .mockReturnValue(mockResult);

      const res = await request(app)
        .post("/api/premium-calculator")
        .send({ riskRating: 3, carValue: 20000 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResult);

      premiumCalculator.premiumCalculator.mockRestore();
    });

    it("returns 400 if premiumCalculator returns error", async () => {
      const mockError = { error: "error", description: "Invalid data" };
      jest
        .spyOn(premiumCalculator, "premiumCalculator")
        .mockReturnValue(mockError);

      const res = await request(app).post("/api/premium-calculator").send({}); // Invalid input

      expect(res.status).toBe(400);
      expect(res.body).toEqual(mockError);

      premiumCalculator.premiumCalculator.mockRestore();
    });
  });
});
