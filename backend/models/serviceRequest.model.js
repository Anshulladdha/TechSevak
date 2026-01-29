const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    engineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    problem: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "COMPLETED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
