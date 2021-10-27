const Professional = require("../model/professionalModel");

//Find All Professionals
exports.getAllProfessionals = async (req, res) => {
  const professionals = await Professional.find();
  res.status(200).json({
    message: "successful",
    No_of_Professionals: professionals.length,
    data: {
      professionals,
    },
  });
};
