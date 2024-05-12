const asyncHandler = require("../middleware/async");
const User = require("../models/user");

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const addUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
