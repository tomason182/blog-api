const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, param, validationResult } = require("express-validator");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.post_all_get = asyncHandler(async (req, res) => {
  const allPost = await Post.find({});

  res.status(200).json(allPost);
});

// @desc    Get all posts w/ status published
// @route   GET /api/posts/published
// @access  Public
exports.post_all_published_get = asyncHandler(async (req, res) => {
  const publishedPost = await Post.find({ status: "published" });

  res.status(200).json(publishedPost);
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

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.post_new_post = [
  body("title")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Title is required. Min length 3"),
  body("content")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Text is required. Min length 3"),
  body("status")
    .trim()
    .escape()
    .isIn(["published", "unpublished"])
    .withMessage("Status must be published or unpublished"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { title, content, status } = req.body;
    const author = req.user._id;

    const post = new Post({
      title: title,
      content: content,
      author: author,
      status: status,
    });

    await post.save();
    res.status(200).json({ message: "Post published successfully" });
  }),
];

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.post_update_put = [
  param("id")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Is not alphanumeric")
    .isMongoId()
    .withMessage("Is not a valid mongo Id"),
  body("title").trim().escape().isLength({ min: 3 }),
  body("text").trim().escape().isLength({ min: 3 }),
  body("author").trim().escape().isLength({ min: 3 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Invalid body values" });
      return;
    }
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);

    if (post !== null) {
      (post.title = req.body.title),
        (post.text = req.body.text),
        (post.author = req.body.author),
        (post.status = req.body.status);

      await post.save();
      res.status(200).json({ message: "Post updated successfully" });
    }

    res.status(400);
    throw new Error(`Could not find the post with id: ${req.params.id}`);
  }),
];

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.post_delete = [
  param("id")
    .trim()
    .escape()
    .isMongoId()
    .withMessage("Param is not a valid mongo id"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error("Invalid post params id");
    }

    try {
      await Post.findOneAndDelete({ _id: req.params.id });
      res
        .status(200)
        .json({ message: `post ${req.params.id} deleted successfully` });
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  }),
];
