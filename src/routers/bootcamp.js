const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamp");

const router = new express.Router();

router.get("", getBootcamps);
router.get("/:id", getBootcamp);
router.post("", createBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);

module.exports = router;
