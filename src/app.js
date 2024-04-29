require("dotenv").config({ path: "./config/dev.env" });
const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const _colors = require("colors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./db/mongoose");
const userRouter = require("./routers/auth");
const bootcampRouter = require("./routers/bootcamp");
const courseRouter = require("./routers/course");
const errorHandler = require("./middleware/error");

// Connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);

app.use(errorHandler);

module.exports = app;
