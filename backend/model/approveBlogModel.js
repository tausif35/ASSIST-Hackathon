const mongoose = require("mongoose");

//Schema Creation
const approveBlogSchema = new mongoose.Schema({
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
  photo: {
    type: String,
    default: "blogDefault.png",
  },
  role: String,

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
});

//Model Creation
const ApproveBlog = mongoose.model("ApproveBlog", approveBlogSchema);

module.exports = ApproveBlog;
