const multermiddlewares = require("../middlewares/multerMiddlewares");
const BlogPost = require("../model/blogModel");
const ApproveBlog = require("../model/approveBlogModel");
const Consumer = require("../model/consumerModel");
const Professional = require("../model/professionalModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllBlogs = catchAsync(async (req, res) => {
  console.log(req.user);
  const blogs = await BlogPost.find();
  res.status(200).json({
    message: "successful",
    data: {
      blogs,
    },
  });
});

exports.uploadUserPhoto = multermiddlewares.multerFunc("blogs").single("photo");
exports.createBlog = catchAsync(async (req, res, next) => {
  console.log(req.file, req.body)
  const { title, body, category } = req.body;
  const blog = await ApproveBlog.create({
    title,
    body,
    name: req.user.fullname,
    category,
    photo: req.file ? req.file.filename : "blogDefault.png",
    _userId: req.user.id,
  });
  res.status(200).json({
    message: "successful",
    data: {
      blog,
    },
  });
});

exports.getBlogsOfAnUser = catchAsync(async (req, res, next) => {
  let blogs;
  if (req.user.role === "consumer") {
    blogs = await Consumer.findById(req.params.userId).populate({
      path: "blogs",
      select: "title name",
    });
  } else {
    blogs = await Professional.findById(req.params.userId).populate({
      path: "blogs",
      select: "title name",
    });
  }

  res.status(200).json({
    message: "successful",
    data: {
      blogs,
    },
  });
});

exports.getBlogPost = catchAsync(async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.id).populate({
    path: "comments",
    select: "comment name",
  });

  res.status(200).json({
    message: "successful",
    data: {
      blog,
    },
  });
});
