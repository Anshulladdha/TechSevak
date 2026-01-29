const ServiceRequest = require("../models/serviceRequest.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");

// USER DASHBOARD
const userDashboard = async (req, res) => {
  const total = await ServiceRequest.countDocuments({
    user: req.user.id
  });

  const completed = await ServiceRequest.countDocuments({
    user: req.user.id,
    status: "COMPLETED"
  });

  const pending = await ServiceRequest.countDocuments({
    user: req.user.id,
    status: { $ne: "COMPLETED" }
  });

  res.json({
    totalRequests: total,
    completedServices: completed,
    pendingServices: pending
  });
};

// ENGINEER DASHBOARD
const engineerDashboard = async (req, res) => {
  const totalJobs = await ServiceRequest.countDocuments({
    engineer: req.user.id
  });

  const completedJobs = await ServiceRequest.countDocuments({
    engineer: req.user.id,
    status: "COMPLETED"
  });

  const pendingJobs = await ServiceRequest.countDocuments({
    engineer: req.user.id,
    status: "ACCEPTED"
  });

  const engineer = await User.findById(req.user.id);

  res.json({
    totalJobs,
    completedJobs,
    pendingJobs,
    rating: engineer.averageRating,
    totalReviews: engineer.totalReviews
  });
};

// ADMIN DASHBOARD
const adminDashboard = async (req, res) => {
  const totalUsers = await User.countDocuments({
    role: "USER"
  });

  const totalEngineers = await User.countDocuments({
    role: "ENGINEER"
  });

  const pendingEngineers = await User.countDocuments({
    role: "ENGINEER",
    isApproved: false
  });

  const totalServices = await ServiceRequest.countDocuments();

  const completedServices = await ServiceRequest.countDocuments({
    status: "COMPLETED"
  });

  res.json({
    totalUsers,
    totalEngineers,
    pendingEngineers,
    totalServices,
    completedServices
  });
};

module.exports = {
  userDashboard,
  engineerDashboard,
  adminDashboard
};