const express = require("express");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const User = require("../models/user");
const queryResults = require("../middleware/query");
const { auth, authorize } = require("../middleware/auth");

const router = new express.Router();

router.use(auth);
router.use(authorize("admin"));

router.get("/", queryResults(User), getUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
