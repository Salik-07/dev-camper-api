const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const bootcampRouter = require("./routers/bootcamp");

dotenv.config({ path: "./config/dev.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/bootcamps", bootcampRouter);

module.exports = app;
