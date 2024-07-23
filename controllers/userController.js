require("dotenv").config();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.users_all_get = asyncHandler(async (req, res) => {
  const { _id, name, username } = req.user;
  res.json({ msg: `Name: ${name}, id: ${_id}, username: ${username}` });
});

// @desc    Get one users
// @route   GET /api/users/:id
// @access  Private
exports.users_one_get = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Get specific user" });
});

// @desc    Register a users
// @route   POST /api/users/register
// @access  Private
exports.users_create_post = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be 3 to 50 characters"),
  body("username").trim().escape().isEmail().withMessage("Not a valid email"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 12 })
    .withMessage("password should contain at lease 12 characters"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists !== null) {
      return res.status(400).json([{ message: "User already exists" }]);
    }

    const salt = crypto.randomBytes(32).toString("hex");
    crypto.pbkdf2(
      req.body.password,
      salt,
      100000,
      64,
      "sha512",
      async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const user = new User({
          name: req.body.name,
          username: req.body.username,
          hashedPassword: hashedPassword.toString("hex"),
          salt: salt,
        });

        console.log(user);
        try {
          await user.save();
          return res.status(200).json({ message: "User created successfully" });
        } catch (err) {
          throw new Error(err);
        }
      }
    );
  }),
];

// @desc    Log in a user
// @route   POST /api/users/login
// @access  Public
exports.user_login_post = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user === null) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  crypto.pbkdf2(
    password,
    user.salt,
    100000,
    64,
    "sha512",
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      if (hashedPassword.toString("hex") !== user.hashedPassword) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const payload = { sub: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    }
  );
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
exports.users_update_put = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Update a user" });
});

// @desc   Delete a user
// @route   DELETE /api/users/:id
// @access  Private
exports.users_delete = asyncHandler(async (req, res) => {
  res.json({ msg: "NOT IMPLEMENTED: Delete a user" });
});
