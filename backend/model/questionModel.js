const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
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
    askedBy: {
      type: String,
      default: "anonymous",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate for q&a
questionSchema.virtual("answers", {
  ref: "Answer",
  foreignField: "_questionId",
  localField: "_id",
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
