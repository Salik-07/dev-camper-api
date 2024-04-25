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
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
