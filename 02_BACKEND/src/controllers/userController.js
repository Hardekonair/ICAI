import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (req, res) => {
    try {

        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("Get current user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user profile."
        });

    }
};

export const updateCurrentUser = async (req, res) => {
    try {
        const { name, avatar } = req.body;

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty."
                });
            }

            user.name = name.trim();
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        const updatedUser = await userModel
            .findById(req.user.id)
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile."
        });
    }
};
export const changePassword = async (req, res) => {
    try {
        const {
            verificationToken,
            newPassword,
            confirmPassword,
        } = req.body;

        // Check required fields
        if (
            !verificationToken ||
            !newPassword ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check password confirmation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match.",
            });
        }

        // Password length
        const passwordChecks = {
            length: newPassword.length >= 6 && newPassword.length <= 15,
            digit: /[0-9]/.test(newPassword),
            special: /[!@#$%&*]/.test(newPassword),
            lowercase: /^[a-z0-9!@#$%^&*]*$/.test(newPassword)
        };

        const isValidPassword =
            passwordChecks.length &&
            passwordChecks.digit &&
            passwordChecks.special &&
            passwordChecks.lowercase;

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not meet the requirements."
            });
        }

        // Verify email verification token
        let decoded;

        try {
            decoded = jwt.verify(
                verificationToken,
                process.env.JWT_SECRET
            );
        } catch (error) {
            return res.status(401).json({
                success: false,
                message:
                    "Email verification has expired. Please verify your email again.",
            });
        }

        // Make sure token is for password change
        if (decoded.purpose !== "PASSWORD_CHANGE") {
            return res.status(401).json({
                success: false,
                message: "Invalid verification token.",
            });
        }

        // Make sure token belongs to logged-in user
        if (
            decoded.userId.toString() !==
            req.user.id.toString()
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid verification token.",
            });
        }

        // Find user
        const user = await userModel.findById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });

    } catch (error) {
        console.error(
            "Change password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to change password.",
        });
    }
};