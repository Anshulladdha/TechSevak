const { updateEngineerProfile } = require("../services/engineer.service");
const ServiceRequest = require("../models/serviceRequest.model");
const updateProfile = async (req, res) => {
  try {
    const engineer = await updateEngineerProfile(
      req.user.id,
      req.body
    );

    res.json({
      message: "Engineer profile updated successfully",
      engineer
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const myJobs = async (req, res) => {
  try {
  const jobs = await ServiceRequest.find({
  engineer: req.user.id
  })
  .populate("user", "name email liveLocation")
  .sort({ createdAt: -1 });
  
  
  res.json(jobs);
  } catch (err) {
  res.status(500).json({ message: err.message });
  }
  };  

module.exports = { updateProfile , myJobs };
