const Professional = require("../model/professionalModel");
const Appointment = require("../model/appointmentModel");
const catchAsync = require("../utils/catchAsync");
const multermiddlewares = require("../middlewares/multerMiddlewares");

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
  let same=false;
  let id=req.params.id?req.params.id :req.user.id
  if(req.params.id && req.params.id===req.user.id){
    same=true;
  }
  console.log(id);
  const professional = await Professional.findById(id).populate({
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
      same
    },
  });
});

//update professional info
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.uploadUserPhoto = multermiddlewares
  .multerFunc("professionals")
  .single("photo");
exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const filteredBody = filterObj(
    req.body,
    "fullname",
    "password",
    "Education_qualifications",
    "Degrees",
    "Work_experience",
    "Research_and_Publications",
    "Achievements"
  );
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await Professional.findByIdAndUpdate(
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
