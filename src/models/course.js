const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a course title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    weeks: {
      type: String,
      required: [true, "Please add number of weeks"],
    },
    tuition: {
      type: Number,
      required: [true, "Please add a tuition cost"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add a minimum skill"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.statics.getAverageCost = async function (bootcampId) {
  const result = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId,
      },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: {
          $avg: "$tuition",
        },
      },
    },
  ]);

  try {
    if (result?.length > 0) {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageCost: result[0].averageCost,
      });
    } else {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageCost: 0,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageCost after save
courseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
courseSchema.post("deleteOne", { document: true, query: false }, function () {
  this.constructor.getAverageCost(this.bootcamp);
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
