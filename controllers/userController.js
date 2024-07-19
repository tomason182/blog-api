const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.users_all_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all users" });
});

// @desc    Get one users
// @route   GET /api/users/:id
// @access  Private
exports.users_one_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get specific user" });
});

// @desc    Create a users
// @route   POST /api/users/
// @access  Private
exports.users_create_post = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Create a user" });
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
exports.users_update_put = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Update a user" });
});

// @desc   Delete a user
// @route   DELETE /api/users/:id
// @access  Private
exports.users_delete = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Delete a user" });
});
