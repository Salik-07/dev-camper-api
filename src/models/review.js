const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title for the review"],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, "Please add a rating between 1 and 10"],
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (bootcampId) {
  const result = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log("result", result);

  try {
    if (result?.length > 0) {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: result[0].averageRating,
      });
    } else {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: 0,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageRating after save
reviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageRating before remove
reviewSchema.post("deleteOne", { document: true, query: false }, function () {
  this.constructor.getAverageRating(this.bootcamp);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
