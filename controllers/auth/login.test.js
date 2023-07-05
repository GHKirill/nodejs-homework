const express = require("express");
const cors = require("cors");
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = express();
app.use(cors());

const rightBody = { email: "test102@mail.com", password: "1234567" };
const wrongBodyEmail = { email: "test1020@mail.com", password: "1234567" };
const wrongBodyPass = { email: "test102@mail.com", password: "12345674" };

describe("test logIn controller", () => {
  let server;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);

    server = await app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
    console.log(`Server disconnected. `);
  });
  test("logIn return token", async () => {
    jest.setTimeout(async () => {
      const response = await request(app)
        .post("api/auth/login")
        // .set(
        //   "Authorization",
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M"
        // )
        .set("Content-type", "application/json")
        .send(rightBody);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("code");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("token");
      const {
        status,
        code,
        data: { token },
      } = response.body;
      expect(typeof status).toBe("string");
      expect(typeof code).toBe("number");
      expect(typeof token).toBe("string");
    }, 5000);
  });
  test("logIn return error (wrong email)", async () => {
    jest.setTimeout(async () => {
      const response = await request(app)
        .post("api/auth/login")
        .set("Content-type", "application/json")
        .send(wrongBodyEmail);

      expect(response.status).toBe(401);
      expect(() => response).toThrow("Email or password is wrong");
    }, 5000);
  });
  test("logIn return error(wrong password)", async () => {
    jest.setTimeout(async () => {
      const response = await request(app)
        .post("api/auth/login")
        .set("Content-type", "application/json")
        .send(wrongBodyPass);

      expect(response.status).toBe(401);
      expect(() => response).toThrow("Email or password is wrong");
    }, 5000);
  });
});
