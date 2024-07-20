const Comment = require("../models/comments");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
exports.comments_all_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get all comments" });
});

// @desc    add a new comment
// @route   POST /api/comments
// @access  Private
exports.comments_create_post = [
  body("text")
    .trim()
    .escape()
    .isLength({ min: 3, max: 300 })
    .withMessage("comment content should have between 3 to 300 characters"),
  body("post_id")
    .trim()
    .escape()
    .isMongoId()
    .withMessage("post id is not a valid mongo id"),
  body("author")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("comment author should have 3 to 20 characters"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json(errors.array());
      return;
    }

    const commentedPost = await Post.find({
      _id: req.body.post_id,
      status: "published",
    });

    // When not found commented post is an empty list.
    if (typeof commentedPost === undefined || commentedPost.length === 0) {
      res.status(400);
      throw new Error("The post is not able for comments");
    }

    const comments = new Comment({
      post_id: req.body.post_id,
      author: req.body.author === "" ? "anonymous" : req.body.author,
      text: req.body.text,
    });

    await comments.save();
    res.status(200).json({ message: "comment successfully published" });
  }),
];

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
