const express = require("express");
const authmiddlewares = require("../middlewares/authMiddlewares");
const approvalController = require("../controllers/approvalController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//All routes after this middleware are restriced to admin only
router.use(authmiddlewares.restrict);

//Professional approval routes
router
  .route("/professionals")
  .get(approvalController.pendingProfessionalApprovals);
router.route("/professionals/:id").get(approvalController.approveAProfessional);

//Blog approval routes
router.route("/blogs").get(approvalController.pendingBlogApprovals);
router.route("/blogs/:id").get(approvalController.approveABlog);


module.exports = router;
