const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// List of all post
router.get("/", postController.post_all_published_get);

module.exports = router;
