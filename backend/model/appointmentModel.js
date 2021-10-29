const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _professionalId: {
    type: mongoose.Schema.ObjectId,
    ref: "Professional",
    required: [true, "An appointment must have a professional"],
  },
  _consumerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Consumer",
    required: [true, "An appointment must have a consumer"],
  },
  professionalsName: String,
  consumersName: String,
  phone: String,
  email: String,
  title: String,
  date: {
    type: String,
  },
  time: String,
  diagnosis: {
    type: String,
    default: ""
  },
  prescription: {
    type: String,
    default: ""
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
