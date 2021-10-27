const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Consumer = require("../model/consumerModel");
const Professional = require("../model/professionalModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

let refreshTokens = [];

//Sign Up An User
exports.signUser = catchAsync(async (req, res, next) => {
  const { email, fullname, password, role } = req.body;

  //Hashing Password
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  //Check if the email is unique
  let newUser;

  if (!email || !fullname || !password || !role) {
    return next(new AppError("provide the required fields", 400));
  }

  if (role === "professional") {
    if ((await (await Professional.find({ email: email })).length) == 0) {
      //if the role is professional it first needs to be approved
      const { edu, degrees, work, research, achievment, specialization } =
        req.body;
      newUser = new Professional({
        fullname,
        email,
        password: hash,
        Education_qualifications: edu,
        Degrees: degrees,
        Specialization: [...specialization],
        Work_experience: work,
        Research_and_Publications: research,
        Achievements: achievment,
      });
    }
  } else {
    if ((await (await Consumer.find({ email: email })).length) == 0) {
      newUser = new Consumer({
        fullname,
        email,
        password: hash,
      });
    }
  }

  //Logging in new User
  if (newUser) {
    const userId = {
      role,
      id: newUser._id,
      fullname,
    };
    const accessToken = generateToken(userId);
    const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
    refreshTokens.push(refreshToken);
    newUser.save();
    res.send({
      accessToken,
      refreshToken,
      role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});

//Logging in an user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new AppError("provide the required fields", 400));
  }
  //Check whether email matches
  let user;
  if (role === "consumer" || role === "admin") {
    user = await Consumer.find({ email: email });
  } else if (role === "professional") {
    user = await Professional.find({ email: email });
  }

  if (!user) {
    return next(new AppError("provide the valid informations", 404));
  }

  //Check whether password matches
  if (user && (await bcrypt.compare(password, user[0].password))) {
    const userId = {
      role,
      id: user[0]._id,
      fullname: user[0].fullname,
    };

    //Providing the user with a token
    const accessToken = generateToken(userId);
    const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
    refreshTokens.push(refreshToken);

    res.send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      role: role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});

//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY, { expiresIn: "60d" });
};

//Verification of a professional
exports.verification = catchAsync(async (req, res, next) => {
  console.log(req.user);
  if (req.user === "undefined") {
    return next(new AppError("sign up unsuccessful", 404));
  }
  const { edu, degrees, work, research, achievment, specialization } = req.body;
  const approve = await ApproveProfessional.findByIdAndUpdate(req.user.id, {
    Education_qualifications: edu,
    Degrees: degrees,
    $push: { Specialization: { $each: [...specialization] } },
    Work_experience: work,
    Research_and_Publications: research,
    Achievements: achievment,
  });
  if (!approve) {
    return next(new AppError("No approval document with that id", 404));
  }

  res.status(200).json({
    message: "pending for approval",
  });
});
