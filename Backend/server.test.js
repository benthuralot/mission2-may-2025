import request from "supertest";
import app from "./server.js";

describe("Server tests", () => {
  it("responds to GET /api", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });
});
