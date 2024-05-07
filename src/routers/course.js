const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const Course = require("../models/course");
const queryResults = require("../middleware/query");
const { auth, authorize } = require("../middleware/auth");

const router = new express.Router({ mergeParams: true });

router.get(
  "/",
  queryResults(Course, {
    path: "bootcamp",
    select: "name description",
  }),
  getCourses
);
router.get("/:id", getCourse);
router.post("/", auth, authorize("publisher", "admin"), addCourse);
router.put("/:id", auth, authorize("publisher", "admin"), updateCourse);
router.delete("/:id", auth, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
