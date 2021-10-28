const Consumer = require("../model/consumerModel");
const Appointment = require("../model/appointmentModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const multermiddlewares = require("../middlewares/multerMiddlewares");

//Find All Consumers
exports.getAllConsumers = catchAsync(async (req, res, next) => {
  const consumers = await Consumer.find();
  res.status(200).json({
    message: "successful",
    No_of_Consumers: consumers.length,
    data: {
      consumers,
    },
  });
});

//Find A single Consumer
exports.getAConsumer = catchAsync(async (req, res, next) => {
  const consumer = await Consumer.findById(req.user.id).populate({
    path: "appointments",
    select: "_professionalId professionalsName date time -_consumerId",
  });
  const detailedAppointmentStat = await Appointment.aggregate([
    {
      $match: { _consumerId: consumer._id },
    },
    {
      $group: {
        _id: "$date",
        num_of_appointments_in_the_day: { $sum: 1 },
        times: { $push: "$time" },
        professionalsName: { $push: "$professionalsName" },
      },
    },
  ]);

  res.status(200).json({
    message: "successful",
    data: {
      consumer,
      detailedAppointmentStat,
    },
  });
});

//update consumer info
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.uploadUserPhoto = multermiddlewares
  .multerFunc("consumers")
  .single("photo");
exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "fullname", "password");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await Consumer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
