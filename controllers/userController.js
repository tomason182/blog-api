require("dotenv").config();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, param, validationResult } = require("express-validator");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const util = require("node:util");
const pbkdf2 = util.promisify(crypto.pbkdf2);

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.users_all_get = asyncHandler(async (req, res) => {
  const { _id, name, username } = req.user;
  res.json({ msg: `Name: ${name}, id: ${_id}, username: ${username}` });
});

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
(exports.users_one_get = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
})),
  // @desc    Register a users
  // @route   POST /api/users/register
  // @access  Private
  (exports.users_create_post = [
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
            return res
              .status(200)
              .json({ message: "User created successfully" });
          } catch (err) {
            throw new Error(err);
          }
        }
      );
    }),
  ]);

// @desc    Log in a user
// @route   POST /api/users/login
// @access  Public
exports.user_login_post = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const user = await User.findOne({ username });
  if (user === null) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  try {
    const hashedPassword = await pbkdf2(
      password,
      user.salt,
      100000,
      64,
      "sha512"
    );
    console.log();
    if (hashedPassword.toString("hex") !== user.hashedPassword) {
      res.status(401);
      throw new Error("Invalid username or password");
    }

    const payload = { sub: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

// @desc    User log out
// @route   POST /api/users/logout
// @access  Private
exports.user_logout_post = asyncHandler(async (req, res) => {
  // Client should remove toke in front-end
  res.status(200).json({ message: "User logged out" });
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
