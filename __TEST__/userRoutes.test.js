const userRoutes = require("../routes/userRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

test("Get all users", (done) => {
  request(app)
    .get("/api/users")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Get all users" })
    .expect(200, done);
});

test("Get specific user", (done) => {
  request(app)
    .get("/api/users/user_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Get specific user" })
    .expect(200, done);
});

test("Create a user", (done) => {
  request(app)
    .post("/api/users")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Create a user" })
    .expect(200, done);
});

test("Update a user", (done) => {
  request(app)
    .put("/api/users/user_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Update a user" })
    .expect(200, done);
});

test("Delete a user", (done) => {
  request(app)
    .delete("/api/users/user_id")
    .expect("Content-Type", /json/)
    .expect({ msg: "NOT IMPLEMENTED: Delete a user" })
    .expect(200, done);
});
