const ApproveProfessional = require("../model/approveProfessionalModel");
const ApproveBlog = require("../model/approveBlogModel")
const Professional = require("../model/professionalModel");
const BlogPost = require("../model/blogModel")
const catchAsync = require("../utils/catchAsync");

//See all pending approvals for professionals
exports.pendingProfessionalApprovals = catchAsync(async (req, res) => {
  const approvals = await ApproveProfessional.find();
  res.status(200).json({
    message: "success",
    data: {
      approvals,
    },
  });
});

//Approve a professional
exports.approveAProfessional = catchAsync(async (req, res) => {
  const approval = await ApproveProfessional.findById(req.params.id);

  if (!approval) {
    return next(new AppError("No approval found with that ID", 404));
  }

  const {
    fullname,
    email,
    password,
    Education_qualifications,
    Degrees,
    Specialization,
    Work_experience,
    Research_and_Publications,
    Achievements,
  } = approval;

  //Document creation in Professional collection
  await Professional.create({
    fullname,
    email,
    password,
    Education_qualifications,
    Degrees,
    Specialization,
    Work_experience,
    Research_and_Publications,
    Achievements,
    role: "doctor",
    approved: 1,
  });

  //Document Deletion in ApproveProfessional collection
  await ApproveProfessional.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Approved",
  });
});


//See all pending approvals for blogs
exports.pendingBlogApprovals = catchAsync(async (req, res) => {
  const approvals = await ApproveBlog.find();
  res.status(200).json({
    message: "success",
    data: {
      approvals,
    },
  });
});

//Approve a Blog
exports.approveABlog = catchAsync(async (req, res) => {
  const approval = await ApproveBlog.findById(req.params.id);

  if (!approval) {
    return next(new AppError("No approval found with that ID", 404));
  }

  const { title, body, name, category, _userId, photo } = approval;

  //Document creation in Professional collection
  await BlogPost.create({
    title,
    body,
    name,
    category,
    _userId,
    photo,
    approved: 1,
  });

  //Document Deletion in ApproveProfessional collection
  await ApproveBlog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Approved",
  });
});
