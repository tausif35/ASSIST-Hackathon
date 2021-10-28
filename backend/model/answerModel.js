const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  _questionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  answer: {
    type: String,
    required: true,
  },
  answeredBy: {
    type: String,
  },
  upvotes: [{ type: mongoose.Schema.ObjectId, ref: "Consumer" }],
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
