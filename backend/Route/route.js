const router = require("express").Router();
const { registerUser, loginUser, forgotPassword, verifyOtp, ResetPassword } = require("../Controller/authController");
const Blog = require("../model/blogmodel");

// Create a new blog post


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword)

router.route("/verifyotp").post(verifyOtp)
router.route("/resetpassword").post(ResetPassword)

module.exports = router;