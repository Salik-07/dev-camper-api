const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/auth");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);

module.exports = router;
