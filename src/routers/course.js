const express = require("express");
const { getCourses } = require("../controllers/course");

const router = new express.Router({ mergeParams: true });

router.get("/", getCourses);

module.exports = router;
