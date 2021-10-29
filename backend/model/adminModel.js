const mongoose = require("mongoose");

//Schema Creation
const adminSchema = new mongoose.Schema({
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
    default: "admin",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  photo: String,
});

//Model Creation
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
