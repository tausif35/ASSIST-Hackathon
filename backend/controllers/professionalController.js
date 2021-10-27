const Professional = require("../model/professionalModel");
const Appointment = require("../model/appointmentModel");
const catchAsync = require("../utils/catchAsync");

//Find All Professionals
exports.getAllProfessionals = catchAsync(async (req, res) => {
  const professionals = await Professional.find();
  res.status(200).json({
    message: "successful",
    No_of_Professionals: professionals.length,
    data: {
      professionals,
    },
  });
});

//Find A single Professional
exports.getAProfessional = catchAsync(async (req, res) => {
  const professional = await Professional.findById(req.user.id).populate({
    path: "appointments",
    select: "_consumerId date time consumersName -_professionalId",
  });
  const detailedAppointmentStat = await Appointment.aggregate([
    {
      $match: { _professionalId: professional._id },
    },
    {
      $group: {
        _id: "$date",
        num_of_appointments_in_the_day: { $sum: 1 },
        times: { $push: "$time" },
        consumersName: { $push: "$consumersName" },
      },
    },
  ]);

  res.status(200).json({
    message: "successful",
    data: {
      professional,
      detailedAppointmentStat,
    },
  });
});
