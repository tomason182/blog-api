const connectDB = require("./config/db");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();
require("./config/passport")(passport);

connectDB();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
