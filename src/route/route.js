const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const authorValidation = require("../validations/authorValidation");
const postValidation = require("../validations/postValidation");

// .................................. Author end points ................................//
router.post(
  "/createAuthor",
  authorValidation.validateCreateAuthor,
  authorController.createAuthor
);

router.post(
  "/login",
  authorValidation.validateLoginAuthor,
  authorController.loginAuthor
);

// .................................. Post end points ................................//
router.post(
  "/createPost",
  auth.Authentication,
  postValidation.validateCreatePost,
  postController.createPost
);

router.post(
  "/likePost",
  auth.Authentication,
  postValidation.validateLikePost,
  postController.likePost
);

router.get("/getPosts", auth.Authentication, postController.getPosts);

router.get(
  "/getAuthorsPosts",
  auth.Authentication,
  postController.getAuthorPosts
);

module.exports = router;
