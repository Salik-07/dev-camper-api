const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
require("colors");

const Bootcamp = require("./src/models/bootcamp");

// Load env vars
dotenv.config({ path: "./config/dev.env" });

// Connect to DB
mongoose.connect(process.env.MONGODB_URL);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log(
      `${bootcamps.length} bootcamps imported successfully!`.green.inverse
    );
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log(`Data destroyed`.red.inverse);
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
