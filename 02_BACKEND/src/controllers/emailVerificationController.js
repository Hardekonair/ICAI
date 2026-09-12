import bcrypt from "bcrypt";

import userModel from "../models/user.js";
import emailVerificationModel from "../models/emailVerificationModel.js";
import jwt from "jsonwebtoken";

import {
    createOTP,
} from "../services/otpService.js";

import {
    sendVerificationOTP,
} from "../services/emailService.js";


export const sendPasswordChangeOTP = async (
    req,
    res
) => {
    try {
        const user = await userModel.findById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const otp = await createOTP(
            user.email,
            "PASSWORD_CHANGE"
        );

        await sendVerificationOTP(
            user.email,
            otp
        );

        return res.status(200).json({
            success: true,
            message:
                "Verification code sent to your email.",
        });

    } catch (error) {
        console.error(
            "Send password change OTP error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to send verification code.",
        });
    }
};


export const verifyPasswordChangeOTP = async (
    req,
    res
) => {
    try {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message:
                    "Verification code is required.",
            });
        }

        const user = await userModel.findById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const verification =
            await emailVerificationModel.findOne({
                email: user.email,
                purpose: "PASSWORD_CHANGE",
            });

        if (!verification) {
            return res.status(400).json({
                success: false,
                message:
                    "Verification code expired or not found.",
            });
        }

        // Maximum 5 attempts
        if (verification.attempts >= 5) {
            await verification.deleteOne();

            return res.status(429).json({
                success: false,
                message:
                    "Too many attempts. Please request a new code.",
            });
        }

        verification.attempts += 1;

        await verification.save();

        const isValid = await bcrypt.compare(
            otp,
            verification.otpHash
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid verification code.",
            });
        }

        // OTP is single-use
        // OTP is single-use
        await verification.deleteOne();

        // Create short-lived verification token
        const verificationToken = jwt.sign(
            {
                userId: user._id,
                purpose: "PASSWORD_CHANGE",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            verificationToken,
        });
    } catch (error) {
        console.error(
            "Verify password change OTP error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to verify code.",
        });
    }
};
export const verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // Check whether account already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Find OTP
        const verification =
            await emailVerificationModel.findOne({
                email,
                purpose: "SIGNUP"
            });

        if (!verification) {
            return res.status(400).json({
                success: false,
                message: "Verification code expired or not found."
            });
        }

        // Maximum 5 attempts
        if (verification.attempts >= 5) {
            await verification.deleteOne();

            return res.status(429).json({
                success: false,
                message: "Too many attempts. Please request a new code."
            });
        }

        // Increase attempt count
        verification.attempts += 1;
        await verification.save();

        // Compare OTP
        const isValid = await bcrypt.compare(
            otp,
            verification.otpHash
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code."
            });
        }

        // OTP is single-use
        await verification.deleteOne();

        // Generate short-lived signup verification token
        const verificationToken = jwt.sign(
            {
                email,
                purpose: "SIGNUP"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            verificationToken
        });

    } catch (err) {
        console.error(
            "Signup OTP Verification Error:",
            err
        );

        return res.status(500).json({
            success: false,
            message: "OTP verification failed"
        });
    }
};

export const sendSignupOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check whether account already exists
        const existingUser = await userModel.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create OTP
        const otp = await createOTP(
            normalizedEmail,
            "SIGNUP"
        );

        // Send OTP
        await sendVerificationOTP(
            normalizedEmail,
            otp
        );

        return res.status(200).json({
            success: true,
            message: "Verification code sent to your email."
        });

    } catch (error) {
        console.error(
            "Send signup OTP error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to send verification code."
        });
    }
};