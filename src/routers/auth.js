const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;
