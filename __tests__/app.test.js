import request from "supertest";
import app from "../src/app.js";

describe("Smart TODO API" , () => {
    test("should return Welcome to the TODO API", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Welcome to Smart TODO API");
  });
});
