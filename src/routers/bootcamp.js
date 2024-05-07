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
const { auth, authorize } = require("../middleware/auth");

const router = new express.Router();

// Include other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.get("/", queryResults(Bootcamp, "courses"), getBootcamps);
router.get("/:id", getBootcamp);
router.post("/", auth, authorize("publisher", "admin"), createBootcamp);
router.put("/:id", auth, authorize("publisher", "admin"), updateBootcamp);
router.delete("/:id", auth, authorize("publisher", "admin"), deleteBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);
router.put(
  "/:id/photo",
  auth,
  authorize("publisher", "admin"),
  bootcampPhotoUpload
);

module.exports = router;
