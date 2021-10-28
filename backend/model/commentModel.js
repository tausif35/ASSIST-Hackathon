const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  _blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "BlogPost",
    required: [true, "A comment must belong to a blog"],
  },
  name: {
    type: String
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;