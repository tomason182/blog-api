const postRoutes = require("../routes/postRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/post", postRoutes);

test("get all post route", (done) => {
  request(app)
    .get("/api/post")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
