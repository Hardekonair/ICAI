import crypto from "crypto";
import bcrypt from "bcrypt";

import emailVerificationModel from "../models/emailVerificationModel.js";

export const generateOTP = () => {
    return crypto
        .randomInt(100000, 1000000)
        .toString();
};

export const createOTP = async (
    email,
    purpose
) => {
    const otp = generateOTP();

    const otpHash = await bcrypt.hash(
        otp,
        10
    );

    // Invalidate previous OTPs
    await emailVerificationModel.deleteMany({
        email,
        purpose,
    });

    await emailVerificationModel.create({
        email,
        otpHash,
        purpose,
        expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
        ),
    });

    return otp;
};