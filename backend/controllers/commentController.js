const Comment = require("../model/commentModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    message: "successful",
    data: {
      comments,
    },
  });
});

exports.CreateNewComment = async (req, res) => {
  const newComment = await Comment.create({
    name: req.user.fullname,
    comment: req.body.comment,
    _blogId: req.params.blogId,
  });

  res.status(201).json({
    message: "successful",
    data: {
      newComment,
    },
  });
};

exports.deleteAllComments = async (req, res) => {
  await Comment.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};