import { jest } from "@jest/globals";
import "dotenv/config";
import request from "supertest";
import mongoose from "mongoose";


jest.unstable_mockModule("../src/services/send.email.js", () => ({
  sendEmailService: jest.fn(() =>
    Promise.resolve({ accepted: ["test@example.com"], rejected: [] })
  ),
}));

const { default: app } = await import("../src/app.js");
const { default: User } = await import("../src/models/user.model.js");
const { sendEmailService } = await import("../src/services/send.email.js");
import { compareSync, hashSync } from "bcrypt";


beforeAll(async () => {
  jest.setTimeout(30000); 
  const url = process.env.MONGO_URL_TEST;
  await mongoose.connect(url);
});


afterEach(async () => {
  // clear database between tests
  jest.setTimeout(30000); 
  await User.deleteMany({});
});


afterAll(async () => {
  jest.setTimeout(30000); 
  await mongoose.connection.close();
});


describe("User Routes - /users/sign-up", () => {
  const hashedPassword = hashSync("sasa", 10);

  test("should create a new user successfully", async () => {
    const res = await request(app).post("/users/sign-up").send({
      name: "Test User",
      email: "test@example.com",
      password: "sasa",
      confirmPassword: "sasa",
      gender: "male",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.userSaved).toHaveProperty("email", "test@example.com");

    // Verify the user is actually in the database
    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
    expect(user.email).toBe("test@example.com");
  });

  test("should fail if email already exists", async () => {
    await User.create({
      name: "Existing",
      email: "test@example.com",
      password: hashedPassword,
      gender: "male",
    });

    const res = await request(app).post("/users/sign-up").send({
      name: "New User",
      email: "test@example.com",
      password: "sasa",
      confirmPassword: "sasa",
      gender: "male",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("message", "Error");
  });

  test("should fail validation for invalid email", async () => {
    const res = await request(app).post("/users/sign-up").send({
      name: "Bad Email",
      email: "invalid-email",
      password: "sasa",
      confirmPassword: "sasa",
      gender: "male",
    });

    expect(res.statusCode).toBe(400);
  });
});
