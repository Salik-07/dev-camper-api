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

const router = new express.Router();

router.use("/:bootcampId/courses", courseRouter);

router.get("/", getBootcamps);
router.get("/:id", getBootcamp);
router.post("/", createBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);
router.put("/:id/photo", bootcampPhotoUpload);

module.exports = router;
