const postRoutes = require("../routes/postRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);

test("get all post", (done) => {
  request(app)
    .get("/api/posts")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Get all post" })
    .expect(200, done);
});

test("get an specific post", (done) => {
  request(app)
    .get("/api/posts/post_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Get specific post" })
    .expect(200, done);
});

test("Post a new post", (done) => {
  request(app)
    .post("/api/posts")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Post new post" })
    .expect(200, done);
});

test("Update a post", (done) => {
  request(app)
    .put("/api/posts/post_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Update a post" })
    .expect(200, done);
});

test("Delete a post", (done) => {
  request(app)
    .delete("/api/posts/post_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Delete post" })
    .expect(200, done);
});
