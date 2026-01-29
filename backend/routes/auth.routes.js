const express = require("express");
const router = express.Router();
const { register, verifyEmailController, login, forgotPasswordController, resetPasswordController } = require("../controllers/auth.controller");

router.post("/register", register);
router.get("/verify-email", verifyEmailController);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);


module.exports = router;
