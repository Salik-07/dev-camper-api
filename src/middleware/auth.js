const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", ""); // Set token from Bearer token in header
  } else {
    token = req?.cookies.token; // Set token from cookie
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { auth, authorize };
