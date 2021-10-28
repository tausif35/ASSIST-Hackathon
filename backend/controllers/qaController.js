const Question = require("../model/questionModel");
const Answer = require("../model/answerModel");
const Consumer = require("../model/consumerModel");
const Professional = require("../model/professionalModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllQuestion = catchAsync(async (req, res, next) => {
  const questions = await Question.find().populate({
    path: "answers",
    select: "answer answeredBy",
  });

  res.status(200).json({
    message: "successful",
    No_of_questions: questions.length,
    data: {
      questions,
    },
  });
});

exports.askAQuestion = catchAsync(async (req, res, next) => {
  const { question, askedBy } = req.body;

  const newQuestion = await Question.create({
    question,
    askedBy,
    _userId: req.user.id,
  });

  res.status(201).json({
    message: "successful",
    data: {
      newQuestion,
    },
  });
});

exports.getQuestionsOfAnUser = catchAsync(async (req, res, next) => {
  let questions;
  if (req.user.role === "consumer") {
    questions = await Consumer.findById(req.params.userId).populate({
      path: "questions",
      select: "question _userId",
    });
  } else {
    questions = await Professional.findById(req.params.userId).populate({
      path: "questions",
      select: "question _userId",
    });
  }

  res.status(200).json({
    message: "successful",
    data: {
      questions,
    },
  });
});

exports.getAQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate({
    path: "answers",
    select: "answer answeredBy upvotes",
  });

  res.status(200).json({
    message: "successful",
    data: {
      question,
      id:req.user.id
    },
  });
});

exports.getAnAnswer = catchAsync(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);

  res.status(200).json({
    message: "successful",
    data: {
      answer,
    },
  });
});

exports.answerAnQuestion = catchAsync(async (req, res, next) => {
  if (req.user.role === "consumer") {
    return next(new AppError("Unauthorized", 400));
  }
  const professional = await Professional.findById(req.user.id);

  const newAnswer = await Answer.create({
    _questionId: req.params.id,
    answer: req.body.answer,
    answeredBy: professional.fullname,
  });

  res.status(201).json({
    message: "successful",
    data: {
      newAnswer,
    },
  });
});

exports.upvoteAPost = catchAsync(async (req, res, next) => {
  const ansId = req.params.id;
  const userId = req.user.id;
  const answer = await Answer.findById(ansId);
  const isUpvoted = answer.upvotes && answer.upvotes.includes(userId);

  let option;
  if (!isUpvoted) {
    option = "$addToSet";
  } else option = "$pull";
  let ans = await Answer.findByIdAndUpdate(
    ansId,
    {
      [option]: { upvotes: userId },
    },
    { new: true }
  );

  res.status(201).json({
    message: "success",
    data: {
      ans,
    },
  });
});
