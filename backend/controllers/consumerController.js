const Consumer = require("../model/consumerModel");
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

  res.status(200).json({
    message: "successful",
    data: {
      consumer,
    },
  });
});
