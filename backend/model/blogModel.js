const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a Title"],
    },
    body: {
      type: String,
      required: [true, "Please provide a blog body"],
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    photo: String,

    category: {
      type: [String],
    },

    _userId: {
      type: mongoose.Schema.ObjectId,
      ref: "Consumer",
      required: [true, "A question must have an user"],
    },
    _userId: {
      type: mongoose.Schema.ObjectId,
      ref: "Professional",
      required: [true, "A question must have an user"],
    },
    approved: {
      type: Boolean,
      default: 0,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate for comments
blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "_blogId",
  localField: "_id",
});

//Model Creation
const BlogPost = mongoose.model("BlogPost", blogSchema);

module.exports = BlogPost;
