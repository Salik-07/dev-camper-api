const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "./config/dev.env" });
require("colors");

const connectDB = require("./db/mongoose");
const bootcampRouter = require("./routers/bootcamp");
const errorHandler = require("./middleware/error");

// Connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/bootcamps", bootcampRouter);
app.use(errorHandler);

module.exports = app;
