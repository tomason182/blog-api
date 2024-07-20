const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

// Get all comments
router.get("/", commentController.comments_all_get);

// Create a new comment
router.post("/", commentController.comments_create_post);

// Update a comment
router.put("/:id", commentController.comments_update_put);

// Delete a comment
router.delete("/:id", commentController.comments_delete);

module.exports = router;
