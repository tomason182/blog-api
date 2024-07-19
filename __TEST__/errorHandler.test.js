const request = require("supertest");
const express = require("express");
const { errorHandler } = require("../middleware/errorMiddleware");
const app = express();

const mockError = (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Mocking error");
  } else {
    res.status(200).json({ msg: "error handler works" });
  }
};

describe("Handling Errors", () => {
  beforeAll(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/api/mock-url", mockError);
    app.use(errorHandler);
  });

  test("Should not throw an error if body.text exits", async () => {
    const response = await request(app)
      .post("/api/mock-url")
      .send({ text: "fake test" });

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual("error handler works");
  });

  test("Should throw an error if body.text does not exits", async () => {
    const response = await request(app).post("/api/mock-url").send({});

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Mocking error");
  });
});
