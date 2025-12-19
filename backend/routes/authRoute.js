

const { registerUser, loginUser, forgotPassword, verifyOtp, ResetPassword } = require("../controller/authController");
const router = require("express").Router();


// Call controller function 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword)

router.route("/verifyotp").post(verifyOtp)
router.route("/resetpassword").post(ResetPassword)
// router.route("/login").post(loginUser);
// module.exports = router;
// ./rsgister lie rediserUser fun call bagxa 

module.exports = router ; 