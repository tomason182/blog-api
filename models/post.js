const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },
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
