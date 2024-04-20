const express = require("express");
const { getCourses, getCourse, addCourse } = require("../controllers/course");

const router = new express.Router({ mergeParams: true });

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);

module.exports = router;
