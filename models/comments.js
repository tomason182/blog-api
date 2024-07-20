const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: { type: String },
    post_id: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", CommentSchema);
