const request = require("supertest");
const mongoose = require("mongoose");
const connectDb = require("../config/db");
const app = require("../app");
const { mockedPosts } = require("./test_utils/mocked_data");

// Require Models
const Post = require("../models/post");

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Post.deleteMany({});
});

describe("Post API", () => {
  test("get all post", async () => {
    await Post.insertMany(mockedPosts);
    const response = await request(app).get("/api/posts");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(mockedPosts.length);
  });

  describe("Get an specific post", () => {
    test("should throw an error if post is not found", async () => {
      const response = await request(app).get(
        "/api/posts/668871b4190e979c4bc82002"
      );
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(400);
      expect(response.body.message).toBe("Post not found");
    });

    test("Should retrieve specific post if post is found", async () => {
      const somePost = new Post(mockedPosts[0]);
      await somePost.save();
      const response = await request(app).get(`/api/posts/${somePost._id}`);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("title");
    });

    describe("post a new post", () => {
      test("Should throw an error if post could not be posted", async () => {
        const response = await request(app).post("/api/posts");
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(400);
        expect(response.body.message).toBe("Could not post the post");
      });

      test("Post should be published successfully if body is provided", async () => {
        const response = await request(app).post("/api/posts").send({
          title: "third post",
          author: "669ac0356f1dd528feb6f9c3",
          text: "Text for the third post",
          status: "unpublished",
        });
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.message).toBe("Post published successfully");
      });
    });
  });
});
