import request from "supertest";
import app from "../server.js";

import { errorMessages } from "./config/errorMessages.js";

describe("POST api/premium-calculator", () => {
  
  it("Connection with the server should return success message", async () => {
    const response = await request(app).get("/api/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('API is working');
  });
  test("should return 200 and correct premium for valid input", async () => {
    const response = await request(app)
      .post("/api/premium-calculator")
      .send({ car_value: 15000, risk_rating: 2 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      monthly_premium: 25,
      yearly_premium: 300,
    });
  });
  it("should return 400 for missing fields", async () => {
    const response = await request(app)
      .post("/api/premium-calculator")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(errorMessages.MISSING_INPUT);
  });
  test('Should return 400 for incorrect data type', async () => {
    const response = await request(app)
    .post('/api/premium-calculator')
    .send({ car_value: 'Nine thousand', risk_rating: 'three'})

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(errorMessages.INVALID_DATA_TYPE)
  });
});
