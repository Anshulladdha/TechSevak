/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
const { registerUser, verifyEmail, loginUser, forgotPassword, resetPassword } = require("../services/auth.service");


const register = async (req, res) => {
    try {
        await registerUser(req.body);

        res.status(201).json({
            message: "Signup successful. Please verify your email."
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.query;

        const message = await verifyEmail(token);

        res.json({ message });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        res.json({
            message: "Login successful",
            ...data
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const message = await forgotPassword(email);

        res.json({ message });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const message = await resetPassword(email, otp, newPassword);

        res.json({ message });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


module.exports = {
    register,
    verifyEmailController,
    login,
    forgotPasswordController,
    resetPasswordController
};

