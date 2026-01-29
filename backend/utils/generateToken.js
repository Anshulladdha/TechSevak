const jwt = require("jsonwebtoken");

function generateEmailToken(email) {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}

function generateLoginToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = {
  generateEmailToken,
  generateLoginToken
};
