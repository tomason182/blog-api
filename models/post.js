const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: text, required: true },
  },
  {
    timestamps: true,
  }
);

// Virtual for post URL.
PostSchema.virtual("url").get(function () {
  return `/api/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
