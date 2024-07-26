const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");


// update user
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const fields = {
    username: req.body.username,
    email: req.body.email,
  };
  await User.findByIdAndUpdate(req.user.id, fields, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    success: true,
  });
});

// update profile photo
exports.updateProfileImage = asyncHandler(async (req, res, next) => {
  req.body.photo = req.file.path;
  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      photo: `/${req.file.path}`,
    },
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
  });
});

// get profile
exports.getMe = asyncHandler(async (req, res, next) => {
  await User.findById(req.user.id);
  res.status(200).json({ success: true });
});
