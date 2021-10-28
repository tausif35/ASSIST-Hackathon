const Consumer = require("../model/consumerModel");
const Appointment = require("../model/appointmentModel");
const catchAsync = require("../utils/catchAsync");

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
