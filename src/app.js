require("dotenv").config({ path: "./config/dev.env" });
const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
require("colors");
const path = require("path");

const connectDB = require("./db/mongoose");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const bootcampRouter = require("./routers/bootcamp");
const courseRouter = require("./routers/course");
const reviewRouter = require("./routers/review");
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

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(errorHandler);

module.exports = app;
