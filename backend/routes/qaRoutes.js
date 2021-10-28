const express = require("express");
const authmiddlewares = require("../middlewares/authMiddlewares");
const qaController = require("../controllers/qaController");

const router = express.Router();

//All routes after this middleware are protected
router.use(authmiddlewares.protectRoute);

//Question Routes
router
  .route("/")
  .get(qaController.getAllQuestion)
  .post(qaController.askAQuestion);

router
  .route("/:id")
  .get(qaController.getAQuestion)
  .post(qaController.answerAnQuestion);

router
  .route("/answers/:id")
  .get(qaController.getAnAnswer)
  .patch(qaController.upvoteAPost);

router.route("/myQuestions/:userId").get(qaController.getQuestionsOfAnUser);
module.exports = router;
