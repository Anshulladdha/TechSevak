const User = require("../models/user.model");
const { generateLoginToken } = require("../utils/generateToken");
const { generateEmailToken } = require("../utils/generateToken");

const { sendVerificationMail, sendOtpMail } = require("./mail.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Otp = require("../models/otp.model");
const { createOTP } = require("./otp.service");


const registerUser = async (data) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already registered");
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
  
    const user = await User.create({
      ...data,
      password: hashedPassword
    });
  
    const token = generateEmailToken(user.email);
    await sendVerificationMail(user.email, token);
  
    return user;
  };
  

const verifyEmail = async (token) => {
    if (!token) {
        throw new Error("Verification token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isVerified) {
        return "Email already verified";
    }

    user.isVerified = true;
    await user.save();

    return "Email verified successfully";
};



const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.isVerified) {
        throw new Error("Please verify your email first");
    }
    if (user.role === "ENGINEER" && !user.isApproved) {
        throw new Error("Your account is under admin review");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateLoginToken(user);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};


const forgotPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Email not registered");
    }

    const otp = await createOTP(email);

    await sendOtpMail(email, otp);

    return "OTP sent to your email";
};


const resetPassword = async (email, otp, newPassword) => {
    const otpData = await Otp.findOne({ email, otp });

    if (!otpData) {
        throw new Error("Invalid OTP");
    }

    if (otpData.expiresAt < new Date()) {
        await Otp.deleteMany({ email });
        throw new Error("OTP expired");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
    );

    // OTP delete after reset
    await Otp.deleteMany({ email });

    return "Password reset successfully";
};

module.exports = {
    registerUser,
    verifyEmail,
    loginUser,
    forgotPassword,
    resetPassword
};
