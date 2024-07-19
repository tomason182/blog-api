const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// @desc    Get all posts w/ status published
// @route   GET /api/posts
// @access  Public
exports.post_all_published_get = asyncHandler(async (req, res) => {
  const allPost = await Post.find({});

  res.status(200).json(allPost);
});

// @desc    Get an specific post.
// @route   GET /api/posts/:id
// @access  Public
exports.post_specific_get = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(post);
  if (post === null) {
    res.status(400);
    throw new Error("Post not found");
  } else {
    res.status(200).json(post);
  }
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
