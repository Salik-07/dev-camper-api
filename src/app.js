const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");

const connectDB = require("./db/mongoose");
const bootcampRouter = require("./routers/bootcamp");

// Load env vars
dotenv.config({ path: "./config/dev.env" });

// Connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/bootcamps", bootcampRouter);

module.exports = app;
