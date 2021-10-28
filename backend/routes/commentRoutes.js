const express = require("express");
const authmiddlewares = require("../middlewares/authMiddlewares");
const commentController = require("../controllers/commentController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Comment Routes
router.route("/").get(commentController.getAllComments);
router.route("/:blogId").post(commentController.CreateNewComment);

module.exports = router;