const postRoutes = require("../routes/postRoutes");
const Post = require("../models/post");
const connectDB = require("../config/db");
const { errorHandler } = require("../middleware/errorMiddleware");

const { mockedPosts } = require("./test_utils/mock_data");

const request = require("supertest");
const mongoose = require("mongoose");
// const mockedData = require("./test_utils/mock_data");

const express = require("express");
const { findOne } = require("../models/user");
const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);

app.use(errorHandler);

beforeEach(async () => {
  try {
    await Post.deleteMany({});

    const firstPost = new Post(mockedPosts[0]);
    await firstPost.save();

    const secondPost = new Post(mockedPosts[1]);
    await secondPost.save();
  } catch (err) {
    console.log(err);
  }
});

test("get all post", async () => {
  const response = await request(app).get("/api/posts");
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
  expect(response.body).toHaveLength(mockedPosts.length);
});

describe("get an specific post", () => {
  test("Should throw an 400 error if post is not found", async () => {
    const response = await request(app).get(
      "/api/posts/668871b4190e979c4bc82002"
    );
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe("Post not found");
  });

  test("should retrieve specific post if id is found", async () => {
    const somePost = await Post.findOne();
    const response = await request(app).get(`/api/posts/${somePost._id}`);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "_id",
      "author",
      "status",
      "text",
      "title",
      "createdAt",
      "updatedAt"
    );
  });
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
