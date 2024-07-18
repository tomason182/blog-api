const postRoutes = require("../routes/postRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/post", postRoutes);

test("posts routes works", (done) => {
  request(app)
    .get("/api/post")
    .expect("Content-Type", /json/)
    .expect({ msg: "all fine!" })
    .expect(200, done);
});
