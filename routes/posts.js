const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// List of all post
router.get("/", postController.post_all_get);

// List of published post only
router.get("/published", postController.post_all_published_get);

// Get an specific post
router.get("/:id", postController.post_specific_get);

// create a new post
router.post("/new", authMiddleware, postController.post_new_post);

// Update a post
router.put("/:id", authMiddleware, postController.post_update_put);

// Delete a post
router.delete("/:id", postController.post_delete);

module.exports = router;
