const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// @desc    Get all posts w/ status published
// @route   GET /api/posts
// @access  Public
exports.post_all_published_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all post" });
});

// @desc    Post a new post
// @route   POST /api/posts
// @access  Private
exports.post_new_post = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Post new post" });
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.post_update_put = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Update a post" });
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.post_delete = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Delete post" });
});
