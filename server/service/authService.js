const asyncHandler = require('express-async-handler')
const createToken = require('../utils/createToken')
const ApiError = require('../utils/apiError')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




exports.signup =asyncHandler(async(req,res)=>{
  const user =  await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })
  const token = createToken(user.Id)

  res.status(201).json({
    data:{
      Id:user._id,
      name:user.name,
      email:user.email
    },
    token
  })
})

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  const token = createToken(user._id);
  res.status(200).json({
    data: { _id: user._id, name: user.name, email: user.email },
    token,
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ApiError("Invalid or expired token", 401));
  }

  const currentUser = await User.findById(decoded.userId).select("-password");
  if (!currentUser) {
    return next(new ApiError("User no longer exists", 401));
  }

  // لو عندك passwordChangedAt في الـ model
  if (currentUser.passwordChangedAt) {
    const changedAt = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    if (changedAt > decoded.iat) {
      return next(
        new ApiError("Password changed recently, please login again", 401),
      );
    }
  }

  req.user = currentUser;
  next();
});

exports.allowedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403),
      );
    }
    next();
  };
