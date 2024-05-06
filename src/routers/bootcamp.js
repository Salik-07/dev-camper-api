const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamp");
const courseRouter = require("./course");
const Bootcamp = require("../models/bootcamp");
const queryResults = require("../middleware/query");
const auth = require("../middleware/auth");

const router = new express.Router();

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.get("/", queryResults(Bootcamp, "courses"), getBootcamps);
router.get("/:id", getBootcamp);
router.post("/", auth, createBootcamp);
router.put("/:id", auth, updateBootcamp);
router.delete("/:id", auth, deleteBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);
router.put("/:id/photo", auth, bootcampPhotoUpload);

module.exports = router;
