const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["USER", "ENGINEER"],
      required: true
    },

    // -------- USER FIELDS --------
    liveLocation: {
      type: String,
      default: ""
    },

    // -------- ENGINEER FIELDS --------
    area: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    skills: {
      type: [String],
      default: []
    },

    idProof: {
      type: String,
      default: ""
    },
isApproved: {
  type: Boolean,
  default: false
},

averageRating: {
  type: Number,
  default: 0
},
totalReviews: {
  type: Number,
  default: 0
},
    // -------- COMMON --------
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
