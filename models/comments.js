const mongoose = require("mongoose");
const { getMaxListeners } = require("./post");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
