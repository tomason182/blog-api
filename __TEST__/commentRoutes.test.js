const commentRoutes = require("../routes/commentRoutes");

const request = require("supertest");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/comments", commentRoutes);

test("Get list of all comments", (done) => {
  request(app)
    .get("/api/comments")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Get all comments" })
    .expect(200, done);
});
