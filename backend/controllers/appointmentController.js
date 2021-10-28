const Appointment = require("../model/appointmentModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    message: "successful",
    data: {
      appointments,
    },
  });
});

exports.createAnAppointment = catchAsync(async (req, res) => {
  const newAppointment = await Appointment.create({
    ...req.body,
    _consumerId: req.user.id,
  });
  res.status(201).json({
    message: "successful",
    data: {
      newAppointment,
    },
  });
});
