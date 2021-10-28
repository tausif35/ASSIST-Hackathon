const mongoose = require("mongoose");

//Schema Creation
const approveProfessionalSchema = new mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
    required: [true, "An user must have a email"],
  },
  role: {
    type: String,
    default: "professional",
  },
  approved: {
    type: Boolean,
    default: 0,
  },
  password: String,
  photo: String,
  Education_qualifications: {
    type: String,
    default: "NONE",
  },
  Degrees: {
    type: String,
    default: "NONE",
  },
  Specialization: {
    type: [String],
  },
  Work_experience: {
    type: String,
    default: 0,
  },
  Research_and_Publications: {
    type: String,
    default: "NONE",
  },
  Achievements: {
    type: String,
    default: "NONE",
  },
});

//Model Creation
const ApproveProfessional = mongoose.model(
  "ApproveProfessional",
  approveProfessionalSchema
);

module.exports = ApproveProfessional;
