const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
