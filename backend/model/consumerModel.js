const mongoose = require("mongoose");

//Schema Creation
const consumerSchema = new mongoose.Schema({
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
    default: "consumer",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  photo: String,
});

//Model Creation
const Consumer = mongoose.model("Consumer", consumerSchema);

module.exports = Consumer;
