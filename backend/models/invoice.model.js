const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    serviceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    engineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    baseCharge: {
      type: Number,
      default: 299
    },

    extraCharge: {
      type: Number,
      default: 0
    },

    totalAmount: {
      type: Number
    },

    status: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);