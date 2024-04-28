const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ super: true });
});

module.exports = {
  registerUser,
};
