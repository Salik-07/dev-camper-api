const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/review");
const Review = require("../models/review");
const queryResults = require("../middleware/query");
const { auth, authorize } = require("../middleware/auth");

const router = new express.Router({ mergeParams: true });

router.get(
  "/",
  queryResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);
router.get("/:id", getReview);
router.post("/", auth, authorize("user", "admin"), addReview);
router.put("/:id", auth, authorize("user", "admin"), updateReview);
router.delete("/:id", auth, authorize("user", "admin"), deleteReview);

module.exports = router;
