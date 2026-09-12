import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        otpHash: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            enum: ["PASSWORD_CHANGE", "SIGNUP"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Automatically remove expired OTP documents
emailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const emailVerificationModel =
    mongoose.model(
        "EmailVerification",
        emailVerificationSchema
    );

export default emailVerificationModel;