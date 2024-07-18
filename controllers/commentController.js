const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
exports.comments_all_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all comments" });
});
