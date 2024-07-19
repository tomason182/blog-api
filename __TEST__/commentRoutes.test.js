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

test("Create a new comment", (done) => {
  request(app)
    .post("/api/comments")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Create a new comment" })
    .expect(200, done);
});

test("Update a comment", (done) => {
  request(app)
    .put("/api/comments/comment_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Update a comment" })
    .expect(200, done);
});

test("Delete a comment", (done) => {
  request(app)
    .delete("/api/comments/comment_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Delete a comment" })
    .expect(200, done);
});
