const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
exports.comments_all_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all comments" });
});

// @desc    add a new comment
// @route   POST /api/comments
// @access  Private
exports.comments_create_post = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Create a new comment" });
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
exports.comments_update_put = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Update a comment" });
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.comments_delete = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Delete a comment" });
});
