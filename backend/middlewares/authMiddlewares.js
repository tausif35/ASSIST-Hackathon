const express = require("express");
const jwt = require("jsonwebtoken");
const Consumer = require("../model/consumerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const app = express();
app.use(express.json());

//Middleware for protecting routes from non logged in users
exports.protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return next(new AppError("You're not logged in", 404));
  jwt.verify(token, process.env.ACCESSKEY, (err, user) => {
    if (err) return next(new AppError("You're not logged in", 404));
    req.user = user;
    next();
  });
};
