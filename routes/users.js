const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

// Get all users
router.get("/", authMiddleware, userController.users_all_get);

// Get an specific user
router.get("/:id", userController.users_one_get);

// Create a user
router.post("/", userController.users_create_post);

// Update a user
router.put("/:id", userController.users_update_put);

// Delete a user
router.delete("/:id", userController.users_delete);
module.exports = router;
