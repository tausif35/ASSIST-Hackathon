const express = require("express");
const authmiddlewares = require("../middlewares/authMiddlewares");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.route("/login").post(adminController.adminLogin);
router.route("/signup").post(adminController.createAnAdmin);

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//All routes after this middleware are restriced to admin only
router.use(authmiddlewares.restrict);

router.route("/").get(adminController.getAllAdmins);

// //All routes after this middleware are protected
// router.use(authmiddlewares.protectRoute);

// //All routes after this middleware are restriced to admin only
// router.use(authmiddlewares.restrict);
module.exports = router;
