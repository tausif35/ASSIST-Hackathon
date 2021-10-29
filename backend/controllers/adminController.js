const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../model/adminModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//Find All Consumers
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find();
  res.status(200).json({
    message: "successful",
    No_of_Admins: admins.length,
    data: {
      admins,
    },
  });
});

exports.createAnAdmin = catchAsync(async (req, res, next) => {
  const { email, fullname, password, role } = req.body;

  //Hashing Password
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  //Check if the email is unique
  let newAdmin;

  if (!email || !fullname || !password || !role) {
    return next(new AppError("provide the required fields", 400));
  }

  if ((await (await Admin.find({ email: email })).length) == 0) {
    newAdmin = new Admin({
      fullname,
      email,
      password: hash,
    });
  }
  //Logging in new User
  if (newAdmin) {
    const adminId = {
      role,
      id: newAdmin._id,
      fullname,
    };

    const accessToken = generateToken(adminId);
    //const refreshToken = jwt.sign(adminId, process.env.REFRESHTOKEN);
    //refreshTokens.push(refreshToken);
    newAdmin.save();
    res.send({
      role,
      accessToken,
      //refreshToken,
      //role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});

//Token Creation
const generateToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESSKEY, { expiresIn: "60d" });
};

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("provide the required fields", 400));
  }
  //Check whether email matches
  let admin;

  admin = await Admin.find({ email: email });

  if (!admin) {
    return next(new AppError("provide the valid informations", 404));
  }

  //Check whether password matches
  if (admin && (await bcrypt.compare(password, admin[0].password))) {
    const adminId = {
      id: admin[0]._id,
      fullname: admin[0].fullname,
    };

    //Providing the user with a token
    const accessToken = generateToken(adminId);
    //   const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
    //   refreshTokens.push(refreshToken);

    res.send({
      accessToken: accessToken,
      // refreshToken: refreshToken,
      // role: role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});
