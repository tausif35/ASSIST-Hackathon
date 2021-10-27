const mongoose = require("mongoose");

//Schema Creation
const professionalSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide a email"],
  },
  role: {
    type: String,
    default: "professional",
  },
  approved: {
    type: Boolean,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  Education_qualifications: String,
  Degrees: String,
  Specialization: [String],
  Work_experience: String,
  Research_and_Publications: String,
  Achievements: String,
});

//Model Creation
const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;
