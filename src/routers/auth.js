const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
  updateUserDetails,
  updatePassword,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.get("/me", auth, getMe);
router.put("/update-user-details", auth, updateUserDetails);
router.put("/update-user-password", auth, updatePassword);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;
