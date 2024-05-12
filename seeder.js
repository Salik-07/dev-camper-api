const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
require("colors");

// Load env vars
dotenv.config({ path: "./config/dev.env" });

// Load models
const Bootcamp = require("./src/models/bootcamp");
const Course = require("./src/models/course");
const User = require("./src/models/user");
const Review = require("./src/models/review");

// Connect to DB
mongoose.connect(process.env.MONGODB_URL);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    console.log(`Data imported...`.green.inverse);
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log(`Data destroyed...`.red.inverse);
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
