const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// List of all post
router.get("/", postController.post_all_published_get);

// Get an specific post
router.get("/:id", postController.post_specific_get);

// Post a new post
router.post("/", postController.post_new_post);

// Update a post
router.put("/:id", postController.post_update_put);

// Delete a post
router.delete("/:id", postController.post_delete);

module.exports = router;
