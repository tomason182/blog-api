const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

// Get all users
router.get("/", authMiddleware, userController.users_all_get);

// Get user profile
router.get("/profile", authMiddleware, userController.users_one_get);

// Create a user
router.post("/register", userController.users_create_post);

// Update a user
router.put("/:id", userController.users_update_put);

// Delete a user
router.delete("/:id", userController.users_delete);

// User Log In
router.post("/login", userController.user_login_post);

// User Log out
router.post("/logout", authMiddleware, userController.user_logout_post);

module.exports = router;
