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

module.exports = router;
