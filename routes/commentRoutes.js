const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

// Get all comments
router.get("/", commentController.comments_all_get);

module.exports = router;
