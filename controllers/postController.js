const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// @desc    Get all posts w/ status published
// @route   GET /api/posts
// @access  Public
exports.post_all_published_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all post" });
});
