const transporter = require("../config/mail.config");

const sendVerificationMail = async (email, token) => {
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"TechSevak" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `
      <h3>Welcome to TechSevak</h3>
      <p>Please verify your email address by clicking below link:</p>
      <a href="${verifyLink}">Verify Email</a>
      <p>This link is valid for 24 hours.</p>
    `
  });
};

const sendOtpMail = async (email, otp) => {
    await transporter.sendMail({
      from: `"TechSevak" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h3>Reset your password</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
      `
    });
  };


module.exports = { sendVerificationMail , sendOtpMail};
