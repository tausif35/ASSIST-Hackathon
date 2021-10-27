const Professional = require("../model/professionalModel");
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

  res.status(200).json({
    message: "successful",
    data: {
      professional,
    },
  });
});
