const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
exports.post_new_post = [
  body("title").trim().escape().isLength({ min: 3 }),
  body("text").trim().escape().isLength({ min: 3 }),
  body("author").trim().escape().isLength({ min: 3 }),
  body("status").trim().escape().isLength({ min: 3 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(`Could not post the post`);
    }

    const post = new Post({
      title: req.body.title,
      author: req.body.author,
      text: req.body.text,
      status: req.body.status,
    });

    await post.save();
    res.status(200).json({ message: "Post published successfully" });
  }),
];

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
