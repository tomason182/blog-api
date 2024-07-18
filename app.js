require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;

// Importing Routes
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);
app.use("api/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
