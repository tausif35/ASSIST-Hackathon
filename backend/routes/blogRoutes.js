const express = require("express");
const authmiddlewares = require("../middlewares/authMiddlewares");
const blogController = require("../controllers/blogController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Blog Routes
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.uploadUserPhoto, blogController.createBlog);

router.route("/:id").get(blogController.getBlogPost);
router.route("/myBlogs/:userId").get(blogController.getBlogsOfAnUser);

module.exports = router;
