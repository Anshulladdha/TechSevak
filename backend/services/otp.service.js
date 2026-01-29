const Otp = require("../models/otp.model");
const generateOTP = require("../utils/generateOTP");

const createOTP = async (email) => {
  // delete old otp
  await Otp.deleteMany({ email });

  const otp = generateOTP();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await Otp.create({
    email,
    otp,
    expiresAt
  });

  return otp;
};

module.exports = { createOTP };
