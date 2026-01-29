const User = require("../models/user.model");

const updateEngineerProfile = async (engineerId, data) => {
  const engineer = await User.findById(engineerId);

  if (!engineer) throw new Error("Engineer not found");

  if (engineer.role !== "ENGINEER") {
    throw new Error("Only engineers can update this profile");
  }

  engineer.area = data.area || engineer.area;
  engineer.city = data.city || engineer.city;
  engineer.skills = data.skills || engineer.skills;
  engineer.idProof = data.idProof || engineer.idProof;

  await engineer.save();

  return engineer;
};

module.exports = { updateEngineerProfile };
