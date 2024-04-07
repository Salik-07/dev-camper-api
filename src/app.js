const express = require("express");
const dotenv = require("dotenv");
const bootcampRouter = require("./routers/bootcamp");

dotenv.config({ path: "./config/dev.env" });

const app = express();
app.use("/api/v1/bootcamps", bootcampRouter);

app.use(express.json());

module.exports = app;
