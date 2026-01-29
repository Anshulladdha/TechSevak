const Review = require("../models/review.model");
const ServiceRequest = require("../models/serviceRequest.model");
const User = require("../models/user.model");

const createReview = async (req, res) => {
  try {
    const { serviceRequestId, rating, comment } = req.body;

    const service = await ServiceRequest.findById(serviceRequestId);

    if (!service)
      return res.status(404).json({ message: "Service not found" });

    if (service.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    if (service.status !== "COMPLETED")
      return res
        .status(400)
        .json({ message: "Service not completed yet" });

    const review = await Review.create({
      serviceRequest: serviceRequestId,
      user: req.user.id,
      engineer: service.engineer,
      rating,
      comment
    });

    // 🔥 update engineer rating
    const allReviews = await Review.find({
      engineer: service.engineer
    });

    const avg =
      allReviews.reduce((sum, r) => sum + r.rating, 0) /
      allReviews.length;

    await User.findByIdAndUpdate(service.engineer, {
      averageRating: avg.toFixed(1),
      totalReviews: allReviews.length
    });

    res.json({ message: "Review submitted successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview };