const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");


//signin
//public route
exports.signin = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Email and Password is required!", 400));
  }
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credential", 400));
  }
  let isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorResponse("Invalid Credential", 400));
  }
  sendTokenResponse(user, 200, res);
});

//logout
//public route
exports.logout = (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  let token = user.JWTSignToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
        active: user.active,
      },
    });
};
