const Consumer = require("../model/consumerModel");

//Find All Consumers
exports.getAllConsumers = async (req, res, next) => {
  const consumers = await Consumer.find();
  res.status(200).json({
    message: "successful",
    No_of_Consumers: consumers.length,
    data: {
      consumers,
    },
  });
};
