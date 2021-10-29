const multermiddlewares = require("../middlewares/multerMiddlewares");
const BlogPost = require("../model/blogModel");
const ApproveBlog = require("../model/approveBlogModel");
const Consumer = require("../model/consumerModel");
const Professional = require("../model/professionalModel");
const catchAsync = require("../utils/catchAsync");

//Get all blogs
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const blogs = await BlogPost.find();

  //data aggregation for consumer's blogs
  const consumers_blogs = await BlogPost.aggregate([
    {
      $match: { role: "consumer" },
    },
  ]);

  ////data aggregation for professional's blogs
  const professionals_blogs = await BlogPost.aggregate([
    {
      $match: { role: "professional" },
    },
  ]);

  res.status(200).json({
    message: "successful",
    data: {
      blogs,
      consumers_blogs,
      professionals_blogs,
    },
  });
});

//Multer middleware
exports.uploadUserPhoto = multermiddlewares.multerFunc("blogs").single("photo");

//Create a new blog
exports.createBlog = catchAsync(async (req, res, next) => {
  console.log(req.file, req.body);
  const { title, body, category } = req.body;
  const blog = await ApproveBlog.create({
    title,
    body,
    name: req.user.fullname,
    category,
    photo: req.file ? req.file.filename : "blogDefault.png",
    _userId: req.user.id,
    role: req.user.role,
  });
  res.status(200).json({
    message: "successful",
    data: {
      blog,
    },
  });
});

//My blogs
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

//Get a blog
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
