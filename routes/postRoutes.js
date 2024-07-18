const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// List of all post
router.get("/", postController.post_all_published_get);

router.post("/", postController.post_new_post);

router.put("/:id", postController.post_update_put);

router.delete("/:id", postController.post_delete);

module.exports = router;
